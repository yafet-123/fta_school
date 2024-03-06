import React,{ useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { MainHeader } from '../../../components/common/MainHeader';
import { VerticalNavbar } from "../../../components/Teacher/VerticalNavbar";
import Multiselect from 'multiselect-react-dropdown';
import { getSession } from "next-auth/react";
import { prisma } from '../../../util/db.server.js'
import { AddGroup } from '../../../components/Teacher/Communication/AddGroup'
export async function getServerSideProps(context) {
  const session = await getSession(context);
  console.log(session)
  const userRole = await session?.user?.role
  if (userRole !== 'teacher') {
    return {
      redirect: {
        destination: '/auth/error', // Redirect to the error page for unauthorized access
        permanent: false,
      },
    };
  }
  const teacherId = session.user.user_id;
  const teacher = await prisma.Teacher.findUnique({
    where:{ teacher_id: Number(session.user.user_id) },
    
  });

  if (teacher === null) {
    return {
      redirect: {
        destination: '/auth/error',
        permanent: false,
      },
    };
  }

  const classes = await prisma.ClassTeacher.findMany({
    where:{
      teacher_id:Number(teacher.teacher_id)
    },
    include:{
      Class:{
        select:{
          ClassName:true
        }
      },
      Subject:{
        select:{
          SubjectName:true
        }
      },
    },
    orderBy: {
      // Specify the column and the order (asc for ascending)
      class_id: 'asc'
    },
  })

  const classId = classes.map((data)=>(
    Number(data.class_id)
  ))
  console.log(classId)
  const students = await prisma.Students.findMany({
    where: {
      class_id:{
        in:classId
      }
    },
    orderBy: {
      UserName:"asc"
    },
    include: {
      Class: {
        select: {
          class_id: true,
          ClassName: true,
        },
      },
    },
  });

  const Allclasses = classes.map((data)=>({
    class_id:data.class_id,
    ClassName:data.Class.ClassName,
  }))

  const Allstudents = students.map((data)=>({
    students_id:data.students_id,
    name:data.firstName + " " + data.lastName,
    UserName:data.UserName,
    email:data.email,
    class_id:data.Class.class_id
  }))

  console.log(students)
  
  const Allsubjects = classes.map((data)=>({
    subject_id:data.subject_id,
    SubjectName:data.Subject.SubjectName,
  }))

  return {
    props: {
      Allclasses,
      Allsubjects,
      teacherId,
      Allstudents
    }, // will be passed to the page component as props
  }
}

const Add = ({Allclasses,Allsubjects,teacherId,Allstudents}) => {
  
  return (
    <React.Fragment>
      <MainHeader title="Future Talent Academy : Add Communication" />
      <div className="flex bg-[#e6e6e6] dark:bg-[#02201D] w-full h-full pt-10">
        <VerticalNavbar />
        <div className="w-full flex flex-col pt-20">
          <AddGroup Allclasses={Allclasses} Allstudents={Allstudents} Allsubjects={Allsubjects} teacherId={teacherId} />
        
        </div>
      </div>
    </React.Fragment>
  );
}

export default Add;
