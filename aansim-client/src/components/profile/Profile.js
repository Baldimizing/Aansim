
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

const USER_TYPES = ['판매자', '구매자'];
const TIMELOG_MONTHS = 5;

function Profile({ score }) {
    const [userType, setUserType] = useState('');
    const [userName, setUserName] = useState('');
    const [introduction, setIntroduction] = useState('');
    const [timeLogs, setTimeLogs] = useState(Array(TIMELOG_MONTHS).fill(''));
    const [safetyScore, setSafetyScore] = useState(score);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const delay = ms => new Promise(res => setTimeout(res, ms)); // 딜레이 함수

  useEffect(() => {
    let timer;
    if (isLoading) {
      timer = setTimeout(() => {
        setIsLoading(false); // 로딩 상태를 false로 변경
        navigate('/mainPage'); // mainPage로 이동
      }, 5800); 
    }
    return () => clearTimeout(timer); // 컴포넌트가 언마운트되거나 업데이트되면 타이머를 제거
  }, [isLoading, navigate]); // isLoading 또는 navigate가 변경될 때마다 이 훅을 실행

  // 닉네임 변경 핸들러 추가
  const handleUserNameChange = (e) => {
    setUserName(e.target.value);
    };
    
  const handleUserTypeChange = (e) => {
    setUserType(e.target.value);
  };

  const handleIntroductionChange = (e) => {
    if (e.target.value.length <= 100) {
      setIntroduction(e.target.value);
    }
  };

  const handleTimeLogChange = (index) => (e) => {
    const newTimeLogs = [...timeLogs];
    newTimeLogs[index] = e.target.value;
    setTimeLogs(newTimeLogs);
  };

  const onFileChange = async (e) => { // 파일 선택 핸들러
    setIsLoading(false);
    setIsLoading(true);
    setTimeout(() => {
      setTimeout(() => {
        setIsLoading(false);
      }, 3500);
    }, 3500);
  };

  return (
    <div className='body' style={{ overflowY: 'auto', minHeight: '100vh' }}>
      <div className='header'>
        <h1>프로필 등록</h1>
      </div>

      {/* 닉네임 입력 */}
      <div className='user_name'>
        <h2>회원명 입력</h2>
        <input
          type='text'
          value={userName}
          onChange={handleUserNameChange}
          placeholder='회원명을 입력해주세요'
        />
      </div>

      {/* 회원 유형 선택 */}
      <div className='user_type'>
        <h2>회원 유형 선택</h2>
        <select value={userType} onChange={handleUserTypeChange}>
          <option value=''>-- 유형을 선택해주세요 --</option>
          {USER_TYPES.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      {/* 안심 지수 표시 */}
      <div className='safe_score'>
        <h2>나의 안심 지수</h2>
        <p>나의 안심 지수: {safetyScore}</p>
        <p>안심지수란?</p>
        <p>안심 가이드 진행중 측정된 회원님의 거래 신뢰도 지수입니다.</p>
      </div>

      {/* 자기 소개 입력 */}
      <div className='introduction'>
        <h2>자기 소개 작성</h2>
        <textarea
          value={introduction}
          onChange={handleIntroductionChange}
          placeholder='자기 소개를 작성해주세요 (100자 이내)'
        />
      </div>

      {/* 타임로그 입력 */}
      <div className='timelog'>
        <h2>타임로그 작성</h2>
        {timeLogs.map((timeLog, index) => (
          <div key={index}>
            <span>{index + 1}개월 전:</span>
            <input
              type='text'
              value={timeLog}
              onChange={handleTimeLogChange(index)}
              placeholder='거래 기록을 입력해주세요'
            />
          </div>
        ))}
      </div>

      {/* 사진 촬영 및 등록 */}
      <div className='id_card'>
        <h2>신분증 촬영</h2>
        <p>신분증을 촬영하여 등록해주세요</p>
        <input type='file' onChange={onFileChange} />
      </div>

      {/* 메시지 표시 */}
      {message && <p>사진이 등록되었습니다.</p>}

      {/* 로딩 애니메이션 */}
      {isLoading && (
        <img
          className={`loading-gif ${isLoading ? 'active' : ''}`}
          src='https://cdn.dribbble.com/users/93860/screenshots/3985406/face-id_1.gif'
          alt='Loading'
        />
      )}
    </div>
  );
}

export default Profile;
