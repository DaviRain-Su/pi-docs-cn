import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'pi 中文文档',
  description: 'pi 中文开发指南',
  lang: 'zh-CN',

  // 上游文档里仍有部分历史兼容链接（examples/*）在当前同步范围中不可达，先按路径忽略这类链接。
  // 其它链接保持严格检查，后续逐步消除。
  ignoreDeadLinks: [/^\.\/\.\.\/\.\.\/examples\/extensions\//],

  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: 'Guide', link: '/guide/01-what-is-pi' },
      { text: 'Cookbook', link: '/cookbook/11-cookbook' },
      { text: 'Patterns', link: '/patterns/10-patterns' },
      { text: 'Platform', link: '/platform/terminal-setup' },
      { text: '参考文档', link: '/reference/architecture-overview' },
      { text: '区块链专题', link: '/blockchain/README' },
      { text: 'dAgent X Layer', link: '/dagent/' },
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
            { text: 'Demo 准备', link: '/dagent/24-slock-dagent-strategy' },
            { text: '多链架构', link: '/dagent/25-dagent-multi-chain' },
            { text: 'ERC-8004', link: '/dagent/26-dagent-erc8004-agents' },
            { text: 'Worker 部署', link: '/dagent/35-dagent-worker-deployment' },
            { text: '计算平台', link: '/dagent/36-decentralized-compute' },
            { text: '商业计划', link: '/dagent/27-dagent-business-plan' },
            { text: '竞品分析', link: '/dagent/30-slock-analysis' },
            { text: '部署对比', link: '/dagent/34-cloudflare-vs-decentralized' },
          ],
        },
      ],

      '/guide/': [
        {
          text: 'pi 使用指南',
          items: [
            { text: '01 是什么', link: '/guide/01-what-is-pi' },
            { text: '02 架构故事', link: '/guide/02-architecture-story' },
            { text: '03 第一小时', link: '/guide/03-first-hour' },
            { text: '04 快速入门命令', link: '/guide/04-commands' },
            { text: '05 会话与会话管理', link: '/guide/05-sessions' },
            { text: '06 技能系统', link: '/guide/06-skills' },
            { text: '07 健康使用', link: '/guide/07-healthy-usage' },
            { text: '08 第一个扩展', link: '/guide/08-first-extension' },
            { text: '09 扩展 API', link: '/guide/09-extension-api' },
            { text: '10 提示词模板', link: '/guide/10-prompt-templates' },
            { text: '11 开发规范', link: '/guide/11-development' },
            { text: '12 故障排查', link: '/guide/12-troubleshooting' },
            { text: '15 设计决策', link: '/guide/15-design-decisions' },
            { text: '20 黑客松获奖策略', link: '/guide/20-hackathon-winning-strategy' },
          ],
        },
      ],

      '/cookbook/': [
        {
          text: 'Cookbook',
          items: [{ text: '实战手册', link: '/cookbook/11-cookbook' }],
        },
      ],

      '/patterns/': [
        {
          text: 'Patterns',
          items: [{ text: '模式与实践', link: '/patterns/10-patterns' }],
        },
      ],

      '/platform/': [
        {
          text: '平台与环境',
          items: [
            { text: '终端环境配置', link: '/platform/terminal-setup' },
            { text: 'Termux', link: '/platform/termux' },
            { text: 'tmux', link: '/platform/tmux' },
            { text: 'Windows', link: '/platform/windows' },
          ],
        },
      ],

      '/reference/compute/': [
        {
          text: '计算专题',
          items: [
            { text: '37 去中心化计算全景', link: '/reference/compute/37-comprehensive-decentralized-compute-landscape' },
            { text: '34 Cloudflare 与去中心化 Worker 对比', link: '/reference/compute/34-cloudflare-worker-vs-decentralized' },
            { text: '35 去中心化 Worker 部署指南', link: '/reference/compute/35-decentralized-worker-deployment-guide' },
            { text: '36 去中心化计算平台分析', link: '/reference/compute/36-decentralized-compute-platforms-analysis' },
          ],
        },
      ],

      '/reference/zig/': [
        {
          text: 'Zig / 多 Agent 方向',
          items: [
            { text: '26 pi-mono Zig 愿景', link: '/reference/zig/26-pi-mono-zig-vision' },
            { text: '27 Zig 深入技术', link: '/reference/zig/27-zig-pi-technical-deep-dive' },
            { text: '28 pi-mono 多 Agent 架构', link: '/reference/zig/28-pi-mono-multi-agent-architecture' },
            { text: '29 Zig SDK 系统层分析', link: '/reference/zig/29-zig-sdk-system-layer-analysis' },
            { text: '30 Slock.ai 分析', link: '/reference/zig/30-slock-ai-analysis' },
          ],
        },
      ],

      '/reference/': [
        {
          text: '技术参考',
          items: [
            { text: '架构概览', link: '/reference/architecture-overview' },
            { text: '源码架构', link: '/reference/12-source-architecture' },
            { text: '模型系统', link: '/reference/13-model-system' },
            { text: '深度架构', link: '/reference/deep-dive-architecture' },
            { text: 'JSON 模式', link: '/reference/json-mode' },
            { text: '模型提供方架构', link: '/reference/model-provider-architecture' },
            { text: '模型配置', link: '/reference/models' },
            { text: 'Provider 生态', link: '/reference/providers' },
            { text: '自定义 Provider', link: '/reference/custom-provider' },
            { text: 'RPC 与嵌入', link: '/reference/rpc' },
            { text: '嵌入与 RPC', link: '/reference/embedding-and-rpc' },
            { text: 'Embedding', link: '/reference/14-embedding' },
            { text: '压缩策略', link: '/reference/compaction' },
            { text: '设置', link: '/reference/settings' },
            { text: 'Shell 别名', link: '/reference/shell-aliases' },
            { text: '主题', link: '/reference/themes' },
            { text: '树结构', link: '/reference/tree' },
            { text: '扩展与 SDK', link: '/reference/extensions-and-sdks' },
            { text: '扩展开发', link: '/reference/extensions' },
            { text: 'TUI', link: '/reference/tui' },
            { text: 'Keybindings', link: '/reference/keybindings' },
            { text: 'Packages', link: '/reference/packages' },
          ],
        },
        {
          text: '对比与生态',
          items: [
            { text: 'BUB 对比', link: '/reference/comparison-bub' },
            { text: 'Claude Code 对比', link: '/reference/comparison-claude-code' },
            { text: 'OpenCode 对比', link: '/reference/comparison-opencode' },
            { text: 'Zig 生态分析', link: '/reference/zig-ecosystem-analysis' },
            { text: '计算专题导航', link: '/reference/compute/README' },
            { text: 'Zig 专题导航', link: '/reference/zig/README' },
          ],
        },
      ],

      '/blockchain/': [
        {
          text: '区块链专题',
          items: [
            { text: '专题总览', link: '/blockchain/README' },
            { text: '00 总览', link: '/blockchain/00-overview' },
            { text: '01 路线图', link: '/blockchain/01-roadmap' },
            { text: '02 任务模型（Solana + Sui）', link: '/blockchain/02-task-models-solana-sui' },
            { text: '03 LLM 支付层', link: '/blockchain/03-llm-payment-layer' },
            { text: '04 任务执行流程', link: '/blockchain/04-task-execution-flow' },
            { text: '05 可验证工件', link: '/blockchain/05-verifiable-artifacts' },
            { text: '06 政策与风控', link: '/blockchain/06-policy-and-guardrails' },
            { text: '07 TEE 与去中心化计算', link: '/blockchain/07-tee-and-decentralized-compute' },
            { text: '08 可验证收据与证明', link: '/blockchain/08-verifiable-receipts-and-attestation' },
            { text: 'Solana 专题', link: '/blockchain/solana/README' },
            { text: 'Sui 专题', link: '/blockchain/sui/README' },
            { text: 'dAgent 专题', link: '/blockchain/03-dagent/README' },
            { text: 'DASN 专题', link: '/blockchain/dasn/README' },
          ],
        },
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/DaviRain-Su/pi-mono' }
    ],
  },
})
