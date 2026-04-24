import { useState } from 'react';
import type { CodingPlan } from '../data/plans';
import './PlanCard.css';

interface Props {
  plan: CodingPlan;
  isSelected: boolean;
  onToggleCompare: () => void;
  canSelect: boolean;
}

export default function PlanCard({
  plan,
  isSelected,
  onToggleCompare,
  canSelect,
}: Props) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={`plan-card ${isSelected ? 'plan-card--selected' : ''}`}>
      {/* 左侧彩色竖条 */}
      <div className="plan-card-accent" style={{ background: plan.color }} />

      <div className="plan-card-body">
        {/* 第一行：名称 + 区域标签 */}
        <div className="plan-card-top">
          <div className="plan-card-identity">
            <div
              className="plan-card-dot"
              style={{ background: plan.color }}
            />
            <h3 className="plan-card-name">
              {plan.company} - {plan.name}
            </h3>
          </div>
          <span
            className={`plan-card-region region-${plan.region}`}
          >
            {plan.region === 'vendor' ? '模型厂商' : plan.region === 'cloud' ? '云平台' : '国际版'}
          </span>
        </div>

        {/* 支持模型 */}
        <div className="plan-card-models">
          <svg className="plan-card-models-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
          </svg>
          <span>支持模型：{plan.supportedModels.join('、')}</span>
        </div>

        {/* 价格区域 - 最醒目 */}
        <div className="plan-card-pricing">
          <span className="plan-card-pricing-label">套餐价格：</span>
          <span className="plan-card-pricing-value">{plan.startingPrice}</span>
          {plan.startingPriceNote && (
            <span className="plan-card-pricing-note">
              ({plan.startingPriceNote})
            </span>
          )}
        </div>

        {/* 一句话特点 */}
        <div className="plan-card-highlight">
          <svg className="plan-card-highlight-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
          <span>主要特点：{plan.highlight}</span>
        </div>

        {/* 价格档位表 */}
        <div className="plan-card-tiers">
          {plan.tiers.map((tier) => (
            <div
              key={tier.name}
              className={`tier-chip ${tier.price === '免费' ? 'tier-chip--free' : ''}`}
            >
              <span className="tier-chip-name">{tier.name}</span>
              <span className="tier-chip-price">{tier.price}</span>
              {tier.features.length > 0 && (
                <span className="tier-chip-feat">{tier.features[0]}</span>
              )}
            </div>
          ))}
        </div>

        {/* 展开区域：各档位详细信息 */}
        {expanded && (
          <div className="plan-card-extra">
            {plan.tiers.map((tier) => (
              <div key={tier.name} className="extra-tier-detail">
                <div className="extra-tier-head">
                  <span className="extra-tier-name">{tier.name}</span>
                  <span className="extra-tier-price">{tier.price}</span>
                  {tier.priceNote && <span className="extra-tier-note">{tier.priceNote}</span>}
                </div>
                <ul className="extra-tier-features">
                  {tier.features.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {/* 底部操作 */}
        <div className="plan-card-footer">
          <button
            className="plan-card-toggle"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? '收起' : '各档位详情'}
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              style={{
                transform: expanded ? 'rotate(180deg)' : 'none',
                transition: 'transform 0.2s',
              }}
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
          <div className="plan-card-actions">
            <a
              className="plan-card-link"
              href={plan.website}
              target="_blank"
              rel="noopener noreferrer"
            >
              官网
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </a>
            <button
              className={`plan-card-compare ${isSelected ? 'compare-active' : ''}`}
              onClick={onToggleCompare}
              disabled={!canSelect && !isSelected}
            >
              {isSelected ? '已选对比' : '加入对比'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
