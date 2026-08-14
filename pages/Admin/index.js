import { VerticalNavbar } from "../../components/Admin/VerticalNavbar";
<<<<<<< HEAD
import DashBoard from "../../components/Admin/DashBoard";
=======
import { DashBoard } from "../../components/Admin/DashBoard";
>>>>>>> 0306f37bdbd9c29dc14158fb38dab803e1b3073a
import { useSession } from "next-auth/react";
import { useState,useEffect} from 'react'
import { useRouter } from 'next/router'
import { MainHeader } from '../../components/common/MainHeader';
import React from 'react'
import { prisma } from '../../util/db.server.js'
import { getSession } from "next-auth/react";
<<<<<<< HEAD
 
=======

>>>>>>> 0306f37bdbd9c29dc14158fb38dab803e1b3073a
export async function getServerSideProps(context){
  const session = await getSession(context);
  const serverdate = new Date();
  const userRole = session?.user?.role;
   if (userRole !== 'admin') {
     return {
       redirect: {
         destination: '/auth/Admin/Login/signin-user',
         permanent: false,
       },
     };
   }
<<<<<<< HEAD
  return{ 
=======
  return{
>>>>>>> 0306f37bdbd9c29dc14158fb38dab803e1b3073a
    props:{
      
    }
  }
}

export default function Admin({categories,jobs,news,entertainments}){
  function handleChange(newValue) {
      setselected(newValue);
  }
  const { status, data } = useSession();
  return (
    <React.Fragment>
      <MainHeader title="MatricMate : Admin" />
      <div className="flex bg-[#e6e6e6] pt-10">
        <VerticalNavbar onChange={handleChange} data={data} />
        <div className="w-full">
          <DashBoard categories={categories} />
        </div>
      </div>
    </React.Fragment>  );

}

