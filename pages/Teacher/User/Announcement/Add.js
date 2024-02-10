import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useRouter } from 'next/router';
import { prisma } from '../../../../util/db.server.js'
import { getSession } from "next-auth/react";
import { MainHeader } from '../../../../components/common/MainHeader';
import { VerticalNavbar } from "../../../../components/Teacher/VerticalNavbar";
import {AddAnnouncement} from '../../../../components/Teacher/AddAnnouncement'
import { useSession } from "next-auth/react";
  
export async function getServerSideProps(context) {
  const session = await getSession(context);
  console.log(session)
  
  const teacherId = session.user.user_id;
  const teacher = await prisma.Teacher.findUnique({
    where:{ teacher_id: Number(session.user.user_id) },
    
  });

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

  const Allclasses = classes.map((data)=>({
    class_id:data.class_id,
    ClassName:data.Class.ClassName,
  }))

  const announcements = await prisma.Announcement.findMany({
    where: {
      teacher_id: Number(teacher.teacher_id),
    },
    include:{
      ClassAnnouncement:{
        select:{
          Class:true
        }
      }
    }
  })

  const Allannouncements = announcements.map((data)=>({
    announcement_id : data.announcement_id,
    title: data.title,
    content: data.content,
    class: data.ClassAnnouncement
  }))

  console.log(Allannouncements[0].class)

  return {
    props: {
      Allclasses,
      teacherId,
    }, // will be passed to the page component as props
  }
}

export default function Add({Allclasses,teacherId}) {
  const router = useRouter();
  function handleChange(newValue) {
      setselected(newValue);
  }
  const { status, data } = useSession();
  return (
    <React.Fragment>
      <MainHeader title="Future Talent Academy : Add Announcement" />
      <div className="flex bg-[#e6e6e6] dark:bg-[#02201D] w-full h-full pt-10">
        <VerticalNavbar onChange={handleChange} data={data} />
        <div className="w-full pt-20">
          <AddAnnouncement Allclasses={Allclasses} teacherId={teacherId} />
        </div>
      </div>
    </React.Fragment>
  );
};