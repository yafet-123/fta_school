import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useRouter } from 'next/router';

export default function Display({Allcommunications}) {
  const router = useRouter();
  const handleSubject = (id) => {
    router.push(`/Students/question/category/${id}`);
  };
  return (
    <div className="pt-0 pb-20 h-full px-5 lg:px-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 ">
      {Allcommunications.map((data,index)=>(
        <div>
          <div>
            <p>{data.ModifiedDate}</p>
            <p>{data.name}</p>
          </div>
          <p>{data.title}</p>
          <p>{data.content}</p>
        </div>
      ))}
    </div>
  );
};