/**
 * verify-plans.js
 *
 * 用 Playwright 逐一访问 plans.ts 中配置的所有 Coding Plan 官网，
 * 验证页面是否可正常打开，并尝试抓取关键信息（标题、价格关键词等）。
 * 抓取不到的条目会标记为 WARN，不会中断整体流程。
 *
 * 运行方式：
 *   cd llm-coding-plans/scripts
 *   npm install
 *   npx playwright install chromium
 *   node verify-plans.js
 */

const { chromium } = require('playwright');

// ── 从 plans.ts 提取的数据（保持与源文件同步） ──────────────────────────────
const plans = [
  // 模型厂商直营
  {
    id: 'glm-coding',
    name: 'GLM Coding Plan (国内)',
    company: '智谱 AI',
    website: 'https://bigmodel.cn/glm-coding',
    startingPrice: '¥49/月',
    keywords: ['49', 'coding', 'GLM', '智谱'],
  },
  {
    id: 'glm-coding-intl',
    name: 'GLM Coding Plan (国际)',
    company: '智谱 AI (Z.ai)',
    website: 'https://z.ai/subscribe',
    startingPrice: '$18/月',
    keywords: ['18', 'coding', 'GLM', 'subscribe'],
  },
  {
    id: 'kimi-code',
    name: 'Kimi Code',
    company: '月之暗面 (Moonshot AI)',
    website: 'https://www.kimi.com/code',
    startingPrice: '¥49/月',
    keywords: ['49', 'Kimi', 'code', 'Andante'],
  },
  {
    id: 'minimax-token',
    name: 'MiniMax Token Plan',
    company: 'MiniMax (稀宇科技)',
    website: 'https://platform.minimaxi.com/subscribe/token-plan',
    startingPrice: '¥29/月',
    keywords: ['29', 'MiniMax', 'token', 'Starter'],
  },
  {
    id: 'stepfun-coding',
    name: 'StepFun Coding Plan',
    company: '阶跃星辰',
    website: 'https://platform.stepfun.com/step-plan',
    startingPrice: '¥49/月',
    keywords: ['49', 'step', 'Flash', 'coding'],
  },
  {
    id: 'xiaomi-mimo',
    name: 'MiMo Token Plan',
    company: '小米',
    website: 'https://mimo.mi.com/',
    startingPrice: '¥34.32/月',
    keywords: ['MiMo', '小米', 'Credits', 'Lite'],
  },
  // 云平台转售
  {
    id: 'volcengine-coding',
    name: '方舟 Coding Plan',
    company: '字节跳动 (火山引擎)',
    website: 'https://www.volcengine.com/activity/codingplan',
    startingPrice: '¥40/月',
    keywords: ['40', '方舟', 'coding', 'Lite'],
  },
  {
    id: 'alibaba-coding',
    name: '百炼 Coding Plan',
    company: '阿里巴巴 (阿里云)',
    website: 'https://www.aliyun.com/benefit/ai/discount',
    startingPrice: '¥198/席/月',
    keywords: ['198', '百炼', 'coding', '阿里'],
  },
  {
    id: 'tencent-coding',
    name: '腾讯云 Coding Plan',
    company: '腾讯云',
    website: 'https://buy.cloud.tencent.com/hunyuan',
    startingPrice: '¥40/月',
    keywords: ['40', '腾讯', 'coding', 'Lite'],
  },
  {
    id: 'baidu-qianfan',
    name: '千帆 Coding Plan',
    company: '百度智能云',
    website: 'https://cloud.baidu.com/product/codingplan',
    startingPrice: '¥40/月',
    keywords: ['40', '千帆', 'coding', 'Lite'],
  },
  {
    id: 'jd-coding',
    name: '京东云 Coding Plan',
    company: '京东云',
    website: 'https://www.jdcloud.com/cn/pages/codingplan',
    startingPrice: '¥19.9/月',
    keywords: ['19', '京东', 'coding', 'Lite'],
  },
  {
    id: 'iflytek-coding',
    name: '讯飞星辰 Coding Plan',
    company: '科大讯飞',
    website: 'https://maas.xfyun.cn/packageSubscription',
    startingPrice: '¥3.90/月',
    keywords: ['3.9', '讯飞', 'coding', '无忧'],
  },
  {
    id: 'infini-coding',
    name: 'Infini Coding Plan',
    company: '无问芯穹',
    website: 'https://cloud.infini-ai.com/platform/ai',
    startingPrice: '¥40/月',
    keywords: ['40', 'Infini', 'coding', 'Lite'],
  },
  {
    id: 'ctcloud-coding',
    name: '天翼云 GLM Coding Plan',
    company: '中国电信 (天翼云)',
    website: 'https://www.ctyun.cn/act/OpenClaw',
    startingPrice: '¥49/月',
    keywords: ['49', '天翼', 'GLM', 'coding'],
  },
];

// ── 工具函数 ─────────────────────────────────────────────────────────────────

/** 在页面文本中查找关键词，返回命中列表 */
function findKeywords(text, keywords) {
  const lower = text.toLowerCase();
  return keywords.filter((kw) => lower.includes(kw.toLowerCase()));
}

/** 格式化状态标签 */
function tag(status) {
  const map = { OK: '✅ OK  ', WARN: '⚠️  WARN', FAIL: '❌ FAIL' };
  return map[status] || status;
}

// ── 主流程 ───────────────────────────────────────────────────────────────────

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent:
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
    locale: 'zh-CN',
    timezoneId: 'Asia/Shanghai',
  });

  const results = [];

  console.log(`\n${'='.repeat(70)}`);
  console.log('  LLM Coding Plans — 官网验证报告');
  console.log(`${'='.repeat(70)}\n`);

  for (const plan of plans) {
    const page = await context.newPage();
    let status = 'FAIL';
    let pageTitle = '';
    let hitKeywords = [];
    let errorMsg = '';

    try {
      const response = await page.goto(plan.website, {
        waitUntil: 'domcontentloaded',
        timeout: 20000,
      });

      const httpStatus = response ? response.status() : 0;
      pageTitle = await page.title();

      // 获取页面可见文本
      const bodyText = await page.evaluate(() => document.body?.innerText ?? '');
      hitKeywords = findKeywords(bodyText + ' ' + pageTitle, plan.keywords);

      if (httpStatus >= 400) {
        status = 'FAIL';
        errorMsg = `HTTP ${httpStatus}`;
      } else if (hitKeywords.length === 0) {
        status = 'WARN';
        errorMsg = '页面已打开但未找到任何关键词（可能需要登录或页面结构变化）';
      } else {
        status = 'OK';
      }
    } catch (err) {
      status = 'FAIL';
      errorMsg = err.message.split('\n')[0].slice(0, 120);
    } finally {
      await page.close();
    }

    results.push({ plan, status, pageTitle, hitKeywords, errorMsg });

    // 实时输出
    const hitStr = hitKeywords.length ? `命中关键词: [${hitKeywords.join(', ')}]` : '无命中关键词';
    console.log(`${tag(status)}  ${plan.id}`);
    console.log(`       公司: ${plan.company}`);
    console.log(`       网址: ${plan.website}`);
    console.log(`       标题: ${pageTitle || '(无法获取)'}`);
    console.log(`       ${hitStr}`);
    if (errorMsg) console.log(`       备注: ${errorMsg}`);
    console.log();
  }

  await browser.close();

  // ── 汇总 ──────────────────────────────────────────────────────────────────
  const ok = results.filter((r) => r.status === 'OK').length;
  const warn = results.filter((r) => r.status === 'WARN').length;
  const fail = results.filter((r) => r.status === 'FAIL').length;

  console.log(`${'─'.repeat(70)}`);
  console.log(`  汇总: 共 ${results.length} 个 Plan`);
  console.log(`  ✅ OK: ${ok}   ⚠️  WARN: ${warn}   ❌ FAIL: ${fail}`);
  console.log(`${'─'.repeat(70)}\n`);

  if (warn > 0) {
    console.log('⚠️  WARN 条目（页面可访问但关键词未命中，可能需要人工核查）:');
    results
      .filter((r) => r.status === 'WARN')
      .forEach((r) => console.log(`   - ${r.plan.id}: ${r.plan.website}`));
    console.log();
  }

  if (fail > 0) {
    console.log('❌ FAIL 条目（页面无法访问）:');
    results
      .filter((r) => r.status === 'FAIL')
      .forEach((r) => console.log(`   - ${r.plan.id}: ${r.errorMsg}`));
    console.log();
  }

  process.exit(fail > 0 ? 1 : 0);
})();
