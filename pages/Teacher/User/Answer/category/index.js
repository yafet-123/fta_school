import React, { useState } from 'react';
import { useRouter } from 'next/router';
import QuestionCategory from "../../../../../components/Teacher/UserAnswer/QuestionCategory"
import { prisma } from '../../../../../util/db.server.js'
import { MainHeader } from '../../../../../components/common/MainHeader';
import { VerticalNavbar } from "../../../../../components/Teacher/VerticalNavbar";
import { useSession } from "next-auth/react";

export async function getServerSideProps(context) {
  const {params,req,res,query} = context
  const id = query.subjectId
  
  const questionCategory = await prisma.QuestionCategory.findMany({
      where:{
        SubjectQuestionCategory:{
        some: {
          Subject:{
            subject_id: Number(id)
          }
        }
      } 
      },
      include:{
        User:{
          select:{
            UserName:true
          }
        },
      }
    })

    const AllquestionCategory = questionCategory.map((data)=>({
      question_category_id:data.question_category_id,
      questioncategoryName:data.questioncategoryName,
    }))

    return {
      props: {
        AllquestionCategory,
      }, // will be passed to the page component as props
  }
}

export default function Category({AllquestionCategory}) {
  console.log(AllquestionCategory)
  const router = useRouter();
  const { id } = router.query;
  const subjectId = router.query.subjectId;
  const classId = router.query.classId;
  console.log(id)
  const handleSubject = (id) => {
    router.push(`/subject/${id}`);
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
        <div className='w-full px-2 lg:px-32 h-full pt-20 pb-96'>
          <QuestionCategory AllquestionCategory={AllquestionCategory} subjectId={subjectId} classId={classId} />
        </div>
      </div>
    </React.Fragment>
  );
};