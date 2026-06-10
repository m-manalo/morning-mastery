import { useState } from 'react';
import { QUESTIONS, QS_PER_SESSION } from './data/questions';
import { useStorage } from './hooks/useStorage';
import { shuffleArray, updateStreak, getInitialSubjectState, getLevelFromXP } from './utils/gameUtils';
import HomeScreen from './components/HomeScreen';
import QuizScreen from './components/QuizScreen';
import ResultsScreen from './components/ResultsScreen';
import GameOverScreen from './components/GameOverScreen';
import './App.css';

const SCREENS = { HOME: 'home', QUIZ: 'quiz', RESULTS: 'results', GAMEOVER: 'gameover' };

const DEFAULT_SUBJECTS = {
  science:   getInitialSubjectState(),
  history:   getInitialSubjectState(),
  geography: getInitialSubjectState(),
  maths:     getInitialSubjectState(),
};

export default function App() {
  const [subjects, setSubjects] = useStorage('mm_subjects', DEFAULT_SUBJECTS);
  const [streak, setStreak] = useStorage('mm_streak', { count: 0, lastPlayed: null });

  const [screen, setScreen] = useState(SCREENS.HOME);
  const [currentSubject, setCurrentSubject] = useState(null);
  const [sessionQuestions, setSessionQuestions] = useState([]);
  const [sessionResult, setSessionResult] = useState(null);
  const [gameOverResult, setGameOverResult] = useState(null);
  const [prevLevels, setPrevLevels] = useState({});

  function startSubject(sub) {
    const pool = shuffleArray(QUESTIONS[sub]).slice(0, QS_PER_SESSION);
    const levels = {};
    Object.keys(subjects).forEach(k => {
      levels[k] = getLevelFromXP(subjects[k]?.xp || 0);
    });
    setPrevLevels(levels);
    setCurrentSubject(sub);
    setSessionQuestions(pool);
    setScreen(SCREENS.QUIZ);
  }

  function handleComplete(result) {
    setSubjects(prev => ({
      ...prev,
      [result.subject]: { xp: (prev[result.subject]?.xp || 0) + result.xpEarned }
    }));
    setStreak(prev => updateStreak(prev));
    setSessionResult(result);
    setScreen(SCREENS.RESULTS);
  }

  function handleGameOver(result) {
    setGameOverResult(result);
    setScreen(SCREENS.GAMEOVER);
  }

  function goHome() {
    setScreen(SCREENS.HOME);
    setCurrentSubject(null);
  }

  function retrySubject() {
    startSubject(currentSubject);
  }

  return (
    <div className="app-container">
      {screen === SCREENS.HOME && (
        <HomeScreen subjects={subjects} streak={streak} onStart={startSubject} />
      )}
      {screen === SCREENS.QUIZ && (
        <QuizScreen
          subject={currentSubject}
          questions={sessionQuestions}
          onComplete={handleComplete}
          onGameOver={handleGameOver}
        />
      )}
      {screen === SCREENS.RESULTS && sessionResult && (
        <ResultsScreen
          result={sessionResult}
          subjects={subjects}
          streak={streak}
          prevLevels={prevLevels}
          onHome={goHome}
          onRetry={retrySubject}
        />
      )}
      {screen === SCREENS.GAMEOVER && gameOverResult && (
        <GameOverScreen
          subject={currentSubject}
          result={gameOverResult}
          onHome={goHome}
          onRetry={retrySubject}
        />
      )}
    </div>
  );
}
