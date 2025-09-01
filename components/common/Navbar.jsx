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
    { path: "/contact", name: "Contact" },
    { path: "/Team", name: "Team" },
    { path: "/about", name: "About Us" },
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
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <nav className="fixed top-0 w-full bg-[#002244] border-b border-black flex justify-between items-center px-6 py-4 z-50">
        <div className="flex items-center gap-2">
          <Image
            src="/Logo1.png"
            alt="MatricMate Logo"
            width={60}
            height={50}
            priority
          />
          <a href="/" className="text-[#007BFF] font-bold text-xl">
            MatricMate
          </a>
        </div>

        {/* Desktop Nav */}
        <ul className="hidden md:flex gap-6">
          {["Home", "Books", "Practice", "About", "Contact", "Account"].map(
            (link, i) => (
              <li key={i}>
                <a
                  href={
                    link === "Home"
                     ? "/"
                      : link === "Practice"
                      ? "/practice"
                      : "#"
                  }
                  className="relative text-[#007BFF] font-medium hover:after:w-full after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-[#007BFF] after:transition-all after:duration-300"
                >
                  {link}
                </a>
              </li>
            )
          )}
        </ul>

        {/* Hamburger */}
        <div
          className="md:hidden flex flex-col gap-1 cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className="w-6 h-[3px] bg-[#007BFF] rounded"></span>
          <span className="w-6 h-[3px] bg-[#007BFF] rounded"></span>
          <span className="w-6 h-[3px] bg-[#007BFF] rounded"></span>
        </div>
      </nav>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <ul className="absolute top-16 right-6 bg-white border rounded-lg shadow-lg flex flex-col w-48 animate-fade-in">
          {["Home", "Books", "Practice", "About", "Contact", "Account"].map(
            (link, i) => (
              <li key={i} className="border-b last:border-none">
                <a
                  href={
                    link === "Home"
                      ? "/"
                      : link === "Practice"
                      ? "/practice"
                      : "#"
                  }
                  className="block px-4 py-3 text-[#007BFF] hover:bg-gray-100"
                >
                  {link}
                </a>
              </li>
            )
          )}
        </ul>
      )}
    </div>
  );
};
/li>
              ))}
              { 
                <li
                  className={` md:my-0 my-7 text-lg md:text-xl hover:underline cursor-pointer hover:text-[#17c294] ${
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
    </nav>
  );
};
