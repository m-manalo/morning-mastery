import { SUBJECT_CONFIG, QS_PER_SESSION, XP_PER_LEVEL } from '../data/questions';
import { getLevelFromXP, getXPPercent, getXPInLevel } from '../utils/gameUtils';

export default function ResultsScreen({ result, subjects, streak, prevLevels, onHome, onRetry }) {
  const { score, xpEarned, subject } = result;
  const newLevel = getLevelFromXP(subjects[subject]?.xp || 0);
  const leveledUp = newLevel > (prevLevels[subject] || 1);

  return (
    <div className="screen">
      <p className="title" style={{ marginBottom: '0.25rem' }}>Session complete</p>
      <p className="muted small" style={{ marginBottom: '1.25rem' }}>
        {SUBJECT_CONFIG[subject].label} — session summary
      </p>

      <div className="stats-row">
        <div className="stat-box">
          <p className="stat-num">{score} / {QS_PER_SESSION}</p>
          <p className="muted small">correct</p>
        </div>
        <div className="stat-box">
          <p className="stat-num">+{xpEarned}</p>
          <p className="muted small">xp earned</p>
        </div>
        <div className="stat-box">
          <p className="stat-num">{streak.count || 1} 🔥</p>
          <p className="muted small">day streak</p>
        </div>
      </div>

      {leveledUp && (
        <div className="level-up-banner">
          <strong>Level up!</strong> You reached Level {newLevel} in {SUBJECT_CONFIG[subject].label}.
        </div>
      )}

      <div className="divider" />
      <p className="section-label">your progress</p>

      {Object.entries(SUBJECT_CONFIG).map(([key, cfg]) => {
        const xp = subjects[key]?.xp || 0;
        const lv = getLevelFromXP(xp);
        const pct = getXPPercent(xp);
        const xpIn = getXPInLevel(xp);
        return (
          <div key={key} className="topic-row">
            <span className="topic-label">{cfg.label}</span>
            <div className="progress-track" style={{ flex: 1 }}>
              <div className="progress-fill" style={{ width: `${pct}%`, background: cfg.bar }} />
            </div>
            <span className="badge" style={{ background: cfg.bg, color: cfg.text, minWidth: 38, textAlign: 'center' }}>
              Lv {lv}
            </span>
            <span className="muted small xp-label">{xpIn}/{XP_PER_LEVEL} xp</span>
          </div>
        );
      })}

      <button className="btn-primary" onClick={onHome}>Back to subjects</button>
      <button className="btn-secondary" onClick={onRetry}>Play again</button>
    </div>
  );
}
