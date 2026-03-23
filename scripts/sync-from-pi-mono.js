#!/usr/bin/env node
/**
 * 从 pi-mono 仓库同步完整中文文档
 * 
 * 使用方法:
 *   node scripts/sync-from-pi-mono.js [pi-mono-path]
 * 
 * 参数:
 *   pi-mono-path - pi-mono 仓库的本地路径 (默认: ../../pi-mono)
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 配置：所有需要同步的目录
const CONFIG = {
  sourceBase: process.argv[2] || '../../pi-mono',
  sourceDir: 'packages/coding-agent/docs/zh',
  
  // 完整的目录映射
  mappings: [
    // Guide - 使用指南
    {
      from: 'guide',
      to: 'src/content/docs/guide',
      title: '使用指南',
      sidebar: 'guide'
    },
    // Patterns - 设计模式
    {
      from: 'patterns',
      to: 'src/content/docs/patterns',
      title: '设计模式',
      sidebar: 'patterns'
    },
    // Cookbook - 代码食谱
    {
      from: 'cookbook',
      to: 'src/content/docs/cookbook',
      title: '代码食谱',
      sidebar: 'cookbook'
    },
    // Platform - 平台配置
    {
      from: 'platform',
      to: 'src/content/docs/platform',
      title: '平台配置',
      sidebar: 'platform'
    },
    // Reference - 技术参考
    {
      from: 'reference',
      to: 'src/content/docs/reference',
      title: '技术参考',
      sidebar: 'reference'
    },
    // Blockchain - 区块链专题
    {
      from: 'blockchain',
      to: 'src/content/docs/blockchain',
      title: '区块链专题',
      sidebar: 'blockchain'
    }
  ]
};

// 转换 Markdown 内容以适应 Starlight
function transformContent(content, filename) {
  // 提取一级标题作为页面标题
  const titleMatch = content.match(/^#\s+(.+)$/m);
  const title = titleMatch ? titleMatch[1] : filename;
  
  // 添加 frontmatter
  const frontmatter = `---
title: ${title}
---

`;
  
  // 转换图片路径
  let transformed = content.replace(
    /!\[([^\]]*)\]\(([^)]+)\)/g,
    (match, alt, src) => {
      if (src.startsWith('http') || src.startsWith('/')) {
        return match;
      }
      return `![${alt}](/images/${path.basename(src)})`;
    }
  );
  
  // 转换内部链接 .md -> /
  transformed = transformed.replace(
    /\[([^\]]+)\]\(\.\/([^)]+)\.md\)/g,
    (match, text, link) => {
      return `[${text}](${link}/)`;
    }
  );
  
  // 转换相对目录链接 ../guide/01-xxx.md -> /guide/01-xxx/
  transformed = transformed.replace(
    /\[([^\]]+)\]\(\.\.\/([^/]+)\/([^)]+)\.md\)/g,
    (match, text, dir, link) => {
      return `[${text}](/${dir}/${link}/)`;
    }
  );
  
  return frontmatter + transformed;
}

// 同步单个文件
async function syncFile(sourceFile, targetDir, mapping) {
  const filename = path.basename(sourceFile);
  const targetFile = path.join(targetDir, filename.replace('.md', '.mdx'));
  
  const content = await fs.readFile(sourceFile, 'utf-8');
  const transformed = transformContent(content, filename);
  
  await fs.writeFile(targetFile, transformed, 'utf-8');
  console.log(`  ✓ ${filename}`);
}

// 递归同步目录
async function syncDirectory(sourceDir, targetDir, mapping) {
  await fs.mkdir(targetDir, { recursive: true });
  
  const entries = await fs.readdir(sourceDir, { withFileTypes: true });
  
  for (const entry of entries) {
    const sourcePath = path.join(sourceDir, entry.name);
    const targetPath = path.join(targetDir, entry.name);
    
    if (entry.isDirectory()) {
      // 递归处理子目录
      await syncDirectory(sourcePath, targetPath, mapping);
    } else if (entry.name.endsWith('.md')) {
      // 处理 Markdown 文件
      await syncFile(sourcePath, targetDir, mapping);
    }
  }
}

// 同步单个映射
async function syncMapping(mapping) {
  const sourcePath = path.resolve(CONFIG.sourceBase, CONFIG.sourceDir, mapping.from);
  const targetPath = path.resolve(__dirname, '..', mapping.to);
  
  console.log(`📁 同步: ${mapping.from}/ → ${mapping.to}/`);
  
  try {
    await fs.access(sourcePath);
  } catch {
    console.log(`  ⚠️  源目录不存在: ${sourcePath}`);
    return 0;
  }
  
  await syncDirectory(sourcePath, targetPath, mapping);
  console.log(`  ✅ 完成: ${mapping.from}/`);
  return 1;
}

// 创建首页
async function createHomepage() {
  const indexPath = path.resolve(__dirname, '..', 'src/content/docs/index.mdx');
  
  const content = `---
title: pi 中文文档
description: pi 中文开发指南 - 从入门到精通，从使用到二次开发
---

import { Card, CardGrid } from '@astrojs/starlight/components';

# pi 中文文档

> 一本关于 pi 的完整技术书籍：从入门到精通，从使用到二次开发。

---

## 30秒了解 pi

**一句话**：极简核心（4个工具）+ 无限扩展（Agent 自写代码）的 AI 编程助手。

<CardGrid stagger>
  <Card title="🎯 极简核心" icon="seti:shell">
    只有 4 个基础工具：Read/Write/Edit/Bash
  </Card>
  <Card title="🔧 无限扩展" icon="seti:folder">
    Agent 可以编写、测试、迭代自己的扩展
  </Card>
  <Card title="🌳 会话树" icon="seti:tree">
    会话树可控、可回溯，不是黑盒运行
  </Card>
  <Card title="⚡ 热重载" icon="seti:bolt">
    /reload 立即生效，无需重启
  </Card>
</CardGrid>

---

## 📚 文档导航

### 🚀 快速入门
- [pi 是什么](/guide/01-what-is-pi/)
- [架构故事](/guide/02-architecture-story/)
- [第一个小时](/guide/03-first-hour/)

### 🛠️ 扩展开发
- [你的第一个扩展](/guide/08-first-extension/)
- [扩展 API 详解](/guide/09-extension-api/)
- [实战模式](/patterns/10-patterns/)

### ⛓️ 区块链专题
- [专题总览](/blockchain/00-overview/)
- [Solana 专题](/blockchain/solana/)
- [Sui 专题](/blockchain/sui/)
- [dAgent X Layer 项目](/blockchain/03-dagent/)

### 📖 技术参考
- [架构概览](/reference/architecture-overview/)
- [模型系统](/reference/13-model-system/)
- [扩展开发指南](/reference/extensions/)

---

## 🎯 dAgent X Layer 项目

**基于 ERC-8004 标准的多链 AI Agent 市场**

<Card title="🏆 X Layer 黑客松" icon="seti:trophy">
  - [比赛分析](/blockchain/03-dagent/02-hackathon/21-dagent-xlayer-hackathon/)
  - [执行计划](/blockchain/03-dagent/02-hackathon/23-dagent-execution-plan/)
  - [商业计划书](/blockchain/03-dagent/04-business/27-dagent-business-plan/)
</Card>

---

*最后更新：2026年3月23日*
`;

  await fs.writeFile(indexPath, content, 'utf-8');
  console.log('  ✓ 创建首页');
}

// 主函数
async function main() {
  console.log('🚀 开始同步 pi 中文文档...\n');
  
  const startTime = Date.now();
  let syncedCount = 0;
  
  // 同步每个映射
  for (const mapping of CONFIG.mappings) {
    const result = await syncMapping(mapping);
    syncedCount += result;
    console.log('');
  }
  
  // 创建首页
  console.log('📄 创建首页...');
  await createHomepage();
  
  const duration = ((Date.now() - startTime) / 1000).toFixed(2);
  console.log(`\n✅ 同步完成！耗时 ${duration}s`);
  console.log(`📊 共同步 ${syncedCount} 个目录`);
  console.log('\n提示: 运行 npm run dev 预览文档网站');
}

main().catch(err => {
  console.error('❌ 同步失败:', err.message);
  process.exit(1);
});
