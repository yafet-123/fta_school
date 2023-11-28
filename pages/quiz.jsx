import React, { useState } from 'react';
import { quiz } from '../data/data.js';

const Quiz = () => {
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
    <div className='bg-[#E6E6E6] px-32 h-screen pt-32'>
      <div className="grid grid-cols-1 grid-cols-3 gap-5">
        {QuizType.map((data,index)=>(
          <button className={`bg-[${data.background_color}] px-5 py-6 text-white font-bold text-2xl rounded-lg`}>
            {data.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Quiz;
