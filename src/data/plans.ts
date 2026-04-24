export interface PlanTier {
  name: string;
  price: string;
  priceNote?: string;
  features: string[];
}

export interface CodingPlan {
  id: string;
  name: string;
  company: string;
  /** vendor = 模型厂商直营, cloud = 云平台转售, international = 国际版 */
  region: 'vendor' | 'cloud' | 'international';
  color: string;
  /** simple-icons slug, or empty for letter fallback */
  icon?: string;
  website: string;
  highlight: string;
  supportedModels: string[];
  startingPrice: string;
  /** 用于排序的数字价格（元/月） */
  priceNum: number;
  startingPriceNote?: string;
  tiers: PlanTier[];
  updatedAt: string;
}

const plans: CodingPlan[] = [
  // ==================== 模型厂商直营 ====================
  {
    id: 'glm-coding',
    name: 'GLM Coding Plan (国内)',
    company: '智谱 AI',
    region: 'vendor',
    color: '#2563eb',
    website: 'https://bigmodel.cn/glm-coding',
    highlight: '最早推出，支持 Claude Code 等 20+ 编程工具',
    supportedModels: ['GLM-5.1', 'GLM-5-Turbo', 'GLM-5', 'GLM-4.7', 'GLM-4.6', 'GLM-4.5', 'GLM-4.5-Air'],
    startingPrice: '¥49/月',
    priceNum: 49,
    startingPriceNote: '包季 9 折，包年 8 折',
    tiers: [
      { name: 'Lite', price: '¥49/月', features: ['3x Claude Pro 额度', '适合小型 Repo', '不含 GLM-5'] },
      { name: 'Pro', price: '¥149/月', priceNote: '最受欢迎', features: ['5x Lite 额度 + Lite 全量权益', '含 GLM-5', '覆盖多款 MCP 工具', '更快生成速度'] },
      { name: 'Max', price: '¥469/月', features: ['20x Lite 额度 + Pro 全量权益', '含 GLM-5', '高峰期专属资源优先保障'] },
    ],
    updatedAt: '2026-04',
  },
  {
    id: 'glm-coding-intl',
    name: 'GLM Coding Plan (国际)',
    company: '智谱 AI (Z.ai)',
    region: 'international',
    color: '#2563eb',
    website: 'https://z.ai/subscribe',
    highlight: '国际版，美元计价，季付 -10%',
    supportedModels: ['GLM-5.1', 'GLM-5-Turbo', 'GLM-5', 'GLM-4.7', 'GLM-4.6', 'GLM-4.5', 'GLM-4.5-Air'],
    startingPrice: '$18/月',
    priceNum: 130,
    startingPriceNote: '季付 $16.2/月 (-10%)',
    tiers: [
      { name: 'Lite', price: '$18/月', priceNote: '季付 $16.2/月', features: ['3x Claude Pro 额度', '适合小型 Repo', '支持 20+ 编程工具'] },
      { name: 'Pro', price: '$72/月', priceNote: '季付 $64.8/月，Popular', features: ['5x Lite 额度', '优先使用旗舰模型', '含 MCP 工具', '更快生成速度'] },
      { name: 'Max', price: '$160/月', priceNote: '季付 $144/月', features: ['20x Lite 额度', '首发接入旗舰模型', '高峰期专属资源'] },
    ],
    updatedAt: '2026-04',
  },
  {
    id: 'kimi-code',
    name: 'Kimi Code',
    company: '月之暗面 (Moonshot AI)',
    region: 'vendor',
    color: '#6366f1',
    website: 'https://www.kimi.com/code',
    highlight: '256K 超长上下文，100 Tokens/s 极速响应',
    supportedModels: ['Kimi-K2.6', 'Kimi-K2.5'],
    startingPrice: '¥49/月',
    priceNum: 49,
    startingPriceNote: '包年最高立省 ¥1,680',
    tiers: [
      { name: 'Andante', price: '¥49/月', features: ['专属 Kimi Code 额度', '旗舰模型抢先体验', '支持多个编程会话'] },
      { name: 'Moderato', price: '¥99/月', priceNote: '推荐', features: ['每周更新额度', '多设备共享套餐额度', '多项目中高效工作'] },
      { name: 'Allegretto', price: '¥199/月', features: ['充足每周额度', '更高并发上限', '高级用户超值选择'] },
      { name: 'Allegro', price: '¥699/月', features: ['澎湃额度', '适配日常办公与高强度开发'] },
    ],
    updatedAt: '2026-04',
  },
  {
    id: 'minimax-token',
    name: 'MiniMax Token Plan',
    company: 'MiniMax (稀宇科技)',
    region: 'vendor',
    color: '#ec4899',
    website: 'https://platform.minimaxi.com/subscribe/token-plan',
    highlight: '性价比极高，100 TPS 极速推理，支持多模态',
    supportedModels: ['M2.7', 'M2.7-highspeed'],
    startingPrice: '¥29/月',
    priceNum: 29,
    startingPriceNote: '包年立省 2 月',
    tiers: [
      { name: 'Starter', price: '¥29/月', features: ['600 次/5h', 'M2.7 约50TPS', '约 1 个 OpenClaw agent'] },
      { name: 'Plus', price: '¥49/月', features: ['1500 次/5h', '2.5x Starter', '约 1-2 个 OpenClaw agent'] },
      { name: 'Max', price: '¥119/月', features: ['4500 次/5h', '7.5x Starter', '约 2-3 个 OpenClaw agent'] },
      { name: 'Plus-极速版', price: '¥98/月', features: ['1500 次/5h', 'M2.7-highspeed 约100TPS', '2.5x Starter'] },
      { name: 'Max-极速版', price: '¥199/月', priceNote: '超值之选', features: ['4500 次/5h', 'M2.7-highspeed 约100TPS', '7.5x Starter'] },
      { name: 'Ultra-极速版', price: '¥899/月', features: ['30000 次/5h', 'M2.7-highspeed 约100TPS', '50x Starter'] },
    ],
    updatedAt: '2026-04',
  },
  {
    id: 'stepfun-coding',
    name: 'StepFun Coding Plan',
    company: '阶跃星辰',
    region: 'vendor',
    color: '#10b981',
    website: 'https://platform.stepfun.com/step-plan',
    highlight: '自研 step-3.5-flash 模型，含语音模型，年付最高立省 ¥1,722',
    supportedModels: ['step-3.5-flash-2603', 'step-3.5-flash', 'stepaudio-2.5'],
    startingPrice: '¥49/月',
    priceNum: 49,
    startingPriceNote: '支持季付/年付',
    tiers: [
      { name: 'Flash Mini', price: '¥49/月', features: ['100 Prompt/5h (~1500 次模型调用)', '2x OpenAI Go 套餐用量', '多设备登录', 'Agent 多任务并行'] },
      { name: 'Flash Plus', price: '¥99/月', features: ['400 Prompt/5h (~6000 次)', '4x Flash Mini', '多设备登录', '优先 API 速率'] },
      { name: 'Flash Pro', price: '¥199/月', features: ['1500 Prompt/5h (~22500 次)', '15x Flash Mini', 'Agent 多任务并行', '优先技术支持'] },
      { name: 'Flash Max', price: '¥699/月', features: ['5000 Prompt/5h (~75000 次)', '50x Flash Mini', '优先 API 速率', '优先技术支持'] },
    ],
    updatedAt: '2026-04',
  },
  {
    id: 'xiaomi-mimo',
    name: 'MiMo Token Plan',
    company: '小米',
    region: 'vendor',
    color: '#f97316',
    icon: 'xiaomi',
    website: 'https://mimo.mi.com/',
    highlight: '小米自研 MiMo-V2 全系模型，含语音/图像/设计，TTS 限免',
    supportedModels: ['MiMo-V2.5-Pro', 'MiMo-V2.5', 'MiMo-V2.5-TTS-Series'],
    startingPrice: '¥34.32/月',
    priceNum: 34,
    startingPriceNote: '首购优惠，原价 ¥39/月',
    tiers: [
      { name: 'Lite', price: '¥34.32/月', priceNote: '首购优惠，原价 ¥39', features: ['6000 万 Credits/月', '支持 OpenClaw/Claude Code 等', '非高峰期 0.8x 消耗'] },
      { name: 'Standard', price: '¥87.12/月', priceNote: '首购优惠，原价 ¥99', features: ['2 亿 Credits/月', '3.3x Lite', '非高峰期 0.8x 消耗'] },
      { name: 'Pro', price: '¥289.52/月', priceNote: '首购优惠，原价 ¥329', features: ['7 亿 Credits/月', '11.7x Lite', 'TTS 限时免费'] },
      { name: 'Max', price: '¥579.92/月', priceNote: '首购优惠，原价 ¥659', features: ['16 亿 Credits/月', '26.7x Lite', 'TTS 限时免费'] },
    ],
    updatedAt: '2026-04',
  },

  // ==================== 云平台转售 ====================
  {
    id: 'volcengine-coding',
    name: '方舟 Coding Plan',
    company: '字节跳动 (火山引擎)',
    region: 'cloud',
    color: '#3b82f6',
    icon: 'bytedance',
    website: 'https://www.volcengine.com/activity/codingplan',
    highlight: '多厂商模型聚合，支持 Auto 模式自动选模型，目前已售罄',
    supportedModels: ['Doubao-Seed-2.0-Code', 'Doubao-Seed-2.0-Pro', 'Doubao-Seed-2.0-Lite', 'Doubao-Seed-Code', 'MiniMax-M2.7', 'GLM-5.1', 'GLM-4.7', 'DeepSeek-V3.2', 'Kimi-K2.6', 'Kimi-K2.5'],
    startingPrice: '¥40/月',
    priceNum: 40,
    startingPriceNote: '目前已售罄',
    tiers: [
      { name: 'Lite', price: '¥40/月', priceNote: '已售罄', features: ['数倍于 Claude Pro 用量', '支持自由切换或 Auto 模式', 'Claude Code/Cursor 等工具'] },
      { name: 'Pro', price: '¥200/月', priceNote: '最受欢迎，已售罄', features: ['5x Lite 用量', '免费领取 ArkClaw 轻量版', '用量为 Claude Max 数倍'] },
    ],
    updatedAt: '2026-04',
  },
  {
    id: 'alibaba-coding',
    name: '百炼 Coding Plan',
    company: '阿里巴巴 (阿里云)',
    region: 'cloud',
    color: '#f97316',
    icon: 'alibabacloud',
    website: 'https://www.aliyun.com/benefit/ai/discount',
    highlight: '大厂背书，Token Plan 团队版按席位计费，多用户隔离不降速',
    supportedModels: ['qwen3.6-plus (图片理解)', 'kimi-k2.5 (图片理解)', 'glm-5', 'MiniMax-M2.5', 'qwen3.5-plus', 'qwen3-max-2026-01-23', 'qwen3-coder-next', 'qwen3-coder-plus', 'glm-4.7'],
    startingPrice: '¥198/席/月',
    priceNum: 198,
    startingPriceNote: '另有 Coding Plan Pro ¥200/月',
    tiers: [
      { name: '标准版', price: '¥198/席/月', features: ['25,000 Credits/月', '多模型灵活切换', '支持文本/视觉/图像生成', '不使用对话数据训练'] },
      { name: '高级版', price: '¥698/席/月', priceNote: '最受欢迎', features: ['100,000 Credits/月', '4x 标准版用量', '适配主流编程工具及 Agent', '无每小时/周限额'] },
      { name: '尊享版', price: '¥1398/席/月', features: ['250,000 Credits/月', '10x 标准版用量', '包月预算可控', '多用户隔离，高峰不降速'] },
      { name: 'Coding Plan Pro', price: '¥200/月', priceNote: '暂时售罄', features: ['90,000 请求/月', '6,000/5h', '兼容 Cline/Claude Code'] },
    ],
    updatedAt: '2026-04',
  },
  {
    id: 'tencent-coding',
    name: '腾讯云 Coding Plan',
    company: '腾讯云',
    region: 'cloud',
    color: '#2563eb',
    icon: 'tencentqq',
    website: 'https://buy.cloud.tencent.com/hunyuan',
    highlight: '含腾讯混元模型，另有 Token Plan/混元生图/生文/生3D',
    supportedModels: ['Tencent HY 2.0 Instruct', 'GLM-5', 'Kimi-K2.5', 'MiniMax-M2.5'],
    startingPrice: '¥40/月',
    priceNum: 40,
    tiers: [
      { name: 'Lite', price: '¥40/月', features: ['~1200 次/5h', '~9000 次/周', '~18000 次/月', '适合基础开发任务'] },
      { name: 'Pro', price: '¥200/月', features: ['面向专业开发者', '适合高频高强度编码场景'] },
    ],
    updatedAt: '2026-04',
  },
  {
    id: 'baidu-qianfan',
    name: '千帆 Coding Plan',
    company: '百度智能云',
    region: 'cloud',
    color: '#3b82f6',
    icon: 'baidu',
    website: 'https://cloud.baidu.com/product/codingplan',
    highlight: '兼容 Claude Code 等主流编程工具，支持 GLM-5/MiniMax-M2.5/Kimi-K2.5',
    supportedModels: ['GLM-5', 'MiniMax-M2.5', 'Kimi-K2.5'],
    startingPrice: '¥40/月',
    priceNum: 40,
    tiers: [
      { name: 'Lite', price: '¥40/月', features: ['每月最多 18,000 次请求', '适合入门级开发场景', '适配 Claude Code 等 AI 工具'] },
      { name: 'Pro', price: '¥200/月', features: ['每月最多 90,000 次请求', '适合专业开发场景', '适配 Claude Code 等 AI 工具'] },
    ],
    updatedAt: '2026-04',
  },
  {
    id: 'jd-coding',
    name: '京东云 Coding Plan',
    company: '京东云',
    region: 'cloud',
    color: '#dc2626',
    website: 'https://www.jdcloud.com/cn/pages/codingplan',
    highlight: '每天 10:30 限量秒杀，首购 ¥19.9 起，已售罄可预约',
    supportedModels: ['DeepSeek', 'GLM', 'MiniMax', 'Qwen3-Coder', 'Kimi'],
    startingPrice: '¥19.9/月',
    priceNum: 20,
    startingPriceNote: '首购价，原价 ¥40/月，已售罄',
    tiers: [
      { name: 'Lite', price: '¥19.9/月', priceNote: '首购价，原价 ¥40', features: ['每月最多 18,000 次请求', '适合轻度开发者', '工具: Claude Code/OpenClaw/Roo Code/Cursor', '已售罄，可预约'] },
      { name: 'Pro', price: '¥99.9/月', priceNote: '首购价，原价 ¥200', features: ['每月最多 90,000 次请求', '5x Lite 用量', 'Lite 全部能力与权益', '已售罄，可预约'] },
    ],
    updatedAt: '2026-04',
  },
  {
    id: 'iflytek-coding',
    name: '讯飞星辰 Coding Plan',
    company: '科大讯飞',
    region: 'cloud',
    color: '#7c3aed',
    website: 'https://maas.xfyun.cn/packageSubscription',
    highlight: '无忧版 ¥3.9 起不限次数，95% 用户选择专业版',
    supportedModels: ['Spark X2', 'GLM-5 (默认)', 'GLM-5.1', 'MiniMax-M2.5', 'KIMI-K2.5', 'DeepSeek-V3.2', 'GLM-4.7-Flash', 'Qwen3.5-35B-A3B', 'Qwen3-Coder-Next-FP8', 'Qwen3.5-397B-A17B'],
    startingPrice: '¥3.90/月',
    priceNum: 4,
    startingPriceNote: '首购价，原价 ¥19/月',
    tiers: [
      { name: '无忧版', price: '¥3.90/月', priceNote: '首购优惠，原价 ¥19', features: ['请求次数不限', '仅轻量模型 (Qwen3.5-35B-A3B 等)', '首购优惠，后续恢复原价'] },
      { name: '专业版', price: '¥39/月', priceNote: '95% 用户选择', features: ['1,200 次/5h', '9,000 次/周', '18,000 次/月', '含 GLM-5/MiniMax-M2.5/Kimi-K2.5 等'] },
      { name: '高效版', price: '¥199/月', features: ['6,000 次/5h', '45,000 次/周', '90,000 次/月', '含 GLM-5.1，极致性能'] },
    ],
    updatedAt: '2026-04',
  },
  {
    id: 'infini-coding',
    name: 'Infini Coding Plan',
    company: '无问芯穹',
    region: 'cloud',
    color: '#0ea5e9',
    website: 'https://cloud.infini-ai.com/platform/ai',
    highlight: '支持 Minimax/GLM/DeepSeek/Kimi 等热门模型，暂时售罄',
    supportedModels: ['MiniMax', 'GLM', 'DeepSeek', 'Kimi'],
    startingPrice: '¥40/月',
    priceNum: 40,
    startingPriceNote: '暂时售罄',
    tiers: [
      { name: 'Infini Coding Lite', price: '¥40/月', priceNote: '暂时售罄', features: ['1000 次请求/5h', '适合入门级开发场景', '适配 Claude Code/Cline 等工具'] },
      { name: 'Infini Coding Pro', price: '¥200/月', priceNote: '更多人选择，暂时售罄', features: ['5000 次请求/5h', '5x Lite 套餐用量', '适配 Claude Code/Cline 等工具'] },
    ],
    updatedAt: '2026-04',
  },
  {
    id: 'ctcloud-coding',
    name: '天翼云 GLM Coding Plan',
    company: '中国电信 (天翼云)',
    region: 'cloud',
    color: '#0369a1',
    website: 'https://www.ctyun.cn/act/OpenClaw',
    highlight: '仅限 GLM 系列模型，含 GLM-5.1',
    supportedModels: ['GLM-5.1', 'GLM-5-Turbo', 'GLM-4.7', 'GLM-4.6', 'GLM-4.5-Air'],
    startingPrice: '¥49/月',
    priceNum: 49,
    tiers: [
      { name: 'Lite', price: '¥49/月', features: ['~80 prompts/5h', '~400/周', '~1600/月'] },
      { name: 'Pro', price: '¥149/月', features: ['~400 prompts/5h', '~2000/周', '~8000/月'] },
      { name: 'Max', price: '¥469/月', features: ['~1600 prompts/5h', '~8000/周', '~32000/月'] },
    ],
    updatedAt: '2026-04',
  },
];

export default plans;
