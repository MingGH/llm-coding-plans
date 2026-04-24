import './Header.css';

export default function Header() {
  return (
    <header className="header">
      <div className="header-inner">
        <div className="header-brand">
          <svg
            className="header-logo"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="16 18 22 12 16 6" />
            <polyline points="8 6 2 12 8 18" />
          </svg>
          <h1 className="header-title">全网最全国内 Coding Plan 大汇总</h1>
        </div>
        <p className="header-desc">
          一站式对比国内全部主流 AI Coding Plan 订阅套餐 -- 价格、模型、额度、购买链接，帮你选出最适合的编程套餐
        </p>
      </div>
    </header>
  );
}
