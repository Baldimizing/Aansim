// aansim-client/components/SignupLogin.js
import axios from 'axios';
import React, { useState } from 'react';

const SignupLogin = ({score, setScore}) => {
  const [isSignUp, setIsSignUp] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [idProof, setIdProof] = useState(null);

  // iD Proof 받기
  const handleIdProofChange = (event) => {
    setIdProof(event.target.files[0]);
  };
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
    setUsername(event.target.value);
    setMessage('');
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setMessage('');
  };

  const handleSignup = ( score ) => {

    if (score < 0) {
      setMessage('[안내] 착함 점수가 부족하면 회원가입이 불가합니다. 안녕히 가십시오.');
      return;
    }

    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    formData.append('score', score)

    // 회원가입 처리
    axios
      .post('/api/signup', formData)
      .then((response) => {
        setMessage('회원가입에 성공하였습니다.');
      })
      .catch((error) => {
        setMessage('회원가입에 실패하였습니다.');
      });
  };

  const handleLogin = () => {
    // 로그인 처리
    axios
      .post('/api/login', { username, password })
      .then((response) => {
        setMessage('로그인에 성공하였습니다.');
      })
      .catch((error) => {
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
        {isSignUp && (
          <label>
            점수 :
            <input type="number" value={score} readOnly />
          </label>
        )}
        <button type="submit">{buttonText}</button>
      </form>
      <p>
        {toggleText}
        <button type="button" onClick={handleToggle}>
          {isSignUp ? '로그인으로 전환' : '회원가입으로 전환'}
        </button>
      </p>
      {message && <p>{message}</p>}
    </div>
  );
};

export default SignupLogin;
