import React from "react";
import './Welcome.css';

function Welcome( {onStart }) {
    return (
        <div className="center">
            <div className="outer-ring"></div>
            <div className="inner-ring"></div>
            <div className="welcome">
                <header>
                    <h2 className="welcome-header">직거래, 이젠 안심하세요</h2>
                </header>
            <div className="welcome-body">
                <p>새로운 생태계를 만들어가보세요.</p>
                <p>마음 편하게 거래할 수 있어요.</p>
            </div>
            <div className="btn-start">
                <button onClick={onStart}>안심 가이드 시작하기</button>
            </div>
            </div>
      </div>
        
    )
}

export default Welcome;