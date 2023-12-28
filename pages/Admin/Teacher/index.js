import React from "react";
import { useState,useEffect, useContext} from 'react'
import { prisma } from '../../../util/db.server.js'
import { AddTeacher } from "../../../components/Admin/Teacher/AddTeacher";
import {DisplayTeacher} from "../../../components/Admin/Teacher/DisplayTeacher";
import { useSession } from "next-auth/react";
import { VerticalNavbar } from "../../../components/Admin/VerticalNavbar";
import { MainHeader } from '../../../components/common/MainHeader';
export async function getServerSideProps(){
  const teachers = await prisma.Teacher.findMany({orderBy : {ModifiedDate:'desc'}});
  const Allteachers = teachers.map((data)=>({
      teacher_id:data.teacher_id,
      email:data.email,
      role:data.role,
      CreatedDate:data.CreatedDate,
      ModifiedDate:data.ModifiedDate,
      UserName:data.UserName
  }))

  return{
    props:{
      teachers:JSON.parse(JSON.stringify(Allteachers)),
    }
  }
}

export default function Teacher({teachers}) {
    const { status, data } = useSession();
    return (
    	<React.Fragment>
      		<MainHeader title="Teacher Dashboard" />
      		<section className="flex flex-col w-full h-full bg-[#e6e6e6] dark:bg-[#02201D] pt-10">
				    <div className='w-full h-full flex flex-row'>
		        	<VerticalNavbar data={data} />
		        	<div className="w-full">
            			<AddTeacher />
            			<DisplayTeacher teachers={teachers} />
        			</div>
		        </div> 
			     </section>
      	</React.Fragment>
        
    );
}
