# 快速开始

## 方案一：直接使用（推荐）

### 1. 创建 GitHub 仓库

```bash
# 在 GitHub 创建新仓库: DaviRain-Su/pi-docs-cn
```

### 2. 推送代码

```bash
cd /tmp/dagent-docs

git init
git add .
git commit -m "Initial commit: pi 中文文档网站"
git branch -M main
git remote add origin https://github.com/DaviRain-Su/pi-docs-cn.git
git push -u origin main
```

### 3. 部署到 Vercel

点击按钮一键部署：

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/DaviRain-Su/pi-docs-cn)

或手动：
1. 登录 [Vercel](https://vercel.com)
2. Import Git Repository
3. 选择 `pi-docs-cn`
4. 框架预设：**Astro**
5. Deploy

### 4. 配置自动同步

在 GitHub 仓库设置中添加 Secrets：
- 无需额外配置，GitHub Actions 会自动使用默认 Token

完成！网站将在每次 pi-mono 更新后自动同步并部署。

---

## 方案二：本地开发

### 前提条件

- Node.js 20+
- pi-mono 仓库本地副本

### 步骤

```bash
# 1. 克隆文档网站仓库
git clone https://github.com/DaviRain-Su/pi-docs-cn.git
cd pi-docs-cn

# 2. 安装依赖
npm install

# 3. 同步文档（需要 pi-mono 路径）
npm run sync /path/to/pi-mono

# 4. 启动开发服务器
npm run dev

# 5. 访问 http://localhost:4321
```

---

## 方案三：使用脚本快速设置

```bash
# 下载并运行设置脚本
curl -sSL https://raw.githubusercontent.com/DaviRain-Su/pi-docs-cn/main/scripts/setup.sh | bash -s /path/to/pi-mono
```

---

## 验证同步

### 检查同步状态

访问 GitHub Actions 页面查看同步记录：
```
https://github.com/DaviRain-Su/pi-docs-cn/actions
```

### 手动触发同步

1. 进入 Actions 页面
2. 选择 "Sync Docs from pi-mono"
3. 点击 "Run workflow"

---

## 常见问题

### Q: 文档没有自动同步？

A: 检查以下几点：
1. GitHub Actions 是否启用（Settings → Actions → General）
2. Workflow 权限是否正确（需要 Read and write permissions）
3. pi-mono 是否有新的提交

### Q: 如何立即看到更新？

A: 两种方法：
1. 本地运行 `npm run sync /path/to/pi-mono`
2. GitHub Actions 页面手动触发 "Sync Docs"

### Q: 可以修改文档网站样式吗？

A: 可以！修改以下文件：
- `src/styles/custom.css` - 自定义样式
- `astro.config.mjs` - 网站配置
- `src/content/docs/index.mdx` - 首页内容

注意：文档内容（guide/, reference/ 等）应该去 pi-mono 修改。

### Q: dAgent 文档在哪里？

A: 区块链专题下：
```
/blockchain/03-dagent/
├── 02-hackathon/     # 黑客松参赛
├── 03-architecture/  # 架构设计
├── 04-business/      # 商业规划
└── 05-analysis/      # 对比分析
```

---

## 文档统计

同步完成后，网站将包含：

| 分类 | 估计文档数 |
|------|-----------|
| 使用指南 | ~15 |
| 设计模式 | ~1 |
| 代码食谱 | ~1 |
| 平台配置 | ~4 |
| 技术参考 | ~20 |
| 区块链专题 | ~30 |
| **dAgent X Layer** | **12** |
| **总计** | **~80+** |

---

## 下一步

1. ✅ 创建 GitHub 仓库
2. ✅ 推送代码
3. ✅ 部署到 Vercel
4. ✅ 验证自动同步
5. 🎉 分享文档网站链接！

---

*遇到问题？在 [pi-mono Issues](https://github.com/DaviRain-Su/pi-mono/issues) 提问*
