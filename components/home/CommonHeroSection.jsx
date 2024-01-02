import React, {useState} from 'react'
import Image from 'next/image'
import Slider, { Settings , LazyLoadTypes } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css"

export default function CommonHeroSection({Tag , Welcome_Message}) {
  const CardHeo = [
    {
      id: 1,
      image: "home-1",
    },
    {
      id: 2,
      image: "home-2",
    },
    {
      id: 3,
      image: "home-3",
    },
    {
      id: 4,
      image: "home-4",
    },
    {
      id: 5,
      image: "home-5",
    },
  ];
  var settings = {
    dots: false,
    lazyLoad: true,
    fade: true,
    infinite: true,
    autoplay: true,
    speed: 4000,
    autoplaySpeed: 3000,
  }
  return (
    <div className="overflow-hidden">
      <Slider {...settings}>
        {CardHeo.map((data, index) => (
          <div
            key={index}
            className={`${data.image} w-full h-screen bg-fixed pt-20 flex flex-col`}
          >
            <div className="flex flex-col justify-center lg:justify-start items-center lg:items-start font-bold md:p-12 w-full lg:w-[60%] px-2">
              <div>
                <h1 className="font-bold text-center md:text-left text-white text-3xl md:text-5xl bg-opacity-30 mb-5">
                  {Tag}
                </h1>
              </div>
              <div>             
                <p className="text-white text-center md:text-left text-lg md:text-3xl bg-opacity-30">
                   {Welcome_Message}
                </p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  )
};


