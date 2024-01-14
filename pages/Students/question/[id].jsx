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
              {Allquestion.map((question, index) => (
                <div className="flex flex-col">
                  <div className="py-5">
                    <h2 className={`font-bold text-[#00225F] text-lg md:text-xl ${!showResult ? "flex" : "hidden"}`}>
                      Question: {index + 1}
                      <span>/{questionlength}</span>
                    </h2>
                  </div>
                  <div className='bg-[#f8f8f8] p-[1rem] mt-[1rem] rounded-xl' key={index}>
                    <div className="flex justify-between items-center">
                      <h3 className={` font-bold text-[#00225F] text-xl md:text-2xl mb-5 `}>
                        {question.question}
                      </h3>
                      <p className="font-bold text-[#00225F] text-xl md:text-2xl mb-5">
                        {question.points} point
                      </p>
                    </div>
                    {question.answer.map((answer, idx) => (
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
                </div>
              ))}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Question;