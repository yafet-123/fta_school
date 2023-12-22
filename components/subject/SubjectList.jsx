import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useRouter } from 'next/router';

export default function SubjectList({AllSubject}) {
  const router = useRouter();
  const handleSubject = (id) => {
    router.push(`/question/${id}`);
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {AllSubject.map((data,index)=>(
        <button 
          onClick={() => handleSubject(data.subject_id)} 
          className={`${ data.subject_id <= 4 && "bg-[#2862E9]" || data.subject_id <= 8 && "bg-[#EFD81D]" || data.subject_id <= 12 && "bg-[#E95F21]" } 
          px-5 py-16 text-white font-bold text-xl lg:text-3xl rounded-lg`}
        >
          {data.SubjectName}
        </button>
      ))}
    </div>
  );
};

