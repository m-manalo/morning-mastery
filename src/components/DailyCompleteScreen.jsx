import { useState, useEffect } from 'react';
import { SUBJECT_CONFIG, XP_PER_LEVEL } from '../data/questions';
import { SUBJECT_COLORS } from '../data/themes';
import { getLevelFromXP, getXPPercent, getXPInLevel, getWeekStreak, getStreakMilestone } from '../utils/gameUtils';
import { getDailyQuote } from '../data/quotes';
import { getPerspectiveLine } from '../data/perspectives';
import { shareResult } from './ShareResult';
import { playSound } from '../utils/sound';

function milestoneCopy(n) {
  if (n >= 365) return "A Full Year 🎉";
  if (n >= 200) return "Serious Dedication";
  if (n >= 100) return "Triple Digits!";
  if (n >= 50) return "Half a Century";
  if (n >= 30) return "A Month Strong";
  if (n >= 14) return "Two Weeks In";
  if (n >= 7) return "One Week Strong";
  return "Off to a Great Start";
}

export default function DailyCompleteScreen({ results, subjects, streak, prevLevels, stats, onHome, onReview }) {
  const [savedQuote, setSavedQuote] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);
  const quote = getDailyQuote();
  const weekDays = getWeekStreak(streak);
  const totalCorrect = Object.values(results).filter(r => r?.correct).length;
  const totalSubjects = Object.keys(SUBJECT_CONFIG).length;
  const wrongSubjects = Object.entries(results).filter(([, v]) => v && v.correct === false).map(([k]) => k);
  const levelUps = Object.keys(SUBJECT_CONFIG).filter(k => {
    return getLevelFromXP(subjects[k]?.xp || 0) > (prevLevels[k] || 1);
  });
  const milestone = getStreakMilestone(streak.count || 0);

  useEffect(() => {
    playSound(milestone ? 'milestone' : 'complete');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleShare() {
    shareResult(
      { streakCount: streak.count || 1, correctCount: totalCorrect, totalCount: totalSubjects },
      () => { setShareCopied(true); setTimeout(() => setShareCopied(false), 2000); }
    );
  }

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

      {milestone && (
        <div className="milestone-card">
          <div className="milestone-badge">
            <span className="milestone-badge-num">{milestone}</span>
            <span className="milestone-badge-lbl">DAYS</span>
          </div>
          <p className="milestone-title">{milestoneCopy(milestone)}</p>
          <p className="milestone-perspective">{getPerspectiveLine(stats, milestone)}</p>
        </div>
      )}

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
        const correct = results[key]?.correct;
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
              Missed {wrongSubjects.map(k => SUBJECT_CONFIG[k].label).join(' & ')}?
            </p>
            <button className="nudge-link" onClick={() => onReview(wrongSubjects[0])}>
              Read why →
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

      <button className="btn-secondary" style={{ marginTop: 8 }} onClick={handleShare}>
        {shareCopied ? 'Copied to clipboard ✓' : 'Share today\'s result'}
      </button>

      <button className="btn-primary" onClick={onHome}>Done for today</button>
    </div>
  );
}
