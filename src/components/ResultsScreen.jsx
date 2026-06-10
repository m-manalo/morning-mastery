import { SUBJECT_CONFIG, XP_PER_LEVEL } from '../data/questions';
import { getLevelFromXP, getXPPercent, getXPInLevel } from '../utils/gameUtils';

export default function ResultsScreen({ result, subjects, streak, prevLevels, onHome, onBonus }) {
  const { score, xpEarned, subject, isBonus } = result;
  const cfg = SUBJECT_CONFIG[subject];
  const newLevel = getLevelFromXP(subjects[subject]?.xp || 0);
  const leveledUp = newLevel > (prevLevels[subject] || 1);
  const correct = score > 0;

  return (
    <div className="screen-inner">
      <p className="title" style={{ marginBottom: '0.25rem' }}>
        {correct ? 'Nice work!' : 'Keep practising'}
      </p>
      <p className="muted small" style={{ marginBottom: '1.25rem' }}>
        {cfg.label}{isBonus ? ' · Bonus round' : ' · Daily question'}
      </p>

      <div className="stats-row">
        <div className="stat-box">
          <p className="stat-num">{correct ? '✓' : '✗'}</p>
          <p className="muted small">{correct ? 'correct' : 'incorrect'}</p>
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
          <strong>Level up!</strong> You reached Level {newLevel} in {cfg.label}.
        </div>
      )}

      <div className="divider" />
      <p className="section-label">your progress</p>

      {Object.entries(SUBJECT_CONFIG).map(([key, c]) => {
        const xp = subjects[key]?.xp || 0;
        const lv = getLevelFromXP(xp);
        const pct = getXPPercent(xp);
        const xpIn = getXPInLevel(xp);
        return (
          <div key={key} className="topic-row">
            <span className="topic-label">{c.label}</span>
            <div className="progress-track" style={{ flex: 1 }}>
              <div className="progress-fill" style={{ width: `${pct}%`, background: c.bar }} />
            </div>
            <span className="badge" style={{ background: c.bg, color: c.text, minWidth: 38, textAlign: 'center' }}>
              Lv {lv}
            </span>
            <span className="muted small xp-label">{xpIn}/{XP_PER_LEVEL}</span>
          </div>
        );
      })}

      {!isBonus && (
        <button className="btn-bonus" onClick={onBonus}>
          Keep going — bonus round ↗
        </button>
      )}
      <button className="btn-primary" onClick={onHome}>Back to subjects</button>
    </div>
  );
}
