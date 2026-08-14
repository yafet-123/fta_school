<<<<<<< HEAD
import React, { useState } from "react";
import axios from "axios";
import { UpdateUser } from "./UpdateUser";
import { DeleteUser } from "./DeleteUser";

export function DisplayUser({ users }) {
  const [updateModalOn, setUpdateModalOn] = useState(false);
  const [updateuserid, setUpdateUserid] = useState("");
  const [updateemail, setUpdateEmail] = useState("");
  const [updateusername, setUpdateUsername] = useState("");
  const [deleteModalOn, setDeleteModalOn] = useState(false);
  const [deleteUserid, setDeleteUserid] = useState("");

  const handleUpdateClick = (user) => {
    setUpdateUserid(user.user_id);
    setUpdateEmail(user.email);
    setUpdateUsername(user.UserName);
    setUpdateModalOn(true);
  };

  return (
    <div className="w-full mt-10 px-4 pb-10">
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-700">
        User Management
      </h1>

      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full border border-gray-300 rounded-lg bg-white">
          <thead className="bg-[#009688] text-white">
            <tr>
              <th className="py-3 px-4 text-left">#</th>
              <th className="py-3 px-4 text-left">Username</th>
              <th className="py-3 px-4 text-left">Email</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users && users.length > 0 ? (
              users.map((user) => (
                <tr
                  key={user.user_id}
                  className="border-t border-gray-200 hover:bg-gray-100"
                >
                  <td className="py-3 px-4">{user.user_id}</td>
                  <td className="py-3 px-4">{user.UserName}</td>
                  <td className="py-3 px-4">{user.email}</td>
                  <td className="py-3 px-4 flex justify-center gap-3">
                    <button
                      onClick={() => handleUpdateClick(user)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => {
                        setDeleteUserid(user.user_id);
                        setDeleteModalOn(true);
                      }}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={4}
                  className="py-4 text-center text-gray-500 italic"
                >
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {users && users.length > 0 ? (
          users.map((user) => (
            <div
              key={user.user_id}
              className="border border-gray-300 rounded-xl bg-white shadow-sm p-4"
            >
              <p className="text-gray-800 font-semibold">
                ID: <span className="font-normal">{user.user_id}</span>
              </p>
              <p className="text-gray-800 font-semibold">
                Username: <span className="font-normal">{user.UserName}</span>
              </p>
              <p className="text-gray-800 font-semibold">
                Email: <span className="font-normal">{user.email}</span>
              </p>

              <div className="flex justify-end gap-2 mt-4">
                <button
                  onClick={() => handleUpdateClick(user)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded-lg text-sm"
                >
                  Update
                </button>
                <button
                  onClick={() => {
                    setDeleteUserid(user.user_id);
                    setDeleteModalOn(true);
                  }}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-lg text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 italic">No users found.</p>
        )}
      </div>

      {updateModalOn && (
        <UpdateUser
          setupdateModalOn={setUpdateModalOn}
          updateuserid={updateuserid}
          updateemail={updateemail}
          updateusername={updateusername}
          setupdateemail={setUpdateEmail}
          setupdateusername={setUpdateUsername}
        />
      )}

      {deleteModalOn && (
        <DeleteUser
          deleteuserid={deleteUserid}
          setDeleteModalOn={setDeleteModalOn}
        />
      )}
    </div>
  );
=======
import React from "react";
import { useState,useEffect, useContext} from 'react'
import moment from 'moment';
import { useRouter } from 'next/router'
import {DeleteUser} from './DeleteUser.js'
import {UpdateUser} from './UpdateUser.js'

export function DisplayUser({users}) {
    const router = useRouter();
    const [deletemodalOn, setdeleteModalOn] = useState(false);
    const [updatemodalOn, setupdateModalOn] = useState(false);
    const [deleteuserid,setdeleteuserid] = useState()
    const [updateuserid,setupdateuserid] = useState()
    const [updateemail, setupdateemail] = useState("")
    const [updateusername,setupdateusername] = useState("")
    const [LoadingmodalIsOpen, setLoadingModalIsOpen] = useState(false);

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
                        <thead className="bg-neutral-100 border-b-2 border-gray-200">
                            <tr>
                              <th className="text-black p-3 text-lg font-semibold tracking-wide text-left">Id</th>
                              <th className="text-black p-3 text-lg font-semibold tracking-wide text-left">User Name</th>
                              <th className="text-black p-3 text-lg font-semibold tracking-wide text-left">Email</th>
                              <th className="text-black p-3 text-lg font-semibold tracking-wide text-left">Created Date</th>
                              <th className="text-black p-3 text-lg font-semibold tracking-wide text-left">Modified Date</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {users.map((data,index)=>(
                                <tr key={index} className="even:bg-neutral-300 odd:bg-neutral-200  w-full">
                                    <td className="p-3 text-lg text-gray-700 whitespace-nowrap">
                                        <p className="font-bold text-[#009688] hover:underline">{data.user_id}</p>
                                    </td>
                                    <td className="p-3 text-lg text-gray-700 whitespace-nowrap">
                                        {data.UserName}
                                    </td>

                                    <td className="p-3 text-lg text-gray-700 whitespace-nowrap">
                                        <h1 className="text-black flex justify-between my-5 font-bold text-lg md:text-xl">
                                            <span className={ `font-normal font-medium ${data.email ? " " : "text-red-800"}`}>
                                                { data.email ? data.email : "No Email Address" }
                                            </span>
                                        </h1>
                                    </td>

                                    <td className="p-3 text-lg text-gray-700 whitespace-nowrap">
                                        {moment(data.createDate).utc().format('YYYY-MM-DD')}
                                    </td>
                                    <td className="p-3 text-lg text-gray-700 whitespace-nowrap">
                                        {moment(data.ModifiedDate).utc().format('YYYY-MM-DD')}
                                    </td>

                                    <td className="p-3 text-lg text-gray-700 whitespace-nowrap">
                                        <button
                                            onClick={() => {
                                                clickedForupdate()
                                                setupdateuserid(data.user_id)
                                                setupdateusername(data.UserName)
                                                setupdateemail(data.email)
                                            }} 
                                            className="bg-[#009688] text-white font-bold py-2 px-4 border-b-4 border-[#009688] hover:scale-110 duration-1000 ease-in-out rounded">
                                            Edit
                                        </button>
                                    </td>

                                    <td className="p-3 text-lg text-gray-700 whitespace-nowrap">
                                        <button 
                                            onClick={() => {
                                                clickedFordelete()
                                                setdeleteuserid(data.user_id)
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
                    {users.map((data,index)=>(
                        <div key={index} className=" bg-neutral-200 space-y-3 p-2 lg:p-4 rounded-lg shadow overflow-scroll">
                            <div>
                                <p className="text-blue-500 font-bold hover:underline">
                                    <span className="text-lg">Id : </span> 
                                    <span className="text-sm ">{data.user_id}</span>
                                </p>
                            </div>
                            <div className="text-gray-700 font-bold">
                                <span className="text-lg">User Name : </span>
                                <span className="text-md">{data.UserName} </span>
                            </div>

                            <div className="text-md lg:text-lg text-gray-700 font-bold break-words ">
                                Email : <span className={ `font-normal font-medium ${data.email ? " " : "text-red-800"}`}>
                                    { data.email ? data.email : "No Email Address" }
                                </span>
                            </div>

                            <div className="text-black font-bold">
                              <span className="text-lg">createDate : </span>
                              <span className="text-sm">{moment(data.createDate).utc().format('YYYY-MM-DD')}</span>
                            </div>
                            <div className="text-black font-bold">
                              <span className="text-lg">Modified Date : </span>
                              <span className="text-sm">{moment(data.ModifiedDate).utc().format('YYYY-MM-DD')}</span>
                            </div>

                            <div className="flex items-center justify-between text-sm">
                                <button
                                    onClick={() => {
                                        clickedForupdate()
                                        setupdateuserid(data.user_id)
                                        setupdateusername(data.UserName)
                                        setupdateemail(data.email)
                                    }}  
                                    className="bg-[#009688] text-white font-bold py-2 px-4 border-b-4 border-[#009688] hover:scale-110 duration-1000 ease-in-out rounded">
                                    Edit
                                </button>

                                <button
                                    onClick={() => {
                                        clickedFordelete()
                                        setdeleteuserid(data.user_id)
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
                <DeleteUser setdeleteModalOn={setdeleteModalOn} deleteuserid={deleteuserid}/>
            }

            {updatemodalOn && 
                <UpdateUser setupdateModalOn={setupdateModalOn} updateuserid={updateuserid} updateemail={updateemail} updateusername={updateusername} setupdateemail={setupdateemail} setupdateusername={setupdateusername} />
            }
        </div>
    );
>>>>>>> 0306f37bdbd9c29dc14158fb38dab803e1b3073a
}
