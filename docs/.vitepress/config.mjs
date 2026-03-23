import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "pi 中文文档",
  description: "pi 中文开发指南",
  lang: 'zh-CN',
  
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
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
      ]
    },
    
    socialLinks: [
      { icon: 'github', link: 'https://github.com/DaviRain-Su/pi-mono' }
    ]
  }
})
