import { THEMES } from '../data/themes';

export default function ThemePicker({ themeKey, onSelect, onClose }) {
  return (
    <div className="theme-picker-overlay" onClick={onClose}>
      <div className="theme-picker" onClick={e => e.stopPropagation()}>
        <div className="theme-picker-header">
          <p className="theme-picker-title">Choose theme</p>
          <button className="theme-picker-close" onClick={onClose}>✕</button>
        </div>
        <div className="theme-picker-options">
          {Object.values(THEMES).map(t => (
            <button
              key={t.key}
              className={`theme-option ${themeKey === t.key ? 'theme-option--active' : ''}`}
              onClick={() => { onSelect(t.key); onClose(); }}
            >
              <div className="theme-option-preview">
                <div className="theme-preview-bg" style={{ background: t.bg, border: `2px solid ${t.border}` }}>
                  <div className="theme-preview-card" style={{ background: t.accent, borderBottom: `3px solid ${t.accentDark}` }} />
                  <div className="theme-preview-row" style={{ background: t.bg2, border: `1px solid ${t.border}` }} />
                  <div className="theme-preview-row" style={{ background: t.bg2, border: `1px solid ${t.border}` }} />
                </div>
              </div>
              <div className="theme-option-info">
                <span className="theme-option-dot" style={{ background: t.accent }} />
                <span className="theme-option-name">{t.name}</span>
                {themeKey === t.key && <span className="theme-option-check">✓</span>}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
