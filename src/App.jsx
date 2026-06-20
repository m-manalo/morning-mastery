import { useState, useEffect, useRef } from 'react';
import { SUBJECT_CONFIG, MAX_FIFTY_FIFTY, DAILY_SUBJECT_ORDER } from './data/questions';
import { useStorage } from './hooks/useStorage';
import { useTheme } from './hooks/useTheme';
import {
  updateStreak, getInitialSubjectState, getQuestionPool,
  getLevelFromXP, getTodayKey, isDailyComplete, getShuffledDailyOrder,
  getInitialStats, updateStatsAfterDaily
} from './utils/gameUtils';
import OnboardingScreen from './components/OnboardingScreen';
import HomeScreen from './components/HomeScreen';
import QuizScreen from './components/QuizScreen';
import DailyCompleteScreen from './components/DailyCompleteScreen';
import ReviewScreen from './components/ReviewScreen';
import SettingsScreen from './components/SettingsScreen';
import { playSound } from './utils/sound';
import { Analytics } from '@vercel/analytics/react';
import './App.css';

const SCREENS = { ONBOARDING:'onboarding', HOME:'home', QUIZ:'quiz', DAILY_COMPLETE:'daily_complete', REVIEW:'review', SETTINGS:'settings' };

const DEFAULT_SUBJECTS = Object.fromEntries(
  Object.keys(SUBJECT_CONFIG).map(k => [k, getInitialSubjectState(1)])
);

export default function App() {
  const { themeKey, setThemeKey } = useTheme();
  const [subjects, setSubjects]     = useStorage('mm_subjects_v2', DEFAULT_SUBJECTS);
  const [streak, setStreak]         = useStorage('mm_streak_v2', { count: 0, lastPlayed: null, playedDates: [] });
  const [dailyState, setDailyState] = useStorage('mm_daily_v2', { completedDate: null, results: {} });
  const [fiftyFifty, setFiftyFifty] = useStorage('mm_5050_v2', { uses: MAX_FIFTY_FIFTY, lastReset: null });
  const [onboarded, setOnboarded]   = useStorage('mm_onboarded_v1', false);
  const [stats, setStats]           = useStorage('mm_stats_v1', getInitialStats());

  const [screen, setScreen]                     = useState(onboarded ? SCREENS.HOME : SCREENS.ONBOARDING);
  const [currentSubject, setCurrentSubject]     = useState(null);
  const [sessionQuestions, setSessionQuestions] = useState([]);
  const [dailyQueue, setDailyQueue]             = useState([]);
  const [dailyQueueIndex, setDailyQueueIndex]   = useState(0);
  const [dailyResults, setDailyResults]         = useState({});
  const [prevLevels, setPrevLevels]             = useState({});
  const [reviewIndex, setReviewIndex]           = useState(0);
  const [confirmLeaveQuiz, setConfirmLeaveQuiz] = useState(false);

  // Tracks whether we're mid-quiz with unanswered progress that would be lost
  // if the user navigated away. Used to gate the back button with a confirmation
  // rather than silently discarding their place in the daily.
  const quizInProgressRef = useRef(false);

  // ── Browser history integration ──
  // Every screen change pushes a history entry, so the device's native back
  // button (hardware or gesture, e.g. on Android) navigates within the app
  // instead of closing/backgrounding it. We intercept popstate and route it
  // through the same logic as the in-app back button, including the
  // "are you sure" guard for an in-progress quiz.
  const isPoppingRef = useRef(false);

  function navigateTo(nextScreen, replace = false) {
    setScreen(nextScreen);
    if (replace) {
      window.history.replaceState({ screen: nextScreen }, '');
    } else {
      window.history.pushState({ screen: nextScreen }, '');
    }
  }

  useEffect(() => {
    // Seed the initial history entry so there's always something to land on
    window.history.replaceState({ screen }, '');

    function handlePopState(e) {
      if (quizInProgressRef.current) {
        // Block leaving an in-progress quiz silently — push the quiz state
        // back onto the stack and ask for confirmation instead.
        window.history.pushState({ screen: SCREENS.QUIZ }, '');
        setConfirmLeaveQuiz(true);
        return;
      }
      isPoppingRef.current = true;
      const target = e.state?.screen || SCREENS.HOME;
      setScreen(target);
      if (target === SCREENS.HOME) {
        setCurrentSubject(null);
      }
    }

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  function confirmLeaveQuizYes() {
    setConfirmLeaveQuiz(false);
    quizInProgressRef.current = false;
    setCurrentSubject(null);
    setScreen(SCREENS.HOME);
    window.history.replaceState({ screen: SCREENS.HOME }, '');
  }

  function confirmLeaveQuizNo() {
    setConfirmLeaveQuiz(false);
  }

  function getFiftyFiftyUses() {
    const today = getTodayKey();
    if (fiftyFifty.lastReset !== today) {
      setFiftyFifty({ uses: MAX_FIFTY_FIFTY, lastReset: today });
      return MAX_FIFTY_FIFTY;
    }
    return fiftyFifty.uses;
  }

  function useFiftyFifty() {
    const today = getTodayKey();
    setFiftyFifty(prev => ({
      uses: Math.max(0, (prev.lastReset === today ? prev.uses : MAX_FIFTY_FIFTY) - 1),
      lastReset: today
    }));
  }

  function capturePrevLevels() {
    const levels = {};
    Object.keys(subjects).forEach(k => { levels[k] = getLevelFromXP(subjects[k]?.xp || 0); });
    setPrevLevels(levels);
  }

  function handleOnboardingComplete(startingLevels) {
    const newSubjects = {};
    Object.keys(SUBJECT_CONFIG).forEach(key => {
      newSubjects[key] = getInitialSubjectState(startingLevels[key] || 1);
    });
    setSubjects(newSubjects);
    setOnboarded(true);
    navigateTo(SCREENS.HOME, true);
  }

  function startDaily() {
    if (isDailyComplete(dailyState)) return;
    capturePrevLevels();
    const order = getShuffledDailyOrder();
    setDailyQueue(order);
    setDailyQueueIndex(0);
    setDailyResults({});
    const firstSub = order[0];
    const level = getLevelFromXP(subjects[firstSub]?.xp || 0);
    const pool = getQuestionPool(firstSub, level, 1);
    setCurrentSubject(firstSub);
    setSessionQuestions(pool);
    quizInProgressRef.current = true;
    navigateTo(SCREENS.QUIZ);
  }

  function handleQuizComplete({ score, xpEarned, subject, correct, question, selectedIdx }) {
    if (xpEarned > 0) {
      const prevLevel = getLevelFromXP(subjects[subject]?.xp || 0);
      const newXp = (subjects[subject]?.xp || 0) + xpEarned;
      const newLevel = getLevelFromXP(newXp);
      setSubjects(prev => ({
        ...prev,
        [subject]: { xp: newXp }
      }));
      if (newLevel > prevLevel) {
        playSound('levelUp');
      }
    }

    const newResults = {
      ...dailyResults,
      [subject]: { correct, question, selectedIdx }
    };
    setDailyResults(newResults);

    const nextIndex = dailyQueueIndex + 1;
    if (nextIndex < dailyQueue.length) {
      setDailyQueueIndex(nextIndex);
      const nextSub = dailyQueue[nextIndex];
      const level = getLevelFromXP(subjects[nextSub]?.xp || 0);
      const pool = getQuestionPool(nextSub, level, 1);
      setCurrentSubject(nextSub);
      setSessionQuestions(pool);
      // Still mid-daily — replace the current history entry rather than
      // stacking one per question, so back from question 3 doesn't land
      // you on question 2's stale state.
      window.history.replaceState({ screen: SCREENS.QUIZ }, '');
    } else {
      const today = getTodayKey();
      setDailyState({ completedDate: today, results: newResults });
      let newStreakCount = 0;
      setStreak(prev => {
        const updated = updateStreak(prev);
        newStreakCount = updated.count;
        const playedDates = [...(prev.playedDates || [])];
        if (!playedDates.includes(today)) playedDates.push(today);
        return { ...updated, playedDates };
      });
      setStats(prev => updateStatsAfterDaily(prev, newResults, newStreakCount));
      quizInProgressRef.current = false;
      navigateTo(SCREENS.DAILY_COMPLETE, true);
    }
  }

  function openReview(subjectKey) {
    const idx = DAILY_SUBJECT_ORDER.findIndex(s => s === subjectKey);
    setReviewIndex(idx >= 0 ? idx : 0);
    navigateTo(SCREENS.REVIEW);
  }

  function openSettings() {
    navigateTo(SCREENS.SETTINGS);
  }

  function redoCalibration() {
    // Stats and streak are preserved — only subject levels reset via onboarding
    setOnboarded(false);
    navigateTo(SCREENS.ONBOARDING);
  }

  function goHome() {
    quizInProgressRef.current = false;
    setCurrentSubject(null);
    if (isPoppingRef.current) {
      // Reached here via the popstate handler (native back) — state is
      // already being set there, just reset the flag.
      isPoppingRef.current = false;
      return;
    }
    // Reached here via an in-app button — go back in history so the stack
    // doesn't grow unbounded, and let the popstate handler update the screen.
    window.history.back();
  }

  return (
    <div className="app-container">
      <div className="card-fixed">
        {screen === SCREENS.ONBOARDING && (
          <OnboardingScreen onComplete={handleOnboardingComplete} />
        )}
        {screen === SCREENS.HOME && (
          <HomeScreen
            subjects={subjects}
            streak={streak}
            dailyState={dailyState}
            themeKey={themeKey}
            onSetTheme={setThemeKey}
            onStartDaily={startDaily}
            onOpenReview={openReview}
            onOpenSettings={openSettings}
          />
        )}
        {screen === SCREENS.QUIZ && (
          <QuizScreen
            key={currentSubject + dailyQueueIndex}
            subject={currentSubject}
            questions={sessionQuestions}
            totalSubjects={dailyQueue.length || 1}
            currentSubjectIndex={dailyQueueIndex}
            isDaily={true}
            fiftyFiftyUses={getFiftyFiftyUses()}
            onUseFiftyFifty={useFiftyFifty}
            onComplete={handleQuizComplete}
            onHome={() => setConfirmLeaveQuiz(true)}
          />
        )}
        {screen === SCREENS.DAILY_COMPLETE && (
          <DailyCompleteScreen
            results={dailyResults}
            subjects={subjects}
            streak={streak}
            prevLevels={prevLevels}
            stats={stats}
            onHome={goHome}
            onReview={openReview}
          />
        )}
        {screen === SCREENS.REVIEW && (
          <ReviewScreen
            results={dailyState.results}
            startIndex={reviewIndex}
            onHome={goHome}
          />
        )}
        {screen === SCREENS.SETTINGS && (
          <SettingsScreen
            subjects={subjects}
            streak={streak}
            stats={stats}
            onHome={goHome}
            onRedoCalibration={redoCalibration}
          />
        )}

        {confirmLeaveQuiz && (
          <div className="confirm-overlay">
            <div className="confirm-dialog">
              <p className="confirm-title">Leave today's daily?</p>
              <p className="confirm-body">
                Your progress on today's daily won't be saved if you leave now — you'll need to start over.
              </p>
              <div className="confirm-actions">
                <button className="btn-secondary" style={{ marginTop: 0 }} onClick={confirmLeaveQuizNo}>
                  Keep going
                </button>
                <button className="btn-danger" onClick={confirmLeaveQuizYes}>
                  Leave anyway
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <Analytics />
    </div>
  );
}
