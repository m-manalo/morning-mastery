// Perspective lines shown inside a milestone badge.
// Each function takes { streakDays, totalAnswered, totalCorrect } from lifetime stats
// (passed in from App's stats tracking) and returns a short, honest, slightly playful line.
// We deliberately avoid any claim about "intelligence" or "education level" — a quiz
// streak doesn't measure that, and framing it that way would feel either inflated or
// mildly insulting depending on the day. Instead these lean on relatable comparisons.

const PUB_QUIZ_ROUND_SIZE = 10;
const MINUTES_PER_DAY = 3;

function timeInvestedLine({ streakDays }) {
  const minutes = streakDays * MINUTES_PER_DAY;
  if (minutes < 60) {
    return `${minutes} minutes of learning, one cup of coffee at a time.`;
  }
  const hours = Math.round((minutes / 60) * 10) / 10;
  return `Around ${hours} hours of learning, spread across ${streakDays} mornings.`;
}

function comparisonLine({ totalCorrect }) {
  const rounds = Math.max(1, Math.floor(totalCorrect / PUB_QUIZ_ROUND_SIZE));
  if (rounds === 1) {
    return "That's like acing a full pub quiz round.";
  }
  return `That's like acing a full pub quiz round, ${rounds} times over.`;
}

function bragLine({ totalCorrect, totalAnswered }) {
  const accuracy = totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : 0;
  if (accuracy >= 90) {
    return `${accuracy}% accuracy — you're barely missing a beat.`;
  }
  if (accuracy >= 70) {
    return `${accuracy}% accuracy so far — solidly ahead of guesswork.`;
  }
  return `${totalCorrect} correct answers and counting — the streak is the real win.`;
}

const PERSPECTIVE_STYLES = [timeInvestedLine, comparisonLine, bragLine];

// Picks a style deterministically based on the streak day count, so the same
// milestone always shows the same framing rather than feeling random on reload.
export function getPerspectiveLine(stats, streakDays) {
  const fn = PERSPECTIVE_STYLES[streakDays % PERSPECTIVE_STYLES.length];
  return fn({
    streakDays,
    totalAnswered: stats?.totalAnswered || 0,
    totalCorrect: stats?.totalCorrect || 0,
  });
}
