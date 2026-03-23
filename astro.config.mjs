// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
  site: 'https://pi-docs-cn.vercel.app',
  integrations: [
    starlight({
      title: 'pi 中文文档',
      description: 'pi 中文开发指南 - 从入门到精通，从使用到二次开发',
      logo: {
        src: './src/assets/logo.svg',
      },
      social: {
        github: 'https://github.com/DaviRain-Su/pi-mono',
      },
      sidebar: [
        {
          label: '开始',
          items: [
            { label: '概览', link: '/' },
          ],
        },
        {
          label: '⛓️ 区块链专题',
          collapsed: false,
          items: [
            {
              label: '🎯 dAgent X Layer',
              collapsed: false,
              items: [
                { label: '项目导航', link: '/blockchain/03-dagent/' },
                { label: '🏆 获奖策略', link: '/blockchain/03-dagent/02-hackathon/20-dagent-hackathon-strategy/' },
                { label: '📋 比赛分析', link: '/blockchain/03-dagent/02-hackathon/21-dagent-xlayer-hackathon/' },
                { label: '🔍 深度解析', link: '/blockchain/03-dagent/02-hackathon/22-dagent-xlayer-deep-dive/' },
                { label: '📅 执行计划', link: '/blockchain/03-dagent/02-hackathon/23-dagent-execution-plan/' },
                { label: '🎬 Demo准备', link: '/blockchain/03-dagent/02-hackathon/24-slock-dagent-strategy/' },
                { label: '🏗️ 多链架构', link: '/blockchain/03-dagent/03-architecture/25-dagent-multi-chain/' },
                { label: '📜 ERC-8004', link: '/blockchain/03-dagent/03-architecture/26-dagent-erc8004-agents/' },
                { label: '⚙️ Worker部署', link: '/blockchain/03-dagent/03-architecture/35-dagent-worker-deployment/' },
                { label: '☁️ 计算平台', link: '/blockchain/03-dagent/03-architecture/36-decentralized-compute/' },
                { label: '💼 商业计划', link: '/blockchain/03-dagent/04-business/27-dagent-business-plan/' },
                { label: '📊 竞品分析', link: '/blockchain/03-dagent/05-analysis/30-slock-analysis/' },
                { label: '⚖️ 部署对比', link: '/blockchain/03-dagent/05-analysis/34-cloudflare-vs-decentralized/' },
              ],
            },
          ],
        },
      ],
      lastUpdated: true,
      pagination: true,
      defaultLocale: 'zh',
      locales: {
        zh: {
          label: '简体中文',
          lang: 'zh-CN',
        },
      },
      customCss: ['./src/styles/custom.css'],
    }),
  ],
});
