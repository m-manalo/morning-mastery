export const THEMES = {
  coral: {
    name: 'Coral peach',
    key: 'coral',
    accent: '#FF6B47',
    accentDark: '#CC4422',
    accentLight: '#FFF0EA',
    accentText: '#E05A3A',
    bg: '#FFF6F3',
    bg2: '#ffffff',
    border: '#F5C8B8',
    border2: '#E0B0A0',
    text: '#1E0A06',
    text2: '#C07850',
    streakBg: '#FFF0EA',
    barBg: 'rgba(220,140,110,0.2)',
    divider: 'rgba(220,140,110,0.2)',
  },
  sage: {
    name: 'Sage lemon',
    key: 'sage',
    accent: '#72C464',
    accentDark: '#4A9040',
    accentLight: '#EAF5E4',
    accentText: '#5A9E62',
    bg: '#F6FAF0',
    bg2: '#ffffff',
    border: '#C0DDB0',
    border2: '#A0C098',
    text: '#0C1E0E',
    text2: '#6A9868',
    streakBg: '#EAF5E4',
    barBg: 'rgba(100,160,80,0.15)',
    divider: 'rgba(100,160,80,0.15)',
  }
};

// Per-subject colours — same across both themes
export const SUBJECT_COLORS = {
  science:      { bg: '#FFF0EA', color: '#E05A3A', border: '#F5C8B8', bar: '#FF6B47' },
  history:      { bg: '#E8F5E8', color: '#4A9E47', border: '#B0D8B0', bar: '#4A9E47' },
  geography:    { bg: '#E6F0FB', color: '#3A7EC8', border: '#A8C8F0', bar: '#3A7EC8' },
  maths:        { bg: '#F3EAF8', color: '#8A50B8', border: '#D0B0E8', bar: '#8A50B8' },
  socialstudies:{ bg: '#FEFCE0', color: '#A89000', border: '#E8D860', bar: '#C8A800' },
};
