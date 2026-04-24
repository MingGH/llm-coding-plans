# 项目上下文 - 全网最全国内 Coding Plan 大汇总

## 项目概述

一个纯静态的 React 网站，汇总国内全部主流 AI Coding Plan 订阅套餐（搭配 Claude Code 等工具使用的 API 额度包），提供价格、模型、额度的一站式对比。

- 生产域名：https://bestcoding.996.ninja
- 仓库地址：git@github.com:MingGH/llm-coding-plans.git
- 部署方式：Cloudflare Pages（构建命令 `yarn build`，输出目录 `dist`）

## 技术栈

- React 19 + TypeScript
- Vite 8
- 纯 CSS（无 UI 框架），白底卡片风格，去除 AI 味
- 包管理器：Yarn (PnP 模式)
- 公司图标：simple-icons CDN（有收录的用 SVG 图标，没有的用彩色首字母方块）

## 项目结构

```
llm-coding-plans/
├── index.html              # 入口 HTML，含 SEO meta/JSON-LD 结构化数据
├── public/favicon.svg      # 忍者图标
├── src/
│   ├── main.tsx            # React 入口
│   ├── App.tsx             # 主应用：搜索、分类筛选、排序、对比功能
│   ├── App.css             # 全局布局样式
│   ├── index.css           # CSS 变量和 reset
│   ├── data/
│   │   └── plans.ts        # 【核心数据文件】所有 Coding Plan 配置
│   └── components/
│       ├── Header.tsx/css   # 顶部标题栏，含 GitHub 和 996.ninja 链接
│       ├── SearchBar.tsx/css # 搜索框
│       ├── RegionTabs.tsx/css # 分类 Tab（全部/模型厂商/云平台/国际版）
│       ├── PlanCard.tsx/css  # 产品卡片（左侧彩条、图标、价格、档位）
│       └── ComparePanel.tsx/css # 对比弹窗（表格形式并排对比）
├── LICENSE                 # MIT
└── README.md
```

## 数据结构 (src/data/plans.ts)

这是最重要的文件，所有产品数据都在这里。每个产品是一个 `CodingPlan` 对象：

```typescript
interface CodingPlan {
  id: string;
  name: string;
  company: string;
  region: 'vendor' | 'cloud' | 'international'; // 模型厂商 / 云平台 / 国际版
  color: string;           // 品牌色，用于左侧竖条和首字母方块
  icon?: string;           // simple-icons slug，有则从 CDN 加载 SVG
  website: string;         // 直达购买/订阅页面的链接
  highlight: string;       // 一句话特点
  supportedModels: string[];
  startingPrice: string;   // 显示用的起步价文本
  priceNum: number;        // 用于排序的数字价格（元/月）
  startingPriceNote?: string;
  tiers: PlanTier[];       // 价格档位列表
  updatedAt: string;
}
```

## 当前覆盖的产品（15 个）

### 模型厂商直营 (vendor)
1. 智谱 GLM Coding Plan (国内) - ¥49/月起
2. Kimi Code (月之暗面) - ¥49/月起
3. MiniMax Token Plan - ¥29/月起
4. StepFun Coding Plan (阶跃星辰) - ¥49/月起
5. MiMo Token Plan (小米) - ¥34.32/月起

### 云平台转售 (cloud)
6. 方舟 Coding Plan (字节/火山引擎) - ¥40/月起（已售罄）
7. 百炼 Coding Plan (阿里云) - ¥198/席/月起
8. 腾讯云 Coding Plan - ¥40/月起
9. 千帆 Coding Plan (百度) - ¥40/月起
10. 京东云 Coding Plan - ¥19.9/月起（首购价，已售罄）
11. 讯飞星辰 Coding Plan - ¥3.90/月起（首购价）
12. Infini Coding Plan (无问芯穹) - ¥40/月起（已售罄）
13. 天翼云 GLM Coding Plan - ¥49/月起

### 国际版 (international)
14. GLM Coding Plan 国际版 (Z.ai) - $18/月起

## 功能特性

- **分类筛选**：全部 / 模型厂商 / 云平台 / 国际版
- **搜索**：按产品名、公司、特点、模型名搜索
- **价格排序**：默认 / 价格从低到高 / 价格从高到低
- **对比**：勾选 2-3 个产品，弹窗表格并排对比
- **卡片设计**：左侧彩色竖条 + 公司图标 + 支持模型 + 价格（红色大字）+ 一句话特点 + 档位列表

## 设计原则

- 去除 AI 味：不用渐变霓虹、不用 emoji（996.ninja 链接的忍者 emoji 除外）
- 干净白底卡片风格
- 价格和档位是最重要的信息，始终外露不需要展开
- 数据配置化：增删改产品只需编辑 `src/data/plans.ts`

## 常用命令

```bash
yarn dev      # 启动开发服务器
yarn build    # 构建生产版本到 dist/
yarn preview  # 预览构建产物
```

## 注意事项

- 价格数据更新于 2026 年 4 月，需要定期核对各厂商官网
- 部分产品标注了"已售罄"状态，需要关注补货情况
- simple-icons 没有收录的国内 AI 厂商（智谱、月之暗面、MiniMax、阶跃星辰、讯飞、无问芯穹、天翼云、京东云）使用首字母方块作为图标
