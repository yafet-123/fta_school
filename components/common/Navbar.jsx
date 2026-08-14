<<<<<<< HEAD
import Image from "next/image";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";
import { useRouter } from "next/router";
import logo from "../../public/logo.png";

export const Navbar = () => {
  const [open, setOpen] = useState(false); // mobile menu
  const [dropdownOpen, setDropdownOpen] = useState(null); // which dropdown is open
  const [shadow, setShadow] = useState(false);

  const router = useRouter();

  const NavLinks = [
    { path: "/", name: "Home" },
    {
      path: "/study",
      name: "Study Tools",
      dropdown: [
        { path: "/study/books/article", name: "Articles" },
        { path: "/study/book", name: "Books" },
        { path: "/study/definitionSheet", name: "Definition Sheet" },
        { path: "/study/exampreparation", name: "Exam Preparation" },
        { path: "/study/formulaSheet", name: "Formula Sheet" },
        { path: "/study/flashcards-tips", name: "Flashcards Tips" },
        { path: "/study/past-paper", name: "Past Paper" },
        { path: "/study/practice-quizzes", name: "Practice Questions" },
        { path: "/study/revision-note", name: "Revision Note" },
        { path: "/study/worksheet", name: "Worksheets / Topical questions" },
        { path: "/study/youtube", name: "Youtube" },
      ],
    },
    { path: "/about", name: "About Us" },
    { path: "/help", name: "Help Center" },
    { path: "/contact", name: "Contact Us" },
  ];

  useEffect(() => {
    const handleShadow = () => setShadow(window.scrollY > 50);
    window.addEventListener("scroll", handleShadow);
    return () => window.removeEventListener("scroll", handleShadow);
  }, []);

  const toggleDropdown = (name) => {
    setDropdownOpen(dropdownOpen === name ? null : name);
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${shadow ? "shadow-lg bg-[#417094]" : "bg-[#417094]"
        }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center h-20">
        {/* Logo */}
        <Link href="/" className="relative w-[150px] lg:w-[180px] h-[55px] lg:h-[60px] overflow-hidden">
          <Image
            src={logo}
            alt="Navbar Logo Image"
            layout="fill"
            objectPosition="center"
          />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center space-x-8 font-semibold text-gray-700">
          {NavLinks.map((link) => (
            <div key={link.name} className="relative">
              {link.dropdown ? (
                <>
                  <button
                    onClick={() => toggleDropdown(link.name)}
                    className={`flex items-center space-x-1 hover:text-[#3cb371] text-xl ${router.pathname.startsWith(link.path)
                        ? "text-[#3cb371] underline text-2xl font-bold"
                        : "text-[#FFF]"
                      }`}
                  >
                    <span>{link.name}</span>
                    <IoIosArrowDown />
                  </button>

                  {dropdownOpen === link.name && (
                    <ul className="absolute left-0 top-full mt-1 bg-white shadow-lg rounded-md w-96 z-50">
                      {link.dropdown.map((sublink) => (
                        <li key={sublink.name}>
                          <Link
                            href={sublink.path}
                            className={`block px-4 py-2 hover:bg-gray-100 text-lg ${router.pathname === sublink.path
                                ? "text-[#3cb371] underline text-2xl font-bold"
                                : "text-gray-700 text-lg"
                              }`}
                          >
                            {sublink.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              ) : (
                <Link
                  href={link.path}
                  className={`hover:text-[#3cb371] text-lg ${router.pathname === link.path
                      ? "text-[#3cb371] underline text-3xl font-bold"
                      : "text-[#FFF]"
                    }`}
                >
                  {link.name}
                </Link>
              )}
            </div>
          ))}

          {/* Sign Up Button */}
          <Link
            href="/auth/Student/Login/signin-student"
            className="ml-4 bg-[#111827] text-white px-5 py-2 rounded-lg hover:bg-[#417094] transition"
          >
            Login
          </Link>

          <Link
            href="/signup"
            className="ml-10 bg-[#fff] text-[#417094] hover:text-[#fff] hover:bg-[#417094] px-5 py-2 rounded-lg transition"
          >
            Sign Up
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <button
            onClick={() => setOpen(!open)}
            className="text-gray-800 p-2 rounded-md focus:outline-none"
          >
            {open ? <AiOutlineClose size={30} /> : <AiOutlineMenu size={30} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="lg:hidden bg-white shadow-lg">
          <ul className="flex flex-col p-4 space-y-4 font-semibold text-gray-700">
            {NavLinks.map((link) => (
              <li key={link.name}>
                {link.dropdown ? (
                  <>
                    <button
                      onClick={() => toggleDropdown(link.name)}
                      className="flex justify-between w-full items-center"
                    >
                      {link.name} <IoIosArrowDown />
                    </button>
                    {dropdownOpen === link.name && (
                      <ul className="pl-4 mt-2 flex flex-col space-y-2">
                        {link.dropdown.map((sublink) => (
                          <li key={sublink.name}>
                            <Link
                              href={sublink.path}
                              onClick={() => setOpen(false)}
                              className="block hover:text-[#417094]"
                            >
                              {sublink.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                ) : (
                  <Link
                    href={link.path}
                    onClick={() => setOpen(false)}
                    className={`block hover:text-[#417094] text-lg ${router.pathname === link.path
                        ? "text-indigo-600 underline text-3xl font-bold"
                        : ""
                      }`}
                  >
                    {link.name}
                  </Link>
                )}
              </li>
            ))}
            {/* Mobile Sign Up Button */}
            <li className="flex flex-col">
              <Link
                href="/auth/Student/Login/signin-student"
                className="mb-5 bg-[#111827] text-white px-5 py-2 rounded-lg hover:bg-[#417094] transition"
              >
                Login
              </Link>

              <Link
                href="/signup"
                onClick={() => setOpen(false)}
                className="block text-center bg-[#fff] text-[#417094] hover:text-[#fff] hover:bg-[#417094] px-5 py-2 rounded-lg  transition"
              >
                Sign Up
              </Link>
            </li>
          </ul>
        </div>
      )}
=======
import React, { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { BsLinkedin, BsInstagram } from "react-icons/bs";
import logo from '../../public/LOGO_V0.1-01.png';
import { useSession } from 'next-auth/react';

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { session } = useSession();
  const [shadow, setShadow] = useState(false);
  const router = useRouter();
   console.log(router.pathname)
  const NavLinks = [
    { path: "/", name: "Home" },
    { path: "/books", name: "Book" },
    { path: "/practice", name: "Practice" },
    { path: "/about", name: "About" },
    { path: "/Team", name: "Team" },
    { path: "/contact", name: "Contact" },
  ];

  useEffect(() => {
    // when it will scrolldown greater than 90 it will have navbar will change it style
    const handleShadow = () => {
      if (window.scrollY >= 50) {
        setShadow(true);
      } else {
        setShadow(false);
      }
    };
    window.addEventListener("scroll", handleShadow);
  }, []);

  const closeDropdown = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <nav
      className={`
        ${
          shadow
            ? "fixed w-full h-20 shadow-xl z-[100] ease-in-out duration-300 bg-[#002244] overflow-hidden"
            : "fixed w-full h-20 z-[100] bg-[#002244]"
        }
      `}
    >
      <div
        className={` ${
          open ? "bg-[#1a3e58] fixed w-full" : ""
        } lg:justify-between justify-around px-2 lg:px-10 items-center lg:flex`}
      >
        <div className="flex items-center justify-between py-4">
          <div className="flex justify-center items-center">
            <Link href="/">
              <Image
                src={logo}
                className="cursor-pointer hover:scale-105 transition duration-300"
                alt="Logo"
                width={70}
                height={60}
              />
            </Link>
             <h1 className={` text-white fonr-bold font-poppins text-lg md:text-2xl font-bold text-[#0041e1]`}>
                Matrick Mate
              </h1> 
          </div>
          <div className="flex items-center lg:hidden">
            <div className="pl-5">
              <button
                className={` text-white p-2 rounded-md outline-none focus:border-gray-400 focus:border`}
                onClick={() => setOpen(!open)}
              >
                {open === true ? (
                  <AiOutlineClose size={35} />
                ) : (
                  <AiOutlineMenu size={35} />
                )}
              </button>
            </div>
          </div>
        </div>

        <div className="">
          <div
            className={`flex-1 justify-self-center pb-2 mt-4 lg:block lg:pb-0 lg:mt-0 ${
              open ? "flex " : "hidden"
            }`}
          >
            <ul
              className={` ${
                open
                  ? "text-white"
                  : "text-white"
              } items-center font-bold paragraph-fonts justify-center space-y-8 lg:flex lg:flex-row flex-col lg:space-x-6 lg:space-y-0`}
            >
              {NavLinks.map((link,index) => (
                <li
                  key={index}
                  className={` md:my-0 my-7 text-md md:text-lg hover:text-xl hover:underline cursor-pointer hover:text-[#0041e1] ${
                    router.pathname === link.path
                      ? "text-[#0041e1] text-2xl underline"
                      : ""
                  } `}
                >
                  <Link href={link.path}>
                    <p onClick={closeDropdown}>{link.name}</p>
                  </Link>
                </li>
              ))}
              { 
                <li
                  className={` md:my-0 my-7 text-lg md:text-xl hover:underline cursor-pointer hover:text-[#0041e1] ${
                    router.pathname === "/auth/Student/Login/signin-student"
                      ? "text-[#edf1f4] underline"
                      : ""
                  } `}
                >
                  <Link href="/auth/Student/Login/signin-student">
                    <p onClick={closeDropdown}>Login</p>
                  </Link>
                </li>
              }
            </ul>
          </div>
        </div>
      </div>
>>>>>>> 0306f37bdbd9c29dc14158fb38dab803e1b3073a
    </nav>
  );
};
