import { useState } from 'react';
import { SUBJECT_CONFIG } from '../data/questions';
import { SUBJECT_COLORS } from '../data/themes';
import { getLevelFromXP } from '../utils/gameUtils';
import { getSoundEnabled, setSoundEnabled, playSound } from '../utils/sound';

export default function SettingsScreen({ subjects, streak, stats, onHome, onRedoCalibration }) {
  const [soundOn, setSoundOn] = useState(getSoundEnabled());
  const totalAnswered = stats?.totalAnswered || 0;
  const totalCorrect = stats?.totalCorrect || 0;
  const accuracy = totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : 0;
  const longestStreak = Math.max(stats?.longestStreak || 0, streak?.count || 0);

  function toggleSound() {
    const next = !soundOn;
    setSoundOn(next);
    setSoundEnabled(next);
    if (next) playSound('tap'); // small confirmation it's working
  }

  return (
    <div className="screen-inner">
      <div className="quiz-top-row">
        <button className="back-btn" onClick={onHome}>← Back</button>
        <span className="t-secondary small">Settings</span>
      </div>

      <p className="app-title" style={{ marginBottom: '1rem' }}>Your stats</p>

      <div className="stats-row">
        <div className="stat-box">
          <p className="stat-num">{stats?.daysCompleted || 0}</p>
          <p className="t-secondary small">days completed</p>
        </div>
        <div className="stat-box">
          <p className="stat-num">{longestStreak} 🔥</p>
          <p className="t-secondary small">longest streak</p>
        </div>
        <div className="stat-box">
          <p className="stat-num">{accuracy}%</p>
          <p className="t-secondary small">accuracy</p>
        </div>
      </div>

      <p className="t-secondary small center" style={{ marginBottom: '1.25rem' }}>
        {totalAnswered} questions answered, {totalCorrect} correct, all-time
      </p>

      <div className="divider" />

      <p className="section-label">your levels</p>
      {Object.entries(SUBJECT_CONFIG).map(([key, cfg]) => {
        const xp = subjects[key]?.xp || 0;
        const level = getLevelFromXP(xp);
        const sc = SUBJECT_COLORS[key];
        return (
          <div key={key} className="rc-row">
            <div className="rc-tile" style={{ background: sc.bg, color: sc.color, borderColor: sc.border }}>
              {cfg.label.slice(0, 2)}
            </div>
            <span className="rc-name" style={{ flex: 1 }}>{cfg.label}</span>
            <span className="lv-badge" style={{ background: sc.bg, color: sc.color }}>Level {level}</span>
          </div>
        );
      })}

      <div className="divider" />

      <p className="section-label">preferences</p>
      <button className="settings-toggle-row" onClick={toggleSound}>
        <span className="settings-toggle-label">🔊 Sound effects</span>
        <span className={`toggle-switch${soundOn ? ' toggle-switch--on' : ''}`}>
          <span className="toggle-switch-knob" />
        </span>
      </button>

      <div className="divider" />

      <button className="btn-secondary" style={{ marginTop: 0 }} onClick={onRedoCalibration}>
        Redo difficulty calibration
      </button>
      <p className="t-secondary small center" style={{ marginTop: 8 }}>
        This resets your subject levels back to a fresh starting point — your stats above are kept.
      </p>
    </div>
  );
}
