import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useState } from 'react';
import './App.css';
import SignupLogin from './components/welcome/SignupLogin';
import Welcome from './components/welcome/Welcome';
import Quiz from './components/welcome/Quiz';
import Profile from "./components/profile/Profile";
import SalesProfile from './components/profile/SalesProfile';
import CustomerProfile from './components/profile/CustomerProfile';
import MainPage from "./components/mainPage/MainPage";
import MyPage from "./components/mypage/MyPage";
import Chatting from "./components/chatting/Chatting";


function App() {
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/login" element={<SignupLogin onLogin={handleLogin} />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/salesProfile/:id" element={<SalesProfile />} />
        <Route path="/customerProfile/:id" element={<CustomerProfile />} />
        <Route path="/mainPage" element={<MainPage />} />
        <Route path="/chatting/:userId" element={<Chatting />} />
        <Route path="/mypage" element={<MyPage />} />
      </Routes>
    </Router>
  );
}

export default App;
