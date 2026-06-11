import { useState, useEffect, useRef } from 'react';
import { SUBJECT_CONFIG, XP_PER_CORRECT, MAX_FIFTY_FIFTY } from '../data/questions';
import { SUBJECT_COLORS } from '../data/themes';

export default function QuizScreen({
  subject, questions, totalSubjects, currentSubjectIndex,
  isDaily, fiftyFiftyUses, onUseFiftyFifty, onComplete, onHome
}) {
  const cfg = SUBJECT_CONFIG[subject];
  const sc = SUBJECT_COLORS[subject];
  const total = questions.length;

  const [current, setCurrent]       = useState(0);
  const [score, setScore]           = useState(0);
  const [xpEarned, setXpEarned]     = useState(0);
  const [selected, setSelected]     = useState(null);
  const [answered, setAnswered]     = useState(false);
  const [eliminated, setEliminated] = useState([]);
  const [xpFloat, setXpFloat]       = useState(false);
  const [qAnim, setQAnim]           = useState('q-enter');
  const cardRef = useRef(null);

  const q = questions[current];
  const isLast = current + 1 >= total;
  const overallPct = isDaily
    ? Math.round((currentSubjectIndex / totalSubjects) * 100)
    : Math.round((current / total) * 100);

  useEffect(() => {
    setSelected(null); setAnswered(false); setEliminated([]);
    setXpFloat(false);
    setQAnim('q-enter');
    const t = setTimeout(() => setQAnim(''), 300);
    return () => clearTimeout(t);
  }, [current, subject]);

  function handleFiftyFifty() {
    if (fiftyFiftyUses <= 0 || answered || eliminated.length > 0) return;
    const wrong = q.opts.map((_, i) => i).filter(i => i !== q.a);
    setEliminated([...wrong].sort(() => Math.random() - 0.5).slice(0, 2));
    onUseFiftyFifty();
  }

  function handleAnswer(idx) {
    if (answered || eliminated.includes(idx)) return;
    setSelected(idx);
    setAnswered(true);
    if (idx === q.a) {
      setScore(s => s + 1);
      setXpEarned(x => x + XP_PER_CORRECT);
      setXpFloat(true);
      setTimeout(() => setXpFloat(false), 1200);
    } else {
      cardRef.current?.classList.add('shake');
      setTimeout(() => cardRef.current?.classList.remove('shake'), 450);
    }
  }

  function handleNext() {
    const finalScore = score + (selected === q.a ? 1 : 0) - (selected === q.a ? 1 : 0);
    onComplete({ score, xpEarned, subject, correct: selected === q.a });
  }

  function getOptClass(idx) {
    if (eliminated.includes(idx)) return 'opt opt--elim';
    if (!answered) return 'opt';
    if (idx === q.a) return 'opt opt--correct';
    if (idx === selected) return 'opt opt--wrong';
    return 'opt opt--dim';
  }

  return (
    <div className="screen-inner" ref={cardRef}>
      <div className="quiz-header">
        <button className="back-btn" onClick={onHome}>← Back</button>
        <div className="quiz-badge-wrap">
          <div className="sub-tile sub-tile--sm" style={{ background: sc.bg, color: sc.color, borderColor: sc.border }}>
            {cfg.label.slice(0, 2)}
          </div>
          <span className="quiz-subject-label">
            {cfg.label}{isDaily ? ` · ${currentSubjectIndex + 1}/${totalSubjects}` : ''}
          </span>
        </div>
        <button
          className={`fifty-btn${(fiftyFiftyUses <= 0 || answered || eliminated.length > 0) ? ' fifty-btn--off' : ''}`}
          onClick={handleFiftyFifty}
        >
          50/50 <span className="fifty-count">{fiftyFiftyUses}</span>
        </button>
      </div>

      <div className="prog-track">
        <div className="prog-fill" style={{ width: `${overallPct}%` }} />
      </div>

      <p className={`question ${qAnim}`}>{q.q}</p>

      <div className="opts">
        {q.opts.map((opt, i) => (
          <button
            key={i}
            className={getOptClass(i)}
            onClick={() => handleAnswer(i)}
            disabled={answered || eliminated.includes(i)}
          >
            <span className="opt-text">{eliminated.includes(i) ? <s>{opt}</s> : opt}</span>
            <span className="opt-right">
              {answered && i === q.a && <span className="opt-chip opt-chip--ok">correct</span>}
              {answered && i === selected && i !== q.a && <span className="opt-chip opt-chip--no">your answer</span>}
            </span>
            {answered && i === selected && i === q.a && xpFloat && (
              <span className="xp-float">+{XP_PER_CORRECT} xp</span>
            )}
          </button>
        ))}
      </div>

      <div className="feedback-area">
        <div className={`feedback${answered ? (selected === q.a ? ' feedback--correct' : ' feedback--wrong') : ' feedback--hidden'}`}>
          <strong>{selected === q.a ? 'Correct!' : 'Not quite.'}</strong>{' '}{q.exp}
        </div>
      </div>

      <button
        className="btn-primary"
        onClick={handleNext}
        style={{ opacity: answered ? 1 : 0, pointerEvents: answered ? 'auto' : 'none', transition: 'opacity 0.2s' }}
      >
        {isLast ? (isDaily ? 'Next subject →' : 'See results →') : 'Next question →'}
      </button>
    </div>
  );
}
