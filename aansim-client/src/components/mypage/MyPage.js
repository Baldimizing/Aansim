// aansim-client/src/components/mypage/MyPage.js
import React from 'react';
import { useHistory } from 'react-router-dom';

const members = [
  {
    id: 1,
    type: "판매자",
    introduction: "안녕하세요, 신뢰성 있는 거래를 원하는 판매자입니다."
  },
  {
    id: 2,
    type: "구매자",
    introduction: "안녕하세요, 신뢰성 있는 거래를 원하는 구매자입니다."
  }
];

function MyPage() {
  let history = useHistory();

  const handleClick = (id) => {
    history.push(`/profile/${id}`);
  };

  return (
    <div style={{ overflowY: 'auto', minHeight: '100vh' }}>
      {members.map((member) => (
        <div key={member.id} className='member-card' onClick={() => handleClick(member.id)}>
          <h2>{member.type}</h2>
          <p>{member.introduction}</p>
        </div>
      ))}
    </div>
  );
}

export default MyPage;
