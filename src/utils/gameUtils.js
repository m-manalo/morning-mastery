import { XP_PER_LEVEL, DAILY_SUBJECT_ORDER, QUESTIONS, getTierFromLevel } from '../data/questions';

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

// Streak thresholds worth celebrating
export const STREAK_MILESTONES = [3, 7, 14, 30, 50, 100, 200, 365];

export function getStreakMilestone(count) {
  return STREAK_MILESTONES.includes(count) ? count : null;
}

export function updateStreak(streakData) {
  const today = new Date().toDateString();
  const yesterday = new Date(Date.now() - 86400000).toDateString();
  const twoDaysAgo = new Date(Date.now() - 2 * 86400000).toDateString();

  if (streakData.lastPlayed === today) return streakData;

  // Same month as last grace day use? Used this calendar month already?
  const now = new Date();
  const thisMonthKey = `${now.getFullYear()}-${now.getMonth()}`;
  const graceUsedThisMonth = streakData.graceMonth === thisMonthKey;

  if (streakData.lastPlayed === yesterday) {
    // Played yesterday — normal continuation
    return {
      ...streakData,
      count: (streakData.count || 0) + 1,
      lastPlayed: today,
    };
  }

  if (streakData.lastPlayed === twoDaysAgo && !graceUsedThisMonth && (streakData.count || 0) > 0) {
    // Missed exactly one day, haven't used this month's grace day — streak survives
    return {
      ...streakData,
      count: (streakData.count || 0) + 1,
      lastPlayed: today,
      graceMonth: thisMonthKey,
      graceUsedOn: today,
    };
  }

  // Missed more than one day, or grace already used this month — streak resets
  return {
    ...streakData,
    count: 1,
    lastPlayed: today,
  };
}

export function getInitialSubjectState(startingLevel = 1) {
  // Convert a starting level into the XP needed to be at that level
  const xp = (startingLevel - 1) * XP_PER_LEVEL;
  return { xp };
}

// Returns questions from the tier matching the subject's current level,
// avoiding recently-seen questions (per subject+tier) until that tier's
// pool is exhausted, then resetting — same pattern as the daily quote rotation.
export function getQuestionPool(subject, level, count) {
  const tier = getTierFromLevel(level);
  const pool = QUESTIONS[subject]?.[tier] || QUESTIONS[subject]?.[1] || [];
  if (pool.length === 0) return [];

  const storageKey = `mm_seen_q_${subject}_t${tier}`;

  try {
    const seen = JSON.parse(localStorage.getItem(storageKey) || '[]');
    let available = pool.map((_, i) => i).filter(i => !seen.includes(i));

    // If not enough unseen questions remain, reset the seen list for this tier
    if (available.length < count) {
      available = pool.map((_, i) => i);
      localStorage.setItem(storageKey, '[]');
    }

    const shuffledAvailable = shuffleArray(available);
    const chosenIndices = shuffledAvailable.slice(0, count);

    const currentSeen = JSON.parse(localStorage.getItem(storageKey) || '[]');
    const newSeen = [...new Set([...currentSeen, ...chosenIndices])];
    // If we've now seen everything, reset for next time
    if (newSeen.length >= pool.length) {
      localStorage.setItem(storageKey, '[]');
    } else {
      localStorage.setItem(storageKey, JSON.stringify(newSeen));
    }

    return chosenIndices.map(i => pool[i]);
  } catch {
    return shuffleArray(pool).slice(0, count);
  }
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

// Lifetime stats — tracked incrementally alongside each daily completion
export function getInitialStats() {
  return { totalAnswered: 0, totalCorrect: 0, longestStreak: 0, daysCompleted: 0 };
}

export function updateStatsAfterDaily(stats, dailyResultsObj, currentStreakCount) {
  const results = Object.values(dailyResultsObj || {});
  const correctCount = results.filter(r => r?.correct).length;
  const prev = stats || getInitialStats();
  return {
    totalAnswered: (prev.totalAnswered || 0) + results.length,
    totalCorrect: (prev.totalCorrect || 0) + correctCount,
    longestStreak: Math.max(prev.longestStreak || 0, currentStreakCount || 0),
    daysCompleted: (prev.daysCompleted || 0) + 1,
  };
}
