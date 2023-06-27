import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useState } from 'react';
import './App.css';
import SignupLogin from './components/welcome/SignupLogin';
import Welcome from './components/welcome/Welcome';
import Quiz from './components/welcome/Quiz';

function App() {
  const [score, setScore] = useState(0); // 점수 관리용 생성자 추가
  const [isSignUp, setIsSignUp] = useState(true);

  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/quiz" element={<Quiz onQuizEnd={setScore} />} />
          <Route path="/login" element={<SignupLogin score={score} setScore={setScore} isSignUp={isSignUp} setIsSignUp={setIsSignUp} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
