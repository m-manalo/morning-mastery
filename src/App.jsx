import { useState } from 'react';
import { QUESTIONS, BONUS_QS, MAX_FIFTY_FIFTY } from './data/questions';
import { useStorage } from './hooks/useStorage';
import { shuffleArray, updateStreak, getInitialSubjectState, getLevelFromXP } from './utils/gameUtils';
import HomeScreen from './components/HomeScreen';
import QuizScreen from './components/QuizScreen';
import ResultsScreen from './components/ResultsScreen';
import './App.css';

const SCREENS = { HOME: 'home', QUIZ: 'quiz', RESULTS: 'results' };

const DEFAULT_SUBJECTS = {
  science:   getInitialSubjectState(),
  history:   getInitialSubjectState(),
  geography: getInitialSubjectState(),
  maths:     getInitialSubjectState(),
};

function getTodayKey() {
  return new Date().toDateString();
}

export default function App() {
  const [subjects, setSubjects] = useStorage('mm_subjects', DEFAULT_SUBJECTS);
  const [streak, setStreak] = useStorage('mm_streak', { count: 0, lastPlayed: null });
  const [fiftyFifty, setFiftyFifty] = useStorage('mm_5050', { uses: MAX_FIFTY_FIFTY, lastReset: null });

  const [screen, setScreen] = useState(SCREENS.HOME);
  const [currentSubject, setCurrentSubject] = useState(null);
  const [sessionQuestions, setSessionQuestions] = useState([]);
  const [isBonus, setIsBonus] = useState(false);
  const [sessionResult, setSessionResult] = useState(null);
  const [prevLevels, setPrevLevels] = useState({});

  // Reset 50/50 daily
  function getFiftyFiftyUses() {
    const today = getTodayKey();
    if (fiftyFifty.lastReset !== today) {
      const reset = { uses: MAX_FIFTY_FIFTY, lastReset: today };
      setFiftyFifty(reset);
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

  function startSubject(sub, bonus = false) {
    const count = bonus ? BONUS_QS : 1;
    const pool = shuffleArray(QUESTIONS[sub]).slice(0, count);
    const levels = {};
    Object.keys(subjects).forEach(k => {
      levels[k] = getLevelFromXP(subjects[k]?.xp || 0);
    });
    setPrevLevels(levels);
    setCurrentSubject(sub);
    setSessionQuestions(pool);
    setIsBonus(bonus);
    setScreen(SCREENS.QUIZ);
  }

  function handleComplete(result) {
    setSubjects(prev => ({
      ...prev,
      [result.subject]: { xp: (prev[result.subject]?.xp || 0) + result.xpEarned }
    }));
    setStreak(prev => updateStreak(prev));
    setSessionResult({ ...result, isBonus });
    setScreen(SCREENS.RESULTS);
  }

  function goHome() {
    setScreen(SCREENS.HOME);
    setCurrentSubject(null);
    setIsBonus(false);
  }

  function startBonus() {
    startSubject(currentSubject, true);
  }

  const fiftyFiftyUses = getFiftyFiftyUses();

  return (
    <div className="app-container">
      <div className="card-fixed">
        {screen === SCREENS.HOME && (
          <HomeScreen subjects={subjects} streak={streak} onStart={startSubject} />
        )}
        {screen === SCREENS.QUIZ && (
          <QuizScreen
            subject={currentSubject}
            questions={sessionQuestions}
            isBonus={isBonus}
            fiftyFiftyUses={fiftyFiftyUses}
            onUseFiftyFifty={useFiftyFifty}
            onComplete={handleComplete}
            onHome={goHome}
          />
        )}
        {screen === SCREENS.RESULTS && sessionResult && (
          <ResultsScreen
            result={sessionResult}
            subjects={subjects}
            streak={streak}
            prevLevels={prevLevels}
            onHome={goHome}
            onBonus={startBonus}
          />
        )}
      </div>
    </div>
  );
}
