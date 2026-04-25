import { useEffect } from 'react';
import type { CodingPlan } from '../data/plans';
import './ComparePanel.css';

interface Props {
  plans: CodingPlan[];
  onClose: () => void;
}

export default function ComparePanel({ plans, onClose }: Props) {
  // Esc key to close
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose]);

  const rows: {
    label: string;
    render: (p: CodingPlan) => React.ReactNode;
  }[] = [
    { label: '公司', render: (p) => p.company },
    {
      label: '分类',
      render: (p) =>
        p.region === 'vendor'
          ? '模型厂商直营'
          : p.region === 'cloud'
            ? '云平台转售'
            : '国际版',
    },
    {
      label: '起步价',
      render: (p) => (
        <span>
          <strong>{p.startingPrice}</strong>
          {p.startingPriceNote && (
            <span className="compare-note"> ({p.startingPriceNote})</span>
          )}
        </span>
      ),
    },
    { label: '主要特点', render: (p) => p.highlight },
    {
      label: '价格档位',
      render: (p) => (
        <div className="compare-tiers">
          {p.tiers.map((t) => (
            <div key={t.name} className="compare-tier">
              <div className="compare-tier-head">
                <span className="compare-tier-name">{t.name}</span>
                <span className="compare-tier-price">{t.price}</span>
                {t.priceNote && <span className="compare-tier-note">{t.priceNote}</span>}
              </div>
              <ul className="compare-tier-features">
                {t.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ),
    },
    {
      label: '支持模型',
      render: (p) => (
        <div className="compare-tag-list">
          {p.supportedModels.map((m) => (
            <span key={m} className="compare-tag">{m}</span>
          ))}
        </div>
      ),
    },
    {
      label: '官网',
      render: (p) => (
        <a href={p.website} target="_blank" rel="noopener noreferrer" className="compare-link">
          访问官网
        </a>
      ),
    },
  ];

  return (
    <div className="compare-overlay" onClick={onClose}>
      <div className="compare-panel" onClick={(e) => e.stopPropagation()}>
        <div className="compare-panel-header">
          <h2 className="compare-panel-title">Coding Plan 对比</h2>
          <button className="compare-panel-close" onClick={onClose}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Desktop: table layout */}
        <div className="compare-table-wrap">
          <table className="compare-table">
            <thead>
              <tr>
                <th className="compare-label-col"></th>
                {plans.map((p) => (
                  <th key={p.id} className="compare-product-col">
                    <div className="compare-product-header">
                      <div className="compare-avatar" style={{ background: p.color }}>
                        {p.name.charAt(0)}
                      </div>
                      <span className="compare-product-name">{p.name}</span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.label}>
                  <td className="compare-label">{row.label}</td>
                  {plans.map((p) => (
                    <td key={p.id} className="compare-value">{row.render(p)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile: stacked cards */}
        <div className="compare-cards">
          {plans.map((p) => (
            <div key={p.id} className="compare-card">
              <div className="compare-card-header" style={{ borderColor: p.color }}>
                <div className="compare-avatar" style={{ background: p.color }}>
                  {p.name.charAt(0)}
                </div>
                <span className="compare-product-name">{p.name}</span>
              </div>
              {rows.map((row) => (
                <div key={row.label} className="compare-card-row">
                  <div className="compare-card-label">{row.label}</div>
                  <div className="compare-card-value">{row.render(p)}</div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
