import { useState } from 'react';
import { QUESTIONS, SUBJECT_CONFIG, PRACTICE_QS, MAX_FIFTY_FIFTY } from './data/questions';
import { useStorage } from './hooks/useStorage';
import {
  shuffleArray, updateStreak, getInitialSubjectState,
  getLevelFromXP, getTodayKey, isDailyComplete, getShuffledDailyOrder
} from './utils/gameUtils';
import HomeScreen from './components/HomeScreen';
import QuizScreen from './components/QuizScreen';
import DailyCompleteScreen from './components/DailyCompleteScreen';
import PracticeResultsScreen from './components/PracticeResultsScreen';
import './App.css';

const SCREENS = { HOME:'home', QUIZ:'quiz', DAILY_COMPLETE:'daily_complete', PRACTICE_RESULTS:'practice_results' };

const DEFAULT_SUBJECTS = Object.fromEntries(
  Object.keys(SUBJECT_CONFIG).map(k => [k, getInitialSubjectState()])
);

export default function App() {
  const [subjects, setSubjects]     = useStorage('mm_subjects_v2', DEFAULT_SUBJECTS);
  const [streak, setStreak]         = useStorage('mm_streak_v2', { count:0, lastPlayed:null, playedDates:[] });
  const [dailyState, setDailyState] = useStorage('mm_daily_v2', { completedDate:null, results:{} });
  const [fiftyFifty, setFiftyFifty] = useStorage('mm_5050_v2', { uses: MAX_FIFTY_FIFTY, lastReset:null });

  const [screen, setScreen]                   = useState(SCREENS.HOME);
  const [currentSubject, setCurrentSubject]   = useState(null);
  const [sessionQuestions, setSessionQuestions] = useState([]);
  const [isDaily, setIsDaily]                 = useState(false);
  const [dailyQueue, setDailyQueue]           = useState([]);
  const [dailyQueueIndex, setDailyQueueIndex] = useState(0);
  const [dailyResults, setDailyResults]       = useState({});
  const [practiceResult, setPracticeResult]   = useState(null);
  const [prevLevels, setPrevLevels]           = useState({});

  // 50/50 daily reset
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

  // Start daily mode
  function startDaily() {
    if (isDailyComplete(dailyState)) return;
    capturePrevLevels();
    const order = getShuffledDailyOrder();
    setDailyQueue(order);
    setDailyQueueIndex(0);
    setDailyResults({});
    setIsDaily(true);
    launchSubject(order[0], 1); // always 1 question per subject in daily
  }

  // Start practice mode
  function startPractice(sub) {
    capturePrevLevels();
    setIsDaily(false);
    launchSubject(sub, PRACTICE_QS);
  }

  // questionCount passed explicitly — never relies on isDaily state which may not have flushed
  function launchSubject(sub, questionCount) {
    const pool = shuffleArray(QUESTIONS[sub]).slice(0, questionCount);
    setCurrentSubject(sub);
    setSessionQuestions(pool);
    setScreen(SCREENS.QUIZ);
  }

  // Called when a quiz question (or set) is answered
  function handleQuizComplete({ score, xpEarned, subject, correct }) {
    // Award XP
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
        // More subjects to go — always 1 question each
        setDailyQueueIndex(nextIndex);
        const nextSub = dailyQueue[nextIndex];
        const pool = shuffleArray(QUESTIONS[nextSub]).slice(0, 1);
        setCurrentSubject(nextSub);
        setSessionQuestions(pool);
        // stay on QUIZ screen — question slides in
      } else {
        // All subjects done
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
      setPracticeResult({ score, xpEarned, subject });
      setScreen(SCREENS.PRACTICE_RESULTS);
    }
  }

  function goHome() {
    setScreen(SCREENS.HOME);
    setCurrentSubject(null);
    setIsDaily(false);
  }

  const fiftyFiftyUses = getFiftyFiftyUses();

  return (
    <div className="app-container">
      <div className="card-fixed">
        {screen === SCREENS.HOME && (
          <HomeScreen
            subjects={subjects}
            streak={streak}
            dailyState={dailyState}
            onStartDaily={startDaily}
            onStartPractice={startPractice}
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
            fiftyFiftyUses={fiftyFiftyUses}
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
            onPractice={(sub) => { goHome(); setTimeout(() => startPractice(sub), 50); }}
          />
        )}
        {screen === SCREENS.PRACTICE_RESULTS && practiceResult && (
          <PracticeResultsScreen
            result={practiceResult}
            subjects={subjects}
            prevLevels={prevLevels}
            onHome={goHome}
            onRetry={() => startPractice(currentSubject)}
          />
        )}
      </div>
    </div>
  );
}
