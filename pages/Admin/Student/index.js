import React from "react";
import { useState,useEffect, useContext} from 'react'
import { prisma } from '../../../util/db.server.js'
import { AddStudent } from "../../../components/Admin/Students/AddStudent";
import {DisplayStudent} from "../../../components/Admin/Students/DisplayStudent";
import { useSession } from "next-auth/react";
import { VerticalNavbar } from "../../../components/Admin/VerticalNavbar";
import { MainHeader } from '../../../components/common/MainHeader';
export async function getServerSideProps(){
  const students = await prisma.Students.findMany({
    orderBy : {ModifiedDate:'desc'},
    include:{
      Class:{
        select:{
          ClassName:true
        }
      }
      
    }
    
  });

  const classes = await prisma.Class.findMany({
    include:{
      User:{
        select:{
          UserName:true
        }
      }
    },
    orderBy : {ModifiedDate:'desc'},
  });
  
  const Allstudents = students.map((data)=>({
      students_id:data.students_id,
      UserName:data.UserName,
      email:data.email,
      role:data.role,
      CreatedDate:data.CreatedDate,
      ModifiedDate:data.ModifiedDate,
      ClassName:data.Class.ClassName,
  }))

  const Allclasses = classes.map((data)=>({
      class_id:data.class_id,
      ClassName:data.ClassName,
      CreatedDate:data.CreatedDate,
      ModifiedDate:data.ModifiedDate,
      User:data.User,
  }))
  console.log(students)
  return{
    props:{
      students:JSON.parse(JSON.stringify(Allstudents)),
      classes:JSON.parse(JSON.stringify(Allclasses)),
    }
  }
}

export default function Students({students,classes}) {
    const { status, data } = useSession();
    return (
    	<React.Fragment>
      		<MainHeader title="Students Dashboard" />
      		<section className="flex flex-col w-full h-full bg-[#e6e6e6] dark:bg-[#02201D] pt-10">
				    <div className='w-full h-full flex flex-row'>
		        	<VerticalNavbar data={data} />
		        	<div className="w-full">
            			<AddStudent classes={classes} />
            			<DisplayStudent students={students} />
        			</div>
		        </div> 
			     </section>
      	</React.Fragment>
        
    );
}
