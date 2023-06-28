import React, { useState } from 'react';
import ReviewForm from './ReviewForm';
import { useParams } from 'react-router-dom';

function Chatting({ userId }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isReviewOpen, setReviewOpen] = useState(false);

  const handleSendMessage = (event) => {
    if(event.key === 'Enter'){
      setMessages([...messages, input]);
      setInput("");
    }
  }

  const handleInputChange = (event) => {
    setInput(event.target.value);
  }

  const handleEndDeal = () => {
    setReviewOpen(true);
  }

  return (
    <div>
      {/* 메시지 리스트 */}
      <div style={{overflow: 'auto'}}>
        {messages.map((message, index) => (
          <p key={index}>{message}</p>
        ))}
      </div>

      {/* 메시지 입력 및 전송 */}
      <input
        type="text"
        placeholder="Enter"
        value={input}
        onChange={handleInputChange}
        onKeyPress={handleSendMessage}
      />

      {/* 거래 종료 버튼 */}
      <button onClick={handleEndDeal}>거래 종료</button>

      {/* 리뷰 작성 화면 */}
      {isReviewOpen && <ReviewForm userId={userId} />}
    </div>
  );
}

export default Chatting;
