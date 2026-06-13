import { useState } from 'react';
import { SUBJECT_CONFIG, DAILY_SUBJECT_ORDER } from '../data/questions';
import { SUBJECT_COLORS } from '../data/themes';
import SubjectIllustration from './SubjectIllustration';

export default function ReviewScreen({ results, startIndex, onHome }) {
  const order = DAILY_SUBJECT_ORDER.filter(key => results?.[key]);
  const [pos, setPos] = useState(() => {
    const startSubject = DAILY_SUBJECT_ORDER[startIndex];
    const found = order.indexOf(startSubject);
    return found >= 0 ? found : 0;
  });

  if (order.length === 0) {
    return (
      <div className="screen-inner">
        <p className="back-btn" onClick={onHome} style={{ cursor: 'pointer', marginBottom: '1rem' }}>← Back to home</p>
        <p className="t-secondary small center" style={{ marginTop: '2rem' }}>Nothing to review yet — complete today's daily first.</p>
        <button className="btn-primary" onClick={onHome}>Back to home</button>
      </div>
    );
  }

  const subjectKey = order[pos];
  const cfg = SUBJECT_CONFIG[subjectKey];
  const sc = SUBJECT_COLORS[subjectKey];
  const result = results[subjectKey];
  const { question, selectedIdx, correct } = result;
  const isLast = pos + 1 >= order.length;

  function next() {
    if (isLast) onHome();
    else setPos(p => p + 1);
  }
  function prev() {
    if (pos > 0) setPos(p => p - 1);
  }

  return (
    <div className="screen-inner">
      <div className="quiz-top-row">
        <button className="back-btn" onClick={onHome}>← Back to home</button>
        <span className="t-secondary small">{pos + 1} of {order.length}</span>
      </div>

      <div className="subject-banner">
        <div className="subject-illu-wrap" style={{ background: sc.bg, borderColor: sc.border }}>
          <SubjectIllustration subject={subjectKey} color={sc.color} />
        </div>
        <p className="subject-banner-name">{cfg.label}</p>
        <p className="subject-banner-count">Today's question</p>
      </div>

      <p className="question" style={{ marginBottom: '0.85rem' }}>{question.q}</p>

      {correct ? (
        <div className="feedback feedback--correct" style={{ marginBottom: '0.85rem' }}>
          <strong>✓ You got this right:</strong> {question.opts[question.a]}
        </div>
      ) : (
        <>
          <div className="feedback feedback--wrong" style={{ marginBottom: '7px' }}>
            <strong>You answered:</strong> {question.opts[selectedIdx]}
          </div>
          <div className="feedback feedback--correct" style={{ marginBottom: '0.85rem' }}>
            <strong>Correct answer:</strong> {question.opts[question.a]}
          </div>
        </>
      )}

      <p className="section-label">{correct ? 'more about this' : 'why'}</p>
      <p style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.7, flex: 1 }}>
        {question.exp}
      </p>

      <div style={{ display: 'flex', gap: 8, marginTop: '0.75rem' }}>
        {pos > 0 && (
          <button className="btn-secondary" style={{ marginTop: 0, flex: 1 }} onClick={prev}>← Previous</button>
        )}
        <button className="btn-primary" style={{ marginTop: 0, flex: 1 }} onClick={next}>
          {isLast ? 'Done' : 'Next →'}
        </button>
      </div>
    </div>
  );
}
