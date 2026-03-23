#!/usr/bin/env bash

set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
DOCS_DIR="$REPO_ROOT/docs"
PI_MONO_REPO_URL="https://github.com/DaviRain-Su/pi-mono.git"
SOURCE_PATH="${PI_MONO_SOURCE_PATH:-$REPO_ROOT/../pi-mono}"
SOURCE_BRANCH="${PI_MONO_SOURCE_BRANCH:-main}"
BUILD_ENABLED=true
RETRY_COUNT="${SYNC_BUILD_RETRIES:-3}"
RETRY_DELAY="${SYNC_RETRY_DELAY_SEC:-20}"
SHOW_SUMMARY=true
SCRIPT_SOURCE_DOCS_PATH=""
CLEANUP_SOURCE=false

usage() {
  cat <<'EOF'
Usage:
  scripts/sync-zh-docs.sh [options]

Options:
  --source-path PATH      pi-mono 本地路径（包含 packages/coding-agent/docs/zh）
  --source-branch BRANCH  本地源仓库或临时 clone 的默认分支（默认 main）
  --no-build              同步后不执行 npm run build 校验
  --no-summary            CI 场景可关闭同步后状态/差异汇总输出
  --retries N             build 失败重试次数（默认 3）
  --retry-delay N         重试间隔秒数（默认 20）
  --help                  查看帮助

Environment:
  PI_MONO_SOURCE_PATH     覆盖源代码路径（同 --source-path）
  PI_MONO_SOURCE_BRANCH   覆盖源代码分支（同 --source-branch）
  SYNC_BUILD_RETRIES     覆盖重试次数
  SYNC_RETRY_DELAY_SEC    覆盖重试间隔
  CI=1                   自动关闭同步后汇总输出（与 --no-summary 等效）
EOF
}

while [[ $# -gt 0 ]]; do
  case "$1" in
    --source-path)
      if [[ $# -lt 2 ]]; then
        echo "缺少 --source-path 的值" >&2
        exit 1
      fi
      SOURCE_PATH="$2"
      shift 2
      ;;
    --source-branch)
      if [[ $# -lt 2 ]]; then
        echo "缺少 --source-branch 的值" >&2
        exit 1
      fi
      SOURCE_BRANCH="$2"
      shift 2
      ;;
    --no-build)
      BUILD_ENABLED=false
      shift
      ;;
    --no-summary)
      SHOW_SUMMARY=false
      shift
      ;;
    --retries)
      if [[ $# -lt 2 ]]; then
        echo "缺少 --retries 的值" >&2
        exit 1
      fi
      RETRY_COUNT="$2"
      shift 2
      ;;
    --retry-delay)
      if [[ $# -lt 2 ]]; then
        echo "缺少 --retry-delay 的值" >&2
        exit 1
      fi
      RETRY_DELAY="$2"
      shift 2
      ;;
    --help)
      usage
      exit 0
      ;;
    *)
      echo "Unknown option: $1" >&2
      usage
      exit 1
      ;;
  esac
done

if ! command -v rsync >/dev/null 2>&1; then
  echo "错误：未检测到 rsync" >&2
  exit 1
fi

if ! command -v python3 >/dev/null 2>&1; then
  echo "错误：未检测到 python3" >&2
  exit 1
fi

if [ "${CI:-false}" = "true" ] || [ "${CI:-false}" = "1" ]; then
  SHOW_SUMMARY=false
fi

TMP_DIR="$(mktemp -d)"
BACKUP_DIR="$TMP_DIR/backups"
mkdir -p "$BACKUP_DIR"
trap 'rm -rf "$TMP_DIR"; if [ "$CLEANUP_SOURCE" = true ]; then rm -rf "$SOURCE_PATH"; fi' EXIT

log() {
  echo "[sync-zh-docs] $*"
}

write_file_if_missing() {
  local path="$1"
  local content="$2"
  if [ ! -f "$path" ]; then
    mkdir -p "$(dirname "$path")"
    printf '%s\n' "$content" > "$path"
  fi
}

backup_file_if_exists() {
  local rel_path="$1"
  local src="$DOCS_DIR/$rel_path"
  if [ -f "$src" ]; then
    mkdir -p "$BACKUP_DIR/$(dirname "$rel_path")"
    cp "$src" "$BACKUP_DIR/$rel_path"
  fi
}

restore_file_if_backed() {
  local rel_path="$1"
  local backup="$BACKUP_DIR/$rel_path"
  if [ -f "$backup" ]; then
    mkdir -p "$(dirname "$DOCS_DIR/$rel_path")"
    cp "$backup" "$DOCS_DIR/$rel_path"
  fi
}

log "准备同步来源目录..."
if [ -d "$SOURCE_PATH/.git" ]; then
  SCRIPT_SOURCE_DOCS_PATH="$SOURCE_PATH/packages/coding-agent/docs/zh"
  if [ ! -d "$SCRIPT_SOURCE_DOCS_PATH" ]; then
    echo "错误：在源路径未找到 docs/zh：$SCRIPT_SOURCE_DOCS_PATH" >&2
    exit 1
  fi
else
  log "未检测到本地 pi-mono 源码，临时克隆 $PI_MONO_REPO_URL@$SOURCE_BRANCH"
  SOURCE_PATH="$TMP_DIR/pi-mono"
  CLEANUP_SOURCE=true
  git clone --depth 1 --branch "$SOURCE_BRANCH" "$PI_MONO_REPO_URL" "$SOURCE_PATH"
  SCRIPT_SOURCE_DOCS_PATH="$SOURCE_PATH/packages/coding-agent/docs/zh"
fi

# 快照本地自定义文件，避免被 sync 过程覆盖（包含根 index 与兼容文件）
preserve_files=(
  "index.md"
  "AGENTS.md"

  # 历史兼容索引/导航入口
  "guide/20-hackathon-winning-strategy.md"
  "cookbook/index.md"
  "patterns/index.md"
  "platform/index.md"

  # dAgent legacy flattened route（历史 docs/dagent 路径）
  "dagent/index.md"
  "dagent/README.md"
  "dagent/20-dagent-hackathon-strategy.md"
  "dagent/21-dagent-xlayer-hackathon.md"
  "dagent/22-dagent-xlayer-deep-dive.md"
  "dagent/23-dagent-execution-plan.md"
  "dagent/24-slock-dagent-strategy.md"
  "dagent/25-dagent-multi-chain.md"
  "dagent/26-dagent-erc8004-agents.md"
  "dagent/27-dagent-business-plan.md"
  "dagent/30-slock-analysis.md"
  "dagent/34-cloudflare-vs-decentralized.md"
  "dagent/35-dagent-worker-deployment.md"
  "dagent/36-decentralized-compute.md"

  # 参考区块链/compute 历史兼容页
  "reference/zig/30-slock-ai-analysis.md"
  "reference/compute/34-cloudflare-worker-vs-decentralized.md"
  "reference/compute/35-decentralized-worker-deployment-guide.md"
  "reference/compute/36-decentralized-compute-platforms-analysis.md"

  "blockchain/dasn/index.md"
  "blockchain/index.md"

  # examples 历史入口页
  "examples/extensions/index.md"
  "examples/extensions/custom-provider-anthropic.md"
  "examples/extensions/custom-provider-anthropic/index.md"
  "examples/extensions/custom-provider-gitlab-duo.md"
  "examples/extensions/custom-provider-gitlab-duo/index.md"
  "examples/extensions/custom-provider-qwen-cli.md"
  "examples/extensions/custom-provider-qwen-cli/index.md"
  "examples/extensions/plan-mode.md"
  "examples/extensions/plan-mode/index.md"
)
for f in "${preserve_files[@]}"; do
  backup_file_if_exists "$f"
done

log "开始覆盖同步 docs/zh 全量目录（排除本地自定义 index 与兼容入口）"
shopt -s nullglob
for src_item in "$SCRIPT_SOURCE_DOCS_PATH"/*; do
  item_name="$(basename "$src_item")"

  if [ "$item_name" = "sync-check.sh" ]; then
    continue
  fi

  if [ -d "$src_item" ]; then
    rsync -av --delete "$src_item/" "$DOCS_DIR/$item_name/"
    continue
  fi

  if [ -f "$src_item" ] && [[ "$src_item" == *.md ]]; then
    if [ "$item_name" = "README.md" ]; then
      continue
    fi
    cp "$src_item" "$DOCS_DIR/$item_name"
  fi
done
shopt -u nullglob

# 重建 /dagent 兼容路由（保留历史入口）
# 说明：上游 dAgent 文档已迁移到 blockchain/03-dagent，
#       但本仓库继续保留 docs/dagent 作为历史入口，避免旧链接断裂。

# 恢复本地定制 index（若不存在则保持上游 README 的语义路径）
if [ -f "$BACKUP_DIR/index.md" ]; then
  restore_file_if_backed "index.md"
elif [ -f "$SCRIPT_SOURCE_DOCS_PATH/README.md" ]; then
  cp "$SCRIPT_SOURCE_DOCS_PATH/README.md" "$DOCS_DIR/index.md"
fi

# 恢复兼容页快照（若被上游覆盖）
for f in "${preserve_files[@]}"; do
  restore_file_if_backed "$f"
done

log "应用兼容入口兜底页"
write_file_if_missing "$DOCS_DIR/guide/20-hackathon-winning-strategy.md" $'# 黑客松获奖策略（历史路径）\n\n该文档在当前仓库中保留历史兼容路径入口。\n\n请查看：\n\n- [/dagent/20-dagent-hackathon-strategy](/dagent/20-dagent-hackathon-strategy)'

write_file_if_missing "$DOCS_DIR/reference/zig/30-slock-ai-analysis.md" $'# Slock.ai 分析（历史兼容入口）\n\n本地路径用于历史引用兼容，优先阅读：\n\n- [/reference/zig/28-pi-mono-multi-agent-architecture](/reference/zig/28-pi-mono-multi-agent-architecture)'

write_file_if_missing "$DOCS_DIR/reference/compute/34-cloudflare-worker-vs-decentralized.md" $'# Cloudflare Worker vs 去中心化 Worker\n\n该文档当前为历史兼容保留文档。\n\n后续将补充完整内容。'
write_file_if_missing "$DOCS_DIR/reference/compute/35-decentralized-worker-deployment-guide.md" $'# 去中心化 Worker 部署指南\n\n该文档当前为历史兼容保留文档。\n\n后续将补充完整内容。'
write_file_if_missing "$DOCS_DIR/reference/compute/36-decentralized-compute-platforms-analysis.md" $'# 去中心化计算平台分析\n\n该文档当前为历史兼容保留文档。\n\n后续将补充完整内容。'

write_file_if_missing "$DOCS_DIR/blockchain/dasn/index.md" $'# DASN 专题\n\n本目录入口请使用：\n\n- [/blockchain/dasn/README](/blockchain/dasn/README)'
write_file_if_missing "$DOCS_DIR/blockchain/index.md" $'# 区块链专题\n\n- [Blockchain 总览](/blockchain/README)\n- [DASN 专题](/blockchain/dasn/README)'

write_file_if_missing "$DOCS_DIR/examples/extensions/index.md" $'# Examples\n\n示例目录（兼容入口）。\n\n- [custom-provider-anthropic](/examples/extensions/custom-provider-anthropic.md)\n- [custom-provider-gitlab-duo](/examples/extensions/custom-provider-gitlab-duo.md)\n- [custom-provider-qwen-cli](/examples/extensions/custom-provider-qwen-cli.md)\n- [plan-mode](/examples/extensions/plan-mode.md)'

write_file_if_missing "$DOCS_DIR/examples/extensions/custom-provider-anthropic.md" $'# custom-provider-anthropic\n\n该示例页为兼容历史链接保留，当前源码示例暂未同步。'
write_file_if_missing "$DOCS_DIR/examples/extensions/custom-provider-anthropic/index.md" $'# custom-provider-anthropic（兼容）\n\n该示例页为兼容历史链接保留。'
write_file_if_missing "$DOCS_DIR/examples/extensions/custom-provider-gitlab-duo.md" $'# custom-provider-gitlab-duo\n\n该示例页为兼容历史链接保留，当前源码示例暂未同步。'
write_file_if_missing "$DOCS_DIR/examples/extensions/custom-provider-gitlab-duo/index.md" $'# custom-provider-gitlab-duo（兼容）\n\n该示例页为兼容历史链接保留。'
write_file_if_missing "$DOCS_DIR/examples/extensions/custom-provider-qwen-cli.md" $'# custom-provider-qwen-cli\n\n该示例页为兼容历史链接保留，当前源码示例暂未同步。'
write_file_if_missing "$DOCS_DIR/examples/extensions/custom-provider-qwen-cli/index.md" $'# custom-provider-qwen-cli（兼容）\n\n该示例页为兼容历史链接保留。'
write_file_if_missing "$DOCS_DIR/examples/extensions/plan-mode.md" $'# plan-mode\n\n该示例页为兼容历史链接保留，当前源码示例暂未同步。'
write_file_if_missing "$DOCS_DIR/examples/extensions/plan-mode/index.md" $'# plan-mode（兼容）\n\n该示例页为兼容历史链接保留。'

# 同步链接修复（避免死链）
python3 - <<'PY'
from pathlib import Path

pairs = [
    ('(../../../../../AGENTS.md)', '(/AGENTS.md)'),
    ('(./../../../../../AGENTS.md)', '(/AGENTS.md)'),
    ('(../../../examples/extensions/custom-provider-anthropic/)', '(/examples/extensions/custom-provider-anthropic.md)'),
    ('(../../../examples/extensions/custom-provider-gitlab-duo/)', '(/examples/extensions/custom-provider-gitlab-duo.md)'),
    ('(../../../examples/extensions/custom-provider-qwen-cli/)', '(/examples/extensions/custom-provider-qwen-cli.md)'),
    ('(./../../../examples/extensions/index)', '(/examples/extensions/index.md)'),
    ('(../../../examples/extensions/index)', '(/examples/extensions/index.md)'),
    ('(./../../../examples/extensions/)', '(/examples/extensions/index.md)'),
    ('(../../../examples/extensions/)', '(/examples/extensions/index.md)'),
    ('(../../../examples/extensions/custom-provider-gitlab-duo)', '(/examples/extensions/custom-provider-gitlab-duo.md)'),
    ('(../../../examples/extensions/plan-mode)', '(/examples/extensions/plan-mode.md)'),
]

# 历史兼容路径修复
targets = [
    Path('docs/reference/custom-provider.md'),
    Path('docs/reference/providers.md'),
    Path('docs/reference/extensions.md'),
    Path('docs/reference/tui.md'),
    Path('docs/blockchain/03-dagent/05-analysis/30-slock-analysis.md'),
    Path('docs/reference/compute/35-decentralized-worker-deployment-guide.md'),
    Path('docs/guide/11-development.md'),
]

for path in targets:
    if not path.exists():
        continue
    text = path.read_text()
    origin = text
    for old, new in pairs:
        text = text.replace(old, new)
    if path.name == '30-slock-analysis.md':
        text = text.replace('(../../blockchain/dasn/19-dasn-vision.md)', '(../../dasn/19-dasn-vision.md)')
        text = text.replace('(./28-pi-mono-multi-agent-architecture.md)', '(../../../reference/zig/28-pi-mono-multi-agent-architecture.md)')
    if text != origin:
        path.write_text(text)
        print(f"fixed links in {path}")
PY

# 可选重建依赖图：先执行目录差异清理后再验证
if [ "$BUILD_ENABLED" = true ]; then
  log "开始 build 校验（包含 dead link 检查）..."
  for i in $(seq 1 "$RETRY_COUNT"); do
    if npm run build; then
      log "build 成功（第 ${i}/${RETRY_COUNT} 次尝试）"
      break
    fi

    if [ "$i" -lt "$RETRY_COUNT" ]; then
      log "build 失败，${RETRY_DELAY} 秒后重试（${i}/${RETRY_COUNT}）"
      sleep "$RETRY_DELAY"
    else
      log "build 重试上限已达，退出失败。"
      exit 1
    fi
  done
fi

log "同步完成。"

if [ "$SHOW_SUMMARY" = true ]; then
  git -C "$REPO_ROOT" status --short
  git -C "$REPO_ROOT" diff --stat -- docs | sed -n '1,80p'
fi
