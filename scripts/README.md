# Scripts

存放项目相关的自动化脚本。

## verify-plans.js

用 Playwright 逐一访问 `src/data/plans.ts` 中配置的所有 Coding Plan 官网，验证页面是否可正常打开，并尝试抓取关键信息（标题、价格关键词等）。

### 运行方式

```bash
cd llm-coding-plans/scripts
npm install
npx playwright install chromium
node verify-plans.js
```

### 输出说明

| 状态 | 含义 |
|------|------|
| ✅ OK | 页面正常打开，且命中至少一个关键词 |
| ⚠️ WARN | 页面可访问，但未找到关键词（可能需要登录或页面结构变化） |
| ❌ FAIL | 页面无法访问（超时、HTTP 4xx/5xx 等） |

WARN 条目不影响退出码，FAIL 条目会使脚本以退出码 1 结束。
