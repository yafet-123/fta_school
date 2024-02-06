import { VerticalNavbar } from "../../components/Teacher/VerticalNavbar";
import { useSession } from "next-auth/react";
import { useState,useEffect} from 'react'
import { useRouter } from 'next/router'
import { MainHeader } from '../../components/common/MainHeader';
import React from 'react'
import { prisma } from '../../util/db.server.js'
import { getSession } from "next-auth/react";

export async function getServerSideProps(context){
  const session = await getSession(context);
  const teacher = await prisma.Teacher.findUnique({
    where:{ teacher_id: Number(session.user.user_id) },
    
  });
  console.log(teacher.teacher_id)

  // const questionCountsByClass = await prisma.Question.groupBy({
  //   where:{
  //     ClassQuestion:{
  //       some:{
  //         teacher_id:Number(teacher.teacher_id)
  //       },
  //     },
  //   },
  //   by: ['question_id'],
  //   _count: true,
  // }); 

  const totalQuestionCounts = await prisma.Question.aggregate({
    where:{
      ClassQuestion:{
        some:{
          teacher_id:Number(teacher.teacher_id)
        },
      },
    },
    _count: {
      teacher_id: true // Assuming question_id is the primary key of your Question model
    }
  }); 

  const questionCount = totalQuestionCounts._count.teacher_id
  console.log(totalQuestionCounts)
  return{
    props:{
      
    }
  }
}

export default function Admin(){
  function handleChange(newValue) {
      setselected(newValue);
  }
  const { status, data } = useSession();
  return (
    <React.Fragment>
      <MainHeader title="Future Talent Academy : Teacher" />
      <div className="flex bg-[#e6e6e6] dark:bg-[#02201D] pt-10">
        <VerticalNavbar onChange={handleChange} data={data} />
        <div className="w-full pt-20">
          
        </div>
      </div>
    </React.Fragment>  );

}

