import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useRouter } from 'next/router';
import { useState,useEffect, useContext} from 'react'
import moment from 'moment';
import Gravatar from 'react-gravatar';

export default function Display({Allcommunications}) {
  const router = useRouter();
  const handleSubject = (id) => {
    router.push(`/Students/question/category/${id}`);
  };
  return (
    <div className="pt-0 pb-20 w-full h-full px-5 lg:px-10 gap-5 ">
      {Allcommunications.map((data,index)=>(
        <div className="w-full">
          <div className="flex-1 overflow-x-hidden overflow-y-auto p-4">
            <div className="flex flex-col space-y-4">
                <div className="flex flex-col space-y-2 items-start">
                    <div className="flex items-center space-x-2">
                        <div className="rounded-full overflow-hidden">
                          <Gravatar email={data.email} size={75} />
                        </div>
                        <div class="bg-blue-500 text-white p-2 rounded-lg">
                          <div className="flex justify-between items-center my-2">
                            <p className="text-lg lg:text-xl"><span className="font-bold"> Title :</span> {data.title}</p>
                            {moment(data.ModifiedDate).utc().format('YYYY-MM-DD')}
                          </div>
                          <p className="font-normal text-md lg:text-lg"> <span className="font-bold"> Content :</span> {data.content}</p>
                          
                        </div>
                    </div>
                    <div className="flex items-center space-x-2 self-end">
                        <div className="bg-gray-300 text-gray-700 p-2 rounded-lg">
                            Hi! I have a question about my order.
                        </div>
                        <img src="https://placekitten.com/40/40" alt="User" className="w-8 h-8 rounded-full" />
                    </div>
                </div>      
            </div>
          </div>
        </div>
      ))}
      <div className="bg-white p-4 flex items-center rounded-lg">
        <input type="text" placeholder="Type your message..." className="flex-1 p-2 border rounded-md mr-2" />
        <button className="bg-blue-500 text-white p-2 rounded-md">Send</button>
      </div>
    </div>
  );
};