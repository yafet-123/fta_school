import Image from 'next/image';
import Link from 'next/link';
import React, {useState} from 'react';
import WhychooseImage from '../../public/temp/lalibela.jpg';
import WhychooseImage1 from '../../public/temp/Abreha_and_Atsbeha_Church_01.jpg';
import WhychooseImage2 from '../../public/temp/tana2.jpg';

export default function WhyChooseUs() {
	const [paddingTop, setPaddingTop] = useState("0");
  return (
    <div className="md:py-28 py-8 gap-10 px-4 flex flex-col lg:flex-row text-black md:justify-center bg-[#EDF1F4] lg:px-40">
      	<div className="z-50 flex flex-col w-full">
      		<div className="hidden md:flex flex-col md:flex-row items-center justify-between mb-5">
			      <div className="w-full h-72 md:h-[400px] relative md:mr-2">
	          	<Image
	          		src={WhychooseImage}
	          		alt="Felipe Pelaquim Image"
	            	layout="fill"
	            	objectFit="cover"
	            	priority
	            	className="rounded-lg"
	        		/>
			      </div>
			      <div className="w-full h-72 md:h-[400px] relative md:ml-2">
	          	<Image
	          		src={WhychooseImage1}
	          		alt="Felipe Pelaquim Image"
	            	layout="fill"
	            	objectFit="cover"
	            	priority
	            	className="rounded-lg"
	        		/>
			      </div>
			    </div>

        	<div className="w-full h-72 md:h-[300px] relative">
          	<Image
          		src={WhychooseImage2}
          		alt="Felipe Pelaquim Image"
            	layout="fill"
            	objectFit="cover"
            	priority
            	className="rounded-lg"
        		/>
		      </div>
		      
      	</div>

      	<div className="flex flex-col gap-6 text-left w-full lg:w-[30%]">
	        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold headings-fonts md:mb-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
	          Why Choose Undiscovered Ethiopia Tours?
	        </h2>
	        <li className="md:text-xl text-lg text-left">
	          <span className="font-semibold">Local Expertise:</span> Our deep knowledge of Ethiopia ensures an authentic experience.
	        </li>
	        <li className="md:text-xl text-lg text-left">
	          <span className="font-semibold">Customization:</span> We tailor journeys to your interests and preferences.
	        </li>
	        <li className="md:text-xl text-lg text-left">
	          <span className="font-semibold">Responsible Tourism:</span> {`We're committed to ethical and sustainable travel practices.`}
	        </li>
      	</div>
    </div>
  );
};
