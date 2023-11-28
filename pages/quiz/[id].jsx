import React, { useState } from 'react';
import { html } from '../../data/data.js';
import { useRouter } from 'next/router';

const Quiz = () => {
  const router = useRouter();
  const id = router.query.id;
  let quiz;
  if(id == 1){
    quiz = html
  }else if(id == 2){
    quiz = html
  }else{
    quiz = html
  }
  console.log(router.query.id)
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [checked, setChecked] = useState(false);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState({
    score: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
  });
  console.log(html)
  const { questions } = quiz;
  const { question, answers, correctAnswer } = questions[activeQuestion];

  //   Select and check answer
  const onAnswerSelected = (answer, idx) => {
    setChecked(true);
    setSelectedAnswerIndex(idx);
    if (answer === correctAnswer) {
      setSelectedAnswer(true);
      console.log('true');
    } else {
      setSelectedAnswer(false);
      console.log('false');
    }
  };

  // Calculate score and increment to next question
  const nextQuestion = () => {
    setSelectedAnswerIndex(null);
    setResult((prev) =>
      selectedAnswer
        ? {
            ...prev,
            score: prev.score + 5,
            correctAnswers: prev.correctAnswers + 1,
          }
        : {
            ...prev,
            wrongAnswers: prev.wrongAnswers + 1,
          }
    );
    if (activeQuestion !== questions.length - 1) {
      setActiveQuestion((prev) => prev + 1);
    } else {
      setActiveQuestion(0);
      setShowResult(true);
    }
    setChecked(false);
  };

  return (
    <div className='bg-[#E6E6E6] px-32 h-screen'>
      <h1 className="text-center font-bold text-[#00225F] text-3xl md:text-4xl lg:text-5xl pt-24">Quiz Page</h1>
      <div className="px-20">
        <h2 className={`font-bold text-[#00225F] text-lg md:text-xl ${!showResult ? "flex" : "hidden"}`}>
          Question: {activeQuestion + 1}
          <span>/{questions.length}</span>
        </h2>
      </div>
      <div className="px-20">
        {!showResult ? (
          <div className='bg-[#f8f8f8] p-[1rem] mt-[1rem] rounded-xl'>
            <h3 className={` font-bold text-[#00225F] text-xl md:text-2xl mb-5 `}>
              {questions[activeQuestion].question}
            </h3>
            {answers.map((answer, idx) => (
              <li
                key={idx}
                onClick={() => onAnswerSelected(answer, idx)}
                className={` list-none mb-5 px-[16px] py-4 border-2 border-[#d3d3d3] cursor-pointer rounded-lg
                  ${selectedAnswerIndex === idx ? 'text-white bg-[#000925]' : 'hover:bg-[#d8d8d8] hover:text-black'}
                `}
              >
                <span>{answer}</span>
              </li>
            ))}
            {checked ? (
              <button onClick={nextQuestion} className='px-[20px] text-[#f8f8f8] text-base w-full px-[16px] py-[12px] mt-[12px] rounded-xl cursor-pointer bg-[#808080] '>
                {activeQuestion === questions.length-1 ? 'Finish' : 'Next'}
              </button>
            ) : (
              <button onClick={nextQuestion} disabled className='px-[20px] text-[#f8f8f8] text-base w-full px-[16px] py-[12px] mt-[12px] rounded-xl cursor-pointer bg-[#d8d8d8] '>
                {' '}
                {activeQuestion === questions.length-1 ? 'Finish' : 'Next'}
              </button>
            )}
          </div>
        ) : (
          <div className='bg-[#f8f8f8] my-5 px-[16px] py-4 border-2 border-[#d3d3d3] cursor-pointer rounded-lg'>
            <h3 className="text-center font-bold text-[#00225F] text-2xl md:text-4xl mb-5">
              Results
            </h3>
            <h3 className="mb-5 text-center font-bold text-[#00225F] text-xl md:text-2xl">
              Overall {(result.score / 25) * 100}%
            </h3>
            <div className="flex flex-col font-bold text-lg md:text-xl mb-5">
              <p className="flex justify-between items-center border-b-2 mb-3">
                Total Questions: <span>{questions.length}</span>
              </p>
              <p className="flex justify-between items-center border-b-2 mb-3">
                Total Score: <span>{result.score}</span>
              </p>
              <p className="flex justify-between items-center border-b-2 mb-3">
                Correct Answers: <span>{result.correctAnswers}</span>
              </p>
              <p className="flex justify-between items-center border-b-2 mb-3">
                Wrong Answers: <span>{result.wrongAnswers}</span>
              </p>
            </div>
            <div className="flex justify-center items-center w-full">
              <button 
                className="font-bold text-xl lg:text-2xl text-center bg-[#00225F] text-white p-4 rounded-lg"
                onClick={() => window.location.reload()}
              >
                Restart
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;