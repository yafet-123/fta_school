import { VerticalNavbar } from "../../components/Teacher/VerticalNavbar";
import { useSession } from "next-auth/react";
import { useState,useEffect} from 'react'
import { useRouter } from 'next/router'
import { MainHeader } from '../../components/common/MainHeader';
import React from 'react'
import { prisma } from '../../util/db.server.js'

export async function getServerSideProps(){
  const questionCountsByClass = await prisma.classQuestion.groupBy({
    by: ['class_id'],
    _count: true,
    // include: {
    //   Class: {
    //     select: {
    //       ClassName: true,
    //     },
    //   },
    // },
  }); 
  
  console.log(questionCountsByClass)
  return{
    props:{
      
    }
  }
}

export default function Admin(){
  function handleChange(newValue) {
      setselected(newValue);
  }
  const { status, data } = useSession();
  return (
    <React.Fragment>
      <MainHeader title="Future Talent Academy : Teacher" />
      <div className="flex bg-[#e6e6e6] dark:bg-[#02201D] pt-10">
        <VerticalNavbar onChange={handleChange} data={data} />
        <div className="w-full pt-20">
          
        </div>
      </div>
    </React.Fragment>  );

}

