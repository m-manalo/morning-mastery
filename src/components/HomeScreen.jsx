import { useState } from 'react';
import { SUBJECT_CONFIG, DAILY_SUBJECT_ORDER } from '../data/questions';
import { SUBJECT_COLORS } from '../data/themes';
import { getLevelFromXP, getXPPercent, isDailyComplete } from '../utils/gameUtils';
import ThemePicker from './ThemePicker';

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
        className={`daily-hero${complete ? ' daily-hero--done' : ''}`}
        onClick={complete ? undefined : onStartDaily}
        role={complete ? undefined : 'button'}
        tabIndex={complete ? undefined : 0}
        onKeyDown={e => !complete && e.key === 'Enter' && onStartDaily()}
      >
        {complete ? (
          <>
            <div className="daily-top">
              <span className="daily-badge daily-badge--done">Completed today</span>
              <span style={{ fontSize: 18 }}>✓</span>
            </div>
            <p className="daily-title" style={{ opacity: 0.6 }}>Daily complete</p>
            <p className="t-secondary small" style={{ marginTop: 4 }}>Come back tomorrow to keep your streak</p>
            <div className="daily-subjects-dots">
              {Object.entries(SUBJECT_CONFIG).map(([key, cfg]) => {
                const result = dailyState?.results?.[key];
                const got = result?.correct;
                return (
                  <div key={key} className="daily-dot" title={cfg.label} style={{
                    background: got === true ? '#4A9E47' : got === false ? '#E05A3A' : 'rgba(0,0,0,0.1)',
                    fontSize: 13,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <span style={{ fontSize: 14 }}>{got === true ? '✓' : got === false ? '✗' : '·'}</span>
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <>
            <div className="daily-top">
              <span className="daily-badge">READY</span>
              <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.6)' }}>5 subjects · ~3 min</span>
            </div>
            <p className="daily-title">Start today's daily</p>
            <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.65)', marginTop: 2 }}>One question per subject, auto-flow</p>
            <div className="daily-cta">
              <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)' }}>Tap to begin</span>
              <div className="daily-arrow">→</div>
            </div>
          </>
        )}
      </div>

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
      {Object.entries(SUBJECT_CONFIG).map(([key, cfg]) => {
        const xp = subjects[key]?.xp || 0;
        const level = getLevelFromXP(xp);
        const pct = getXPPercent(xp);
        const sc = SUBJECT_COLORS[key];
        return (
          <div key={key} className="progress-row">
            <div className="sub-tile" style={{ background: sc.bg, color: sc.color, borderColor: sc.border }}>
              {cfg.label.slice(0, 2)}
            </div>
            <div className="sub-info">
              <div className="sub-row-top">
                <span className="sub-name">{cfg.label}</span>
                <span className="lv-badge" style={{ background: sc.bg, color: sc.color }}>Lv {level}</span>
              </div>
              <div className="bar-track">
                <div className="bar-fill" style={{ width: `${pct}%`, background: sc.bar }} />
              </div>
            </div>
          </div>
        );
      })}

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
