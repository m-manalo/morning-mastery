import { SUBJECT_CONFIG, XP_PER_LEVEL } from '../data/questions';
import { getLevelFromXP, getXPPercent, getXPInLevel } from '../utils/gameUtils';

export default function PracticeResultsScreen({ result, subjects, prevLevels, onHome, onRetry }) {
  const { score, xpEarned, subject } = result;
  const cfg = SUBJECT_CONFIG[subject];
  const newLevel = getLevelFromXP(subjects[subject]?.xp || 0);
  const leveledUp = newLevel > (prevLevels[subject] || 1);
  const xpIn = getXPInLevel(subjects[subject]?.xp || 0);
  const pct = getXPPercent(subjects[subject]?.xp || 0);

  return (
    <div className="screen-inner">

      {/* Level up moment */}
      {leveledUp ? (
        <div className="levelup-moment">
          <div className="levelup-icon">
            <span style={{fontSize:28}}>🏆</span>
          </div>
          <p className="title" style={{marginBottom:4}}>Level up!</p>
          <p className="muted small" style={{marginBottom:'1rem'}}>
            You reached <strong>Level {newLevel}</strong> in {cfg.label}
          </p>
          <div style={{display:'flex', gap:8, justifyContent:'center', flexWrap:'wrap'}}>
            <span className="badge" style={{background: cfg.bg, color: cfg.text}}>
              Lv {newLevel - 1} → Lv {newLevel}
            </span>
            <span className="badge" style={{background:'#EAF3DE', color:'#3B6D11'}}>
              +100 xp milestone
            </span>
          </div>
        </div>
      ) : (
        <div style={{textAlign:'center', marginBottom:'1.25rem'}}>
          <div className="complete-icon" style={{background: cfg.bg}}>
            <span style={{fontSize:24}}>{cfg.emoji}</span>
          </div>
          <p className="title" style={{marginBottom:4}}>{cfg.label} session done</p>
          <p className="muted small">{score} of 5 correct</p>
        </div>
      )}

      {/* Stats */}
      <div className="stats-row">
        <div className="stat-box">
          <p className="stat-num">{score}/5</p>
          <p className="muted small">correct</p>
        </div>
        <div className="stat-box">
          <p className="stat-num">+{xpEarned}</p>
          <p className="muted small">xp earned</p>
        </div>
        <div className="stat-box">
          <p className="stat-num">Lv {newLevel}</p>
          <p className="muted small">{cfg.label}</p>
        </div>
      </div>

      {/* XP bar for this subject */}
      <div className="divider"/>
      <p className="section-label">{cfg.label} progress</p>
      <div style={{display:'flex', alignItems:'center', gap:10, marginBottom:4}}>
        <span className="muted small">Level {newLevel}</span>
        <div className="progress-track" style={{flex:1}}>
          <div className="progress-fill" style={{width:`${pct}%`, background: cfg.bar, transition:'width 0.6s ease'}}/>
        </div>
        <span className="muted small">{xpIn}/{XP_PER_LEVEL} xp</span>
      </div>
      <p className="muted small" style={{marginBottom:'1.25rem'}}>
        {XP_PER_LEVEL - xpIn} xp until Level {newLevel + 1}
      </p>

      <button className="btn-primary" onClick={onRetry}>Play again</button>
      <button className="btn-secondary" onClick={onHome}>Back to home</button>
    </div>
  );
}
