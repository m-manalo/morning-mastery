import { useState, useEffect, useRef } from 'react';
import { SUBJECT_CONFIG, MAX_FIFTY_FIFTY, DAILY_SUBJECT_ORDER } from './data/questions';
import { useStorage } from './hooks/useStorage';
import { useTheme } from './hooks/useTheme';
import {
  updateStreak, getInitialSubjectState, getQuestionPool,
  getLevelFromXP, getTodayKey, isDailyComplete, getShuffledDailyOrder,
  getInitialStats, updateStatsAfterDaily
} from './utils/gameUtils';
import OnboardingScreen, { ONBOARD_STEPS } from './components/OnboardingScreen';
import HomeScreen from './components/HomeScreen';
import QuizScreen from './components/QuizScreen';
import DailyCompleteScreen from './components/DailyCompleteScreen';
import ReviewScreen from './components/ReviewScreen';
import SettingsScreen from './components/SettingsScreen';
import { playSound } from './utils/sound';
import { pushProgress, pullProgress } from './utils/sync';
import ThemePicker from './components/ThemePicker';
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

  const [screen, setScreen]                     = useState(() => {
    if (!onboarded) return SCREENS.ONBOARDING;
    return SCREENS.HOME; // Resume logic for an in-progress session runs after mount, below
  });
  const [currentSubject, setCurrentSubject]     = useState(null);
  const [sessionQuestions, setSessionQuestions] = useState([]);
  const [dailyQueue, setDailyQueue]             = useState([]);
  const [dailyQueueIndex, setDailyQueueIndex]   = useState(0);
  const [dailyResults, setDailyResults]         = useState({});
  const [currentAnswer, setCurrentAnswer]       = useState(null);
  // Persisted so an in-progress daily survives back-navigation, closing the
  // app, or the device killing the tab — resuming lands on the exact same
  // question rather than regenerating a fresh set.
  const [inProgressSession, setInProgressSession] = useStorage('mm_inprogress_v1', null);
  const [prevLevels, setPrevLevels]             = useState({});
  const [reviewIndex, setReviewIndex]           = useState(0);
  const [confirmLeaveQuiz, setConfirmLeaveQuiz] = useState(false);
  const [onboardStep, setOnboardStep]           = useState(ONBOARD_STEPS.WELCOME);
  const [showTheme, setShowTheme]               = useState(false);
  // Refs mirroring screen/onboardStep so the popstate handler (registered
  // once on mount) always re-pushes the *current* values, not whatever they
  // were when the effect first ran.
  const screenRef = useRef(screen);
  const onboardStepRef = useRef(onboardStep);
  useEffect(() => { screenRef.current = screen; }, [screen]);
  useEffect(() => { onboardStepRef.current = onboardStep; }, [onboardStep]);
  const [onboardChoices, setOnboardChoices]     = useState(
    Object.fromEntries(Object.keys(SUBJECT_CONFIG).map(k => [k, 'beginner']))
  );

  // Tracks whether we're mid-quiz with unanswered progress that would be lost
  // if the user navigated away. Used to gate the back button with a confirmation
  // rather than silently discarding their place in the daily.
  const quizInProgressRef = useRef(false);
  const [mountKey, setMountKey] = useState(0);

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

  // Onboarding has its own internal steps (Welcome → Calibrate → Confirm) that
  // also need to participate in browser history, otherwise pressing back
  // partway through onboarding falls through and closes the app — same root
  // cause as the screen-level navigation issue, just one level deeper.
  function changeOnboardStep(nextStep) {
    setOnboardStep(nextStep);
    window.history.pushState({ screen: SCREENS.ONBOARDING, onboardStep: nextStep }, '');
  }

  useEffect(() => {
    // Seed two history entries: a "floor" sentinel, then the real starting
    // screen on top. Without the floor, pressing back on the very first
    // screen a user sees has nowhere to go within the app's own history and
    // falls through to closing the browser/PWA outright. With the floor in
    // place, that first back-press lands safely on the floor (which we
    // re-push immediately below) rather than exiting unexpectedly.
    window.history.replaceState({ screen: '__floor__' }, '');
    window.history.pushState({ screen, onboardStep }, '');

    function handlePopState(e) {
      if (quizInProgressRef.current) {
        // Block leaving an in-progress quiz silently — push the quiz state
        // back onto the stack and ask for confirmation instead.
        window.history.pushState({ screen: SCREENS.QUIZ }, '');
        setConfirmLeaveQuiz(true);
        return;
      }
      if (e.state?.screen === '__floor__' || !e.state) {
        // Hit the floor — re-push the current screen so the app stays open
        // rather than falling through to a black screen / app close.
        window.history.pushState({ screen: screenRef.current, onboardStep: onboardStepRef.current }, '');
        return;
      }
      isPoppingRef.current = true;
      const target = e.state.screen;
      setScreen(target);
      if (target === SCREENS.HOME) {
        setCurrentSubject(null);
      }
      if (target === SCREENS.DAILY_COMPLETE) {
        setMountKey(k => k + 1);
      }
      if (target === SCREENS.ONBOARDING) {
        setOnboardStep(e.state?.onboardStep ?? ONBOARD_STEPS.WELCOME);
      }
    }

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Pull progress from Supabase on first load.
  // Runs regardless of onboarded state — if this is a new browser/device
  // but the user has existing progress in Supabase, we restore it and
  // skip onboarding entirely rather than making them recalibrate.
  useEffect(() => {
    pullProgress().then(updated => {
      if (updated) {
        // Remote data was written to localStorage — re-read into React state
        try {
          const raw = localStorage.getItem('mm_subjects_v2');
          if (raw) setSubjects(JSON.parse(raw));
        } catch {}
        try {
          const raw = localStorage.getItem('mm_streak_v2');
          if (raw) setStreak(JSON.parse(raw));
        } catch {}
        try {
          const raw = localStorage.getItem('mm_stats_v1');
          if (raw) setStats(JSON.parse(raw));
        } catch {}
        try {
          const raw = localStorage.getItem('mm_daily_v2');
          if (raw) setDailyState(JSON.parse(raw));
        } catch {}
        // If remote data exists, mark as onboarded and go to home
        // regardless of what the local onboarded flag says
        const remoteOnboarded = localStorage.getItem('mm_onboarded_v1');
        if (!remoteOnboarded) {
          localStorage.setItem('mm_onboarded_v1', 'true');
          setOnboarded(true);
          setScreen(SCREENS.HOME);
          window.history.replaceState({ screen: SCREENS.HOME }, '');
        }
      }
    });
  }, []);

  // On load, resume an in-progress daily if one exists and is still valid
  // for today (e.g. the app was closed mid-quiz, or the back button was
  // pressed) — restores the exact question rather than starting over.
  useEffect(() => {
    if (!onboarded) return;
    if (isDailyComplete(dailyState)) {
      // Daily already finished elsewhere/since — discard any stale session
      if (inProgressSession) setInProgressSession(null);
      return;
    }
    if (inProgressSession && inProgressSession.order?.length) {
      setDailyQueue(inProgressSession.order);
      setDailyQueueIndex(inProgressSession.queueIndex || 0);
      setDailyResults(inProgressSession.results || {});
      setCurrentSubject(inProgressSession.currentSubject);
      setSessionQuestions(inProgressSession.questions || []);
      setPrevLevels(inProgressSession.prevLevels || {});
      setCurrentAnswer(inProgressSession.currentAnswer || null);
      quizInProgressRef.current = true;
      setScreen(SCREENS.QUIZ);
      window.history.replaceState({ screen: SCREENS.QUIZ }, '');
    }
  }, []);

  function confirmLeaveQuizYes() {
    setConfirmLeaveQuiz(false);
    // Progress is persisted via inProgressSession, so leaving just goes home —
    // nothing is lost, the daily resumes from this exact question next time.
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
    setTimeout(() => pushProgress(), 1000);
    navigateTo(SCREENS.HOME, true);
  }

  function startDaily() {
    if (isDailyComplete(dailyState)) return;

    // Resume an already-in-progress session rather than generating a new one —
    // this is what stops "go back, tap start again" from resetting the questions.
    if (inProgressSession && inProgressSession.order?.length) {
      setDailyQueue(inProgressSession.order);
      setDailyQueueIndex(inProgressSession.queueIndex || 0);
      setDailyResults(inProgressSession.results || {});
      setCurrentSubject(inProgressSession.currentSubject);
      setSessionQuestions(inProgressSession.questions || []);
      setPrevLevels(inProgressSession.prevLevels || {});
      setCurrentAnswer(inProgressSession.currentAnswer || null);
      quizInProgressRef.current = true;
      navigateTo(SCREENS.QUIZ);
      return;
    }

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
    setCurrentAnswer(null);
    quizInProgressRef.current = true;
    const levels = {};
    Object.keys(subjects).forEach(k => { levels[k] = getLevelFromXP(subjects[k]?.xp || 0); });
    setInProgressSession({
      order, queueIndex: 0, results: {},
      currentSubject: firstSub, questions: pool,
      prevLevels: levels, currentAnswer: null,
    });
    navigateTo(SCREENS.QUIZ);
  }

  function handleQuizAnswer({ selectedIdx, correct }) {
    setCurrentAnswer({ selectedIdx, correct });
    setInProgressSession(prev => prev && ({
      ...prev,
      currentAnswer: { selectedIdx, correct },
    }));
  }

  function handleQuizComplete({ score, xpEarned, subject, correct, question, selectedIdx }) {
    if (xpEarned > 0) {
      const newXp = (subjects[subject]?.xp || 0) + xpEarned;
      setSubjects(prev => ({
        ...prev,
        [subject]: { xp: newXp }
      }));
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
      setCurrentAnswer(null);
      // Still mid-daily — replace the current history entry rather than
      // stacking one per question, so back from question 3 doesn't land
      // you on question 2's stale state.
      window.history.replaceState({ screen: SCREENS.QUIZ }, '');
      setInProgressSession(prev => prev && ({
        ...prev,
        queueIndex: nextIndex,
        results: newResults,
        currentSubject: nextSub,
        questions: pool,
        currentAnswer: null,
      }));
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
      setInProgressSession(null);
      // Push to Supabase after a short delay to let React state settle first
      setTimeout(() => pushProgress(), 1000);
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
    setOnboardStep(ONBOARD_STEPS.WELCOME);
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
          <OnboardingScreen
            step={onboardStep}
            onStepChange={changeOnboardStep}
            choices={onboardChoices}
            onChoicesChange={setOnboardChoices}
            onComplete={handleOnboardingComplete}
          />
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
            onShowTheme={() => setShowTheme(true)}
            inProgress={!!(inProgressSession && inProgressSession.order?.length)}
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
            onAnswer={handleQuizAnswer}
            initialAnswer={currentAnswer}
            onHome={() => setConfirmLeaveQuiz(true)}
          />
        )}
        {screen === SCREENS.DAILY_COMPLETE && (
          <DailyCompleteScreen
            key={mountKey}
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
              <p className="confirm-title">Pause today's daily?</p>
              <p className="confirm-body">
                No rush — your place is saved. Come back any time today and you'll pick up on this exact question.
              </p>
              <div className="confirm-actions">
                <button className="btn-secondary" style={{ marginTop: 0 }} onClick={confirmLeaveQuizNo}>
                  Keep going
                </button>
                <button className="btn-primary" style={{ marginTop: 0 }} onClick={confirmLeaveQuizYes}>
                  Go home
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ThemePicker rendered at card level so overflow:scroll on screen-inner doesn't clip it */}
        {showTheme && (
          <ThemePicker
            themeKey={themeKey}
            onSelect={setThemeKey}
            onClose={() => setShowTheme(false)}
          />
        )}
      </div>
      <Analytics />
    </div>
  );
}
