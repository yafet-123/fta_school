import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useRouter } from 'next/router';
import { prisma } from '../../../../util/db.server.js'
import { getSession } from "next-auth/react";
import { MainHeader } from '../../../../components/common/MainHeader';
import { VerticalNavbar } from "../../../../components/Teacher/VerticalNavbar";
import SubjectList from '../../../../components/Teacher/subject/SubjectList'
import { useSession } from "next-auth/react";

export async function getServerSideProps(context) {
  const {params,req,res,query} = context
  const id = query.subjectId

  const allSubjects = await prisma.Subject.findMany({
    where: {
      subject_id: Number(id),
    }
  });
  
  const subjects = allSubjects.map((data)=>({
     subject_id: data.subject_id,
     SubjectName: data.SubjectName
  }))

  return {
    props: {
      subjects,
    }, // will be passed to the page component as props
  }
}

export default function Subjects({subjects}) {
  console.log(subjects)
  const router = useRouter();
  function handleChange(newValue) {
      setselected(newValue);
  }
  const { status, data } = useSession();
  return (
    <React.Fragment>
      <MainHeader title="Future Talent Academy : Student SUbject" />
      <div className="flex bg-[#e6e6e6] dark:bg-[#02201D] w-full h-full pt-10">
        <VerticalNavbar onChange={handleChange} data={data} />
        <div className="w-full pt-20">
          <SubjectList subjects={subjects} />
        </div>
      </div>
    </React.Fragment>
  );
};