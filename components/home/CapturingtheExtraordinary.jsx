import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import CapturingtheExtraordinaryImage from '../../public/Bishoftu/Bishoftu 3.jpg';
 
export default function CapturingtheExtraordinary() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 py-12 px-3 bg-[#EDF1F4] py-10 lg:px-32 md:gap-5 lg:gap-0 px-5">
      <div 
      	className={`
      		z-10 lg:w-[110%] lg:h-[20rem] flex flex-col lg:px-10 justify-start text-justify 
      		gap-4 lg:mt-24 lg:bg-[#1A3E58]`}
      	>
        <h2 className="font-bold text-3xl md:text-4xl lg:my-4 text-left text-black lg:text-white">
          Capturing the Extraordinary
        </h2>
        <p className="md:text-xl text-lg text-left text-black lg:text-white">
         For those who have an eye for the extraordinary, Undiscovered Ethiopia Tours is your ideal choice. 
         We specialize in creating photography-focused journeys that unveil the stunning visual treasures of Ethiopia. 
        </p>
      </div>
      <div className="md:order-last order-first flex justify-center">
        <div className="w-96 md:w-full h-96 md:h-[500px] relative mb-5">
          <Image
            className=""
            alt="why choose us image"
            src={CapturingtheExtraordinaryImage}
            layout="fill"
            objectFit="cover"
          />
        </div>
      </div>
    </div>
  );
};