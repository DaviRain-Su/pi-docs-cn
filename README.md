# pi 中文文档

> pi 中文开发指南 - 使用 VitePress 构建

## 在线访问

[https://pi-docs-cn.vercel.app](https://pi-docs-cn.vercel.app)

## 本地开发

```bash
npm install
npm run dev
```

## 构建

```bash
npm run build
```

## 文档同步（本地）

从上游 pi-mono 的 `docs/zh` 全量目录同步到本仓库（含死链修复/兼容入口）：

```bash
npm run sync:zh
npm run sync:zh:no-build  # 仅同步，不执行 build 校验
```

`--no-build` 场景可再加 `--no-summary`（如 CI/脚本场景）控制输出。  

在 CI（含 GitHub Actions）环境中，脚本已自动切换为安静模式，无需额外参数。

支持通过环境变量覆盖源路径和分支：

- `PI_MONO_SOURCE_PATH`（默认 `../pi-mono`）
- `PI_MONO_SOURCE_BRANCH`（默认 `main`）

例如：

```bash
PI_MONO_SOURCE_PATH=../pi-mono npm run sync:zh
PI_MONO_SOURCE_PATH=../pi-mono PI_MONO_SOURCE_BRANCH=main npm run sync:zh:no-build
```

## 文档来源

内容同步自 [pi-mono](https://github.com/DaviRain-Su/pi-mono) 仓库。
