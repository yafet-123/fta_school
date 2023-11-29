import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
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
    { url: "/quiz", link: "Quiz" },
  ];

  return (
    <footer className="bg-[#1a3e58] bottom-0 w-full">
      <div className="flex flex-col lg:flex-row justify-between gap-4 text-white mx-5 md:mx-10 my-5">
        <div className="flex flex-col gap-8 items-start justify-evemly mb-10 md:mb-0">
          <div className="">
            <Link href="/">
              <Image
                src={logo}
                className=""
                alt="Logo"
                width={50}
                height={50}
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
            href={`tel:${+251777940161}`}
          >
            <span className="flex items-center">
              <FaPhone /> <p className="ml-2 md:ml-3 cursor-pointer">+251777940161</p>
            </span>
          </Link>
          <div>
            <Link
              target="_blank"
              className="flex flex-row items-center gap-2 hover:text-gray-300"
              href="mailto:info@undiscoveredethiopia.com"
            >
              <span className="flex items-center">
                <MdEmail /> <p className="ml-2 md:ml-3 cursor-pointer">info@fta.com</p>
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
                Addis Ababa, Ethiopia.
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
      <div className="flex flex-col md:flex-row justify-between items-center md:h-10  px-5 md:px-10 bg-white py-2">
        <p className="text-sm md:text-md text-[#1A3E58] md:block text-center md:text-left mb-5 md:mb-0 ">
          &copy; 2023 FTA. All rights reserved.
        </p>

        <div className="text-sm md:text-md text-[#1A3E58] font-medium">
          <Link
            target="_blank"
            className="flex flex-row items-center gap-2 hover:text-gray-300 "
            href="mailto:meetnatnaelkebede@gmail.com"
          >
            <p className="underline cursor-pointer">Website made by Yafet A. </p>
          </Link>
        </div>
      </div>
    </footer>
  );
};
