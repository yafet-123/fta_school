import Image from 'next/image';
import Link from 'next/link';
import React,{useState} from 'react';
import logo from '../../public/LOGO_V0.1-01.png';

import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaPhone,
  FaYoutube,
  // FaTwitter,
  FaTelegram,
  FaTiktok,
  FaTripadvisor,
} from 'react-icons/fa';
import { ImLocation } from 'react-icons/im';
import { MdEmail } from 'react-icons/md';

export const Footer = () => {
  const socialMediaLinks = [
    {
      icon: <FaFacebook size={30} color="white" />,
      path: '',
    },
    // { icon: <FaYoutube size={30} color="white" /> ,  path:""},
    {
      icon: <FaYoutube size={30} color="white" />,
      path: '',
    },
    {
      icon: <FaInstagram size={30} color="white" />,
      path: '',
    },
    {
      icon: <FaTelegram size={30} color="white" />,
      path: '',
    },
  ];

  const quickLinks = [
    { url: "/", link: "Home" },
    { url: "/books", link: "Book" },
    { url: "/practice", link: "Practice" },
    { url: "/about", link: "About" },
    { url: "/Team", link: "Team" },
    { url: "/contact", link: "Contact" },
  ];

  const [loading, setLoading] = useState(false);
  const [email, setemail] =useState("")

  return (
    <footer className="bg-[#1a3e58] bottom-0 w-full">
      <div className="flex flex-col justify-center items-center py-10 bg-[#064569]">
          <h1 className="text-2xl lg:text-4xl py-5 text-white text-capitalize font-bold">Subscribe Our Newsletter</h1>
          <p className="text-xl lg:text-2xl pb-5 text-white text-capitalize font-normal">
            We organize the best Ethiopian premium tours covering historical routes, mountain trekking
          </p>
          <div className="flex justify-center items-center w-full">
            <div className="relative">
              <input 
                  id="username" 
                  type="text" 
                  value={email}
                  required
                  className="block w-full px-3 text-sm lg:text-xl text-black bg-white py-4 border-2 border-black appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-500 peer" placeholder=" "
                  onChange={(e) => setemail(e.target.value)}
              />
              <label 
                  htmlFor="floating_outlined" 
                  className="absolute text-sm lg:text-xl text-black duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
              >
                  Place Enter Your Email
              </label>
            </div>
            <button 
              disabled={loading}
              className={`text-white font-medium text-xl p-4 text-center inline-flex items-center 
                ${loading ? "bg-gray-200" : "bg-[#009688] hover:bg-[#009688] focus:ring-4 focus:ring-[#009688]" }`}
            >
              Submit
            </button>
          </div>
      </div>
      <div className="flex flex-col lg:flex-row justify-between gap-4 text-white mx-5 md:mx-10 my-5">
        <div className="flex flex-col gap-8 items-start justify-evemly mb-10 md:mb-0">
          <div className="">
            <Link href="/">
              <Image
                src={logo}
                className=""
                alt="Logo"
                width={120}
                height={110}
              />
            </Link>
          </div>

          <p className="font-semibold">
            FOLLOW US ON SOCIAL MEDIA!
          </p>
          <div className="flex justify-center gap-4">
            {socialMediaLinks.map((paths, index) => {
              return (
                <Link key={index} href={paths.path} target="_blank" >
                  <p className='cursor-pointer hover:scale-105 '>{paths.icon}</p>
                </Link>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h1 className="text-xl font-bold">Contact Info</h1>

          <Link
            target="_blank"
            className="flex flex-row items-center gap-2 hover:text-gray-300"
            href={`tel:${+251966149422}`}
          >
            <span className="flex items-center">
              <FaPhone /> <p className="ml-2 md:ml-3 cursor-pointer">+251966149422</p>
            </span>
          </Link>
          <div>
            <Link
              target="_blank"
              className="flex flex-row items-center gap-2 hover:text-gray-300"
              href="mailto:info@undiscoveredethiopia.com"
            >
              <span className="flex items-center">
                <MdEmail /> <p className="ml-2 md:ml-3 cursor-pointer">info@ftiaet</p>
              </span>
            </Link>
          </div>

          <Link
            target="_blank"
            className="flex flex-row items-center gap-2 hover:text-gray-300"
            href={`https://goo.gl/maps/Gc6478sG5ZecmfSj6`}
          >
            <span className="flex items-center">
              <ImLocation />{' '}
              <p className="ml-3 cursor-pointer">
                Wollo Sefer Addis Ababa, Ethiopia.
              </p>
            </span>
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-2  justify-center">
          <div className="flex flex-col gap-2">
            <h1 className="text-xl font-bold">Quick Links</h1>
            {quickLinks.map((links, index) => {
              return (
                <Link
                  key={index}
                  href={links.url}
                  className="hover:text-gray-300"
                >
                  {links.link}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center md:h-10  px-5 md:px-10 bg-white py-2">
        <p className="text-sm md:text-md text-[#1A3E58] md:block text-center md:text-left mb-5 md:mb-0 ">
          © 2025 MatricMate. Built for students by students
        </p>
      </div>
    </footer>
  );
};
