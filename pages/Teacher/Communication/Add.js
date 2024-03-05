import React,{ useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { MainHeader } from '../../../components/common/MainHeader';
import { VerticalNavbar } from "../../../components/Teacher/VerticalNavbar";
import Multiselect from 'multiselect-react-dropdown';
import { getSession } from "next-auth/react";
import { prisma } from '../../../util/db.server.js'

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
  
  const students = await prisma.Students.findMany({
    where: {
      class_id: Number(teacher.teacher_id),
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

  
  const Allsubjects = classes.map((data)=>({
    subject_id:data.subject_id,
    SubjectName:data.Subject.SubjectName,
  }))

  return {
    props: {
      Allclasses,
      Allsubjects,
      teacherId
    }, // will be passed to the page component as props
  }
}

const Add = ({Allclasses,Allsubjects,teacher,teacherId}) => {
  const [classId, setClassId] = useState([])
  const [title, settitle] = useState('');
  const [content, setcontent] = useState('');
  const [loading, setloading] = useState(false)

  async function handleSubmit(values){
    setloading(true);
    
    const data = await axios.post(`../../../api/chat`,{
      "title":title,
      "content":content,
      "classId" : classId,
      "teacherId":teacherId
    }).then(function (response) {
      console.log(response.data);
      router.reload()
      setloading(false);
    }).catch(function (error) {
      seterror("Creating Ai Search Failed")
      setLoading(false)
      setloading(false);
    });
  }
  return (
    <React.Fragment>
      <MainHeader title="Future Talent Academy : Add Communication" />
      <div className="flex bg-[#e6e6e6] dark:bg-[#02201D] w-full h-full pt-10">
        <VerticalNavbar />
        <div className="px-0 lg:px-10 pt-32 w-full">
          <div className="flex justify-between flex-col items-center">
            <div className="w-full">
              <Multiselect
                displayValue="ClassName"
                placeholder = "Class"
                className="z-50 mb-5 w-full px-1 lg:px-3 text-md lg:text-xl text-black bg-white py-2 border-2 border-black rounded-xl appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-500 peer"
                onKeyPressFn={function noRefCheck(){}}
                onRemove={function noRefCheck(){}}
                onSearch={function noRefCheck(){}}
                onSelect={(e)=>{
                  e.map((data,index)=>(
                    setClassId([...classId, data.class_id])
                  ))
                }}
                options={Allclasses}
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 w-full mb-5">
              <div className="relative w-full">
                <input 
                  id="title" 
                  type="text" 
                  value={title}
                  required
                  className="block w-full px-3 text-sm lg:text-xl text-black bg-white py-4 border-2 border-black rounded-xl appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-500 peer" placeholder=" "
                  onChange={(e) => settitle(e.target.value)}
                />
                <label 
                    htmlFor="floating_outlined" 
                    className="absolute text-sm lg:text-xl text-black duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                >
                    Title
                </label>
              </div>
              <div className="relative w-full">
                <input 
                  id="content" 
                  type="text" 
                  value={content}
                  required
                  className="block w-full px-3 text-sm lg:text-xl text-black bg-white py-4 border-2 border-black rounded-xl appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-500 peer" placeholder=" "
                  onChange={(e) => setcontent(e.target.value)}
                />
                <label 
                    htmlFor="floating_outlined" 
                    className="absolute text-sm lg:text-xl text-black duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                >
                    Content
                </label>
              </div>
            </div>
            <button 
              disabled={loading}
              className={`float-right text-white font-medium rounded-lg text-xl p-4 text-center inline-flex items-center 
                ${loading ? "bg-gray-200" : "bg-[#009688] hover:bg-[#009688] focus:ring-4 focus:ring-[#009688]" }`}
              onClick={handleSubmit}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Add;
