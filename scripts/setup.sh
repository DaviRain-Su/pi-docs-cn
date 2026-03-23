#!/bin/bash
# dAgent Docs 设置脚本

set -e

echo "🚀 设置 dAgent Docs..."

# 检查 Node.js
if ! command -v node &> /dev/null; then
    echo "❌ 未找到 Node.js，请先安装 Node.js 20+"
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 20 ]; then
    echo "❌ Node.js 版本过低，需要 20+，当前版本: $(node -v)"
    exit 1
fi

echo "✅ Node.js 版本: $(node -v)"

# 安装依赖
echo "📦 安装依赖..."
npm install

# 检查 pi-mono 路径
PI_MONO_PATH="${1:-../../pi-mono}"

if [ ! -d "$PI_MONO_PATH" ]; then
    echo "⚠️  未找到 pi-mono 仓库: $PI_MONO_PATH"
    echo "请先克隆 pi-mono 仓库到指定路径，然后运行:"
    echo "  npm run sync $PI_MONO_PATH"
else
    echo "✅ 找到 pi-mono 仓库: $PI_MONO_PATH"
    echo "🔄 同步文档..."
    node scripts/sync-from-pi-mono.js "$PI_MONO_PATH"
fi

echo ""
echo "✅ 设置完成！"
echo ""
echo "可用命令:"
echo "  npm run dev     - 启动开发服务器"
echo "  npm run build   - 构建生产版本"
echo "  npm run sync    - 同步 pi-mono 文档"
echo ""
