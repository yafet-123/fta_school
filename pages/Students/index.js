import { VerticalNavbar } from "../../components/Students/VerticalNavbar";
import { useSession } from "next-auth/react";
import { useState,useEffect} from 'react'
import { useRouter } from 'next/router'
import { MainHeader } from '../../components/common/MainHeader';
import React from 'react'
import { prisma } from '../../util/db.server.js'
import MyCalendar from '../../components/common/MyCalendar' 
import TodoList from '../../components/Students/TodoList'
import Profile from '../../components/Students/Profile'
import { getSession } from "next-auth/react";

export async function getServerSideProps(context){
  const serverdate = new Date();
  const session = await getSession(context);
  
  const student = await prisma.Students.findUnique({
    where:{ students_id: Number(session.user.user_id) },
    include:{
      Class:{
        select:{
          ClassName:true
        }
      }
    }
  });

  const studentId = student.students_id

  const tasks = await prisma.Task.findMany({
    where:{
      students_id: Number(student.students_id)
    }
  });

  const Alltasks = tasks.map((data)=>({
    id: data.id,
    text:data.text,
    completed:data.completed,
    students_id:data.students_id,
  }))

  const Allstudents = {
    students_id: student.students_id,
    firstName: student.firstName,
    lastName: student.lastName,
    age: student.age,
    UserName: student.UserName,
    email: student.email,
    ClassName: student.Class.ClassName
  };

  console.log(tasks)
  return {
    props: {
      tasks:Alltasks,
      studentId,
      Allstudents
    },
  };
}

export default function Admin({serverdate, tasks, studentId, Allstudents}){
  function handleChange(newValue) {
      setselected(newValue);
  }
  const { status, data } = useSession();
  return (
    <React.Fragment>
      <MainHeader title="Future Talent Academy : Students" />
      <div className="flex bg-[#e6e6e6] dark:bg-[#02201D] pt-10">
        <VerticalNavbar onChange={handleChange} data={data} />
        <div className="w-full pt-20">
          <div className="flex justify-between items-center px-5 lg:px-10 mb-5">
            <Profile Allstudents={Allstudents} />
            <MyCalendar serverdate={serverdate} />
          </div>
          <div className="px-5 lg:px-10 mb-5">
            <TodoList tasks={tasks} studentId={studentId} />
          </div>
        </div>
      </div>
    </React.Fragment>  );

}

