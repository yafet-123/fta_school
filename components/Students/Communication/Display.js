import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useRouter } from 'next/router';
import { useState,useEffect, useContext} from 'react'
import moment from 'moment';
import Gravatar from 'react-gravatar';
import axios from 'axios';
import ReactModal from "react-modal";
import Loader from "../../common/Loading";
 
export default function Display({Allcommunications, teacherId, studentId}) {
  const router = useRouter();
  const [content, setcontent] = useState()
  const [error , seterror] = useState()
  const [classId,setclassId] = useState()
  const [loading, setLoading] = useState(false);
  const handleSubject = (id) => {
    router.push(`/Students/question/category/${id}`);
  };
  console.log(Allcommunications)

  async function handleSubmit(values){
    setLoading(true)
    console.log(content)
    const data = await axios.post(`../../../api/student/addRespond`,{
        "content":content,
        "classId" : classId,
        "studentsId":studentId,
        "teacherId":teacherId
    }).then(function (response) {
      console.log(response.data);
      router.reload()
      setLoadingModalIsOpen(false);
    }).catch(function (error) {
        seterror("Creating Respond Failed")
        setLoading(false)
    });
  }

  return (
    <div className="pt-0 pb-20 w-full h-full px-5 lg:px-10 gap-5 ">
      {Allcommunications.map((data,index)=>(
        <div className="w-full">
          <div className="flex items-center space-x-2 mb-5">
            <div className="rounded-full overflow-hidden">
              <Gravatar email={data.email} size={75} />
            </div>

            <div className={` ${data.isStudent ? "w-full bg-gray-300 text-gray-700 p-3 rounded-lg" : "w-full bg-blue-500 text-white p-3 rounded-lg"}`}>
              <div className="flex justify-between items-center my-2">
                <p className={` ${data.isStudent ? "hidden":"flex text-lg lg:text-xl"}`}><span className="font-bold"> Title :</span> {data.title}</p>
                <p className="font-bold text-md lg:text-lg">{moment(data.ModifiedDate).utc().format('YYYY-MM-DD')}</p>
              </div>
              <p className="font-normal text-md lg:text-lg"> <span className="font-bold"> Content :</span> {data.content}</p> 
            </div>
          </div>      
        </div>
      ))}
      <form onSubmit={handleSubmit} className="bg-white p-4 flex items-center rounded-lg">
        <input
          value={content}
          onChange={(e) => setcontent(e.target.value)} 
          type="text" 
          required
          placeholder="Type your message..." 
          className="flex-1 p-2 border rounded-md mr-2" 
        />
        <button
          disabled={loading}
          className="bg-blue-500 text-white p-2 rounded-md"
        >
          Send
        </button>
      </form>
      <ReactModal
        isOpen={loading}
                // onRequestClose={closeModal}
        className="flex items-center justify-center w-full h-full"
      >
        <Loader />
      </ReactModal>
    </div>
  );
};