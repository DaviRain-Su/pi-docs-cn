import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "pi 中文文档",
  description: "pi 中文开发指南",
  lang: 'zh-CN',

  // 上游文档里仍有部分历史兼容链接（examples/*）在当前同步范围中不可达，先按路径忽略这类链接。
  // 其它链接保持严格检查，后续可逐步消除。
  ignoreDeadLinks: [/^\.\/\.\.\/\.\.\/\.\.\/examples\/extensions\//],

  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: 'pi 文档', link: '/guide/01-what-is-pi' },
      { text: '区块链专题', link: '/blockchain/README' },
      { text: 'dAgent X Layer', link: '/dagent/' }
    ],

    sidebar: {
      '/dagent/': [
        {
          text: 'dAgent X Layer',
          items: [
            { text: '项目导航', link: '/dagent/' },
            { text: '获奖策略', link: '/dagent/20-dagent-hackathon-strategy' },
            { text: '比赛分析', link: '/dagent/21-dagent-xlayer-hackathon' },
            { text: '深度解析', link: '/dagent/22-dagent-xlayer-deep-dive' },
            { text: '执行计划', link: '/dagent/23-dagent-execution-plan' },
            { text: 'Demo准备', link: '/dagent/24-slock-dagent-strategy' },
            { text: '多链架构', link: '/dagent/25-dagent-multi-chain' },
            { text: 'ERC-8004', link: '/dagent/26-dagent-erc8004-agents' },
            { text: 'Worker部署', link: '/dagent/35-dagent-worker-deployment' },
            { text: '计算平台', link: '/dagent/36-decentralized-compute' },
            { text: '商业计划', link: '/dagent/27-dagent-business-plan' },
            { text: '竞品分析', link: '/dagent/30-slock-analysis' },
            { text: '部署对比', link: '/dagent/34-cloudflare-vs-decentralized' },
          ]
        }
      ],
      '/guide/': [
        {
          text: 'pi 使用指南',
          items: [
            { text: '是什么', link: '/guide/01-what-is-pi' },
            { text: '架构故事', link: '/guide/02-architecture-story' },
            { text: '第一小时', link: '/guide/03-first-hour' },
            { text: '快速入门命令', link: '/guide/04-commands' },
            { text: '会话与会话管理', link: '/guide/05-sessions' },
            { text: '故障排查', link: '/guide/12-troubleshooting' }
          ]
        }
      ],
      '/reference/': [
        {
          text: '技术参考',
          items: [
            { text: '架构概览', link: '/reference/architecture-overview' },
            { text: '源码架构', link: '/reference/12-source-architecture' },
            { text: '模型系统', link: '/reference/13-model-system' },
            { text: '扩展开发', link: '/reference/extensions' },
          ]
        }
      ],
      '/blockchain/': [
        {
          text: '区块链专题',
          items: [
            { text: '专题总览', link: '/blockchain/00-overview' },
            { text: 'Solana 专题', link: '/blockchain/solana/README' },
            { text: 'Sui 专题', link: '/blockchain/sui/README' },
            { text: 'dAgent 专题', link: '/blockchain/03-dagent/README' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/DaviRain-Su/pi-mono' }
    ]
  }
})
