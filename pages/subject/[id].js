import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useRouter } from 'next/router';
import { prisma } from '../../util/db.server.js'
import SubjectList from '../../components/subject/SubjectList'
export async function getServerSideProps(context) {
  const {params,req,res,query} = context
  const id = query.id
  
  const Subject = await prisma.Subject.findMany({
      where:{
        ClassSubject:{
        some: {
          Class:{
            class_id: Number(id)
          }
        }
      } 
      },
      include:{
        User:{
          select:{
            UserName:true
          }
        },
        ClassSubject:{
          include:{
            Class:{
              select:{
                class_id:true,
                ClassName:true
              }
            }
          }
        },
      }
    })

    const AllSubject = Subject.map((data)=>({
    subject_id:data.subject_id,
    SubjectName:data.SubjectName,
  }))

    return {
      props: {
        AllSubject,
      }, // will be passed to the page component as props
  }
}

export default function Subject({AllSubject}) {
  console.log(AllSubject)
  const router = useRouter();
  const handleSubject = (id) => {
    router.push(`/subject/${id}`);
  };
  return (
    <div className='bg-[#E6E6E6] px-2 lg:px-32 h-full py-32'>
      <SubjectList AllSubject={AllSubject} />
    </div>
  );
};