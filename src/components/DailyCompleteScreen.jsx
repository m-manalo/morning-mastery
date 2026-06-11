import { SUBJECT_CONFIG, XP_PER_LEVEL } from '../data/questions';
import { getLevelFromXP, getXPPercent, getXPInLevel, getWeekStreak } from '../utils/gameUtils';
import { getDailyQuote } from '../data/quotes';
import { useState } from 'react';

export default function DailyCompleteScreen({ results, subjects, streak, prevLevels, onHome, onPractice }) {
  const quote = getDailyQuote();
  const [savedQuote, setSavedQuote] = useState(false);
  const weekDays = getWeekStreak(streak);

  const totalCorrect = Object.values(results).filter(Boolean).length;
  const totalSubjects = Object.keys(SUBJECT_CONFIG).length;

  const levelUps = Object.keys(SUBJECT_CONFIG).filter(key => {
    const newLv = getLevelFromXP(subjects[key]?.xp || 0);
    return newLv > (prevLevels[key] || 1);
  });

  const wrongSubjects = Object.entries(results)
    .filter(([, correct]) => correct === false)
    .map(([key]) => key);

  return (
    <div className="screen-inner">

      {/* Score summary */}
      <div style={{textAlign:'center', marginBottom:'1.25rem'}}>
        <div className="complete-icon">
          <span style={{fontSize:28}}>{totalCorrect === totalSubjects ? '🎉' : totalCorrect >= 3 ? '👍' : '💪'}</span>
        </div>
        <p className="title" style={{marginBottom:4}}>
          {totalCorrect === totalSubjects ? 'Perfect score!' : `${totalCorrect} of ${totalSubjects} correct`}
        </p>
        <p className="muted small">{streak.count || 1} day streak 🔥</p>
      </div>

      {/* Week calendar */}
      <div className="week-row">
        {weekDays.map((d, i) => (
          <div key={i} className="week-day">
            <div className={`week-dot ${d.played ? 'week-dot--played' : ''} ${d.isToday ? 'week-dot--today' : ''} ${d.isFuture ? 'week-dot--future' : ''}`}/>
            <span className={`week-label ${d.isToday ? 'week-label--today' : ''}`}>{d.label}</span>
          </div>
        ))}
      </div>

      {/* Level ups */}
      {levelUps.length > 0 && (
        <div className="levelup-banner">
          <span style={{fontSize:16}}>🏆</span>
          <span>
            <strong>Level up{levelUps.length > 1 ? 's' : ''}!</strong>
            {' '}{levelUps.map(k => SUBJECT_CONFIG[k].label).join(', ')}
          </span>
        </div>
      )}

      <div className="divider"/>

      {/* Subject breakdown */}
      <p className="section-label">today's results</p>
      {Object.entries(SUBJECT_CONFIG).map(([key, cfg]) => {
        const xp = subjects[key]?.xp || 0;
        const lv = getLevelFromXP(xp);
        const pct = getXPPercent(xp);
        const correct = results[key];
        return (
          <div key={key} className="rc-row">
            <div className="rc-icon" style={{background: cfg.bg}}>
              <span style={{fontSize:13}}>{cfg.emoji}</span>
            </div>
            <span className="topic-label">{cfg.label}</span>
            <div className="xp-bar" style={{flex:1}}>
              <div className="xp-f" style={{width:`${pct}%`, background: cfg.bar}}/>
            </div>
            <span className="badge" style={{background: cfg.bg, color: cfg.text, minWidth:36, textAlign:'center'}}>
              Lv {lv}
            </span>
            {correct === true && <span className="result-icon result-icon--correct">✓</span>}
            {correct === false && <span className="result-icon result-icon--wrong">✗</span>}
          </div>
        );
      })}

      {/* Nudge to practice */}
      {wrongSubjects.length > 0 && (
        <div className="nudge-box">
          <span style={{fontSize:14}}>💡</span>
          <div>
            <p style={{fontSize:13, color:'var(--color-text-primary)', margin:0}}>
              Struggled with {wrongSubjects.map(k => SUBJECT_CONFIG[k].label).join(' & ')}?
            </p>
            <button className="nudge-link" onClick={() => onPractice(wrongSubjects[0])}>
              Practise {SUBJECT_CONFIG[wrongSubjects[0]].label} now →
            </button>
          </div>
        </div>
      )}

      <div className="divider"/>

      {/* Quote */}
      <div className="quote-box">
        <p className="quote-text">"{quote.text}"</p>
        <div className="quote-footer">
          <p className="quote-author">— {quote.author}</p>
          <button
            className={`quote-save ${savedQuote ? 'quote-save--saved' : ''}`}
            onClick={() => setSavedQuote(s => !s)}
            aria-label="Save quote"
          >
            {savedQuote ? '♥' : '♡'}
          </button>
        </div>
      </div>

      <button className="btn-primary" onClick={onHome}>Done for today</button>
    </div>
  );
}
