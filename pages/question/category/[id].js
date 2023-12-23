import React, { useState } from 'react';
import { useRouter } from 'next/router';
import QuestionCategory from "../../../components/question/QuestionCategory"
import { prisma } from '../../../util/db.server.js'

export async function getServerSideProps(context) {
  const {params,req,res,query} = context
  const id = query.id
  
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
  const handleSubject = (id) => {
    router.push(`/subject/${id}`);
  };
  return (
    <div className='bg-[#E6E6E6] px-2 lg:px-32 h-full pt-44 pb-96'>
      <QuestionCategory AllquestionCategory={AllquestionCategory} />
    </div>
  );
};