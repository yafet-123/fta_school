import { VerticalNavbar } from "../../components/Admin/VerticalNavbar";
import { DashBoard } from "../../components/Admin/DashBoard";
import { useSession } from "next-auth/react";
import { useState,useEffect} from 'react'
import { useRouter } from 'next/router'
import { MainHeader } from '../../components/common/MainHeader';
import React from 'react'
import { prisma } from '../../util/db.server.js'

export async function getServerSideProps(){
  

  return{
    props:{
      
    }
  }
}

export default function Admin({categories,jobs,news,entertainments}){
  
  return (
    <React.Fragment>
      <MainHeader title="Hulu Media : Admin" />
      <div className="flex bg-[#e6e6e6] dark:bg-[#02201D] pt-10">
        
      </div>
    </React.Fragment>
  );

}

