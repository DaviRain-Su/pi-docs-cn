# pi-docs-cn 项目结构

```
pi-docs-cn/
├── .github/
│   └── workflows/
│       ├── sync-docs.yml          # 自动同步 pi-mono 文档
│       └── deploy.yml             # 自动部署到 Vercel
├── scripts/
│   ├── setup.sh                   # 一键设置脚本
│   └── sync-from-pi-mono.js       # 文档同步脚本（核心）
├── src/
│   ├── assets/
│   │   └── logo.svg               # 网站 Logo
│   ├── content/
│   │   └── docs/                  # 📚 文档内容（自动同步）
│   │       ├── index.mdx          # 首页
│   │       ├── guide/             # 📖 使用指南
│   │       │   ├── 01-what-is-pi.mdx
│   │       │   ├── 02-architecture-story.mdx
│   │       │   └── ...
│   │       ├── patterns/          # 🎨 设计模式
│   │       ├── cookbook/          # 🍳 代码食谱
│   │       ├── platform/          # 💻 平台配置
│   │       ├── reference/         # 📚 技术参考
│   │       │   ├── architecture-overview.mdx
│   │       │   ├── zig/           # Zig 研究线
│   │       │   └── compute/       # 计算研究线
│   │       └── blockchain/        # ⛓️ 区块链专题
│   │           ├── 00-overview.mdx
│   │           ├── solana/        # ☀️ Solana
│   │           ├── sui/           # 🌊 Sui
│   │           └── 03-dagent/     # 🎯 dAgent X Layer
│   │               ├── README.mdx
│   │               ├── 02-hackathon/   # 黑客松参赛
│   │               ├── 03-architecture/# 架构设计
│   │               ├── 04-business/    # 商业规划
│   │               └── 05-analysis/    # 对比分析
│   └── styles/
│       └── custom.css             # 自定义样式
├── astro.config.mjs               # Astro 配置
├── package.json                   # 项目依赖
├── tsconfig.json                  # TypeScript 配置
├── .gitignore                     # Git 忽略文件
├── README.md                      # 项目说明
└── PROJECT_STRUCTURE.md           # 本文件
```

## 文档来源映射

```
pi-mono/packages/coding-agent/docs/zh/
│
├── guide/              ──►   pi-docs-cn/src/content/docs/guide/
├── patterns/           ──►   pi-docs-cn/src/content/docs/patterns/
├── cookbook/           ──►   pi-docs-cn/src/content/docs/cookbook/
├── platform/           ──►   pi-docs-cn/src/content/docs/platform/
├── reference/          ──►   pi-docs-cn/src/content/docs/reference/
└── blockchain/         ──►   pi-docs-cn/src/content/docs/blockchain/
    ├── solana/
    ├── sui/
    └── 03-dagent/      ← dAgent X Layer 项目（完整包含）
        ├── 02-hackathon/
        ├── 03-architecture/
        ├── 04-business/
        └── 05-analysis/
```

## 同步规则

1. **自动同步**: 每天凌晨 2 点（UTC）
2. **手动触发**: GitHub Actions 页面
3. **转换规则**:
   - `.md` → `.mdx`
   - 添加 YAML frontmatter
   - 转换相对链接
   - 保留目录结构

## 网站导航

```
pi-docs-cn.vercel.app/
│
├── /                          # 首页
├── /guide/                    # 使用指南
├── /patterns/                 # 设计模式
├── /cookbook/                 # 代码食谱
├── /platform/                 # 平台配置
├── /reference/                # 技术参考
└── /blockchain/               # 区块链专题
    ├── /blockchain/solana/    # Solana
    ├── /blockchain/sui/       # Sui
    └── /blockchain/03-dagent/ # dAgent X Layer
```
