import React, {useState} from 'react'
import Image from 'next/image'
import Slider, { Settings, LazyLoadTypes } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import ImageOne from '../../public/Gurage/Gurage 6.jpg';
import ImageTwo from '../../public/Omo Valley/omo 2.jpg';
import ImageThree from '../../public/Omo Valley/omo 7.jpg';
import ImageFour from '../../public/Bulga/Bulga 6.jpg';
import ImageFive from '../../public/Omo Valley/omo 6.jpg';
import ImageSix from '../../public/Bishoftu/Bishoftu 1.jpg';
import ImageSeven from '../../public/Gurage/Gurage 2.jpg';


export default function PhotographyFocus() {
	var settings = {
		dots: true,
		prevArrow: null, // Hide the previous (left) arrow
  		nextArrow: null, // Hide the next (right) arrow
	    lazyLoad: true,
	    fade: true,
	    infinite: true,
	    autoplay: true,
	    speed: 5000,
	    autoplaySpeed: 3000,
  	};
  	const photos = [
    	{
    		image:"/Gurage/Gurage 6.jpg"
    	},
    	{
    		image:"/Omo Valley/omo 2.jpg"
    	},
    	{
    		image:"/Omo Valley/omo 7.jpg"
    	},
    	{
    		image:"/Bulga/Bulga 6.jpg"
    	},
    	{
    		image:"/Omo Valley/omo 6.jpg"
    	},
    	{
    		image:"/Bishoftu/Bishoftu 1.jpg"
    	},
    	{
    		image:"/Gurage/Gurage 2.jpg"
    	},
    	{
    		image:"/Bishoftu/Bishoftu 5.jpg"
    	},
    	{
    		image:"/Bulga/Bulga 7.jpg"
    	},
    	{
    		image:"/Dankil/Danakil9.jpg"
    	},
  	];
  	const [paddingTop, setPaddingTop] = useState("0");
  	return (
	    <section
      		className="md:py-28 py-8 gap-10 px-5 grid grid-cols-1 lg:grid-cols-2 text-white 
                  md:justify-center bg-[#1A3E58] lg:px-40"
    	>
	   		<div className="flex flex-col gap-6 text-left w-full lg:w-80 my-8 md:my-0">
	        	<h2 className="text-3xl md:text-4xl lg:text-5xl font-bold headings-fonts bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text md:mb-4">
	                Photography-Centered Journeys
	            </h2>

	            <p className="md:text-xl text-lg text-left text-white">
	                Our photography-focused tours are designed to capture the beauty of Ethiopia through your lens. 
	                From dramatic landscapes to vibrant cultures, our itineraries are carefully crafted to provide photographers of 
	                all levels with opportunities to create stunning visual stories.
	            </p>
	   		</div>
	   		<div className="px-5 lg:px-0">
	   			<Slider {...settings}>
        			{photos.map((data, index) => (
          				<div key={index} className="h-[600px] ">
							<Image
          						src={data.image}
          						layout="fill"
          						objectFit="contain"
          						onLoad={({ target }) => {
            						const { naturalWidth, naturalHeight } = target;
            						setPaddingTop(`calc(100% / (${naturalWidth} / ${naturalHeight})`);
          						}}
          						alt="photograpy focused images"
        					/>
						</div>
        			))}
      			</Slider>
	   		</div>
	    </section>
  	);
}
