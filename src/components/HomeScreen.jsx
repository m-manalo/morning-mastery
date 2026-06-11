import { SUBJECT_CONFIG } from '../data/questions';
import { getLevelFromXP, getXPPercent, isDailyComplete } from '../utils/gameUtils';
import { getDailyQuote } from '../data/quotes';

export default function HomeScreen({ subjects, streak, dailyState, onStartDaily, onStartPractice }) {
  const complete = isDailyComplete(dailyState);
  const quote = getDailyQuote();
  const now = new Date();
  const hour = now.getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  return (
    <div className="screen-inner">

      {/* Greeting */}
      <div className="home-header">
        <div>
          <p className="muted small">{greeting}</p>
          <h1 className="title">Morning Mastery</h1>
        </div>
        <div className="streak-box">
          <p className="streak-num">{streak.count || 0} <span style={{fontSize:18}}>🔥</span></p>
          <p className="muted small">day streak</p>
        </div>
      </div>

      {/* Daily card — dominant */}
      <div
        className={`daily-card ${complete ? 'daily-card--done' : 'daily-card--ready'}`}
        onClick={complete ? undefined : onStartDaily}
        role={complete ? undefined : 'button'}
        tabIndex={complete ? undefined : 0}
        onKeyDown={e => !complete && e.key === 'Enter' && onStartDaily()}
      >
        {complete ? (
          <>
            <div className="daily-done-top">
              <span className="daily-badge daily-badge--done">Completed today</span>
              <span style={{fontSize:20}}>✓</span>
            </div>
            <p className="daily-title" style={{opacity:0.6}}>Daily complete</p>
            <p className="muted small" style={{marginTop:4}}>Come back tomorrow to keep your streak going</p>
            <div className="daily-subjects-row">
              {Object.entries(SUBJECT_CONFIG).map(([key, cfg]) => {
                const got = dailyState?.results?.[key];
                return (
                  <span key={key} className="daily-subject-dot" title={cfg.label} style={{
                    background: got === true ? cfg.bar : got === false ? '#E24B4A' : '#e0ded8',
                    opacity: got === undefined ? 0.3 : 1
                  }}>{cfg.emoji}</span>
                );
              })}
            </div>
          </>
        ) : (
          <>
            <div className="daily-done-top">
              <span className="daily-badge daily-badge--ready">Ready</span>
              <span className="muted small">5 subjects · ~3 min</span>
            </div>
            <p className="daily-title">Start today's daily</p>
            <p className="muted small" style={{marginTop:4}}>One question per subject, auto-flow</p>
            <div className="daily-start-arrow">
              <span>Tap to begin</span>
              <span>→</span>
            </div>
          </>
        )}
      </div>

      {/* Practice section */}
      <p className="section-label" style={{marginTop:'1.25rem'}}>practise a subject</p>
      {Object.entries(SUBJECT_CONFIG).map(([key, cfg]) => {
        const xp = subjects[key]?.xp || 0;
        const level = getLevelFromXP(xp);
        const pct = getXPPercent(xp);
        return (
          <button key={key} className="subject-btn" onClick={() => onStartPractice(key)}>
            <span className="subject-emoji">{cfg.emoji}</span>
            <div className="subject-info">
              <div className="subject-row">
                <span className="subject-name">{cfg.label}</span>
                <span className="badge" style={{background: cfg.bg, color: cfg.text}}>Lv {level}</span>
              </div>
              <div className="progress-track">
                <div className="progress-fill" style={{width:`${pct}%`, background: cfg.bar}}/>
              </div>
            </div>
          </button>
        );
      })}

      <div className="divider"/>
      <p className="muted small center">progress saves in your browser</p>

      {/* Dev reset — remove before going public */}
      <button
        className="dev-reset"
        onClick={() => {
          ['mm_subjects_v2','mm_streak_v2','mm_daily_v2','mm_5050_v2','mm_seen_quotes','mm_daily_quote']
            .forEach(k => localStorage.removeItem(k));
          window.location.reload();
        }}
      >
        dev reset
      </button>
    </div>
  );
}
