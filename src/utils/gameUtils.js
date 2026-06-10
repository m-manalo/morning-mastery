import { XP_PER_LEVEL } from '../data/questions';

export function getLevelFromXP(xp) {
  return Math.floor(xp / XP_PER_LEVEL) + 1;
}

export function getXPInLevel(xp) {
  return xp % XP_PER_LEVEL;
}

export function getXPPercent(xp) {
  return Math.round((getXPInLevel(xp) / XP_PER_LEVEL) * 100);
}

export function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function updateStreak(streakData) {
  const today = new Date().toDateString();
  const yesterday = new Date(Date.now() - 86400000).toDateString();

  if (streakData.lastPlayed === today) {
    return streakData;
  }

  const newCount = streakData.lastPlayed === yesterday
    ? (streakData.count || 0) + 1
    : 1;

  return { count: newCount, lastPlayed: today };
}

export function getInitialSubjectState() {
  return { xp: 0 };
}
