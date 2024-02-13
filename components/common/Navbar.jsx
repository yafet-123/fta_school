import React, { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { BsLinkedin, BsInstagram } from "react-icons/bs";
import logo from '../../public/LOGO_V0.1-01.png';


export const Navbar = () => {
  const [open, setOpen] = useState(false);
  // const [toggleDropdown, setToggleDropdown] = useState(false);
  const [shadow, setShadow] = useState(false);
  const router = useRouter();
  const NavLinks = [
    { path: "/", name: "Home" },
    { path: "/contact", name: "Contact" },
    { path: "/auth/Student/Login/signin-student", name: "Login" },
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
            ? "fixed w-full h-20 shadow-xl z-[100] ease-in-out duration-300 bg-[#1a3e58] overflow-hidden"
            : "fixed w-full h-20 z-[100] border-b-2 border-slate-100 bg-[#1A3E58]"
        }
      `}
    >
      <div
        className={` ${
          open ? "bg-[#1a3e58] fixed w-full" : ""
        } lg:justify-between justify-around px-2 lg:px-10 items-center lg:flex`}
      >
        <div className="flex items-center justify-between py-4">
          {/* <h1
            className={` text-white fonr-bold font-poppins text-xl md:text-4xl font-normal`}
          >
            UNDISCOVERED
          </h1> */}
              <div className="">
            <Link href="/">
              <Image
                src={logo}
                className="cursor-pointer hover:scale-105 transition duration-300"
                alt="Logo"
                width={60}
                height={60}
              />
            </Link>
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
              {NavLinks.map((link) => (
                <li
                  key={link.name}
                  className={` md:my-0 my-7 text-lg md:text-xl hover:underline cursor-pointer hover:text-[#17c294] ${
                    router.pathname === link.path
                      ? "text-[#edf1f4] underline"
                      : ""
                  } `}
                >
                  <Link href={link.path}>
                    <p onClick={closeDropdown}>{link.name}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};
