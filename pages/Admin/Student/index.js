import React from "react";
import { useState,useEffect, useContext} from 'react'
import { prisma } from '../../../util/db.server.js'
<<<<<<< HEAD
import AddStudent from "../../../components/Admin/student/AddStudent";
import { DisplayStudent} from "../../../components/Admin/student/DisplayStudent";
=======
import { AddStudent } from "../../../components/Admin/Students/AddStudent";
import {DisplayStudent} from "../../../components/Admin/Students/DisplayStudent";
>>>>>>> 0306f37bdbd9c29dc14158fb38dab803e1b3073a
import { useSession } from "next-auth/react";
import { VerticalNavbar } from "../../../components/Admin/VerticalNavbar";
import { MainHeader } from '../../../components/common/MainHeader';
import { getSession } from "next-auth/react";

export async function getServerSideProps(context){
  const session = await getSession(context);
<<<<<<< HEAD
  const serverdate = new Date();     
=======
  const serverdate = new Date();
>>>>>>> 0306f37bdbd9c29dc14158fb38dab803e1b3073a
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
  const students = await prisma.Student.findMany({orderBy : {enrolledAt:'desc'}});
  const Allstudents = students.map((data)=>({
      user_id:data.id,
      name: data.name,
      gradeLevel: data.gradeLevel,
      schoolName: data.schoolName,
      dateOfBirth: data.dateOfBirth,
      email:data.email,
      gender:data.gender,
      enrolledAt:data.enrolledAt,
      updatedAt:data.updatedAt,
=======
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
>>>>>>> 0306f37bdbd9c29dc14158fb38dab803e1b3073a
  }))
  console.log(students)
  return{
    props:{
      students:JSON.parse(JSON.stringify(Allstudents)),
<<<<<<< HEAD
=======
      classes:JSON.parse(JSON.stringify(Allclasses)),
>>>>>>> 0306f37bdbd9c29dc14158fb38dab803e1b3073a
    }
  }
}

<<<<<<< HEAD
export default function Student({students}) {
    const { status, data } = useSession();
    return (
      <React.Fragment>
        <MainHeader title="User Dashboard" />
        <section className="flex flex-col w-full h-full bg-[#e6e6e6] pt-10">
          <div className='w-full h-full flex flex-row'>
            <VerticalNavbar data={data} />
            <div className="w-full lg:px-6">
              <AddStudent />
              <DisplayStudent students={students} />
            </div>
          </div>
        </section>
      </React.Fragment>
    );
}
=======
export default function Students({students,classes}) {
    const { status, data } = useSession();
    return (
    	<React.Fragment>
      		<MainHeader title="Students Dashboard" />
      		<section className="flex flex-col w-full h-full bg-[#e6e6e6] pt-10">
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
>>>>>>> 0306f37bdbd9c29dc14158fb38dab803e1b3073a
