import { useState, useEffect } from 'react';
import { THEMES } from '../data/themes';

export function useTheme() {
  const [themeKey, setThemeKey] = useState(() => {
    try { return localStorage.getItem('mm_theme') || 'coral'; } catch { return 'coral'; }
  });

  const theme = THEMES[themeKey] || THEMES.coral;

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--accent',       theme.accent);
    root.style.setProperty('--accent-dark',  theme.accentDark);
    root.style.setProperty('--accent-light', theme.accentLight);
    root.style.setProperty('--accent-text',  theme.accentText);
    root.style.setProperty('--bg',           theme.bg);
    root.style.setProperty('--bg2',          theme.bg2);
    root.style.setProperty('--border',       theme.border);
    root.style.setProperty('--border2',      theme.border2);
    root.style.setProperty('--text',         theme.text);
    root.style.setProperty('--text2',        theme.text2);
    root.style.setProperty('--streak-bg',    theme.streakBg);
    root.style.setProperty('--bar-bg',       theme.barBg);
    root.style.setProperty('--divider-col',  theme.divider);
    try { localStorage.setItem('mm_theme', themeKey); } catch {}
  }, [themeKey, theme]);

  return { theme, themeKey, setThemeKey };
}
