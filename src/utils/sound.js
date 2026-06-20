// Lightweight sound effect player.
// Sounds are pre-generated short mp3s in /public/sounds — no external libraries needed.
// Respects a user preference (default: on) stored in localStorage, separate from
// the rest of the app's data so it can be toggled instantly without affecting progress.

const SOUNDS = {
  correct: '/sounds/correct.mp3',
  wrong: '/sounds/wrong.mp3',
  complete: '/sounds/complete.mp3',
  milestone: '/sounds/milestone.mp3',
  tap: '/sounds/tap.mp3',
  startDaily: '/sounds/start_daily.mp3',
  fiftyFifty: '/sounds/fifty_fifty.mp3',
  levelUp: '/sounds/level_up.mp3',
};

// Cache Audio objects so repeated plays don't re-fetch the file
const cache = {};

function isSoundEnabled() {
  try {
    const v = localStorage.getItem('mm_sound_v1');
    return v === null ? true : v === 'true'; // default ON
  } catch {
    return true;
  }
}

export function setSoundEnabled(enabled) {
  try {
    localStorage.setItem('mm_sound_v1', String(enabled));
  } catch {}
}

export function getSoundEnabled() {
  return isSoundEnabled();
}

export function playSound(name) {
  if (!isSoundEnabled()) return;
  const src = SOUNDS[name];
  if (!src) return;

  try {
    // Use a fresh Audio instance per play so rapid repeated triggers
    // (e.g. tapping through review screens quickly) don't cut each other off
    const audio = new Audio(src);
    audio.volume = 1;
    audio.play().catch(() => {
      // Autoplay can be blocked until the user has interacted with the page —
      // safe to ignore, sound just won't play that one time
    });
  } catch {}
}
