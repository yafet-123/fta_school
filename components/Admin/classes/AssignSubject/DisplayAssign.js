import React from "react";
import { useState,useEffect, useContext} from 'react'
import moment from 'moment';
import { useRouter } from 'next/router'
import {DeleteAssign} from './DeleteAssign.js'
import {UpdateAssign} from './updateAssign.js'


export function DisplayAssign({allasign,subjectes,classes}) {
    const router = useRouter();
    
    const [deletemodalOn, setdeleteModalOn] = useState(false);
    const [updatemodalOn, setupdateModalOn] = useState(false);

    const [deleteassignid,setdeleteassignid] = useState()

    const [updateassignid,setupdateassignid] = useState("")
    const [updateclassId,setupdateclassId] = useState("")
    const [updatesubjectid,setupdatesubjectid] = useState("")

    const clickedFordelete = () => {
        setdeleteModalOn(true)
    }

    const clickedForupdate = () => {

        setupdateModalOn(true)
        console.log(updatemodalOn)
    }

    return (
        <div className="px-0 lg:px-10">
            <div className="p-2 lg:p-5">
                <div className="overflow-auto rounded-lg shadow hidden md:block">
                    <table className="w-full">
                        <thead className="bg-neutral-100 dark:bg-slate-800 border-b-2 border-gray-200">
                            <tr>
                              <th className="text-black dark:text-white p-3 text-lg font-semibold tracking-wide text-left">Id</th>
                              <th className="text-black dark:text-white p-3 text-lg font-semibold tracking-wide text-left">Class Name</th>
                              <th className="text-black dark:text-white p-3 text-lg font-semibold tracking-wide text-left">Subject Name</th>
                              <th className="text-black dark:text-white p-3 text-lg font-semibold tracking-wide text-left">Created Date</th>
                              <th className="text-black dark:text-white p-3 text-lg font-semibold tracking-wide text-left">Modified Date</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {allasign.map((data,index)=>(
                                <tr key={index} className="even:bg-neutral-300 odd:bg-neutral-200 even:dark:bg-gray-900 odd:dark:bg-gray-800 w-full">
                                    <td className="p-3 text-lg text-gray-700 whitespace-nowrap">
                                        <p className="font-bold text-gray-700 dark:text-white hover:underline">{data.class_subject_id}</p>
                                    </td>

                                    <td className="p-3 text-lg text-gray-700 dark:text-white whitespace-nowrap">
                                        {data.ClassName}
                                    </td>

                                    <td className="p-3 text-lg text-gray-700 dark:text-white whitespace-nowrap">
                                        {data.SubjectName}
                                    </td>

                                    <td className="p-3 text-lg text-gray-700 dark:text-white whitespace-nowrap">
                                        {moment(data.createDate).utc().format('YYYY-MM-DD')}
                                    </td>
                                    <td className="p-3 text-lg text-gray-700 dark:text-white whitespace-nowrap">
                                        {moment(data.ModifiedDate).utc().format('YYYY-MM-DD')}
                                    </td>

                                    <td className="p-3 text-lg text-gray-700 dark:text-white whitespace-nowrap">
                                        <button
                                            onClick={() => {
                                                clickedForupdate()
                                                setupdateassignid(data.class_subject_id)
                                                setupdateclassId(data.class_id)
                                                setupdatesubjectid(data.subject_id)
                                            }} 
                                            className="bg-[#009688] text-white font-bold py-2 px-4 border-b-4 border-[#009688] hover:scale-110 duration-1000 ease-in-out rounded">
                                            Edit
                                        </button>
                                    </td>

                                    <td className="p-3 text-lg text-gray-700 dark:text-white whitespace-nowrap">
                                        <button 
                                            onClick={() => {
                                                clickedFordelete()
                                                setdeleteassignid(data.class_subject_id)
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
                    {allasign.map((data,index)=>(
                        <div key={index} className=" bg-neutral-200 dark:bg-slate-800 space-y-3 p-2 lg:p-4 rounded-lg shadow overflow-scroll">
                            <div>
                                <p className="text-blue-500 dark:text-white font-bold hover:underline">
                                    <span className="text-lg">Id : </span> 
                                    <span className="text-sm ">{data.class_subject_id}</span>
                                </p>
                            </div>

                            <div className="text-gray-700 dark:text-white font-bold">
                                <span className="text-lg">Class Name : </span>
                                <span className="text-md">{data.ClassName} </span>
                            </div>

                            <div className="text-gray-700 dark:text-white font-bold">
                                <span className="text-lg">Subject Name : </span>
                                <span className="text-md">{data.SubjectName} </span>
                            </div>

                            <div className="text-black font-bold dark:text-white">
                              <span className="text-lg">createDate : </span>
                              <span className="text-sm">{moment(data.createDate).utc().format('YYYY-MM-DD')}</span>
                            </div>
                            <div className="text-black font-bold dark:text-white">
                              <span className="text-lg">Modified Date : </span>
                              <span className="text-sm">{moment(data.ModifiedDate).utc().format('YYYY-MM-DD')}</span>
                            </div>

                            <div className="flex items-center justify-between text-sm">
                                <button
                                    onClick={() => {
                                        clickedForupdate()
                                        setupdateassignid(data.class_subject_id)
                                        setupdateclassId(data.class_id)
                                        setupdatesubjectid(data.subject_id)
                                    }}  
                                    className="bg-[#009688] text-white font-bold py-2 px-4 border-b-4 border-[#009688] hover:scale-110 duration-1000 ease-in-out rounded">
                                    Edit
                                </button>

                                <button
                                    onClick={() => {
                                        clickedFordelete()
                                        setdeleteassignid(data.class_subject_id)
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
                <DeleteAssign 
                    setdeleteModalOn={setdeleteModalOn} 
                    deleteassignid={deleteassignid}
                />
            }

            {updatemodalOn && 
                <UpdateAssign 
                    setupdateModalOn={setupdateModalOn} 
                    updateassignid={updateassignid} 
                    updateclassId={updateclassId} 
                    updatesubjectid={updatesubjectid} 
                    setupdateassignid={setupdateassignid}
                    setupdateclassId={setupdateclassId}
                    setupdatesubjectid={setupdatesubjectid}
                    subjectes={subjectes}
                    classes={classes}
                />
            }
        </div>
    );
}
