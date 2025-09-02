import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router';
import Link from "next/link"
import { FaFolder } from "react-icons/fa6";

export default function Grade() {
  const grades = [
    { id: 1, name: "Grade 1" },
    { id: 2, name: "Grade 2" },
    { id: 3, name: "Grade 3" },
    { id: 4, name: "Grade 4" },
    { id: 5, name: "Grade 5" },
    { id: 6, name: "Grade 6" },
    { id: 7, name: "Grade 7" },
    { id: 8, name: "Grade 8" },
    { id: 9, name: "Grade 9" },
    { id: 10, name: "Grade 10" },
    { id: 11, name: "Grade 11 Natural" },
    { id: 12, name: "Grade 11 Social" },
    { id: 13, name: "Grade 12 Natural" },
    { id: 13, name: "Grade 12 Social" },
  ];

  return ( 
    <div className="px-5 md:px-10 lg:px-20 py-32">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {grades.map((grade, index) => (
          <div
            key={grade.id}
            className={`flex justify-center items-center bg-[#002244] text-[#fff] py-4 px-2 border-lg rounded-2xl 
            hover:bg-[#0041e1] hover:text-[#fff]`}
          >
            <Link 
              href={`/practice/grade/${grade.name}`}
            >
              <a className="flex justify-center items-center">
                <h1>
                  <FaFolder size={40} color="#ffcb23" />
                </h1>
                <h1 className="pl-4 font-caveat text-center font-bold text-md md:text-lg">
                  {grade.name}
                </h1>
              </a>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
