import { useState, useEffect } from 'react';
import { SUBJECT_CONFIG, XP_PER_CORRECT } from '../data/questions';

export default function QuizScreen({ subject, questions, isBonus, fiftyFiftyUses, onUseFiftyFifty, onComplete, onHome }) {
  const cfg = SUBJECT_CONFIG[subject];
  const total = questions.length;

  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [xpEarned, setXpEarned] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [eliminated, setEliminated] = useState([]);

  const q = questions[current];
  const progress = Math.round((current / total) * 100);
  const isLast = current + 1 >= total;

  useEffect(() => {
    setSelected(null);
    setAnswered(false);
    setEliminated([]);
  }, [current]);

  function handleFiftyFifty() {
    if (fiftyFiftyUses <= 0 || answered || eliminated.length > 0) return;
    const wrongIdxs = q.opts
      .map((_, i) => i)
      .filter(i => i !== q.a);
    const toEliminate = shuffleTwo(wrongIdxs).slice(0, 2);
    setEliminated(toEliminate);
    onUseFiftyFifty();
  }

  function shuffleTwo(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function handleAnswer(idx) {
    if (answered || eliminated.includes(idx)) return;
    setSelected(idx);
    setAnswered(true);

    if (idx === q.a) {
      setScore(s => s + 1);
      setXpEarned(x => x + XP_PER_CORRECT);
    }
  }

  function handleNext() {
    if (isLast) {
      onComplete({ score: selected === q.a ? score + 1 : score, xpEarned: selected === q.a ? xpEarned + XP_PER_CORRECT : xpEarned, subject });
    } else {
      setCurrent(c => c + 1);
    }
  }

  // Use state values for final question since setState is async
  const finalScore = answered ? (selected === q.a ? score + 1 : score) : score;
  const finalXp = answered ? (selected === q.a ? xpEarned + XP_PER_CORRECT : xpEarned) : xpEarned;

  function getOptClass(idx) {
    if (eliminated.includes(idx)) return 'opt-btn eliminated';
    if (!answered) return 'opt-btn';
    if (idx === q.a) return 'opt-btn correct';
    if (idx === selected && selected !== q.a) return 'opt-btn wrong';
    return 'opt-btn dim';
  }

  return (
    <div className="screen-inner">
      {/* Header */}
      <div className="quiz-header">
        <button className="back-btn" onClick={onHome}>← Back</button>
        <span className="badge" style={{ background: cfg.bg, color: cfg.text }}>
          {isBonus ? `${cfg.label} · Bonus` : cfg.label}
        </span>
        <button
          className={`fifty-btn ${fiftyFiftyUses <= 0 || answered || eliminated.length > 0 ? 'fifty-disabled' : ''}`}
          onClick={handleFiftyFifty}
          title="50/50 — removes two wrong answers"
        >
          50/50 <span className="fifty-count">{fiftyFiftyUses}</span>
        </button>
      </div>

      {/* Progress */}
      {total > 1 && (
        <div className="progress-track" style={{ marginBottom: '1rem' }}>
          <div className="progress-fill" style={{ width: `${progress}%`, background: cfg.bar }} />
        </div>
      )}
      {total > 1 && (
        <p className="muted small" style={{ marginBottom: '0.5rem' }}>
          Question {current + 1} of {total}
        </p>
      )}

      {/* Question */}
      <p className="question-text">{q.q}</p>

      {/* Options */}
      <div className="options">
        {q.opts.map((opt, i) => (
          <button
            key={i}
            className={getOptClass(i)}
            onClick={() => handleAnswer(i)}
            disabled={answered || eliminated.includes(i)}
          >
            {eliminated.includes(i) ? <span className="strike">{opt}</span> : opt}
          </button>
        ))}
      </div>

      {/* Feedback — fixed height reserved */}
      <div className="feedback-area">
        {answered ? (
          <div
            className="feedback"
            style={selected === q.a
              ? { background: '#EAF3DE', color: '#27500A' }
              : { background: '#FCEBEB', color: '#791F1F' }
            }
          >
            <strong>{selected === q.a ? `Correct! +${XP_PER_CORRECT} xp` : 'Incorrect.'}</strong>
            {' — '}{q.exp}
          </div>
        ) : (
          <div className="feedback-placeholder" />
        )}
      </div>

      {/* Next button — always in same position */}
      <button
        className="btn-primary"
        onClick={() => onComplete({ score: finalScore, xpEarned: finalXp, subject })}
        style={{ opacity: answered ? 1 : 0, pointerEvents: answered ? 'auto' : 'none' }}
      >
        {isLast ? 'See results →' : 'Next question →'}
      </button>
    </div>
  );
}
