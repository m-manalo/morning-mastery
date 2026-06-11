import { useState } from 'react';
import { SUBJECT_CONFIG, XP_PER_LEVEL } from '../data/questions';
import { SUBJECT_COLORS } from '../data/themes';
import { getLevelFromXP, getXPPercent, getXPInLevel, getWeekStreak } from '../utils/gameUtils';
import { getDailyQuote } from '../data/quotes';

export default function DailyCompleteScreen({ results, subjects, streak, prevLevels, onHome, onPractice }) {
  const [savedQuote, setSavedQuote] = useState(false);
  const quote = getDailyQuote();
  const weekDays = getWeekStreak(streak);
  const totalCorrect = Object.values(results).filter(Boolean).length;
  const totalSubjects = Object.keys(SUBJECT_CONFIG).length;
  const wrongSubjects = Object.entries(results).filter(([, v]) => v === false).map(([k]) => k);
  const levelUps = Object.keys(SUBJECT_CONFIG).filter(k => {
    return getLevelFromXP(subjects[k]?.xp || 0) > (prevLevels[k] || 1);
  });

  return (
    <div className="screen-inner">
      <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
        <div className="result-icon">
          <span style={{ fontSize: 28 }}>
            {totalCorrect === totalSubjects ? '🎉' : totalCorrect >= 3 ? '👍' : '💪'}
          </span>
        </div>
        <p className="app-title" style={{ marginBottom: 4 }}>
          {totalCorrect === totalSubjects ? 'Perfect score!' : `${totalCorrect} of ${totalSubjects} correct`}
        </p>
        <p className="t-secondary small">{streak.count || 1} day streak 🔥</p>
      </div>

      {/* Week calendar */}
      <div className="week-row">
        {weekDays.map((d, i) => (
          <div key={i} className="week-day">
            <div className={`week-dot${d.played ? ' week-dot--done' : d.isToday ? ' week-dot--today' : ' week-dot--empty'}`} />
            <span className={`week-lbl${d.isToday ? ' week-lbl--today' : ''}`}>{d.label}</span>
          </div>
        ))}
      </div>

      {levelUps.length > 0 && (
        <div className="levelup-banner">
          🏆 <strong>Level up{levelUps.length > 1 ? 's' : ''}!</strong>{' '}
          {levelUps.map(k => SUBJECT_CONFIG[k].label).join(', ')}
        </div>
      )}

      <div className="divider" />
      <p className="section-label">today's results</p>

      {Object.entries(SUBJECT_CONFIG).map(([key, cfg]) => {
        const xp = subjects[key]?.xp || 0;
        const lv = getLevelFromXP(xp);
        const pct = getXPPercent(xp);
        const sc = SUBJECT_COLORS[key];
        const correct = results[key];
        return (
          <div key={key} className="rc-row">
            <div className="rc-tile" style={{ background: sc.bg, color: sc.color, borderColor: sc.border }}>
              {cfg.label.slice(0, 2)}
            </div>
            <span className="rc-name">{cfg.label}</span>
            <div className="rc-bar">
              <div className="rc-fill" style={{ width: `${pct}%`, background: sc.bar }} />
            </div>
            <span className="lv-badge" style={{ background: sc.bg, color: sc.color, minWidth: 34, textAlign: 'center' }}>
              Lv {lv}
            </span>
            {correct === true  && <span className="result-tick correct">✓</span>}
            {correct === false && <span className="result-tick wrong">✗</span>}
          </div>
        );
      })}

      {wrongSubjects.length > 0 && (
        <div className="nudge-box">
          <span style={{ fontSize: 15 }}>💡</span>
          <div>
            <p style={{ fontSize: 13, color: 'var(--text)', margin: 0 }}>
              Struggled with {wrongSubjects.map(k => SUBJECT_CONFIG[k].label).join(' & ')}?
            </p>
            <button className="nudge-link" onClick={() => onPractice(wrongSubjects[0])}>
              Practise {SUBJECT_CONFIG[wrongSubjects[0]].label} now →
            </button>
          </div>
        </div>
      )}

      <div className="divider" />

      {/* Quote */}
      <div className="quote-box">
        <p className="quote-text">"{quote.text}"</p>
        <div className="quote-footer">
          <p className="quote-author">— {quote.author}</p>
          <button
            className={`quote-heart${savedQuote ? ' quote-heart--saved' : ''}`}
            onClick={() => setSavedQuote(s => !s)}
          >
            {savedQuote ? '♥' : '♡'}
          </button>
        </div>
      </div>

      <button className="btn-primary" onClick={onHome}>Done for today</button>
    </div>
  );
}
