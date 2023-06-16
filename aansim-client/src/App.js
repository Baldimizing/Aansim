import React, { useState } from 'react';
import './App.css';
import SignupLogin from './components/SignupLogin';

const quizData = [
  {
    question: '모르는 사람이 5만원을 떨어뜨렸습니다. 이걸 아는 사람이 당신뿐이라면?',
    choices: [
      {
        text: '5만원을 주워서 돌려준다.',
        score: 5
      },
      {
        text: '5만원을 주머니에 넣은 뒤, 천원을 흘렸다고 말한다.',
        score: -3
      },
      {
        text: '5만원을 주머니에 넣은 뒤, 앞질러간다.',
        score: -1
      },
      {
        text: '무시하고 지나간다.',
        score: 0
      }
    ]
  },
  {
    question: '신체적으로 당신보다 약해보이는 거래자가 비매너 행위를 지속하고 있습니다. 상대방과 단둘이 대면한다면?',
    choices: [
      {
        text: '무사히 거래를 종료한 후, 솔직한 리뷰 작성으로 불이익을 경험시켜준다.',
        score: 0
      },
      {
        text: '상대방에게 나의 폭력성을 확인시켜준 뒤 사과받는다.',
        score: -1
      },
      {
        text: '범죄 영화, 범죄 사례 등을 참고하여 전략적으로 완전범죄를 계획한다.',
        score: -100
      },
      {
        text: '조용히 거래를 멈춘 뒤, 더 나은 거래 방법을 리뷰로 작성하고 공유한다.',
        score: 5
      }
    ]
  },
  {
    question: '거래 경험이 적고 조금 어수룩해보이는 상대방과 거래하게 되었다면?',
    choices: [
      {
        text: '상대방이 잘 모르는 것 같으니, 선배로서 한 수 가르쳐준다.',
        score: -5
      },
      {
        text: '상관하지 않고 평범하게 무사히 거래를 마칩니다.',
        score: 3
      },
      {
        text: '현란한 말솜씨와 재주로 원하는 상황을 유도하여 나의 이익을 취한다.',
        score: -10
      },
      {
        text: '내가 알고 있는 좋은 거래 매너를 실천한다.',
        score: 7
      }
    ]
  }
];

function App() {
  const [currentQuiz, setCurrentQuiz] = useState(0);
  const [score, setScore] = useState(0);

  const handleChoice = (choice) => {
    const choiceScore = choice.score || 0;
    setScore((score) => score + choiceScore);
    setCurrentQuiz((currentQuiz) => currentQuiz + 1);
  };

  if (currentQuiz >= quizData.length) {
    return (
      <div className="app">
        <header>
          <h1>안심하고 거래하세요</h1>
        </header>
        <div className="signup-login">
          <SignupLogin />
        </div>
      </div>
    );
  }

  const currentQuestion = quizData[currentQuiz].question;
  const choices = quizData[currentQuiz].choices;

  return (
    <div className="app">
      <header>
        <h1>안심하고 거래하세요</h1>
      </header>
      <div className="quiz">
        <h2>착한 사람 퀴즈</h2>
        <p>{currentQuestion}</p>
        {choices.map((choice, index) => (
          <button key={index} onClick={() => handleChoice(choice)}>
            {choice.text}
          </button>
        ))}
      </div>
      <div className="score">Score: {score}</div>
    </div>
  );
}

export default App;
