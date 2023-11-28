import React from 'react'
import { FaBusAlt, FaHotel } from 'react-icons/fa';
import { AiFillStar } from 'react-icons/ai';
import { BsHeadset, BsPersonBoundingBox } from 'react-icons/bs';
import { MdPriceCheck } from 'react-icons/md';
import Image from 'next/image'


export default function OurServices() {
  const ServicesArray = [
    {
      title: 'Discover the Richness of Ethopia',
      icon: <FaBusAlt size={75} color="#00d1bb" />,
      image:"service-1",
      description:
        "Our extensive selection of handpicked tours covers every corner of Ethiopia, ensuring you experience the country's diverse landscapes, cultures, and historical treasures. From the iconic to the undiscovered, there's a tour for every traveler's unique interests.",
    },
    {
      title: 'Service Excellence at Your Fingertips',
      icon: <AiFillStar size={75} color="#00d1bb" />,
      image:"",
      description:
        "Our team of expert tour managers is not only highly qualified but also genuinely passionate about Ethiopia. They are dedicated to providing you with the best service, sharing their knowledge, and ensuring your journey is filled with unforgettable moments.",
    },
    {
      title: 'Round-the-Clock Assistance',
      icon: <BsHeadset size={75} color="#00d1bb" />,
      image:"service-2",
      description:
        "Questions or concerns can arise at any time. That's why we offer 24/7 professional support from our friendly staff. Whether it's planning, booking, or during your journey, we're here to assist you every step of the way.",
    },
    {
      title: 'Your Ideal Tour, Your Way',
      icon: <BsPersonBoundingBox size={75} color="#00d1bb" />,
      image:"service-3",
      description:
        "Our innovative matching system empowers you to find the perfect tour for your next holiday. Tailored to your preferences and interests, this system ensures that your travel experience is uniquely your own.",
    },
    {
      title: 'Quality Accommodation Choices',
      icon: <FaHotel size={75} color="#00d1bb" />,
      image:"service-4",
      description:
        "We take great care in selecting the hotels for your stay. From affordable yet comfortable options to luxury establishments, our handpicked hotels promise a comfortable and memorable stay.",
    },
    {
      title: 'Confidence in Every Booking',
      image:"service-5",
      icon: <MdPriceCheck size={75} color="#00d1bb" />,
      description:
        "We believe in providing the best value for your money. If you discover tours that are cheaper than ours, rest assured that we'll compensate for the difference, ensuring you get the best deal for your travel adventure in Ethiopia."
    },
  ];
  return (
    <section className="h-full bg-white py-10 px-5 md:px-20">
      <h1 className="text-center font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text text-3xl md:text-4xl lg:text-5xl mb-5">
        {`Discovering Ethiopia's Hidden Treasures waiting for you`}
      </h1>

      <h2 className="md:text-2xl text-xl text-center text-black lg:text-white font-semibold my-10 px-4">
        {`Our greatest expertise is in the regions we visit with our tours as well as most of Ethiopia, 
        where we live. We often provide travel services to our guests for personal travel planning 
        before or after tours with Undiscovered. We are also happy to assist other travel needs.`}
      </h2>
      <div className="hidden lg:flex bg-gradient-to-r from-red-500 to-blue-500 h-[200px] -mx-10 rounded-lg -mt-40"></div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-5 lg:gap-0 my-5 lg:mb-0 ">
        {ServicesArray.map((service, index) => {
          return (
            <div
              key={index}
              className={`bg-[#1A3E58] flex flex-col justify-around items-center w-auto h-auto p-6 lg:p-10 gap-4 text-white ${service.image} `}
            >
              
              <h2 className="md:text-2xl text-lg font-semibold md:font-bold text-center">
                {service.title}
              </h2>

              <p className="md:text-lg text-md md:px-6 text-center ">
                {service.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
