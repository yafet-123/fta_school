import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useRouter } from 'next/router';
import { prisma } from '../../../../../util/db.server.js'
import { getSession } from "next-auth/react";
import { MainHeader } from '../../../../../components/common/MainHeader';
import { VerticalNavbar } from "../../../../../components/Teacher/VerticalNavbar";
import Studentlist from '../../../../../components/Teacher/UserAnswer/Studentlist'
import { useSession } from "next-auth/react";

export async function getServerSideProps(context) {
  const {params,req,res,query} = context
  const classId = query.classId

  const students = await prisma.Students.findMany({
    where: {
      class_id: Number(classId),
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
  
  console.log(students)
  const Allstudents = students.map((data)=>({
     students_id: data.students_id,
     UserName: data.UserName,
     firstName: data.firstName,
     lastName: data.lastName,
     class_id: data.Class.class_id
  }))
  console.log(Allstudents)
  return {
    props: {
      Allstudents,
    }, // will be passed to the page component as props
  }
}

export default function Students({Allstudents}) {
  const router = useRouter();
  function handleChange(newValue) {
      setselected(newValue);
  }
  const { status, data } = useSession();
  return (
    <React.Fragment>
      <MainHeader title="Future Talent Academy : Teacher Student" />
      <div className="flex bg-[#e6e6e6] dark:bg-[#02201D] w-full h-full pt-10">
        <VerticalNavbar onChange={handleChange} data={data} />
        <div className="w-full pt-20">
          <Studentlist Allstudents={Allstudents} />
        </div>
      </div>
    </React.Fragment>
  );
};