import React, { useState } from 'react';
import { html } from '../../../data/html.js';
import { css } from '../../../data/css.js';
import { useRouter } from 'next/router';
import Hero from "../../../components/Students/answered/Hero"
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
  const SubjectId = query.subjectId

  const session = await getSession(context);
  const studentId = session.user.user_id
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

  const type = types.questiontypeName

  const question = await prisma.Question.findMany({
      where:{
        AND: [
          {
            ClassQuestion:{
              some: {
                class_id: Number(student.class_id)
              },
            }
          },
          {question_type_id: Number(id)},
          {subject_id: Number(SubjectId),}
        ]
      },
      orderBy: {
        // Specify the column and the order (asc for ascending)
        question_id: 'asc'
      },
      include:{
        Subject:{
          select:{
            SubjectName: true,
          }
        }
      }
    })

  let redirectToAnswered = false;

  const filteredQuestions = [];
  question.filter((ques) => {
    // Customize the comparison logic based on your requirements
    const isConditionSatisfied = ques.ModifiedDate < ques.timedisplay;

    if (isConditionSatisfied) {
      redirectToAnswered = true;
      filteredQuestions.push(ques);
    }

    return isConditionSatisfied; // Include the question in the filtered array if the condition is true
  });

  if (!redirectToAnswered) {
    return {
      redirect: {
        destination: '/Students/answered/waitArea', // Replace with the path you want to redirect to
        permanent: false,
      },
    };
  }

  const questionCount = await prisma.Question.aggregate({
    where:{
      AND: [
        {
          ClassQuestion:{
            some: {
              class_id: Number(student.class_id)
            },
          }
        },
        {question_type_id: Number(id)},
        {subject_id: Number(SubjectId),}
      ]
    },
    _count: {
      question_id: true // Assuming question_id is the primary key of your Question model
    }
  });

  const marks = await prisma.Mark.findMany({
    where:{
      AND: [
        {question_type_id: Number(id)},
        {students_id : Number(student.class_id) },
        {subject_id: Number(SubjectId)}
      ]
    },
  });

  const Allquestion = filteredQuestions.map((data)=>({
    question_id:data.question_id,
    question:data.question,
    points:data.points,
    correctAnswer:data.correctAnswer,
    answer:data.answer || null
  }))
  const questionlength = questionCount._count.question_id
  const mark = marks.map((data)=>({
    mark_id:data.mark_id,
    mark:data.mark
  }))
  console.log(mark)
  const classes = student.Class.ClassName
  return {
    props: {
      Allquestion,
      questionlength,
      classes,
      type,
      studentId,
      SubjectId,
      mark
    }, // will be passed to the page component as props
  }
}

const Question = ({Allquestion,questionlength,classes,type,studentId, SubjectId, mark}) => {
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
            <Hero Allquestion={Allquestion} classes={classes} type={type} />
            <div className="lg:px-16">
                {Allquestion.map((question, index) => (
                  <div key={index} className="flex flex-col">
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
                          className={` list-none mb-5 px-[16px] py-4 border-2 border-[#d3d3d3] cursor-pointer rounded-lg
                            ${ question.correctAnswer === answer ? 'text-white bg-[#000925]' : 'hover:bg-[#d8d8d8] hover:text-black'}
                          `}
                        >
                          <span>{answer}</span>
                        </li>
                      ))}
                    </div>
                  </div>
                ))}
                <div>
                  {mark[0]?.mark}
                </div>
            </div>
          </div>
        )}
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