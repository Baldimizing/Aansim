import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ReviewForm({ userId }) {
  const [rating, setRating] = useState("");
  const [review, setReview] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleRatingChange = (event) => {
    setRating(event.target.value);
  }

  const handleReviewChange = (event) => {
    setReview(event.target.value);
  }

  const handleSubmit = () => {
    setMessage("리뷰가 정상적으로 등록되었습니다.");

    setTimeout(() => {
      navigate('/mypage'); // 리뷰 등록 후 2초 후에 myPage로 이동
    }, 2000);
  }

  return (
    <div className="reviewForm">
      <p>{userId} 님의 거래점수 {rating} / 5</p>
      <input type="number" value={rating} onChange={handleRatingChange} />
      <textarea 
        value={review} 
        onChange={handleReviewChange} 
        placeholder="리뷰를 작성해주세요" 
      />
      <button onClick={handleSubmit}>리뷰 등록</button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default ReviewForm;
