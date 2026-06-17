// Builds a shareable text summary and triggers the native share sheet where available,
// falling back to clipboard copy.

export function buildShareText({ streakCount, correctCount, totalCount }) {
  const lines = [
    `🌅 Morning Mastery — ${new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })}`,
    `${correctCount}/${totalCount} correct today`,
    `${streakCount} day streak 🔥`,
  ];
  return lines.join('\n');
}

export async function shareResult({ streakCount, correctCount, totalCount }, onFallback) {
  const text = buildShareText({ streakCount, correctCount, totalCount });

  if (navigator.share) {
    try {
      await navigator.share({ text, title: 'Morning Mastery' });
      return true;
    } catch {
      // User cancelled or share failed — fall through to clipboard
    }
  }

  try {
    await navigator.clipboard.writeText(text);
    if (onFallback) onFallback();
    return true;
  } catch {
    return false;
  }
}
