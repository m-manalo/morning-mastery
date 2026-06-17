import { useState } from 'react';
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
    setScreen(SCREENS.HOME);
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
    setScreen(SCREENS.QUIZ);
  }

  function handleQuizComplete({ score, xpEarned, subject, correct, question, selectedIdx }) {
    if (xpEarned > 0) {
      setSubjects(prev => ({
        ...prev,
        [subject]: { xp: (prev[subject]?.xp || 0) + xpEarned }
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
      setScreen(SCREENS.DAILY_COMPLETE);
    }
  }

  function openReview(subjectKey) {
    const idx = DAILY_SUBJECT_ORDER.findIndex(s => s === subjectKey);
    setReviewIndex(idx >= 0 ? idx : 0);
    setScreen(SCREENS.REVIEW);
  }

  function openSettings() {
    setScreen(SCREENS.SETTINGS);
  }

  function redoCalibration() {
    // Stats and streak are preserved — only subject levels reset via onboarding
    setOnboarded(false);
    setScreen(SCREENS.ONBOARDING);
  }

  function goHome() {
    setScreen(SCREENS.HOME);
    setCurrentSubject(null);
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
            onHome={goHome}
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
      </div>
      <Analytics />
    </div>
  );
}
