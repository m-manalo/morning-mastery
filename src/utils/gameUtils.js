import { XP_PER_LEVEL, DAILY_SUBJECT_ORDER } from '../data/questions';

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
  if (streakData.lastPlayed === today) return streakData;
  const newCount = streakData.lastPlayed === yesterday ? (streakData.count || 0) + 1 : 1;
  return { count: newCount, lastPlayed: today };
}

export function getInitialSubjectState() {
  return { xp: 0 };
}

export function getTodayKey() {
  return new Date().toDateString();
}

export function isDailyComplete(dailyState) {
  if (!dailyState?.completedDate) return false;
  return dailyState.completedDate === getTodayKey();
}

export function getShuffledDailyOrder() {
  return shuffleArray([...DAILY_SUBJECT_ORDER]);
}

export function getWeekStreak(streak) {
  const days = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
  const today = new Date();
  const dayOfWeek = today.getDay();
  const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
  return days.map((label, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() + mondayOffset + i);
    const key = d.toDateString();
    const isToday = key === getTodayKey();
    const isFuture = d > today && !isToday;
    const played = streak?.playedDates?.includes(key) || false;
    return { label, isToday, isFuture, played };
  });
}
