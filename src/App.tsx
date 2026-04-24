import { useState, useMemo } from 'react';
import plans, { type CodingPlan } from './data/plans';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import RegionTabs from './components/RegionTabs';
import PlanCard from './components/PlanCard';
import ComparePanel from './components/ComparePanel';
import './App.css';

type Region = 'all' | 'vendor' | 'cloud' | 'international';
type SortBy = 'default' | 'price-asc' | 'price-desc';

function App() {
  const [search, setSearch] = useState('');
  const [region, setRegion] = useState<Region>('all');
  const [sortBy, setSortBy] = useState<SortBy>('default');
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [showCompare, setShowCompare] = useState(false);

  const filtered = useMemo(() => {
    const list = plans.filter((p) => {
      const matchRegion = region === 'all' || p.region === region;
      if (!matchRegion) return false;
      if (!search.trim()) return true;
      const q = search.toLowerCase();
      return (
        p.name.toLowerCase().includes(q) ||
        p.company.toLowerCase().includes(q) ||
        p.highlight.toLowerCase().includes(q) ||
        p.supportedModels.some((m) => m.toLowerCase().includes(q))
      );
    });
    if (sortBy === 'price-asc') return [...list].sort((a, b) => a.priceNum - b.priceNum);
    if (sortBy === 'price-desc') return [...list].sort((a, b) => b.priceNum - a.priceNum);
    return list;
  }, [search, region, sortBy]);

  const toggleCompare = (id: string) => {
    setCompareIds((prev) => {
      if (prev.includes(id)) return prev.filter((i) => i !== id);
      if (prev.length >= 3) return prev;
      return [...prev, id];
    });
  };

  const comparePlans = plans.filter((p) => compareIds.includes(p.id));

  return (
    <div className="app">
      <Header />
      <main className="main">
        <div className="toolbar">
          <SearchBar value={search} onChange={setSearch} />
          <RegionTabs value={region} onChange={setRegion} />
          <select
            className="sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortBy)}
          >
            <option value="default">默认排序</option>
            <option value="price-asc">价格从低到高</option>
            <option value="price-desc">价格从高到低</option>
          </select>
        </div>

        {compareIds.length > 0 && (
          <div className="compare-bar">
            <div className="compare-bar-left">
              <span className="compare-bar-count">{compareIds.length}/3</span>
              <span className="compare-bar-text">已选择对比</span>
              {comparePlans.map((p) => (
                <span key={p.id} className="compare-bar-tag">
                  {p.name}
                  <button
                    className="compare-bar-tag-remove"
                    onClick={() => toggleCompare(p.id)}
                  >
                    x
                  </button>
                </span>
              ))}
            </div>
            <div className="compare-bar-actions">
              <button
                className="btn btn-ghost"
                onClick={() => setCompareIds([])}
              >
                清空
              </button>
              <button
                className="btn btn-primary"
                disabled={compareIds.length < 2}
                onClick={() => setShowCompare(true)}
              >
                开始对比
              </button>
            </div>
          </div>
        )}

        <div className="plan-grid">
          {filtered.map((plan: CodingPlan) => (
            <PlanCard
              key={plan.id}
              plan={plan}
              isSelected={compareIds.includes(plan.id)}
              onToggleCompare={() => toggleCompare(plan.id)}
              canSelect={compareIds.length < 3 || compareIds.includes(plan.id)}
            />
          ))}
          {filtered.length === 0 && (
            <div className="empty-state">
              <p className="empty-title">没有找到匹配的产品</p>
              <p className="empty-desc">试试调整搜索关键词或切换分类</p>
            </div>
          )}
        </div>
        {/* 注意事项 */}
        <div className="notes-box">
          <h3 className="notes-title">重要注意事项</h3>
          <ul className="notes-list">
            <li>提示：请仔细核对各厂商实际请求额度规则，避免误解。</li>
            <li>价格数据更新于 2026 年 4 月，可能随厂商调整而变化，请以官网为准。</li>
          </ul>
        </div>
      </main>

      <footer className="footer">
        <p>全网最全国内 Coding Plan 大汇总 -- 数据更新于 2026 年 4 月，价格随时可能变化，请以各产品官网为准</p>
      </footer>

      {showCompare && (
        <ComparePanel
          plans={comparePlans}
          onClose={() => setShowCompare(false)}
        />
      )}
    </div>
  );
}

export default App;
