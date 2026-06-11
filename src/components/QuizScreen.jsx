import { useState, useEffect, useRef } from 'react';
import { SUBJECT_CONFIG, XP_PER_CORRECT, MAX_FIFTY_FIFTY } from '../data/questions';

export default function QuizScreen({
  subject, questions, totalSubjects, currentSubjectIndex,
  isDaily, fiftyFiftyUses, onUseFiftyFifty,
  onComplete, onHome
}) {
  const cfg = SUBJECT_CONFIG[subject];
  const total = questions.length;

  const [current, setCurrent]     = useState(0);
  const [score, setScore]         = useState(0);
  const [xpEarned, setXpEarned]   = useState(0);
  const [selected, setSelected]   = useState(null);
  const [answered, setAnswered]   = useState(false);
  const [eliminated, setEliminated] = useState([]);
  const [animState, setAnimState] = useState('');   // 'correct' | 'wrong' | ''
  const [xpFloat, setXpFloat]     = useState(false);
  const [questionAnim, setQuestionAnim] = useState('question-enter');
  const cardRef = useRef(null);

  const q = questions[current];
  const isLast = current + 1 >= total;

  // Daily progress: how far through all subjects
  const overallProgress = isDaily
    ? Math.round(((currentSubjectIndex) / totalSubjects) * 100)
    : Math.round((current / total) * 100);

  useEffect(() => {
    setSelected(null);
    setAnswered(false);
    setEliminated([]);
    setAnimState('');
    setXpFloat(false);
    setQuestionAnim('question-enter');
    const t = setTimeout(() => setQuestionAnim(''), 350);
    return () => clearTimeout(t);
  }, [current]);

  function handleFiftyFifty() {
    if (fiftyFiftyUses <= 0 || answered || eliminated.length > 0) return;
    const wrong = q.opts.map((_, i) => i).filter(i => i !== q.a);
    const shuffled = [...wrong].sort(() => Math.random() - 0.5);
    setEliminated(shuffled.slice(0, 2));
    onUseFiftyFifty();
  }

  function handleAnswer(idx) {
    if (answered || eliminated.includes(idx)) return;
    setSelected(idx);
    setAnswered(true);

    const correct = idx === q.a;
    if (correct) {
      setScore(s => s + 1);
      setXpEarned(x => x + XP_PER_CORRECT);
      setAnimState('correct');
      setXpFloat(true);
      setTimeout(() => setXpFloat(false), 1200);
    } else {
      setAnimState('wrong');
      if (cardRef.current) {
        cardRef.current.classList.add('shake');
        setTimeout(() => cardRef.current?.classList.remove('shake'), 500);
      }
    }
  }

  function handleNext() {
    const finalScore  = score + (selected === q.a ? 0 : 0);
    const finalXp     = xpEarned;
    if (isLast) {
      onComplete({ score, xpEarned, subject, correct: selected === q.a });
    } else {
      setCurrent(c => c + 1);
    }
  }

  function getOptClass(idx) {
    if (eliminated.includes(idx)) return 'opt-btn eliminated';
    if (!answered) return 'opt-btn';
    if (idx === q.a) return 'opt-btn correct';
    if (idx === selected && idx !== q.a) return 'opt-btn wrong';
    return 'opt-btn dim';
  }

  return (
    <div className="screen-inner" ref={cardRef}>
      {/* Header */}
      <div className="quiz-header">
        <button className="back-btn" onClick={onHome}>← Back</button>
        <span className="badge" style={{background: cfg.bg, color: cfg.text}}>
          {cfg.emoji} {cfg.label}{isDaily ? ` · ${currentSubjectIndex + 1}/${totalSubjects}` : ''}
        </span>
        <button
          className={`fifty-btn${fiftyFiftyUses <= 0 || answered || eliminated.length > 0 ? ' fifty-disabled' : ''}`}
          onClick={handleFiftyFifty}
          aria-label="Use 50/50 lifeline"
        >
          50/50 <span className="fifty-count">{fiftyFiftyUses}</span>
        </button>
      </div>

      {/* Progress bar */}
      <div className="progress-track" style={{marginBottom:'1rem'}}>
        <div className="progress-fill" style={{
          width: `${isDaily ? overallProgress : Math.round((current/total)*100)}%`,
          background: cfg.bar,
          transition: 'width 0.4s ease'
        }}/>
      </div>

      {/* Question */}
      <p className={`question-text ${questionAnim}`}>{q.q}</p>

      {/* Options */}
      <div className="options">
        {q.opts.map((opt, i) => (
          <button
            key={i}
            className={getOptClass(i)}
            onClick={() => handleAnswer(i)}
            disabled={answered || eliminated.includes(i)}
          >
            <span>{eliminated.includes(i) ? <s>{opt}</s> : opt}</span>
            {answered && i === q.a && (
              <span className="opt-label opt-label--correct">correct</span>
            )}
            {answered && i === selected && i !== q.a && (
              <span className="opt-label opt-label--wrong">your answer</span>
            )}
            {answered && i === selected && i === q.a && xpFloat && (
              <span className="xp-float">+{XP_PER_CORRECT} xp</span>
            )}
          </button>
        ))}
      </div>

      {/* Feedback */}
      <div className="feedback-area">
        {answered ? (
          <div className={`feedback feedback--${selected === q.a ? 'correct' : 'wrong'} slide-in`}>
            <strong>{selected === q.a ? 'Correct!' : 'Not quite.'}</strong>
            {' '}{q.exp}
          </div>
        ) : (
          <div className="feedback-placeholder"/>
        )}
      </div>

      {/* Next */}
      <button
        className="btn-primary"
        onClick={handleNext}
        style={{opacity: answered ? 1 : 0, pointerEvents: answered ? 'auto' : 'none', transition: 'opacity 0.2s'}}
      >
        {isLast
          ? (isDaily ? 'Next subject →' : 'See results →')
          : 'Next question →'
        }
      </button>
    </div>
  );
}
