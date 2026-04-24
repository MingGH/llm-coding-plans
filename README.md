# 全网最全国内 Coding Plan 大汇总

一站式对比国内全部主流 AI Coding Plan 订阅套餐 -- 价格、模型、额度、购买链接，帮你选出最适合的编程套餐。

线上地址：**https://bestcoding.996.ninja**

<img width="1324" height="875" alt="image" src="https://github.com/user-attachments/assets/82d1b18b-8f61-4fbd-82ca-2c5b3ac3773e" />


## 覆盖产品

### 模型厂商直营
- 智谱 GLM Coding Plan（国内 / 国际版）
- Kimi Code Plan（月之暗面）
- MiniMax Token Plan
- 阶跃星辰 StepFun Coding Plan
- 小米 MiMo Token Plan

### 云平台转售
- 火山方舟 Coding Plan（字节跳动）
- 阿里百炼 Coding Plan / Token Plan（阿里云）
- 腾讯云 Coding Plan
- 百度千帆 Coding Plan
- 京东云 Coding Plan
- 讯飞星辰 Coding Plan
- 无问芯穹 Infini Coding Plan
- 天翼云 GLM Coding Plan

## 功能

- 按分类筛选：模型厂商 / 云平台 / 国际版
- 关键词搜索：产品名、公司、模型名
- 勾选 2-3 个产品并排对比
- 价格档位直接外露，一眼可见
- 数据配置化，维护只需编辑 `src/data/plans.ts`

## 技术栈

- React 19 + TypeScript
- Vite 8
- 纯 CSS（无 UI 框架依赖）

## 开发

```bash
yarn install
yarn dev
```

## 构建

```bash
yarn build
```

构建产物在 `dist/` 目录，可直接部署到任意静态托管。

## 数据更新

编辑 `src/data/plans.ts`，每个产品是一个对象，新增/修改/删除产品只需操作这个文件。

## License

MIT
