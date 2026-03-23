# 去中心化 Worker 部署指南

> 从单机测试到多节点执行网络的阶段化落地手册（面向 `pi-worker`）

---

## 1. 总体策略

建议采用 `4 阶段` 推进，避免一开始就承担过高运维成本：

1. **本地可复现**：在单机环境跑通 `任务接入 -> 执行 -> 上报 -> 回执`
2. **单区域测试网**：用一组固定节点验证结算和争议链路
3. **多可用区网络**：加入跨区域节点和监控，验证故障切换
4. **生产化调度**：引入自动扩缩、信誉分与质押回收机制

---

## 2. 阶段一：本地基线

### 目标
- 建立统一任务规范（输入、超时、失败码、重试策略）
- 输出具备“可重放”字段（taskId、inputHash、envHash）

### 关键检查项
- [ ] 任务格式化（JSON Schema）
- [ ] 失败重试退避策略
- [ ] 输出结果签名（至少任务 ID + 执行时间 + 校验码）
- [ ] 本地日志结构化（JSON，含 requestId）

### 产出
- 一条 `Task → Worker → Result` 的可追踪链路

---

## 3. 阶段二：测试网联调

### 节点最小集合
- 1 个调度节点
- 2~3 个执行节点（至少 1 个容灾）
- 1 个结果验证或仲裁观察节点（可人工兜底）

### 配置建议
- 执行超时：`Task TTL` + `Execution TTL`
- 重试策略：失败自动重试 1~2 次，超时后进入仲裁队列
- 结果上报：`status`, `stdout/stderr`, `latency`, `resultHash`

### 验收标准
- 连续 100 个任务，成功率 > 97%
- 超时任务可在 2 分钟内复核并重派

---

## 4. 阶段三：多区域生产演练

### 目标
- 验证去中心化路由与网络抖动条件下的稳定性

### 重点动作
- 采用区域标签（zone）路由：按任务特征选择最近可执行节点
- 每 24h 执行一次节点健康巡检（资源/延迟/错误率）
- 引入熔断：连续失效节点自动降权

### 监控指标
- p95 延迟、任务失败率、仲裁率、重试率
- 节点在线率、签名一致率、超时分布

---

## 5. 阶段四：生产化治理

### 必要机制
- 节点入场白名单 + 信誉基线
- 质押/惩罚策略（可先模拟，后接链上治理）
- 异常告警与人工处置 SOP（3 分钟内人工接手）
- `结果异议` 标准流程（证据格式固定）

### 建议上线节奏
- 先上 `核心链路`（高价值任务）再上非核心链路
- 并行保留 `Cloudflare Worker` 兜底，逐步提高去中心化占比

---

## 6. 自动化检查清单

```bash
# 任务生命周期自检脚本思路
- 检查任务定义字段完整性
- 检查执行结果 hash 与 payload 是否一致
- 检查签名是否在有效期内
- 检查重放攻击防护字段
```

你可按以下结构落到 CI：

```ts
interface WorkerSmokeCheck {
  taskId: string;
  startedAt: string;
  finishedAt: string;
  status: 'ok' | 'error';
  resultHash: string;
  signature: string;
}
```

---

## 7. 与其他文档联动

- 先看 [Cloudflare vs 去中心化对比](/reference/compute/34-cloudflare-worker-vs-decentralized)
- 再看 [去中心化计算平台分析](/reference/compute/36-decentralized-compute-platforms-analysis)
- 结合 [DASN 经济模型](/blockchain/dasn/32-dagent-hub-economic-and-worker-model)
