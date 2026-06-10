import { useState, useEffect } from 'react';
import { SUBJECT_CONFIG, MAX_LIVES, QS_PER_SESSION, XP_PER_CORRECT } from '../data/questions';

export default function QuizScreen({ subject, questions, onComplete, onGameOver }) {
  const cfg = SUBJECT_CONFIG[subject];
  const [current, setCurrent] = useState(0);
  const [lives, setLives] = useState(MAX_LIVES);
  const [score, setScore] = useState(0);
  const [xpEarned, setXpEarned] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);

  const q = questions[current];
  const progress = Math.round((current / QS_PER_SESSION) * 100);

  useEffect(() => {
    setSelected(null);
    setAnswered(false);
  }, [current]);

  function handleAnswer(idx) {
    if (answered) return;
    setSelected(idx);
    setAnswered(true);

    const correct = idx === q.a;
    let newLives = lives;
    let newScore = score;
    let newXp = xpEarned;

    if (correct) {
      newScore = score + 1;
      newXp = xpEarned + XP_PER_CORRECT;
      setScore(newScore);
      setXpEarned(newXp);
    } else {
      newLives = lives - 1;
      setLives(newLives);
    }

    if (newLives <= 0) {
      setTimeout(() => onGameOver({ score: newScore, total: current + 1 }), 1600);
    }
  }

  function handleNext() {
    if (current + 1 >= QS_PER_SESSION) {
      onComplete({ score, xpEarned, subject });
    } else {
      setCurrent(c => c + 1);
    }
  }

  function getOptClass(idx) {
    if (!answered) return 'opt-btn';
    if (idx === q.a) return 'opt-btn correct';
    if (idx === selected && selected !== q.a) return 'opt-btn wrong';
    return 'opt-btn dim';
  }

  const isLast = current + 1 >= QS_PER_SESSION;

  return (
    <div className="screen">
      <div className="quiz-header">
        <span className="badge" style={{ background: cfg.bg, color: cfg.text }}>
          {cfg.label}
        </span>
        <div className="lives">
          {Array.from({ length: MAX_LIVES }).map((_, i) => (
            <span
              key={i}
              className="life-dot"
              style={{ background: i < lives ? '#E24B4A' : 'var(--border)' }}
            />
          ))}
          <span className="muted small">{lives} left</span>
        </div>
      </div>

      <div className="progress-track" style={{ marginBottom: '1.25rem' }}>
        <div className="progress-fill" style={{ width: `${progress}%`, background: cfg.bar }} />
      </div>

      <p className="muted small" style={{ marginBottom: '0.4rem' }}>
        Question {current + 1} of {QS_PER_SESSION}
      </p>
      <p className="question-text">{q.q}</p>

      <div className="options">
        {q.opts.map((opt, i) => (
          <button
            key={i}
            className={getOptClass(i)}
            onClick={() => handleAnswer(i)}
            disabled={answered}
          >
            {opt}
          </button>
        ))}
      </div>

      {answered && (
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
      )}

      {answered && lives > 0 && (
        <button className="btn-primary" onClick={handleNext}>
          {isLast ? 'See results →' : 'Next question →'}
        </button>
      )}
    </div>
  );
}
