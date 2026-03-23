# pi 中文文档

> pi 中文开发指南 - 从入门到精通，从使用到二次开发

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/DaviRain-Su/pi-docs-cn)

---

## 🌐 在线访问

**文档网站**: [https://pi-docs-cn.vercel.app](https://pi-docs-cn.vercel.app)

---

## 📁 项目结构

```
pi-docs-cn/
├── .github/
│   └── workflows/
│       ├── sync-docs.yml      # 自动同步工作流
│       └── deploy.yml         # 部署工作流
├── scripts/
│   ├── setup.sh               # 设置脚本
│   └── sync-from-pi-mono.js   # 文档同步脚本
├── src/
│   ├── assets/
│   │   └── logo.svg           # 网站 Logo
│   ├── content/
│   │   └── docs/              # 文档内容（自动同步）
│   │       ├── guide/         # 📖 使用指南
│   │       ├── patterns/      # 🎨 设计模式
│   │       ├── cookbook/      # 🍳 代码食谱
│   │       ├── platform/      # 💻 平台配置
│   │       ├── reference/     # 📚 技术参考
│   │       └── blockchain/    # ⛓️ 区块链专题
│   │           ├── solana/    # ☀️ Solana 专题
│   │           ├── sui/       # 🌊 Sui 专题
│   │           └── 03-dagent/ # 🎯 dAgent X Layer
│   └── styles/
│       └── custom.css         # 自定义样式
├── astro.config.mjs           # Astro 配置
├── package.json               # 项目依赖
└── README.md                  # 项目说明
```

---

## 📚 文档来源

本文档网站的内容源自主仓库 [pi-mono](https://github.com/DaviRain-Su/pi-mono) 的以下路径：

```
packages/coding-agent/docs/zh/
├── guide/           →  src/content/docs/guide/
├── patterns/        →  src/content/docs/patterns/
├── cookbook/        →  src/content/docs/cookbook/
├── platform/        →  src/content/docs/platform/
├── reference/       →  src/content/docs/reference/
└── blockchain/      →  src/content/docs/blockchain/
    ├── solana/
    ├── sui/
    └── 03-dagent/   ← dAgent X Layer 项目文档
```

---

## 🚀 本地开发

### 1. 克隆仓库

```bash
git clone https://github.com/DaviRain-Su/pi-docs-cn.git
cd pi-docs-cn
```

### 2. 安装依赖

```bash
npm install
```

### 3. 同步文档（可选）

如果你有 pi-mono 仓库的本地副本：

```bash
npm run sync /path/to/pi-mono
```

### 4. 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:4321

---

## 🔄 同步机制

### 自动同步（推荐）

已配置 GitHub Actions，每天凌晨 2 点自动从 pi-mono 同步最新文档。

### 手动同步

```bash
# 使用默认路径 (../../pi-mono)
npm run sync

# 指定 pi-mono 路径
npm run sync /path/to/pi-mono
```

### 手动触发 Actions

在 GitHub 仓库页面 → Actions → Sync Docs → Run workflow

---

## 📝 工作流程

### 维护者 workflow

```bash
# 1. 在 pi-mono 编辑文档
cd pi-mono
vim packages/coding-agent/docs/zh/...

# 2. 提交更改
git add .
git commit -m "docs: update ..."
git push

# 3. 等待自动同步（每天凌晨2点）
# 或手动触发 Actions
```

### 文档网站自动更新

1. pi-mono 提交更改
2. GitHub Actions 检测到变化
3. 自动同步到 pi-docs-cn
4. Vercel 自动部署
5. 网站更新完成 ✅

---

## 🏗️ 部署

### Vercel（推荐）

1. Fork 本仓库
2. 在 [Vercel](https://vercel.com) 导入项目
3. 框架预设：**Astro**
4. 构建命令：`npm run build`
5. 输出目录：`dist`

无需额外配置，自动部署！

### 其他平台

```bash
npm run build
# 部署 dist/ 目录到任何静态托管平台
```

---

## 📋 文档分类

| 目录 | 内容 | 文档数 |
|------|------|--------|
| `guide/` | 使用指南 | ~15 |
| `patterns/` | 设计模式 | ~1 |
| `cookbook/` | 代码食谱 | ~1 |
| `platform/` | 平台配置 | ~4 |
| `reference/` | 技术参考 | ~20+ |
| `blockchain/` | 区块链专题 | ~30+ |
| `blockchain/03-dagent/` | dAgent X Layer | 12 |

**总计：~80+ 篇文档**

---

## 🎯 dAgent X Layer 项目

本网站特别包含 **dAgent X Layer 项目** 完整文档：

- 🏆 **黑客松参赛**: 获奖策略、比赛分析、执行计划
- 👨‍💻 **架构设计**: 多链架构、ERC-8004、Worker部署
- 💼 **商业规划**: 完整商业计划书
- 📊 **对比分析**: 竞品分析、部署方案对比

访问路径：[区块链专题 → dAgent X Layer](https://pi-docs-cn.vercel.app/blockchain/03-dagent/)

---

## 🤝 贡献

由于本文档是自动同步的，**请勿直接向本仓库提交 PR 修改文档内容**。

如需修改文档：

1. 前往 [pi-mono 仓库](https://github.com/DaviRain-Su/pi-mono)
2. 修改 `packages/coding-agent/docs/zh/` 下的文件
3. 提交 PR 到 pi-mono
4. 文档会自动同步到本仓库

如需改进文档网站（样式、功能等），欢迎向本仓库提交 PR！

---

## 📄 许可证

与 [pi-mono](https://github.com/DaviRain-Su/pi-mono) 项目相同

---

*本文档由 [Astro](https://astro.build) + [Starlight](https://starlight.astro.build) 构建 ❤️*
