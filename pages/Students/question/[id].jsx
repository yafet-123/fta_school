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
import ReactModal from "react-modal";
import Loader from "../../../components/common/Loading";
import axios from 'axios';

export async function getServerSideProps(context) {
  const {params,req,res,query} = context
  const id = query.id
  const session = await getSession(context);
  
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

  const types = await prisma.QuestionType.findUnique({
    where:{ question_type_id: Number(id) },  
  });

  console.log(types.questiontypeName)
  const type = types.questiontypeName
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
        Subject:{
          select:{
            SubjectName: true
          }
        }
      }
    })
  console.log(question)
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
      classes,
      type
    }, // will be passed to the page component as props
  }
}

const Question = ({Allquestion,questionlength,classes,type}) => {
  const router = useRouter();
  const id = router.query.id;
  const [LoadingmodalIsOpen, setLoadingModalIsOpen] = useState(false);
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [checked, setChecked] = useState(false);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState({
    score: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
  });
  const [totalscore, settotalscore] = useState(0)
  const [error,seterror] = useState("")
  const [selectedAnswers, setSelectedAnswers] = useState([]);

  const onAnswerSelected = (answer, question_id, points) => {
    setSelectedAnswers((prevSelectedAnswers) => ({
      ...prevSelectedAnswers,
      [question_id]: {
        answer,
        question_id,
        points,

      },
    }));
  };

  const allQuestionsAnswered = Allquestion.every((question) => {
    const isAnswered = selectedAnswers.hasOwnProperty(question.question_id);
    console.log(`Question ${question.question_id} answered: ${isAnswered}`);
    return isAnswered;
  });

  const { question, answers, correctAnswer } = Allquestion[activeQuestion];

  async function calculateScore (e){
    e.preventDefault();
    const selectedAnswersArray = await Object.values(selectedAnswers);
    setLoadingModalIsOpen(true);
    const data = await axios.post(`../../api/answer/check`,{
      'selectedAnswers':selectedAnswersArray,
      'id': id
    }).then(function (response) {
      console.log(response.data);
      setLoadingModalIsOpen(false);
    }).catch(function (error) {
        console.log(error)
        seterror("Creating Class failed due to username is still exist or network error")
        setLoadingModalIsOpen(false);
    });
  };

  function handleChange(newValue) {
      setselected(newValue);
  }
  const { status, data } = useSession();
  console.log(type)
  return (
    <React.Fragment>
      <MainHeader title="Future Talent Academy : Students" />
      <div className="flex bg-[#e6e6e6] dark:bg-[#02201D] pt-10">
        <VerticalNavbar onChange={handleChange} data={data} />
        <div className='bg-[#E6E6E6] w-full px-2 lg:px-10 h-full py-20'>
          <Hero Allquestion={Allquestion} classes={classes} type={type} />
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
                      <h3 className={` font-bold w-3/4 text-[#00225F] text-lg md:text-xl mb-5 `}>
                        {question.question}
                      </h3>
                      <p className="font-bold text-[#00225F] text-lg md:text-xl mb-5">
                        {question.points} point
                      </p>
                    </div>
                    {question.answer.map((answer, idx) => (
                      <li
                        key={idx}
                        onClick={() => onAnswerSelected(answer, question.question_id, question.points)}
                        className={` list-none mb-5 px-[16px] py-4 border-2 border-[#d3d3d3] cursor-pointer rounded-lg
                          ${ selectedAnswers[question.question_id] && selectedAnswers[question.question_id].answer === answer ? 'text-white bg-[#000925]' : 'hover:bg-[#d8d8d8] hover:text-black'}
                        `}
                      >
                        <span>{answer}</span>
                      </li>
                    ))}
                  </div>
                </div>
              ))}

              <button 
                onClick={calculateScore} 
                disabled={!allQuestionsAnswered}
                className={`px-[20px] text-[#f8f8f8] text-base w-full px-[16px] py-[12px] mt-[12px] rounded-xl cursor-pointer bg-[#808080]
                  ${ allQuestionsAnswered ? 'text-white bg-black' : 'hover:bg-[#d8d8d8] hover:text-black'}
                `}
              >
                Submit
              </button>
          </div>
        </div>
        <ReactModal
          isOpen={LoadingmodalIsOpen}
          // onRequestClose={closeModal}
          className="flex items-center justify-center w-full h-full"
        >
            <Loader />
        </ReactModal>
      </div>
    </React.Fragment>
  );
};

export default Question;