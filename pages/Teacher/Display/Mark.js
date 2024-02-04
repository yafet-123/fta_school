import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { prisma } from '../../../util/db.server.js'
import { getSession } from "next-auth/react";
import { MainHeader } from '../../../components/common/MainHeader';
import { VerticalNavbar } from "../../../components/Teacher/VerticalNavbar";
import ClassList from '../../../components/Teacher/Class/ClassList'
import { useSession } from "next-auth/react";
import React, { useState } from 'react';

export async function getServerSideProps(context) {
  const session = await getSession(context);
  console.log(session)
  const {params,req,res,query} = context
  const id = query.id
  const classId = query.classId;
  const SubjectId = query.subjectId
  const teacher = await prisma.Teacher.findUnique({
    where:{ teacher_id: Number(session.user.user_id) },
    
  });
  const types = await prisma.QuestionType.findUnique({
    where:{ question_type_id: Number(id) },  
  });

  const type = types.questiontypeName

  const marks = await prisma.Mark.findMany({
      where:{
        AND: [ 
          {question_type_id: Number(id)},
          {subject_id: Number(SubjectId),},
          {students_id: Number(teacher.teacher_id),},
        ]
      },
      orderBy: {
        // Specify the column and the order (asc for ascending)
        students_id: 'asc'
      },
    })
  
  const students = await prisma.Students.findMany({
    where:{
      class_id: Number(classId),
    },
    include: {
      Mark: true
    },
  })
  console.log(students)
  return {
    props: {
      
    }, // will be passed to the page component as props
  }
}

const Display = ({Allquestion,questionlength,type, SubjectId}) => {
  const { status, data } = useSession();
  return (
    <React.Fragment>
      <MainHeader title="Future Talent Academy : Students" />
      <div className="flex bg-[#e6e6e6] dark:bg-[#02201D] pt-5">
        <VerticalNavbar data={data} />
      </div>
    </React.Fragment>
  );
};

export default Display;