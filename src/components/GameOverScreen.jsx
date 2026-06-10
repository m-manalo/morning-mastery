import { SUBJECT_CONFIG } from '../data/questions';

export default function GameOverScreen({ subject, result, onHome, onRetry }) {
  const cfg = SUBJECT_CONFIG[subject];
  return (
    <div className="screen">
      <p className="title" style={{ marginBottom: '0.25rem' }}>Out of lives</p>
      <p className="muted" style={{ marginBottom: '1.5rem' }}>
        You ran out of lives. Better luck next time!
      </p>
      <div className="feedback" style={{ background: '#FCEBEB', color: '#791F1F', marginBottom: '1rem' }}>
        You answered <strong>{result.score} of {result.total}</strong> correctly before running out.
        Keep practising to improve!
      </div>
      <div className="subject-summary">
        <span style={{ fontSize: 28 }}>{cfg.emoji}</span>
        <span style={{ fontWeight: 500, color: 'var(--text)' }}>{cfg.label}</span>
        <span className="badge" style={{ background: cfg.bg, color: cfg.text }}>
          No XP this round
        </span>
      </div>
      <button className="btn-primary" onClick={onHome}>Back to subjects</button>
      <button className="btn-secondary" onClick={onRetry}>Try again</button>
    </div>
  );
}
