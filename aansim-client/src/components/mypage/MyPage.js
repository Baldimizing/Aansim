import React, { useState } from 'react';
import UserProfile from '../profile/UserProfile';
import Reviews from './Reviews';
import './MyPage.css';

const REVIEWS = Array.from({ length: 10 }, (_, index) => ({
    id: index,
    author: `리뷰어 ${index}`,
    content: `리뷰 내용 ${index}`,
    rating: Math.round(Math.random() * 5),
  }));

function MyPage() {
  const LOGGED_IN_USER = {
    id: '안심개발자',
    name: '주형',
    introduction: '안녕하세요. 안심을 개발한 사람입니다.',
    rating: 10,
    verificationStatus: true,
    timeLog: [
      { time: '5개월전', activity: 'oo시 xx동에서 부동산 매물 거래' },
      { time: '4개월전', activity: 'oo시 xx동에서 대면 과외 안전하게 서비스하고 종료' },
      { time: '3개월전', activity: 'oo시 xx동에서 중고 물품 거래' },
      { time: '2개월전', activity: '전과 기록 없음' },
      { time: '1개월전', activity: '나쁜 짓 한적 없음' },
    ]
  };

  const [reviews, setReviews] = useState(REVIEWS);
  const [profile, setProfile] = useState(LOGGED_IN_USER);

  const handleProfileChange = (event) => {
    const { name, value } = event.target;
  
    setProfile({
      ...profile,
      [name]: value
    });
  }

  return (
    <div className="mypage-container">
      <UserProfile user={profile} />
      <div>
        <h2>프로필 변경</h2>
        <textarea
          name="introduction"
          value={profile.introduction}
          onChange={handleProfileChange}
        />
      </div>
      <Reviews reviews={reviews} />
    </div>
  );
}

export default MyPage;
