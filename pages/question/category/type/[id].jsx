import React, { useState } from 'react';
import { useRouter } from 'next/router';
import QuestionType from "../../../../components/question/QuestionType"
import { prisma } from '../../../../util/db.server.js'

export async function getServerSideProps(context) {
  const {params,req,res,query} = context
  const id = query.id
  
  const questionType = await prisma.QuestionType.findMany({
      where:{
        question_category_id:Number(id)
      },
      include:{
        User:{
          select:{
            UserName:true
          }
        },
      }
    })

    const Allquestiontype = questionType.map((data)=>({
      question_type_id:data.question_type_id,
      questiontypeName:data.questiontypeName,
    }))

    return {
      props: {
        Allquestiontype,
      }, // will be passed to the page component as props
  }
}

export default function Type({Allquestiontype}) {
  console.log(Allquestiontype)
  const router = useRouter();
  const handleSubject = (id) => {
    router.push(`/subject/${id}`);
  };
  return (
    <div className='bg-[#E6E6E6] px-2 lg:px-32 h-full pt-44 pb-96'>
      <QuestionType Allquestiontype={Allquestiontype} />
    </div>
  );
};