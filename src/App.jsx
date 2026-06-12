import { useState } from 'react';
import { SUBJECT_CONFIG, PRACTICE_QS, MAX_FIFTY_FIFTY } from './data/questions';
import { useStorage } from './hooks/useStorage';
import { useTheme } from './hooks/useTheme';
import {
  updateStreak, getInitialSubjectState, getQuestionPool,
  getLevelFromXP, getTodayKey, isDailyComplete, getShuffledDailyOrder
} from './utils/gameUtils';
import OnboardingScreen from './components/OnboardingScreen';
import HomeScreen from './components/HomeScreen';
import QuizScreen from './components/QuizScreen';
import DailyCompleteScreen from './components/DailyCompleteScreen';
import PracticeResultsScreen from './components/PracticeResultsScreen';
import './App.css';

const SCREENS = { ONBOARDING:'onboarding', HOME:'home', QUIZ:'quiz', DAILY_COMPLETE:'daily_complete', PRACTICE_RESULTS:'practice_results' };

const DEFAULT_SUBJECTS = Object.fromEntries(
  Object.keys(SUBJECT_CONFIG).map(k => [k, getInitialSubjectState(1)])
);

export default function App() {
  const { themeKey, setThemeKey } = useTheme();
  const [subjects, setSubjects]     = useStorage('mm_subjects_v2', DEFAULT_SUBJECTS);
  const [streak, setStreak]         = useStorage('mm_streak_v2', { count: 0, lastPlayed: null, playedDates: [] });
  const [dailyState, setDailyState] = useStorage('mm_daily_v2', { completedDate: null, results: {} });
  const [fiftyFifty, setFiftyFifty] = useStorage('mm_5050_v2', { uses: MAX_FIFTY_FIFTY, lastReset: null });
  const [practiceUsed, setPracticeUsed] = useStorage('mm_practice_v1', { date: null, subjects: [] });
  const [onboarded, setOnboarded]   = useStorage('mm_onboarded_v1', false);

  const [screen, setScreen]                     = useState(onboarded ? SCREENS.HOME : SCREENS.ONBOARDING);
  const [currentSubject, setCurrentSubject]     = useState(null);
  const [sessionQuestions, setSessionQuestions] = useState([]);
  const [isDaily, setIsDaily]                   = useState(false);
  const [dailyQueue, setDailyQueue]             = useState([]);
  const [dailyQueueIndex, setDailyQueueIndex]   = useState(0);
  const [dailyResults, setDailyResults]         = useState({});
  const [practiceResult, setPracticeResult]     = useState(null);
  const [prevLevels, setPrevLevels]             = useState({});

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

  function getPracticedSubjectsToday() {
    const today = getTodayKey();
    if (practiceUsed.date !== today) return [];
    return practiceUsed.subjects || [];
  }

  function markSubjectPracticed(sub) {
    const today = getTodayKey();
    setPracticeUsed(prev => {
      const subjects = prev.date === today ? (prev.subjects || []) : [];
      return { date: today, subjects: [...new Set([...subjects, sub])] };
    });
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
    setIsDaily(true);
    const firstSub = order[0];
    const level = getLevelFromXP(subjects[firstSub]?.xp || 0);
    const pool = getQuestionPool(firstSub, level, 1);
    setCurrentSubject(firstSub);
    setSessionQuestions(pool);
    setScreen(SCREENS.QUIZ);
  }

  function startPractice(sub) {
    if (getPracticedSubjectsToday().includes(sub)) return;
    capturePrevLevels();
    setIsDaily(false);
    const level = getLevelFromXP(subjects[sub]?.xp || 0);
    const pool = getQuestionPool(sub, level, PRACTICE_QS);
    setCurrentSubject(sub);
    setSessionQuestions(pool);
    setScreen(SCREENS.QUIZ);
  }

  function handleQuizComplete({ score, xpEarned, subject, correct }) {
    if (xpEarned > 0) {
      setSubjects(prev => ({
        ...prev,
        [subject]: { xp: (prev[subject]?.xp || 0) + xpEarned }
      }));
    }

    if (isDaily) {
      const newResults = { ...dailyResults, [subject]: correct };
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
        setStreak(prev => {
          const updated = updateStreak(prev);
          const playedDates = [...(prev.playedDates || [])];
          if (!playedDates.includes(today)) playedDates.push(today);
          return { ...updated, playedDates };
        });
        setScreen(SCREENS.DAILY_COMPLETE);
      }
    } else {
      markSubjectPracticed(subject);
      setPracticeResult({ score, xpEarned, subject });
      setScreen(SCREENS.PRACTICE_RESULTS);
    }
  }

  function goHome() {
    setScreen(SCREENS.HOME);
    setCurrentSubject(null);
    setIsDaily(false);
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
            onStartPractice={startPractice}
            practicedToday={getPracticedSubjectsToday()}
          />
        )}
        {screen === SCREENS.QUIZ && (
          <QuizScreen
            key={currentSubject + dailyQueueIndex}
            subject={currentSubject}
            questions={sessionQuestions}
            totalSubjects={dailyQueue.length || 1}
            currentSubjectIndex={dailyQueueIndex}
            isDaily={isDaily}
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
            onHome={goHome}
            onPractice={sub => { goHome(); setTimeout(() => startPractice(sub), 50); }}
          />
        )}
        {screen === SCREENS.PRACTICE_RESULTS && practiceResult && (
          <PracticeResultsScreen
            result={practiceResult}
            subjects={subjects}
            prevLevels={prevLevels}
            onHome={goHome}
          />
        )}
      </div>
    </div>
  );
}
