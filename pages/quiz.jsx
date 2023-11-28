import React, { useState } from 'react';
import { useRouter } from 'next/router';

const Quiz = () => {
  const router = useRouter();
  const handleSeeQuiz = (tourid) => {
    router.push(`/quiz/${tourid}`);
  };
  const QuizType = [
    {
      id:1,
      name:"HTML",
      background_color:"#E95F21",
    },
    {
      id:2,
      name:"CSS",
      background_color:"#2862E9",
    },
    {
      id:3,
      name:"Javascript",
      background_color:"#EFD81D",
    },

  ]
  return (
    <div className='bg-[#E6E6E6] px-2 lg:px-32 h-screen pt-32'>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {QuizType.map((data,index)=>(
          <button 
            onClick={() => handleSeeQuiz(data.id)} 
            className={`bg-[${data.background_color}] px-5 py-16 text-white font-bold text-xl lg:text-3xl rounded-lg`}
          >
            {data.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Quiz;
