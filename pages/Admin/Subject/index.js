import React from "react";
import { useState,useEffect, useContext} from 'react'
import { prisma } from '../../../util/db.server.js'
import { AddSubject } from "../../../components/Admin/subjects/AddSubject";
import {DisplaySubject} from "../../../components/Admin/subjects/DisplaySubject";
import { useSession } from "next-auth/react";
import { VerticalNavbar } from "../../../components/Admin/VerticalNavbar";
import { MainHeader } from '../../../components/common/MainHeader';
export async function getServerSideProps(){
  const subjectes = await prisma.Subject.findMany({
    orderBy : {ModifiedDate:'desc'},
    include:{
      User:{
        select:{
          UserName:true
        }
      }
      
    }
    
  });
  console.log(subjectes)
  const Allsujectes = subjectes.map((data)=>({
      subject_id:data.subject_id,
      SubjectName:data.SubjectName,
      CreatedDate:data.CreatedDate,
      ModifiedDate:data.ModifiedDate,
      User:data.User?.UserName,
  }))
  
  return{
    props:{
      subjectes:JSON.parse(JSON.stringify(Allsujectes)),
    }
  }
}

export default function Students({subjectes}) {
    const { status, data } = useSession();
    return (
    	<React.Fragment>
      		<MainHeader title="Subject Dashboard" />
      		<section className="flex flex-col w-full h-full bg-[#e6e6e6] dark:bg-[#02201D] pt-10">
				    <div className='w-full h-full flex flex-row'>
		        	<VerticalNavbar data={data} />
		        	<div className="w-full">
            			<AddSubject />
            			<DisplaySubject subjectes={subjectes} />
        			</div>
		        </div> 
			     </section>
      	</React.Fragment>
        
    );
}
