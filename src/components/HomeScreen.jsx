import { useState } from 'react';
import { SUBJECT_CONFIG, DAILY_SUBJECT_ORDER } from '../data/questions';
import { SUBJECT_COLORS } from '../data/themes';
import { getLevelFromXP, getXPPercent, isDailyComplete } from '../utils/gameUtils';
import ThemePicker from './ThemePicker';

// Shorter display names for the compact ring layout
const SHORT_LABEL = {
  socialstudies: 'Social',
};

export default function HomeScreen({ subjects, streak, dailyState, themeKey, onSetTheme, onStartDaily, onOpenReview }) {
  const [showTheme, setShowTheme] = useState(false);
  const complete = isDailyComplete(dailyState);
  const now = new Date();
  const hour = now.getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  return (
    <div className="screen-inner">
      {showTheme && (
        <ThemePicker
          themeKey={themeKey}
          onSelect={onSetTheme}
          onClose={() => setShowTheme(false)}
        />
      )}

      {/* Header */}
      <div className="home-header">
        <div>
          <p className="t-secondary small">{greeting}</p>
          <h1 className="app-title">Morning Mastery</h1>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6 }}>
          <div className="streak-box">
            <p className="streak-num">{streak.count || 0} 🔥</p>
            <p className="t-secondary small">day streak</p>
          </div>
          <button className="theme-toggle-btn" onClick={() => setShowTheme(true)}>
            🎨 theme
          </button>
        </div>
      </div>

      {/* Daily card */}
      <div
        className={`daily-light${complete ? ' daily-light--done' : ''}`}
        onClick={complete ? undefined : onStartDaily}
        role={complete ? undefined : 'button'}
        tabIndex={complete ? undefined : 0}
        onKeyDown={e => !complete && e.key === 'Enter' && onStartDaily()}
      >
        <div className="daily-icon-circle">
          <svg width="22" height="22" viewBox="0 0 64 64" fill="none">
            <circle cx="32" cy="30" r="14" fill="currentColor"/>
            <rect x="8" y="46" width="48" height="8" rx="4" fill="currentColor"/>
            <g stroke="currentColor" strokeWidth="4" strokeLinecap="round">
              <line x1="32" y1="6" x2="32" y2="14"/>
              <line x1="12" y1="14" x2="18" y2="20"/>
              <line x1="52" y1="14" x2="46" y2="20"/>
            </g>
          </svg>
        </div>
        <div className="daily-light-info">
          <p className="daily-light-title">
            {complete ? 'Daily complete' : "Start today's daily"}
          </p>
          <p className="daily-light-sub">
            {complete ? 'Come back tomorrow to keep your streak' : '5 subjects · ~3 min'}
          </p>
        </div>
        <div className={`daily-arrow-light${complete ? ' daily-arrow-light--done' : ''}`}>
          {complete ? '✓' : '→'}
        </div>
      </div>

      {complete && (
        <div className="daily-subjects-dots daily-subjects-dots--compact">
          {Object.entries(SUBJECT_CONFIG).map(([key, cfg]) => {
            const result = dailyState?.results?.[key];
            const got = result?.correct;
            return (
              <div key={key} className="daily-dot" title={cfg.label} style={{
                background: got === true ? '#4A9E47' : got === false ? '#E05A3A' : 'rgba(0,0,0,0.1)',
              }}>
                <span>{got === true ? '✓' : got === false ? '✗' : '·'}</span>
              </div>
            );
          })}
        </div>
      )}

      {/* Today's questions — only once the daily is complete */}
      {complete && (
        <>
          <p className="section-label">today's questions</p>
          {DAILY_SUBJECT_ORDER.filter(key => dailyState?.results?.[key]).map(key => {
            const cfg = SUBJECT_CONFIG[key];
            const sc = SUBJECT_COLORS[key];
            const result = dailyState.results[key];
            return (
              <button
                key={key}
                className={`review-btn${result.correct ? '' : ' review-btn--wrong'}`}
                onClick={() => onOpenReview(key)}
              >
                <div className="sub-tile" style={{ background: sc.bg, color: sc.color, borderColor: sc.border }}>
                  {cfg.label.slice(0, 2)}
                </div>
                <div className="sub-info">
                  <span className="sub-name">{cfg.label}</span>
                  <p className="review-question-preview">{result.question.q}</p>
                </div>
                <span className={`result-tick ${result.correct ? 'correct' : 'wrong'}`}>
                  {result.correct ? '✓' : '✗'}
                </span>
                <span className="review-arrow">→</span>
              </button>
            );
          })}
          <div className="divider" />
        </>
      )}

      {/* Progress overview */}
      <p className="section-label">your progress</p>
      <div className="rings-row">
        {Object.entries(SUBJECT_CONFIG).map(([key, cfg]) => {
          const xp = subjects[key]?.xp || 0;
          const level = getLevelFromXP(xp);
          const pct = getXPPercent(xp);
          const sc = SUBJECT_COLORS[key];
          const circumference = 2 * Math.PI * 19; // r=19
          const dashoffset = circumference * (1 - pct / 100);
          return (
            <div key={key} className="ring-item">
              <div className="ring">
                <svg width="46" height="46" viewBox="0 0 46 46">
                  <circle cx="23" cy="23" r="19" fill="none" stroke="var(--bar-bg)" strokeWidth="4" />
                  <circle
                    cx="23" cy="23" r="19" fill="none"
                    stroke={sc.bar} strokeWidth="4" strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={dashoffset}
                    transform="rotate(-90 23 23)"
                  />
                </svg>
                <div className="ring-center" style={{ color: sc.color }}>
                  {cfg.label.slice(0, 2)}
                </div>
              </div>
              <p className="ring-name">{SHORT_LABEL[key] || cfg.label}</p>
              <p className="ring-lv">Lv {level}</p>
            </div>
          );
        })}
      </div>

      <div className="divider" />
      <p className="t-secondary small center">progress saves in your browser</p>

      {/* Dev reset */}
      <button className="dev-reset" onClick={() => {
        Object.keys(localStorage).forEach(k => {
          if (k.startsWith('mm_')) localStorage.removeItem(k);
        });
        window.location.reload();
      }}>dev reset</button>
    </div>
  );
}
