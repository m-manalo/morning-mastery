# Morning Mastery

A daily knowledge workout app — gamified quiz with XP, levels, lives, and streaks.

**Subjects:** Science, History, Geography, Maths  
**Questions per session:** 5  
**Lives per session:** 3  
**XP per correct answer:** 20  
**XP to level up:** 100

---

## Local Development

### Prerequisites
- Node.js 18+ (download from https://nodejs.org)
- A terminal (Terminal on Mac, Command Prompt or PowerShell on Windows)

### Steps

1. **Install dependencies**
   ```
   npm install
   ```

2. **Start the development server**
   ```
   npm start
   ```

3. Open http://localhost:3000 in your browser.

---

## Deploying to Vercel (free, shareable link)

Vercel is the easiest way to get this live and share it with friends and family.
Your app will be available at a URL like: `https://morning-mastery.vercel.app`

### Step 1 — Create a GitHub account
Go to https://github.com and sign up (free).

### Step 2 — Push this project to GitHub

1. Install Git if you don't have it: https://git-scm.com/downloads
2. In your terminal, inside this project folder:
   ```
   git init
   git add .
   git commit -m "Initial commit"
   ```
3. Go to https://github.com/new and create a new repository called `morning-mastery`
4. Copy the two lines GitHub shows you under "push an existing repository" and run them in your terminal. They look like:
   ```
   git remote add origin https://github.com/YOUR_USERNAME/morning-mastery.git
   git push -u origin main
   ```

### Step 3 — Deploy on Vercel

1. Go to https://vercel.com and sign up with your GitHub account
2. Click **Add New → Project**
3. Find and select your `morning-mastery` repository
4. Vercel auto-detects it as a React app — leave all settings as default
5. Click **Deploy**

That's it. In about 60 seconds you'll have a live URL to share.

### Step 4 — Share the link

Vercel gives you a URL like `https://morning-mastery-xyz.vercel.app`  
Share it with anyone — works on mobile and desktop, no app store needed.

**Every time you push changes to GitHub, Vercel automatically redeploys.**

---

## Project Structure

```
src/
  components/
    HomeScreen.jsx      Subject selection + streak display
    QuizScreen.jsx      Question loop with lives
    ResultsScreen.jsx   Session summary + XP progress
    GameOverScreen.jsx  Out of lives screen
  data/
    questions.js        All questions + subject config
  hooks/
    useStorage.js       localStorage persistence hook
  utils/
    gameUtils.js        XP, level, and streak helpers
  App.jsx               Main app + screen routing
  App.css               All styles
```

---

## Adding More Questions

Open `src/data/questions.js` and add more objects to any subject array:

```js
{ 
  q: "Your question here?", 
  opts: ["Option A", "Option B", "Option C", "Option D"], 
  a: 0,        // index of the correct answer (0 = first option)
  exp: "Brief explanation shown after answering." 
}
```

---

## Adding a New Subject

1. Add questions to `src/data/questions.js` under a new key
2. Add config to `SUBJECT_CONFIG` in the same file:
   ```js
   technology: { label: "Technology", emoji: "💻", bg: "#E6F1FB", text: "#0C447C", bar: "#378ADD" }
   ```
3. Add the default state in `App.jsx` inside `DEFAULT_SUBJECTS`

---

## Next Steps (Phase 2)

- User accounts with Supabase (progress syncs across devices)
- Proper difficulty tiers per level
- Push notification reminders
- Leaderboard with friends
