import React, { useState } from 'react';
import { html } from '../../../data/html.js';
import { css } from '../../../data/css.js';
import { useRouter } from 'next/router';
import Hero from "../../../components/Students/question/Hero"
import { prisma } from '../../../util/db.server.js'
import { useSession } from "next-auth/react";
import { MainHeader } from '../../../components/common/MainHeader';
import { VerticalNavbar } from "../../../components/Students/VerticalNavbar";
import { getSession } from "next-auth/react";

export async function getServerSideProps(context) {
  const {params,req,res,query} = context
  const id = query.id
  const session = await getSession(context);
  console.log(session)
  
  const student = await prisma.Students.findUnique({
    where:{ students_id: Number(session.user.user_id) },
    include:{
      Class:{
        select:{
          ClassName:true
        }
      }
    }
    
  });
  console.log(student)
  const question = await prisma.Question.findMany({
      where:{
        QuestionTypeQuestion:{
        some: {
          QuestionType:{
            question_type_id: Number(id)
          }
        }
      } 
      },
      orderBy: {
        // Specify the column and the order (asc for ascending)
        question_id: 'asc'
      },
      include:{
        User:{
          select:{
            UserName:true
          }
        },

      }
    })

  const questionCount = await prisma.question.aggregate({
    where: {
      QuestionTypeQuestion: {
        some: {
          QuestionType: {
            question_type_id: Number(id)
          }
        }
      }
    },
    _count: {
      question_id: true // Assuming question_id is the primary key of your Question model
    }
  });
  console.log(question)
  const Allquestion = question.map((data)=>({
    question_id:data.question_id,
    question:data.question,
    correctAnswer:data.correctAnswer,
    points:data.points,
    answer:data.answer || null
  }))
  const questionlength = questionCount._count.question_id
  const classes = student.Class.ClassName
  return {
    props: {
      Allquestion,
      questionlength,
      classes
    }, // will be passed to the page component as props
  }
}

const Question = ({Allquestion,questionlength,classes}) => {
  const router = useRouter();
  const id = router.query.id;
  console.log(Allquestion)
 
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
  const [totalscore, settotalscore] = useState(0)
  console.log(html)
  const { question, answers, correctAnswer } = Allquestion[activeQuestion];

  const onAnswerSelected = (answer, idx, point) => {
    setChecked(true);
    setSelectedAnswerIndex(idx);
    if (answer === correctAnswer) {
      settotalscore(totalscore+=1)
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
    if (activeQuestion !== questionlength - 1) {
      setActiveQuestion((prev) => prev + 1);
    } else {
      setActiveQuestion(0);
      setShowResult(true);
    }
    setChecked(false);
  };
  function handleChange(newValue) {
      setselected(newValue);
  }
  const { status, data } = useSession();
  return (
    <React.Fragment>
      <MainHeader title="Future Talent Academy : Students" />
      <div className="flex bg-[#e6e6e6] dark:bg-[#02201D] pt-10">
        <VerticalNavbar onChange={handleChange} data={data} />
        <div className='bg-[#E6E6E6] w-full px-2 lg:px-10 h-full py-20'>
          <Hero Allquestion={Allquestion} classes={classes} />
          <h1 className="text-center font-bold text-[#00225F] text-3xl md:text-4xl lg:text-5xl pt-10 mb-5">Quiz Page</h1>
          <div className="lg:px-16">
            <h2 className={`font-bold text-[#00225F] text-lg md:text-xl ${!showResult ? "flex" : "hidden"}`}>
              Question: {activeQuestion + 1}
              <span>/{questionlength}</span>
            </h2>
          </div>
          <div className="lg:px-16">
            {!showResult ? (
              <div className='bg-[#f8f8f8] p-[1rem] mt-[1rem] rounded-xl'>
                <div className="flex justify-between items-center">
                  <h3 className={` font-bold text-[#00225F] text-xl md:text-2xl mb-5 `}>
                    {Allquestion[activeQuestion].question}
                  </h3>
                  <p className="font-bold text-[#00225F] text-xl md:text-2xl mb-5">
                    {Allquestion[activeQuestion].points} point
                  </p>
                </div>
                {Allquestion[activeQuestion].answer.map((answer, idx) => (
                  <li
                    key={idx}
                    onClick={() => onAnswerSelected(answer, idx, Allquestion[activeQuestion].points)}
                    className={` list-none mb-5 px-[16px] py-4 border-2 border-[#d3d3d3] cursor-pointer rounded-lg
                      ${selectedAnswerIndex === idx ? 'text-white bg-[#000925]' : 'hover:bg-[#d8d8d8] hover:text-black'}
                    `}
                  >
                    <span>{answer}</span>
                  </li>
                ))}
                {checked ? (
                  <button onClick={nextQuestion} className='px-[20px] text-[#f8f8f8] text-base w-full px-[16px] py-[12px] mt-[12px] rounded-xl cursor-pointer bg-[#808080] '>
                    {activeQuestion === questionlength-1 ? 'Finish' : 'Next'}
                  </button>
                ) : (
                  <button onClick={nextQuestion} disabled className='px-[20px] text-[#f8f8f8] text-base w-full px-[16px] py-[12px] mt-[12px] rounded-xl cursor-pointer bg-[#d8d8d8] '>
                    {' '}
                    {activeQuestion === questionlength-1 ? 'Finish' : 'Next'}
                  </button>
                )}
              </div>
            ) : (
              <div className='bg-[#f8f8f8] my-5 px-[16px] py-4 border-2 border-[#d3d3d3] cursor-pointer rounded-lg'>
                <h3 className="text-center font-bold text-[#00225F] text-2xl md:text-4xl mb-5">
                  Results
                </h3>
                <h3 className="mb-5 text-center font-bold text-[#00225F] text-xl md:text-2xl">
                  Overall {(totalscore / questionlength) * 100}%
                </h3>
                <div className="flex flex-col font-bold text-lg md:text-xl mb-5">
                  <p className="flex justify-between items-center border-b-2 mb-3">
                    Total Questions: <span>{questionlength}</span>
                  </p>
                  <p className="flex justify-between items-center border-b-2 mb-3">
                    Total Score: <span>{totalscore}</span>
                  </p>
                  <p className="flex justify-between items-center border-b-2 mb-3">
                    Correct Answers: <span>{result.correctAnswers}</span>
                  </p>
                  <p className="flex justify-between items-center border-b-2 mb-3">
                    Wrong Answers: <span>{result.wrongAnswers}</span>
                  </p>
                </div>

                <div className="flex flex-col font-bold text-lg md:text-xl mb-5">
                  <h3 className="text-center font-bold text-[#00225F] text-2xl md:text-4xl mb-5">
                    Answers
                  </h3>
                  {Allquestion.map((data,index)=>(
                    <h1 className="flex flex-col lg:flex-row justify-between lg:items-center border-b-2">
                      <span className="text-center text-[#1A3E58]">Question: {data.question}</span>
                      <span className="text-left">{data.correctAnswer}</span>
                    </h1>
                  ))}
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
      </div>
    </React.Fragment>
  );
};

export default Question;