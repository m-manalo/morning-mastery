import { SUBJECT_CONFIG } from '../data/questions';
import { getLevelFromXP, getXPPercent } from '../utils/gameUtils';

export default function HomeScreen({ subjects, streak, onStart }) {
  return (
    <div className="screen">
      <div className="home-header">
        <div>
          <p className="muted small">Good morning</p>
          <h1 className="title">Morning Mastery</h1>
        </div>
        <div className="streak-box">
          <p className="streak-num">{streak.count || 0} 🔥</p>
          <p className="muted small">day streak</p>
        </div>
      </div>

      <p className="section-label">choose a subject</p>

      {Object.entries(SUBJECT_CONFIG).map(([key, cfg]) => {
        const xp = subjects[key]?.xp || 0;
        const level = getLevelFromXP(xp);
        const pct = getXPPercent(xp);
        return (
          <button key={key} className="subject-btn" onClick={() => onStart(key)}>
            <span className="subject-emoji">{cfg.emoji}</span>
            <div className="subject-info">
              <div className="subject-row">
                <span className="subject-name">{cfg.label}</span>
                <span className="badge" style={{ background: cfg.bg, color: cfg.text }}>
                  Lv {level}
                </span>
              </div>
              <div className="progress-track">
                <div
                  className="progress-fill"
                  style={{ width: `${pct}%`, background: cfg.bar }}
                />
              </div>
            </div>
          </button>
        );
      })}

      <div className="divider" />
      <p className="muted small center">Progress saves automatically in your browser</p>
    </div>
  );
}
