/**
 * verify-js-plans.js
 *
 * 使用系统已安装的 Google Chrome 运行 Playwright，
 * 抓取需要 JS 渲染的 Coding Plan 页面内容，与 plans.ts 数据对比。
 *
 * 运行方式：
 *   node verify-js-plans.js
 */

const { chromium } = require('playwright');

const CHROME_PATH =
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

// 需要 JS 渲染的页面
const targets = [
  {
    id: 'volcengine-coding',
    name: '方舟 Coding Plan',
    url: 'https://www.volcengine.com/activity/codingplan',
    waitFor: 'text=Coding Plan',
    priceKeywords: ['40', '200', 'Lite', 'Pro', 'Doubao'],
  },
  {
    id: 'alibaba-coding',
    name: '百炼 Coding Plan',
    url: 'https://www.aliyun.com/benefit/ai/discount',
    waitFor: 'text=Coding',
    priceKeywords: ['198', '698', '1398', '200', 'Coding', '百炼'],
  },
  {
    id: 'tencent-coding',
    name: '腾讯云 Coding Plan',
    url: 'https://buy.cloud.tencent.com/hunyuan',
    waitFor: 'text=Coding',
    priceKeywords: ['40', '200', 'Lite', 'Pro', '混元', 'Coding'],
  },
  {
    id: 'iflytek-coding',
    name: '讯飞星辰 Coding Plan',
    url: 'https://maas.xfyun.cn/packageSubscription',
    waitFor: 'text=套餐',
    priceKeywords: ['3.9', '39', '199', '无忧', '专业', '高效'],
  },
  {
    id: 'infini-coding',
    name: 'Infini Coding Plan',
    url: 'https://cloud.infini-ai.com/platform/ai',
    waitFor: 'text=Coding',
    priceKeywords: ['40', '200', 'Lite', 'Pro', 'Infini'],
  },
  {
    id: 'minimax-token',
    name: 'MiniMax Token Plan',
    url: 'https://platform.minimaxi.com/subscribe/token-plan',
    waitFor: 'text=Token',
    priceKeywords: ['29', '49', '119', '98', '199', '899', 'Starter', 'Plus', 'Max'],
  },
  {
    id: 'glm-coding',
    name: 'GLM Coding Plan (国内)',
    url: 'https://bigmodel.cn/glm-coding',
    waitFor: 'text=Coding',
    priceKeywords: ['49', '149', '469', 'Lite', 'Pro', 'Max', 'GLM'],
  },
];

(async () => {
  console.log('\n' + '='.repeat(70));
  console.log('  JS 渲染页面验证报告（使用系统 Chrome）');
  console.log('='.repeat(70) + '\n');

  const browser = await chromium.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const context = await browser.newContext({
    userAgent:
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
    locale: 'zh-CN',
    timezoneId: 'Asia/Shanghai',
  });

  for (const target of targets) {
    const page = await context.newPage();
    console.log(`\n── ${target.name} (${target.id})`);
    console.log(`   URL: ${target.url}`);

    try {
      await page.goto(target.url, { waitUntil: 'domcontentloaded', timeout: 25000 });

      // 等待关键内容出现
      try {
        await page.waitForSelector(target.waitFor, { timeout: 8000 });
      } catch {
        // 等不到也继续，尽量抓
      }

      // 额外等待 JS 渲染
      await page.waitForTimeout(2000);

      const text = await page.evaluate(() => document.body?.innerText ?? '');
      const title = await page.title();

      console.log(`   标题: ${title}`);
      console.log(`\n   页面文本摘要（前 3000 字）:\n`);

      // 清理空行，只输出有内容的行
      const lines = text
        .split('\n')
        .map((l) => l.trim())
        .filter((l) => l.length > 1)
        .slice(0, 80)
        .join('\n');
      console.log(lines);

      // 关键词命中检查
      const hits = target.priceKeywords.filter((kw) =>
        text.toLowerCase().includes(kw.toLowerCase())
      );
      console.log(`\n   关键词命中: [${hits.join(', ')}] / [${target.priceKeywords.join(', ')}]`);
    } catch (err) {
      console.log(`   ❌ 错误: ${err.message.split('\n')[0].slice(0, 120)}`);
    } finally {
      await page.close();
    }

    console.log('\n' + '─'.repeat(70));
  }

  await browser.close();
  console.log('\n验证完成。\n');
})();
