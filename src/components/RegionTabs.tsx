import './RegionTabs.css';

type Region = 'all' | 'vendor' | 'cloud' | 'international';

interface Props {
  value: Region;
  onChange: (v: Region) => void;
}

const tabs: { key: Region; label: string }[] = [
  { key: 'all', label: '全部' },
  { key: 'vendor', label: '模型厂商' },
  { key: 'cloud', label: '云平台' },
  { key: 'international', label: '国际版' },
];

export default function RegionTabs({ value, onChange }: Props) {
  return (
    <div className="region-tabs">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          className={`region-tab ${value === tab.key ? 'active' : ''}`}
          onClick={() => onChange(tab.key)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
