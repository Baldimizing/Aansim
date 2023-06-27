import React from "react";
import './Welcome.css';

function Welcome( {onStart }) {
    return (
        <div className="welcome">
            <header>
                <h1>Try Aansim</h1>
            </header>
            <div className="welcom-body">
                <p>직거래, 이제 안심하고 이용하세요</p>
                <p>새로운 생태계를 만들어가보세요.</p>
                <p>마음 편하게 거래할 수 있어요.</p>
            </div>
            <footer>
                <button onClick={onStart}>시작하기</button>
            </footer>
        </div>
    )
}

export default Welcome;