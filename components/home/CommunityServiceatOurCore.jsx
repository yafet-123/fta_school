import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import CommunityServiceatOurCoreImage from '../../public/Wenchi/Wenchi 1.jpg';

export default function CommunityServiceatOurCore() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 my-12 px-3 py-10 md:gap-5 lg:gap-0 px-5 lg:px-32">
      <div className="md:order-first order-first flex justify-center">
        <div className="w-96 md:w-full h-96 md:h-[500px] relative mb-5">
          <Image
            className=""
            alt="why choose us image"
            src={CommunityServiceatOurCoreImage}
            layout="fill"
            objectFit="cover"
          />
        </div>
      </div>

      <div 
        className={`
          z-10 lg:w-[110%] lg:h-[20rem] flex flex-col lg:px-5 justify-start text-justify 
          gap-4 lg:mt-24 lg:bg-[#1A3E58] lg:-ml-16 mb-5 lg:mb-0`}
      >
        <h2 className="font-bold text-3xl md:text-4xl lg:my-4 text-left text-black lg:text-white">
          {`Community Service at Our Core`}
        </h2>
        <p className="md:text-xl text-lg text-left text-black lg:text-white">
          {`Undiscovered Ethiopia Tours isn't just about travel; it's about making a positive impact. 
          We believe in the power of responsible tourism and are committed to community service alongside our travel experiences.`}
        </p>
      </div>
      
    </div>
  );
};