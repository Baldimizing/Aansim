import React from 'react';
import { USERS } from '../../data/users';
import { useNavigate } from 'react-router-dom';

function UserProfile({ id }) {
  const navigate = useNavigate();
  const user = USERS.find(user => user.id === Number(id));

  if (!user) {
    return <p>사용자를 찾을 수 없습니다.</p>;
  }

  const handleChatClick = () => {
    navigate(`/chatting/${user.id}`);
  };

  return (
    <div className="userProfile">
      <h2>{user.id}</h2>
      <h3>{user.type}</h3>
      <p>{user.introduction}</p>
      <p>안심지수: {user.rating}</p> 
      <div className="timeLog">
        <p>타임로그</p>
        <p>5개월전: oo시 xx동에서 부동산 매물 거래</p>
        <p>4개월전: oo시 xx동에서 대면 과외 안전하게 서비스하고 종료</p>
        <p>3개월전: oo시 xx동에서 중고 물품 거래</p>
        <p>2개월전: 전과 기록 없음</p>
        <p>1개월전: 나쁜 짓 한적 없음</p>
      </div>
      {<p>신분증 검증 여부: {user.verificationStatus ? '검증됨' : '미검증'}</p>}
      <button onClick={handleChatClick}>거래하기</button>
    </div>
  );
}

export default UserProfile;
