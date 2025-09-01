import React, {useState} from 'react'
import Image from 'next/image'
import Link from "next/link"
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
    <main
      className="flex-1 flex flex-col items-center justify-center text-center px-4"
      style={{
        backgroundImage: "url('/back.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <h1 className="text-5xl font-bold text-[#007BFF] mb-4 mt-24 animate-fade-in">
        MatricMate
      </h1>
      <p className="text-lg font-medium text-white mb-4">
        Your best companion to ace the matric exam.
      </p>
      <p className="text-white max-w-xl mb-6">
        Ethiopia is entering a new era of digital testing; MatricMate is
        here to support every step. Access textbooks, test your knowledge,
        and get instant answers, all from one platform.
      </p>
      <Link
        className="bg-white text-[#002244] px-6 py-3 rounded-full border border-[#007BFF] hover:bg-[#007BFF] hover:text-white transition"
      >
        <a
          href="/practice"
        >
          Get Started
        </a>
      </Link>
    </main>
  )
};


