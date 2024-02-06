import React, { useState } from 'react';
import { useRouter } from 'next/router';
import QuestionCategory from "../../../../components/Teacher/QuestionCategory"
import { prisma } from '../../../../util/db.server.js'
import { MainHeader } from '../../../../components/common/MainHeader';
import { VerticalNavbar } from "../../../../components/Teacher/VerticalNavbar";
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
  const subjectId = router.query.subjectId;
  const classId = router.query.classId;
  function handleChange(newValue) {
      setselected(newValue);
  }
  const { status, data } = useSession();
  const handleSubject = (id) => {
    router.push(`/Teacher/Display/category/Type/?subjectId=${subjectId}&id=${id}&classId=${classId}`);
  };
  return (
    <React.Fragment>
      <MainHeader title="Future Talent Academy : Students" />
      <div className="flex bg-[#e6e6e6] dark:bg-[#02201D] pt-10">
        <VerticalNavbar onChange={handleChange} data={data} />
        <div className='w-full px-2 lg:px-32 h-full pt-20 pb-96'>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {AllquestionCategory.map((data,index)=>(
              <button 
                onClick={() => handleSubject(data.question_category_id)} 
                className={`${ data.question_category_id % 3 == 0 && "bg-[#2862E9]" || data.question_category_id % 3 == 1 && "bg-[#EFD81D]" 
                || data.question_category_id % 3 == 2 && "bg-[#E95F21]" } 
                px-5 py-16 text-white font-bold text-xl lg:text-3xl rounded-lg`}
              >
                {data.questioncategoryName}
              </button>
            ))}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};