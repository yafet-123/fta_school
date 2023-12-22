import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useRouter } from 'next/router';
import logo from '../../public/LOGO_V0.1-01.png';

export default function Hero() {
  const router = useRouter();
  
  return (
    <div className="flex flex-col bg-white border rounded-xl py-5">
      <div className="flex justify-between items-center gap-5 mb-5 px-5">
        <div>
          <Image
            src={logo}
            alt="Logo"
            width={80}
            height={80}
            className="h-14 w-14"
          />
        </div>
        <h1 className="font-bold text-4xl md:text-6xl text-right italic">
          Future Talent Academy
        </h1>
      </div>
      <h1 className="font-bold text-2xl md:text-5xl text-center w-full px-20">
        1<sup>st</sup> quarter ICT Worksheet For Grade 9
      </h1>
    </div>
  );
};