import React, { useState } from 'react';
import './App.css';
import SignupLogin from './components/SignupLogin';
import Welcome from './components/Welcome';
import Quiz from './components/Quiz';



function App() {
  const [page, setPage] = useState('welcome');
  const [score, setScore] = useState(0); // 점수 관리용 생성자 추가
  const [isSignUp, setIsSignUp] = useState(true); 

  const startQuiz = () => {
    setPage('quiz');
  };

  const showLogin = (quizScore) => {
    setPage('login');
    setScore(quizScore); // 퀴즈 끝난 점수 저장
  };

  return (
    <div className="app">
      {page === 'welcome' && <Welcome onStart={startQuiz} />}
      {page === 'quiz' && <Quiz onQuizEnd={showLogin} />}
      {page === 'login' && <SignupLogin score={score} setScore={setScore} isSignUp={isSignUp} setIsSignUp={setIsSignUp} />}
    </div>
  );
}

export default App;
