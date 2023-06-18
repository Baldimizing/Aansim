import React, { useState } from 'react';

const SignupLogin = () => {
  const [isSignUp, setIsSignUp] = useState(true);
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const handleToggle = () => {
    setIsSignUp(prevState => !prevState);
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
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSignup = () => {
    // 회원가입 처리
  };

  const handleLogin = () => {
    // 로그인 처리
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
