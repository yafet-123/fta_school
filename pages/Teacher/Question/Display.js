import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { prisma } from '../../../util/db.server.js'
import { getSession } from "next-auth/react";
import { MainHeader } from '../../../components/common/MainHeader';
import { VerticalNavbar } from "../../../components/Teacher/VerticalNavbar";
import ClassList from '../../../components/Teacher/Class/ClassList'
import { useSession } from "next-auth/react";
import React, { useState } from 'react';

export async function getServerSideProps(context) {
  const session = await getSession(context);
  console.log(session)
  const {params,req,res,query} = context
  const id = query.id
  const SubjectId = query.subjectId
  const teacher = await prisma.Teacher.findUnique({
    where:{ teacher_id: Number(session.user.user_id) },
    
  });

  const types = await prisma.QuestionType.findUnique({
    where:{ question_type_id: Number(id) },  
  });

  console.log(types.questiontypeName)
  const type = types.questiontypeName

  const question = await prisma.Question.findMany({
      where:{
        AND: [
          {
            QuestionTypeQuestion:{
              some: {
                QuestionType:{
                  question_type_id: Number(id)
                },
              },
            },
          },
          {subject_id: Number(SubjectId),},
          {teacher_id: Number(teacher.teacher_id),},
        ]
      },
      orderBy: {
        // Specify the column and the order (asc for ascending)
        question_id: 'asc'
      },
      include:{
        Teacher:{
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

  const questionCount = await prisma.question.aggregate({
    where: {
      AND: [
        {
          QuestionTypeQuestion: {
            some: {
              QuestionType: {
                question_type_id: Number(id)
              }
            }
          },
        },
        {teacher_id: Number(teacher.teacher_id),},
      ]
    },
    _count: {
      question_id: true // Assuming question_id is the primary key of your Question model
    }
  });

  const Allquestion = question.map((data)=>({
    question_id:data.question_id,
    question:data.question,
    points:data.points,
    answer:data.answer || null
  }))
  const questionlength = questionCount._count.question_id

  console.log(Allquestion)
  return {
    props: {
      Allquestion,
      questionlength,
      type,
      SubjectId
    }, // will be passed to the page component as props
  }
}

const Display = ({Allquestion,questionlength,type, SubjectId}) => {
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
 
  async function calculateScore (e){
    e.preventDefault();
    const selectedAnswersArray = await Object.values(selectedAnswers);
    setLoadingModalIsOpen(true);
    const data = await axios.post(`../../api/answer/check`,{
      'selectedAnswers':selectedAnswersArray,
      'id': id,
      'studentId':studentId,
      'SubjectId':SubjectId
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
        {Allquestion.length == 0 ? (
          <div className="bg-[#E6E6E6] w-full px-2 lg:px-10 h-full py-20">
            <p className="text-center font-bold text-[#00225F] text-3xl md:text-4xl lg:text-5xl pt-10 mb-5">No questions available.</p>
          </div>
        ) : (
          <div className='bg-[#E6E6E6] w-full px-2 lg:px-10 h-full py-20'>
            <h1 className="text-center font-bold text-[#00225F] text-3xl md:text-4xl lg:text-5xl pt-10 mb-5">{type} Question</h1>
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
                      <div className="flex justify-between items-center">
                        <button
                          className="bg-[#009688] text-white font-bold py-2 px-4 border-b-4 border-[#009688] hover:scale-110 duration-1000 ease-in-out rounded"
                        >
                          Edit
                        </button>

                        <button  
                          className="bg-red-500 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:scale-110 duration-1000 ease-in-out rounded"
                        >
                            Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default Display;