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
                {
                  label: '🏆 黑客松参赛',
                  collapsed: true,
                  autogenerate: { directory: 'blockchain/03-dagent/02-hackathon' },
                },
                {
                  label: '👨‍💻 架构设计',
                  collapsed: true,
                  autogenerate: { directory: 'blockchain/03-dagent/03-architecture' },
                },
                {
                  label: '💼 商业规划',
                  collapsed: true,
                  autogenerate: { directory: 'blockchain/03-dagent/04-business' },
                },
                {
                  label: '📊 对比分析',
                  collapsed: true,
                  autogenerate: { directory: 'blockchain/03-dagent/05-analysis' },
                },
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
