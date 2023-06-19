import axios from 'axios';
import React, { useState } from 'react';

const SignupLogin = () => {
  const [isSignUp, setIsSignUp] = useState(true);
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleToggle = () => {
    setIsSignUp((prevState) => !prevState);
    setMessage('');
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (isSignUp) {
      handleSignup();
    }
    handleLogin();
  };

  const handleUsernameChange = (event) => {
    setUserName(event.target.value);
    setMessage('');
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setMessage('');
  };

  const handleSignup = () => {
    // 회원가입 처리
    axios.post('/api/signup', { username, password })
    .then(response => {
        setMessage('회원가입에 성공하였습니다.');
    })
    .catch(error => {
        setMessage('회원가입에 실패하였습니다.');
    });
  };

  const handleLogin = () => {
    // 로그인 처리
    axios.post('/api/login', { username, password })
    .then(response => {
        setMessage('로그인에 성공하였습니다.');
    })
    .catch(error => {
        setMessage('로그인에 실패하였습니다.');
    });
  };

  let buttonText = '로그인';
  let toggleText = '계정이 없으신가요?';

  if (isSignUp) {
    buttonText = '회원가입';
    toggleText = '이미 계정이 있으신가요?';
  }

  return (
    <div>
      <h2>{isSignUp ? '회원가입' : '로그인'}</h2>
      <form onSubmit={handleFormSubmit}>
        <label>
          Username:
          <input type="text" value={username} onChange={handleUsernameChange} />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={handlePasswordChange} />
        </label>
        <button type="submit">{buttonText}</button>
      </form>
      <p>
        {toggleText}
        <button type="button" onClick={handleToggle}>
          {isSignUp ? '로그인으로 전환' : '회원가입으로 전환'}
        </button>
      </p>
    </div>
  );
};

export default SignupLogin;
