// Simple, generic per-subject illustrations.
// These represent the SUBJECT, not the specific question — so they never
// risk hinting at an answer, and we only need 5 total, not one per question.

const ICONS = {
  science: (
    <svg viewBox="0 0 64 64" width="38" height="38" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M26 6h12v16l10 24a4 4 0 01-4 6H20a4 4 0 01-4-6l10-24V6z" stroke="currentColor" strokeWidth="3" strokeLinejoin="round"/>
      <path d="M23 6h18" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
      <path d="M22 38h20" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
      <circle cx="29" cy="46" r="2" fill="currentColor"/>
      <circle cx="35" cy="50" r="2" fill="currentColor"/>
      <circle cx="32" cy="44" r="1.5" fill="currentColor"/>
    </svg>
  ),
  history: (
    <svg viewBox="0 0 64 64" width="38" height="38" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 24h40v6H12z" stroke="currentColor" strokeWidth="3" strokeLinejoin="round"/>
      <path d="M32 8l22 16H10L32 8z" stroke="currentColor" strokeWidth="3" strokeLinejoin="round"/>
      <path d="M16 30v22M26 30v22M38 30v22M48 30v22" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
      <path d="M10 56h44" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
    </svg>
  ),
  geography: (
    <svg viewBox="0 0 64 64" width="38" height="38" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="32" r="22" stroke="currentColor" strokeWidth="3"/>
      <path d="M10 32h44M32 10c8 6 8 38 0 44M32 10c-8 6-8 38 0 44" stroke="currentColor" strokeWidth="3"/>
      <path d="M14 20c4 3 8 0 12 2s6 5 10 3 8-4 12 1" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
    </svg>
  ),
  maths: (
    <svg viewBox="0 0 64 64" width="38" height="38" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="8" width="44" height="48" rx="5" stroke="currentColor" strokeWidth="3"/>
      <path d="M10 22h44" stroke="currentColor" strokeWidth="3"/>
      <circle cx="20" cy="32" r="2.2" fill="currentColor"/>
      <circle cx="32" cy="32" r="2.2" fill="currentColor"/>
      <circle cx="44" cy="32" r="2.2" fill="currentColor"/>
      <circle cx="20" cy="42" r="2.2" fill="currentColor"/>
      <circle cx="32" cy="42" r="2.2" fill="currentColor"/>
      <path d="M40 38l8 8M48 38l-8 8" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
    </svg>
  ),
  socialstudies: (
    <svg viewBox="0 0 64 64" width="38" height="38" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M32 6l24 12H8L32 6z" stroke="currentColor" strokeWidth="3" strokeLinejoin="round"/>
      <path d="M12 20v4a20 20 0 0040 0v-4" stroke="currentColor" strokeWidth="3" strokeLinejoin="round"/>
      <path d="M18 28v18M28 28v18M36 28v18M46 28v18" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
      <path d="M10 54h44" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
    </svg>
  ),
};

export default function SubjectIllustration({ subject, color }) {
  return (
    <div className="subject-illu" style={{ color }}>
      {ICONS[subject] || ICONS.science}
    </div>
  );
}
