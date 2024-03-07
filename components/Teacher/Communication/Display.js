import React from "react";
import { useState,useEffect, useContext} from 'react'
import moment from 'moment';
import { useRouter } from 'next/router'
import {DeleteAnnouncement} from './DeleteAnnouncement.js'
import {UpdateAnnouncement} from './UpdateAnnouncement.js'


export function Display({Allcommunications,Allstudents}) {
    const router = useRouter();
    const [deletemodalOn, setdeleteModalOn] = useState(false);
    const [updatemodalOn, setupdateModalOn] = useState(false);
    const [deleteCommunicationid,setdeleteCommunicationid] = useState()
    const [updateCommunicationid,setupdateCommunicationid] = useState()
    const [deleteCommunicationrelationshipid, setdeleteCommunicationrelationshipid] = useState()
    const [updatetitle,setupdatetitle] = useState("")
    const [updatecontent,setupdatecontent] = useState("")
    const [updatestudentId,setupdatestudentId] = useState("")
    const [updateCommunicationrelationshipid,setupdateCommunicationrelationshipid] = useState()
    console.log(Allcommunications)
    const clickedFordelete = () => {
        setdeleteModalOn(true)
    }

    const clickedForupdate = () => {
        setupdateModalOn(true)
    }

    return (
        <div className="px-0 lg:px-10">
            <div className="p-2 lg:p-5">
                <div className="overflow-auto rounded-lg shadow hidden md:block">
                    <table className="w-full">
                        <thead className="bg-neutral-100 dark:bg-slate-800 border-b-2 border-gray-200">
                            <tr>
                              <th className="text-black dark:text-white p-3 text-lg font-semibold tracking-wide text-left">Id</th>
                              <th className="text-black dark:text-white p-3 text-lg font-semibold tracking-wide text-left">Title</th>
                              <th className="text-black dark:text-white p-3 text-lg font-semibold tracking-wide text-left">Content</th>
                              <th className="text-black dark:text-white p-3 text-lg font-semibold tracking-wide text-left">Student Name</th>
                              <th className="text-black dark:text-white p-3 text-lg font-semibold tracking-wide text-left">Created Date</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {Allcommunications.map((data,index)=>(
                                <tr key={index} className="even:bg-neutral-300 odd:bg-neutral-200 even:dark:bg-gray-900 odd:dark:bg-gray-800 w-full">
                                    <td className="p-3 text-lg text-gray-700 whitespace-nowrap">
                                        <p className="font-bold text-gray-700 dark:text-white hover:underline">{data.communication_relation_id}</p>
                                    </td>
                                    <td className="p-3 text-lg text-gray-700 dark:text-white whitespace-nowrap">
                                        {data.title}
                                    </td>

                                    <td className="p-3 w-2/4 text-lg text-gray-700 dark:text-white whitespace-nowrap">
                                        <div style={{ whiteSpace: 'normal' }}>
                                            {data.content}
                                        </div>
                                    </td>

                                    <td className="p-3 text-lg text-gray-700 dark:text-white whitespace-nowrap">
                                        {data.name}
                                    </td>

                                    <td className="p-3 text-lg text-gray-700 dark:text-white whitespace-nowrap">
                                        {moment(data.createDate).utc().format('YYYY-MM-DD')}
                                    </td>

                                    <td className="p-3 text-lg text-gray-700 dark:text-white whitespace-nowrap">
                                        <button
                                            onClick={() => {
                                                clickedForupdate()
                                                setupdateCommunicationid(data.communication_id)
                                                setupdatetitle(data.title)
                                                setupdatecontent(data.content)
                                                setupdatestudentId(data.students_id)
                                                setupdateCommunicationrelationshipid(data.communication_relation_id)
                                            }} 
                                            className="bg-[#009688] text-white font-bold py-2 px-4 border-b-4 border-[#009688] hover:scale-110 duration-1000 ease-in-out rounded">
                                            Edit
                                        </button>
                                    </td>

                                    <td className="p-3 text-lg text-gray-700 dark:text-white whitespace-nowrap">
                                        <button 
                                            onClick={() => {
                                                clickedFordelete()
                                                setdeleteCommunicationid(data.communication_id)
                                                setdeleteCommunicationrelationshipid(data.communication_relation_id)
                                            }}
                                            className="bg-red-500 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:scale-110 duration-1000 ease-in-out rounded"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:hidden">
                    {Allcommunications.map((data,index)=>(
                        <div key={index} className=" bg-neutral-200 dark:bg-slate-800 space-y-3 p-2 lg:p-4 rounded-lg shadow overflow-scroll">
                            <div>
                                <p className="text-blue-500 dark:text-white font-bold hover:underline">
                                    <span className="text-lg">Id : </span> 
                                    <span className="text-sm ">{data.communication_relation_id}</span>
                                </p>
                            </div>
                            <div className="text-gray-700 dark:text-white font-bold">
                                <span className="text-lg">Title : </span>
                                <span className="text-md">{data.title} </span>
                            </div>

                            <div className="text-gray-700 dark:text-white font-bold">
                                <span className="text-lg">Content : </span>
                                <span className="text-md">{data.content} </span>
                            </div>

                            <div className="text-gray-700 dark:text-white font-bold">
                                <span className="text-lg">Student : </span>
                                <span className="text-md">{data.name} </span>
                            </div>

                            <div className="text-black font-bold dark:text-white">
                              <span className="text-lg">createDate : </span>
                              <span className="text-sm">{moment(data.createDate).utc().format('YYYY-MM-DD')}</span>
                            </div>

                            <div className="flex items-center justify-between text-sm">
                                <button
                                    onClick={() => {
                                        clickedForupdate()
                                        setupdateCommunicationid(data.communication_id)
                                        setupdatetitle(data.title)
                                        setupdatecontent(data.content)
                                        setupdatestudentId(data.students_id)
                                        setupdateCommunicationrelationshipid(data.communication_relation_id)
                                    }}  
                                    className="bg-[#009688] text-white font-bold py-2 px-4 border-b-4 border-[#009688] hover:scale-110 duration-1000 ease-in-out rounded">
                                    Edit
                                </button>

                                <button
                                    onClick={() => {
                                        clickedFordelete()
                                        setdeleteCommunicationid(data.communication_id)
                                        setdeleteCommunicationrelationshipid(data.communication_relation_id)
                                    }} 
                                    className="bg-red-500 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:scale-110 duration-1000 ease-in-out rounded"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {deletemodalOn && 
                <DeleteAnnouncement 
                    setdeleteModalOn={setdeleteModalOn} 
                    deleteCommunicationid={deleteCommunicationid} 
                    deleteCommunicationrelationshipid={deleteCommunicationrelationshipid}
                />
            }

            {updatemodalOn && 
                <UpdateAnnouncement 
                    setupdateModalOn={setupdateModalOn}
                    updateCommunicationid={updateCommunicationid}
                    updatetitle={updatetitle}
                    updatecontent={updatecontent}
                    updatestudentId={updatestudentId} 
                    setupdateCommunicationid={setupdateCommunicationid}
                    setupdatetitle={setupdatetitle}
                    setupdatecontent={setupdatecontent}
                    setupdatestudentId={setupdatestudentId}
                    Allstudents={Allstudents}
                    updateCommunicationrelationshipid={updateCommunicationrelationshipid}
                />
            }
        </div>
    );
}
