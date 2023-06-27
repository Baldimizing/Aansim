import axios from 'axios';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const SignupLogin = ({score, setScore}) => {
  const history = useHistory();
  const [isSignUp, setIsSignUp] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleToggle = () => {
    setIsSignUp((prevState) => !prevState);
    setMessage('');
  };

  const handleInputChange = (setter) => (event) => {
    setter(event.target.value);
    setMessage('');
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    isSignUp ? handleSignup() : handleLogin();
  };

  const handleSignup = () => {
    if (score < 0) {
      setMessage('[안내] 착함 점수가 부족하면 회원가입이 불가합니다. 안녕히 가십시오.');
      return;
    }
  
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    formData.append('score', score)
  
    axios.post('/api/signup', formData)
      .then((response) => {
        setMessage('회원가입에 성공하였습니다.');
      })
      .catch((error) => {
        setMessage('회원가입에 실패하였습니다.');
      });
  };

  const handleLogin = () => {
    axios.post('/api/login', { username, password })
      .then((response) => {
        setMessage('로그인에 성공하였습니다.');
        history.push('profile');
      })
      .catch((error) => {
        setMessage('로그인에 실패하였습니다.');
      });
  };

  let buttonText = isSignUp ? '회원가입' : '로그인';
  let toggleText = isSignUp ? '이미 계정이 있으신가요?' : '계정이 없으신가요?';

  return (
    <div>
      <h2>{isSignUp ? '회원가입' : '로그인'}</h2>
      <form onSubmit={handleFormSubmit}>
        <label>
          Username:
          <input type="text" value={username} onChange={handleInputChange(setUsername)} />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={handleInputChange(setPassword)} />
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
