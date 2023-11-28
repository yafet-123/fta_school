import Image from 'next/image';
import Link from 'next/link';
import React,{useState} from 'react';
import UniqueDestinations from '../../public/Addis Ababa/addis4.jpg';
import UniqueDestinations1 from '../../public/Dankil/Danakil9.jpg';
import UniqueDestinations2 from '../../public/Omo Valley/OmoValley1.jpg';
import { useRouter } from 'next/router';

export default function ExploringUniqueDestinations() {
	const [paddingTop, setPaddingTop] = useState("0");
	const router = useRouter();
  const handleTours = () => {
    router.push(`/tours`);
  };
  return (
    <div className="md:py-28 py-8 gap-10 px-4 flex flex-col lg:flex-row text-black md:justify-center bg-white lg:px-40">
      	<div className="z-50 order-last lg:order-first flex flex-col gap-6 text-left w-full lg:w-[40%]">
	        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold headings-fonts md:mb-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
	          {`Exploring Unique Destinations`}
	        </h2>
	        <p className="md:text-xl text-lg paragraph-fonts md:pr-8 lg:pr-14">
	        	{`Ethiopia is a land of endless wonders, and we're here to guide you beyond the ordinary. 
	        	While we appreciate the iconic highlights, our true passion lies in exploring off-the-beaten-path and 
	        	authentic locales. Prepare to uncover the hidden treasures and secrets of Ethiopia, places that are often 
	        	overlooked but brimming with beauty and culture.`}
	        </p>

	        <div className="mb-10 lg:mb-0">
		        <button
		        	onClick={() => handleTours()} 
	            className="font-bold md:text-lg text-md  py-1 md:py-2 px-5 bg-gradient-to-r from-red-500 to-blue-500 hover:bg-[#00D1BB] text-white hover:text-[#1a3e58] border-2 border-white rounded-md"
	          >
	            Explore Tour
	          </button>
	        </div>
      	</div>

      	<div className="z-50 flex flex-col w-full">
        	<div className="w-full h-72 md:h-[200px] relative mb-5">
          	<Image
          		src={UniqueDestinations}
          		alt="Felipe Pelaquim Image"
            	layout="fill"
            	objectFit="cover"
            	priority
            	className="rounded-lg"
        		/>
		      </div>
		      <div className="flex flex-col md:flex-row items-center justify-between">
			      <div className="hidden md:flex w-full h-72 md:h-[400px] relative md:mr-2">
	          	<Image
	          		src={UniqueDestinations1}
	          		alt="Felipe Pelaquim Image"
	            	layout="fill"
	            	objectFit="cover"
	            	priority
	            	className="rounded-lg"
	        		/>
			      </div>
			      <div className="hidden md:flex w-full h-72 md:h-[400px] relative md:ml-2">
	          	<Image
	          		src={UniqueDestinations2}
	          		alt="Felipe Pelaquim Image"
	            	layout="fill"
	            	objectFit="cover"
	            	priority
	            	className="rounded-lg"
	        		/>
			      </div>
			    </div>
      	</div>
    </div>
  );
};