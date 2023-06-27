import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import './SignupLogin.css';

const SignupLogin = ({score, setScore}) => {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const responseGoogle = (response) => {
    console.log(response);
  }

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
        navigate('profile');
      })
      .catch((error) => {
        setMessage('로그인에 실패하였습니다.');
      });
  };

  let buttonText = isSignUp ? '회원가입' : '로그인';
  let toggleText = isSignUp ? '이미 계정이 있으신가요?' : '계정이 없으신가요?';

  return (
    <div className='signup-login-container'>
      <h2>{isSignUp ? '회원가입' : '로그인'}</h2>
      <form className='form' onSubmit={handleFormSubmit}>
        <div className='input-field'>
          <input type="text" id='username' placeholder='이메일 주소' value={username} onChange={handleInputChange(setUsername)} />
        </div>
        <div className='input-field'>
          <input type="password" id='password' placeholder='비밀번호' value={password} onChange={handleInputChange(setPassword)} />
        </div>
        <div className='submit'>
          <button type="submit">{buttonText}</button>
        </div>
      </form>
      <div className='toggle'>
        <p>{toggleText}</p>
        <button type="button" onClick={handleToggle}>
          {isSignUp ? '로그인으로 전환' : '회원가입으로 전환'}
        </button>
      </div>
      <div className='social-login'>
        <GoogleLogin
          clientId="YOUR_CLIENT_ID" 
          buttonText="구글 계정으로 안심하기"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={'single_host_origin'}
        />
      </div>
      {message && <p>{message}</p>}
    </div>
  );
};

export default SignupLogin;
