
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

const USER_TYPES = ['판매자', '구매자'];
const TIMELOG_MONTHS = 5;

function Profile({ score }) {
    const [userType, setUserType] = useState('');
    const [introduction, setIntroduction] = useState('');
    const [photo, setPhoto] = useState(null);
    const [timeLogs, setTimeLogs] = useState(Array(TIMELOG_MONTHS).fill(''));
    const [safetyScore, setSafetyScore] = useState(score);
    const [isLoading, setIsLoading] = useState(false); // 로딩 상태
    const [message, setMessage] = useState(''); // 메시지 상태
    const navigate = useNavigate(); // 페이지 이동을 위한 훅
    const delay = ms => new Promise(res => setTimeout(res, ms)); // 딜레이 함수

  useEffect(() => {
    let timer;
    if (isLoading) {
      timer = setTimeout(() => {
        setIsLoading(false); // 로딩 상태를 false로 변경
        navigate('/mainPage'); // mainPage로 이동
      }, 5800); // 3초 후에 작동
    }
    return () => clearTimeout(timer); // 컴포넌트가 언마운트되거나 업데이트되면 타이머를 제거
  }, [isLoading, navigate]); // isLoading 또는 navigate가 변경될 때마다 이 훅을 실행

  const handleUserTypeChange = (e) => {
    setUserType(e.target.value);
  };

  const handleIntroductionChange = (e) => {
    if (e.target.value.length <= 100) {
      setIntroduction(e.target.value);
    }
  };

  const handlePhotoChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleTimeLogChange = (index) => (e) => {
    const newTimeLogs = [...timeLogs];
    newTimeLogs[index] = e.target.value;
    setTimeLogs(newTimeLogs);
  };

  const onFileChange = async (e) => { // 파일 선택 핸들러
    setPhoto(e.target.files[0]);
    setMessage('');

    setIsLoading(true);
    setMessage('사진 업로드 중...');
    await delay(3100);

    setMessage('얼굴 인식 중...');
    await delay(3100);

    setIsLoading(false);
    setMessage('얼굴 인식 완료! 안심할 수 있습니다.');
  };

  const onFileUpload = () => { // 파일 업로드 핸들러
    setIsLoading(true);
    setMessage('사진 업로드 중...');
    setTimeout(() => {
      setMessage('얼굴 인식 중...');
      setTimeout(() => {
        setIsLoading(false);
        setMessage('얼굴 인식 완료! 안심할 수 있습니다.');
      }, 3500);
    }, 3500);
  };

  return (
    <div style={{ overflowY: 'auto', minHeight: '100vh' }}>
        <div className='header'>
            <h1>Profile</h1>
        </div>
        {/* 회원 유형 선택 */}
        <div className='user_type'>
            <h2>회원 유형 선택</h2>
            <select value={userType} onChange={handleUserTypeChange}>
            <option value="">-- 유형을 선택해주세요 --</option>
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
             <p>{safetyScore}</p>
             <p>안심지수란? : 안심 지수는 착한 사람의 정도를 나타내는 점수입니다.</p>
        </div>

        {/* 자기 소개 입력 */}
        <div className='introduce'>
            <h2>자기 소개 작성</h2>
            <textarea
            value={introduction}
            onChange={handleIntroductionChange}
            placeholder="자기 소개를 작성해주세요 (100자 이내)"
            />
        </div>

        {/* 타임로그 입력 */}
        <div className='timelog'>
            <h2>타임로그 작성</h2>
            {timeLogs.map((timeLog, index) => (
            <div key={index}>
                <span>{index + 1}개월 전:</span>
                <input
                type="text"
                value={timeLog}
                onChange={handleTimeLogChange(index)}
                placeholder="거래 기록을 입력해주세요"
                />
            </div>
            ))}
        </div>

        {/* 사진 촬영 및 등록 */}
        <div className='id_card'>
            <h2>신분증 촬영</h2>
            <p> 신분증을 촬영하여 등록해주세요 </p>
            <input type="file" onChange={onFileChange} /> {/* 수정된 부분 */}
            <button onClick={onFileUpload}>신분증 제출</button>
        </div>

        {/* 메시지 표시 */}
        {message && <p>사진이 등록되었습니다.</p>}

        {/* 로딩 애니메이션 */}
        {isLoading && (
            <img 
                className={`loading-gif ${isLoading ? 'active' : ''}`} 
                src="https://cdn.dribbble.com/users/93860/screenshots/3985406/face-id_1.gif" 
                alt="Loading"
            />
            )}
    </div>
  );
}

export default Profile;
