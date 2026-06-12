import { useState } from 'react';
import { SUBJECT_CONFIG, DIFFICULTY_LABELS } from '../data/questions';
import { SUBJECT_COLORS } from '../data/themes';

const STEPS = { WELCOME: 0, CALIBRATE: 1, CONFIRM: 2 };

export default function OnboardingScreen({ onComplete }) {
  const [step, setStep] = useState(STEPS.WELCOME);
  const [choices, setChoices] = useState(
    Object.fromEntries(Object.keys(SUBJECT_CONFIG).map(k => [k, 'beginner']))
  );

  function setChoice(subject, key) {
    setChoices(prev => ({ ...prev, [subject]: key }));
  }

  function finish() {
    // Convert choices into starting levels per subject
    const levels = {};
    Object.entries(choices).forEach(([subject, key]) => {
      const def = DIFFICULTY_LABELS.find(d => d.key === key);
      levels[subject] = def ? def.level : 1;
    });
    onComplete(levels);
  }

  return (
    <div className="screen-inner">
      {/* Step dots */}
      <div className="onboard-dots">
        <div className={`onboard-dot${step >= 0 ? ' onboard-dot--active' : ''}`} />
        <div className={`onboard-dot${step >= 1 ? ' onboard-dot--active' : ''}`} />
        <div className={`onboard-dot${step >= 2 ? ' onboard-dot--active' : ''}`} />
      </div>

      {/* STEP 1 — Welcome */}
      {step === STEPS.WELCOME && (
        <>
          <div className="onboard-icon">
            <span style={{ fontSize: 32 }}>☀️</span>
          </div>
          <p className="app-title" style={{ textAlign: 'center', marginBottom: 6 }}>
            Welcome to Morning Mastery
          </p>
          <p className="t-secondary small" style={{ textAlign: 'center', marginBottom: '1.25rem', lineHeight: 1.5 }}>
            A short daily ritual to wake your brain up and learn something new — every morning, in under 3 minutes.
          </p>

          <div className="onboard-feature">
            <div className="onboard-feature-icon">💡</div>
            <div>
              <p className="onboard-feature-title">One question per subject</p>
              <p className="t-secondary small">5 subjects, 5 quick questions, done.</p>
            </div>
          </div>
          <div className="onboard-feature">
            <div className="onboard-feature-icon">📈</div>
            <div>
              <p className="onboard-feature-title">Questions grow with you</p>
              <p className="t-secondary small">Each subject levels up independently as you improve.</p>
            </div>
          </div>
          <div className="onboard-feature">
            <div className="onboard-feature-icon">🔥</div>
            <div>
              <p className="onboard-feature-title">Build a streak</p>
              <p className="t-secondary small">Come back daily to keep it going.</p>
            </div>
          </div>

          <button className="btn-primary" onClick={() => setStep(STEPS.CALIBRATE)}>
            Let's get started →
          </button>
        </>
      )}

      {/* STEP 2 — Calibrate */}
      {step === STEPS.CALIBRATE && (
        <>
          <p className="app-title" style={{ marginBottom: 6 }}>How confident are you?</p>
          <p className="t-secondary small" style={{ marginBottom: '1rem', lineHeight: 1.5 }}>
            Pick a starting point for each subject. You can always level up or down as you play — this just sets day one.
          </p>

          {Object.entries(SUBJECT_CONFIG).map(([key, cfg]) => {
            const sc = SUBJECT_COLORS[key];
            return (
              <div key={key} className="onboard-subject-card">
                <div className="onboard-subject-top">
                  <div className="sub-tile" style={{ background: sc.bg, color: sc.color, borderColor: sc.border }}>
                    {cfg.label.slice(0, 2)}
                  </div>
                  <span className="sub-name">{cfg.label}</span>
                </div>
                <div className="onboard-diff-row">
                  {DIFFICULTY_LABELS.map(d => (
                    <button
                      key={d.key}
                      className={`onboard-diff-pill${choices[key] === d.key ? ' onboard-diff-pill--selected' : ''}`}
                      onClick={() => setChoice(key, d.key)}
                    >
                      {d.label}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}

          <button className="btn-primary" onClick={() => setStep(STEPS.CONFIRM)}>
            Continue →
          </button>
        </>
      )}

      {/* STEP 3 — Confirm */}
      {step === STEPS.CONFIRM && (
        <>
          <p className="app-title" style={{ marginBottom: 6 }}>You're all set</p>
          <p className="t-secondary small" style={{ marginBottom: '1rem', lineHeight: 1.5 }}>
            Here's where each subject starts. Your daily question difficulty will match this — and adjust as you go.
          </p>

          {Object.entries(SUBJECT_CONFIG).map(([key, cfg]) => {
            const sc = SUBJECT_COLORS[key];
            const def = DIFFICULTY_LABELS.find(d => d.key === choices[key]);
            const level = def ? def.level : 1;
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

          <div className="nudge-box" style={{ marginTop: 10 }}>
            <span style={{ fontSize: 15 }}>💡</span>
            <p style={{ fontSize: 12, color: 'var(--text)', margin: 0, lineHeight: 1.5 }}>
              Don't worry — these aren't locked in. Get a few wrong and we'll ease off; get a streak going and we'll ramp up.
            </p>
          </div>

          <button className="btn-primary" onClick={finish}>
            Start my first daily →
          </button>
        </>
      )}
    </div>
  );
}
