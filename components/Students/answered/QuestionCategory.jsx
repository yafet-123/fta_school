import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useRouter } from 'next/router';

export default function QuestionCategory({AllquestionCategory,subjectId}) {
  const router = useRouter();
  console.log(subjectId)
  const handleSubject = (id) => {
    router.push(`/Students/answered/category/type/${id}?subjectId=${subjectId}`);
  };
  return (
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
  );
};
