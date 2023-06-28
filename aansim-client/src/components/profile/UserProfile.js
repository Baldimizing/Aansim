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
      {/* 여기에 타임로그 컴포넌트를 넣을 수 있습니다. */}
      </div>
      {<p>신분증 검증 여부: {user.verificationStatus ? '검증됨' : '미검증'}</p>}
      <button onClick={handleChatClick}>거래하기</button>
    </div>
  );
}

export default UserProfile;
