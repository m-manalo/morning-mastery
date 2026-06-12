import { SUBJECT_CONFIG, XP_PER_LEVEL } from '../data/questions';
import { SUBJECT_COLORS } from '../data/themes';
import { getLevelFromXP, getXPPercent, getXPInLevel } from '../utils/gameUtils';

export default function PracticeResultsScreen({ result, subjects, prevLevels, onHome, onRetry }) {
  const { score, xpEarned, subject } = result;
  const cfg = SUBJECT_CONFIG[subject];
  const sc = SUBJECT_COLORS[subject];
  const newLevel = getLevelFromXP(subjects[subject]?.xp || 0);
  const leveledUp = newLevel > (prevLevels[subject] || 1);
  const xpIn = getXPInLevel(subjects[subject]?.xp || 0);
  const pct = getXPPercent(subjects[subject]?.xp || 0);

  return (
    <div className="screen-inner">
      {leveledUp ? (
        <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
          <div className="result-icon" style={{ animation: 'popIn 0.4s cubic-bezier(0.34,1.56,0.64,1)' }}>
            <span style={{ fontSize: 28 }}>🏆</span>
          </div>
          <p className="app-title" style={{ marginBottom: 4 }}>Level up!</p>
          <p className="t-secondary small">You reached <strong>Level {newLevel}</strong> in {cfg.label}</p>
          <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginTop: 10, flexWrap: 'wrap' }}>
            <span className="lv-badge" style={{ background: sc.bg, color: sc.color }}>Lv {newLevel - 1} → Lv {newLevel}</span>
            <span className="lv-badge" style={{ background: '#EAF3DE', color: '#3B6D11' }}>+100 xp milestone</span>
          </div>
        </div>
      ) : (
        <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
          <div className="result-icon">
            <span style={{ fontSize: 26 }}>{score >= 4 ? '🌟' : score >= 3 ? '👍' : '💪'}</span>
          </div>
          <p className="app-title" style={{ marginBottom: 4 }}>{cfg.label} done</p>
          <p className="t-secondary small">{score} of 5 correct</p>
        </div>
      )}

      <div className="stats-row">
        <div className="stat-box">
          <p className="stat-num">{score}/5</p>
          <p className="t-secondary small">correct</p>
        </div>
        <div className="stat-box">
          <p className="stat-num" style={{ color: 'var(--accent)' }}>+{xpEarned}</p>
          <p className="t-secondary small">xp earned</p>
        </div>
        <div className="stat-box">
          <p className="stat-num">Lv {newLevel}</p>
          <p className="t-secondary small">{cfg.label}</p>
        </div>
      </div>

      <div className="divider" />
      <p className="section-label">{cfg.label} progress</p>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
        <span className="t-secondary small">Level {newLevel}</span>
        <div className="bar-track" style={{ flex: 1 }}>
          <div className="bar-fill" style={{ width: `${pct}%`, background: sc.bar }} />
        </div>
        <span className="t-secondary small">{xpIn}/{XP_PER_LEVEL} xp</span>
      </div>
      <p className="t-secondary small" style={{ marginBottom: '1.25rem' }}>
        {XP_PER_LEVEL - xpIn} xp until Level {newLevel + 1}
      </p>

      <p className="t-secondary small center" style={{ marginBottom: '0.75rem' }}>
        That's your practice for {cfg.label} today — come back tomorrow for another round.
      </p>
      <button className="btn-primary" onClick={onHome}>Back to home</button>
    </div>
  );
}
