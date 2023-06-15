import React, { useState } from 'react';
import './App.css';

const quizData = [
{
  question: '모르는 사람이 5만원을 떨어뜨렸습니다. 이걸 아는 사람이 당신뿐이라면?',
  choices: [
    {
      text: '5만원을 주워서 돌려준다.',
      score: 5
    },
    {
      text: '5만원을 주머니에 넣은 뒤, 천원을 흘렸다고 말씀드린다.',
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
  question: '신체적으로 당신보다 약해보이는 거래자가 비매너 행위를 지속하고 있습니다. 상대방을 단 둘이서 대면한다면? ',
    choices: [
      {
        text: '무사히 거래를 종료한 후, 솔직한 리뷰 작성으로 불이익을 경험시켜준다.',
        score: 0
      },
      {
        text: '상대방에게 나의 폭력성을 확인시켜준뒤 사과받는다.',
        score: -1
      },
      {
        text: '범죄영화 범죄사례 등을 참고하여 전략적으로 완전범죄를 계획한다.',
        score: -100
      },
      {
        text: '조용히 거래를 정지한 후, 더 나은 거래방법을 리뷰로 작성하고 공유한다.',
        score: 5
      }
    ]
},
{
  question: '거래자가 잘 모르고, 나의 말에 쉽게 넘어오는 것을 알게되었습니다. 단 둘이 있게 된다면? ',
    choices: [
      {
        text: '',
        score: 0
      },
      {
        text: '',
        score: -1
      },
      {
        text: '',
        score: -100
      },
      {
        text: '',
        score: 5
      }
    ]
}
]

function App() {
  // 문제, 선택지, score를 상태로 관리에서 quiz에 맞게 
  const [currentQuiz, setCurrentQuiz] = useState(0);
  const [score, setScore] = useState(0);

  const handleChoice = (choice) => {
    const choiceScore = choice.score || 0;
    setCurrentQuiz(prevQuiz => prevScoprevQuizre + 1);
  };

  if (currentQuiz >= quizData.length) {
    return (
      <div className="app">
        <header>
          <h1>안심하고 거래하세요</h1>
        </header>
        <div className="quiz">
          <h2>착한 사람 퀴즈</h2>
          <p>{currentQuestion}</p>

          {choices.map((choice, index) => (
            <button key= {idnex} onClick={() => handleChoice(choice)}>
              {choice.text}
            </button>
          ))}
        </div>
  
        <div className="score">Score: {score}</div>
      </div>
    );
  }
}

export default App;
