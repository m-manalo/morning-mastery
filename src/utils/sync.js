// Cross-device sync via Supabase.
// Progress is stored in the `progress` table, one row per anonymous user.
// Sync is automatic and invisible — no UI beyond a silent background save/restore.
//
// Conflict resolution: take whichever side has the higher streak count and
// more total questions answered. This covers the most common real-world case
// (opened on a new device, or cleared browser data) without data loss.

import { supabase, ensureAnonymousSession } from './supabase';

// Keys that make up "progress" for sync purposes
const PROGRESS_KEYS = {
  subjects: 'mm_subjects_v2',
  streak:   'mm_streak_v2',
  stats:    'mm_stats_v1',
  daily:    'mm_daily_v2',
};

// Read current progress from localStorage
function readLocalProgress() {
  const result = {};
  for (const [field, key] of Object.entries(PROGRESS_KEYS)) {
    try {
      const raw = localStorage.getItem(key);
      result[field] = raw ? JSON.parse(raw) : null;
    } catch {
      result[field] = null;
    }
  }
  return result;
}

// Write progress from Supabase into localStorage
function writeLocalProgress(remote) {
  for (const [field, key] of Object.entries(PROGRESS_KEYS)) {
    if (remote[field] != null) {
      try {
        localStorage.setItem(key, JSON.stringify(remote[field]));
      } catch {}
    }
  }
}

// Decide which side "wins" for a given field.
// For streak: higher count wins.
// For stats: more questions answered wins.
// For daily: most recent completedDate wins.
// For subjects: higher total XP across all subjects wins.
function resolveConflict(local, remote) {
  const resolved = {};

  // streak — take higher count
  const localStreak = local.streak?.count || 0;
  const remoteStreak = remote.streak?.count || 0;
  resolved.streak = localStreak >= remoteStreak ? local.streak : remote.streak;

  // stats — take more questions answered
  const localAnswered = local.stats?.totalAnswered || 0;
  const remoteAnswered = remote.stats?.totalAnswered || 0;
  resolved.stats = localAnswered >= remoteAnswered ? local.stats : remote.stats;

  // subjects — take higher total XP
  const localXP = Object.values(local.subjects || {}).reduce((sum, s) => sum + (s?.xp || 0), 0);
  const remoteXP = Object.values(remote.subjects || {}).reduce((sum, s) => sum + (s?.xp || 0), 0);
  resolved.subjects = localXP >= remoteXP ? local.subjects : remote.subjects;

  // daily — take most recent completion
  const localDate = local.daily?.completedDate || '';
  const remoteDate = remote.daily?.completedDate || '';
  resolved.daily = localDate >= remoteDate ? local.daily : remote.daily;

  return resolved;
}

// Push local progress to Supabase.
// Called after every meaningful state change (daily completion, level up, etc.)
export async function pushProgress() {
  try {
    const userId = await ensureAnonymousSession();
    if (!userId) return;

    const local = readLocalProgress();

    const { error } = await supabase
      .from('progress')
      .upsert({
        user_id:    userId,
        subjects:   local.subjects  || {},
        streak:     local.streak    || {},
        stats:      local.stats     || {},
        updated_at: new Date().toISOString(),
      }, { onConflict: 'user_id' });

    if (error) console.warn('pushProgress error:', error.message);
  } catch (err) {
    console.warn('pushProgress failed:', err.message);
  }
}

// Pull progress from Supabase on app load.
// If remote data exists and is "better" than local, writes it to localStorage
// so the app boots with the correct synced state.
// Returns true if local state was updated (caller should re-read localStorage).
export async function pullProgress() {
  try {
    const userId = await ensureAnonymousSession();
    if (!userId) return false;

    const { data, error } = await supabase
      .from('progress')
      .select('subjects, streak, stats, updated_at')
      .eq('user_id', userId)
      .maybeSingle();

    if (error) {
      console.warn('pullProgress error:', error.message);
      return false;
    }

    if (!data) {
      // No remote data yet — first time on this device, nothing to pull
      return false;
    }

    const local = readLocalProgress();
    const remote = {
      subjects: data.subjects,
      streak:   data.streak,
      stats:    data.stats,
      daily:    local.daily, // daily state isn't synced (it's ephemeral, resets daily)
    };

    // If local has no progress at all, just take remote wholesale
    const localIsEmpty = !local.subjects || Object.values(local.subjects).every(s => (s?.xp || 0) === 0);
    if (localIsEmpty) {
      writeLocalProgress(remote);
      return true;
    }

    // Otherwise resolve conflicts field by field
    const resolved = resolveConflict(local, remote);
    writeLocalProgress(resolved);
    return true;

  } catch (err) {
    console.warn('pullProgress failed:', err.message);
    return false;
  }
}
