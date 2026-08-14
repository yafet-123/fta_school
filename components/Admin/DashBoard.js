<<<<<<< HEAD
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { FiUsers, FiBookOpen, FiFileText, FiClipboard } from "react-icons/fi";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function DashBoard() {
  const [stats, setStats] = useState({
    users: 0,
    subjects: 0,
    notes: 0,
    exams: 0,
  });

  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    async function fetchStats() {
      const res = await axios.get("/api/dashboard");
      setStats(res.data.stats);

      // Convert chartData to Chart.js format
      setChartData({
        labels: res.data.chartData.map((item) => item.name),
        datasets: [
          {
            label: "Activity Count",
            data: res.data.chartData.map((item) => item.number),
            backgroundColor: "#009688",
            borderRadius: 6,
          },
        ],
      });
    }
    fetchStats();
  }, []);

  return (
    <div className="px-6 py-20 space-y-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard Overview</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Users" value={stats.users} icon={<FiUsers />} color="bg-blue-500" />
        <StatCard title="Subjects" value={stats.subjects} icon={<FiBookOpen />} color="bg-green-500" />
        <StatCard title="Notes" value={stats.notes} icon={<FiFileText />} color="bg-yellow-500" />
        <StatCard title="Exams" value={stats.exams} icon={<FiClipboard />} color="bg-red-500" />
      </div>

      {/* Chart */}
      <div className="bg-white p-6 rounded-2xl shadow">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Activity Overview</h2>
        <div className="h-96 w-full">  {/* adjust height — try h-64, h-80, h-96 */}
          <Bar
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: { position: "top" },
              },
            }}
          />
        </div>

      </div>
    </div>
  );
}

function StatCard({ title, value, icon, color }) {
  return (
    <div className={`p-6 rounded-2xl text-white shadow-lg flex items-center ${color}`}>
      <div className="text-3xl mr-4">{icon}</div>
      <div>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
=======
import React from "react";
import { useState,useEffect, useContext} from 'react'
import axios from 'axios';
import moment from 'moment';
import Image from 'next/image'
import { AiOutlineEye } from 'react-icons/ai'
import { DeleteUser } from './User/DeleteUser'
import { UpdateUser } from './User/UpdateUser'
import { DeleteStudent } from './Students/DeleteStudent'
import { UpdateStudent } from './Students/UpdateStudent'
import { DeleteTeacher } from './Teacher/DeleteTeacher'
import { UpdateTeacher } from './Teacher/UpdateTeacher'
import Loader from "../common/Loading";
import ReactModal from "react-modal";


export function DashBoard({categories}) { 
    const [LoadingmodalIsOpen, setLoadingModalIsOpen] = useState(false);
    const [getSearchValue,setgetSearchValue] = useState("")
    const [dataposttojob, setdataposttojob] = useState()
    const [searchValue,setsearchValue] = useState([])
    const [error , seterror] = useState("")
    const [type,settype] = useState()


    const [deletemodalOnforUser, setdeleteModalOnforUser] = useState(false);
    const [updatemodalOnforUser, setupdateModalOnforUser] = useState(false);
    const [deleteUserid,setdeleteUserid] = useState()
    const [updateUserid,setupdateUserid] = useState()

    const [deletemodalOnforStudent, setdeleteModalOnforStudent] = useState(false);
    const [updatemodalOnforStudent, setupdateModalOnforStudent] = useState(false);
    const [deleteStudentid,setdeleteStudentid] = useState()
    const [updateStudentid,setupdateStudentid] = useState()

    const [deletemodalOnforTeacher, setdeleteModalOnforTeacher] = useState(false);
    const [updatemodalOnforTeacher, setupdateModalOnforTeacher] = useState(false);
    const [deleteTeacherid,setdeleteTeacherid] = useState()
    const [updateTeacherid,setupdateTeacherid] = useState()

    const [updateemail, setupdateemail] = useState("")
    const [updateusername,setupdateusername] = useState("")

    const SearchList = [
        { type: 1, name: "User",},
        { type: 2, name: "Student",},
        { type: 3, name: "Teacher",},
    ];

    // const searchaxios = axios.create({
    //     baseURL : api,
    // })
     
    const clickedForview = () => {
        setviewModalOnforjob(true)
    }   

    async function handleSearch(e){
        settype(e)
        setLoadingModalIsOpen(true)
        setsearchValue([])
        if(getSearchValue == ""){
            seterror("Please Insert a Value")
            setLoadingModalIsOpen(false)
        }else{
            const data = await axios.post(`api/searchAdmin`,{
                "searchName": getSearchValue,
                "type": e
            }).then(function (response) {
                const objOneData = response.data
                if(Array.isArray(objOneData)){
                    setsearchValue(objOneData)
                }else{
                    const values = []
                    values.push(objOneData)
                    setsearchValue(values)
                }
                seterror("")
                setLoadingModalIsOpen(false)
            }).catch(function (error) {
                console.log(error);
                setLoadingModalIsOpen(false)
            });
        }
    }

    const clickedFordeleteforuser = () => {
        setdeleteModalOnforUser(true)
    }

    const clickedForupdateforuser = () => {
        setupdateModalOnforUser(true)
    }

    const clickedFordeleteForTeacher = () => {
        setdeleteModalOnforTeacher(true)
    }

    const clickedForupdateForTeacher = () => {
        setupdateModalOnforTeacher(true)
    }

    const clickedFordeleteforStudent = () => {
        setdeleteModalOnforTeacher(true)
    }

    const clickedForupdateforStudent = () => {
        setupdateModalOnforStudent(true)
    }

    return (
        <div className="mt-10 mx-1 lg:mx-3 lg:mx-10 h-full pt-20">
            <div className="max-w-7xl mx-auto ">
                <div className="flex flex-col lg:flex-row my-10 w-full">
                    <div className="relative flex-1">
                        <input 
                            id="search" 
                            type="text" 
                            className="block w-full px-2 lg:px-3 text-md lg:text-xl text-black bg-white py-4 border-2 border-black rounded-xl appearance-none focus:outline-none focus:ring-0 focus:border-blue-500 peer" placeholder=" "
                            value={getSearchValue}
                            onChange={(e) => setgetSearchValue(e.target.value)}
                        />
                        <label 
                            htmlFor="floating_outlined" 
                            className="absolute text-md lg:text-xl text-black duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-[#009688] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                        >
                            Search
                        </label>
                    </div>
                    <div className="lg:mx-2 mt-5 lg:mt-0 flex items-center justify-center">
                        <div className="dropdown inline-block relative">
                            <button 
                                disabled={LoadingmodalIsOpen} 
                                className="flex justify-between rounded-xl w-32 text-white bg-[#009688] focus:ring-4 focus:ring-[#009688] font-medium text-md lg:text-xl px-2 lg:px-4 py-4 text-center inline-flex items-center"
                            >
                                <span className="mr-1">Search</span>
                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/> </svg>
                            </button>
                            <ul className="dropdown-menu absolute hidden text-black pt-1">
                                {SearchList.map((search, index) => (
                                    <li className="" key={index}>
                                        <button onClick={()=> handleSearch(search.type)} className="text-left text-md lg:text-xl w-32 bg-white hover:bg-gray-400 py-2 px-2">
                                            By {search.name}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>  

                <ReactModal
                    isOpen={LoadingmodalIsOpen}
                    // onRequestClose={closeModal}
                    className="flex items-center justify-center w-full h-full"
                >
                    <Loader />
                </ReactModal>
            </div>

            { error == "" ? 
                <div>
                    { searchValue == "" ? 
                        <h1 className="text-black text-md lg:text-xl font-bold text-center italic">
                            No data can be found
                        </h1>
                        :
                        <div>
                            { type == 1 && 
                                <div className="my-5">
                                    <div className="overflow-auto rounded-lg shadow hidden md:block">
                                        <table className="w-full">
                                            <thead className="bg-neutral-100 border-b-2 border-gray-200">
                                                <tr>
                                                  <th className="text-black p-3 text-lg font-semibold tracking-wide text-left">User Id</th>
                                                  <th className="text-black p-3 text-lg font-semibold tracking-wide text-left">User Name</th>
                                                  <th className="text-black p-3 text-lg font-semibold tracking-wide text-left">Email</th>
                                                  <th className="text-black p-3 text-lg font-semibold tracking-wide text-left">Created Date</th>
                                                  <th className="text-black p-3 text-lg font-semibold tracking-wide text-left">Modified Date</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-100">
                                                {searchValue.map((data,index)=>(
                                                    <tr key={index} className="even:bg-neutral-100 odd:bg-neutral-300 w-full">
                                                        <td className="p-3 text-lg text-gray-700 whitespace-nowrap">
                                                            <p className="font-bold text-[#009688] hover:underline">{data.user_id}</p>
                                                        </td>
                                                        <td className="p-3 text-lg text-gray-700 whitespace-nowrap">
                                                            {data.UserName}
                                                        </td>
                                                        <td className="p-3 text-lg text-gray-700 whitespace-nowrap">
                                                            {data.email}
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
                                                                    clickedForupdateforuser()
                                                                    setupdateUserid(data.user_id)
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
                                                                    clickedFordeleteforuser()
                                                                    setdeleteUserid(data.user_id)
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
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
                                        {searchValue.map((data,index)=>(
                                            <div key={index} className="bg-neutral-100 space-y-3 p-2 lg:p-4 rounded-lg shadow overflow-scroll">
                                                <div>
                                                    <p className="text-[#009688] font-bold hover:underline">
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
                                                            clickedForupdateforuser()
                                                            setupdateUserid(data.user_id)
                                                            setupdateusername(data.UserName)
                                                            setupdateemail(data.email)
                                                        }}  
                                                        className="bg-[#009688] text-white font-bold py-2 px-4 border-b-4 border-[#009688] hover:scale-110 duration-1000 ease-in-out rounded">
                                                        Edit
                                                    </button>

                                                    <button
                                                        onClick={() => {
                                                            clickedFordeleteforuser()
                                                            setdeleteUserid(data.user_id)
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
                            }

                            { type == 2 && 
                                <div className="my-5">
                                    <div className="overflow-auto rounded-lg shadow hidden md:block">
                                        <table className="w-full">
                                            <thead className="bg-neutral-100 border-b-2 border-gray-200">
                                                <tr>
                                                  <th className="text-black p-3 text-lg font-semibold tracking-wide text-left">Student Id</th>
                                                  <th className="text-black p-3 text-lg font-semibold tracking-wide text-left">User Name</th>
                                                  <th className="text-black p-3 text-lg font-semibold tracking-wide text-left">Email</th>
                                                  <th className="text-black p-3 text-lg font-semibold tracking-wide text-left">Created Date</th>
                                                  <th className="text-black p-3 text-lg font-semibold tracking-wide text-left">Modified Date</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-100">
                                                {searchValue.map((data,index)=>(
                                                    <tr key={index} className="even:bg-neutral-100 odd:bg-neutral-300 w-full">
                                                        <td className="p-3 text-lg text-gray-700 whitespace-nowrap">
                                                            <p className="font-bold text-[#009688] hover:underline">{data.students_id}</p>
                                                        </td>
                                                        <td className="p-3 text-lg text-gray-700 whitespace-nowrap">
                                                            {data.UserName}
                                                        </td>
                                                        <td className="p-3 text-lg text-gray-700 whitespace-nowrap">
                                                            {data.email}
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
                                                                    clickedForupdateforuser()
                                                                    setupdateuserid(data.students_id)
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
                                                                    clickedFordeleteforuser()
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
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
                                        {searchValue.map((data,index)=>(
                                            <div key={index} className="bg-neutral-100 space-y-3 p-2 lg:p-4 rounded-lg shadow overflow-scroll">
                                                <div>
                                                    <p className="text-[#009688] font-bold hover:underline">
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
                                                            clickedForupdateforuser()
                                                            setupdateuserid(data.user_id)
                                                            setupdateusername(data.UserName)
                                                            setupdateemail(data.email)
                                                        }}  
                                                        className="bg-[#009688] text-white font-bold py-2 px-4 border-b-4 border-[#009688] hover:scale-110 duration-1000 ease-in-out rounded">
                                                        Edit
                                                    </button>

                                                    <button
                                                        onClick={() => {
                                                            clickedFordeleteforuser()
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
                            }

                            { type == 3 && 
                                <div className="my-5">
                                    <div className="overflow-auto rounded-lg shadow hidden md:block">
                                        <table className="w-full">
                                            <thead className="bg-neutral-100 border-b-2 border-gray-200">
                                                <tr>
                                                  <th className="text-black p-3 text-lg font-semibold tracking-wide text-left">Teacher Id</th>
                                                  <th className="text-black p-3 text-lg font-semibold tracking-wide text-left">User Name</th>
                                                  <th className="text-black p-3 text-lg font-semibold tracking-wide text-left">Email</th>
                                                  <th className="text-black p-3 text-lg font-semibold tracking-wide text-left">Created Date</th>
                                                  <th className="text-black p-3 text-lg font-semibold tracking-wide text-left">Modified Date</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-100">
                                                {searchValue.map((data,index)=>(
                                                    <tr key={index} className="even:bg-neutral-100 odd:bg-neutral-300 w-full">
                                                        <td className="p-3 text-lg text-gray-700 whitespace-nowrap">
                                                            <p className="font-bold text-[#009688] hover:underline">{data.teacher_id}</p>
                                                        </td>
                                                        <td className="p-3 text-lg text-gray-700 whitespace-nowrap">
                                                            {data.UserName}
                                                        </td>
                                                        <td className="p-3 text-lg text-gray-700 whitespace-nowrap">
                                                            {data.email}
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
                                                                    clickedForupdateForTeacher()
                                                                    setupdateTeacherid(data.teacher_id)
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
                                                                    clickedFordeleteForTeacher()
                                                                    setdeleteTeacherid(data.teacher_id)
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
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
                                        {searchValue.map((data,index)=>(
                                            <div key={index} className="bg-neutral-100 space-y-3 p-2 lg:p-4 rounded-lg shadow overflow-scroll">
                                                <div>
                                                    <p className="text-[#009688] font-bold hover:underline">
                                                        <span className="text-lg">Id : </span> 
                                                        <span className="text-sm ">{data.teacher_id}</span>
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
                                                  <span className="text-sm">{moment(data.Modteacher_idifiedDate).utc().format('YYYY-MM-DD')}</span>
                                                </div>
                                                <div className="flex items-center justify-between text-sm">
                                                    <button
                                                        onClick={() => {
                                                            clickedForupdateForTeacher()
                                                            setupdateTeacherid(data.teacher_id)
                                                            setupdateusername(data.UserName)
                                                            setupdateemail(data.email)
                                                        }}  
                                                        className="bg-[#009688] text-white font-bold py-2 px-4 border-b-4 border-[#009688] hover:scale-110 duration-1000 ease-in-out rounded">
                                                        Edit
                                                    </button>

                                                    <button
                                                        onClick={() => {
                                                            clickedFordeleteForTeacher()
                                                            setdeleteTeacherid(data.teacher_id)
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
                            }

                        </div>
                    }
                </div>
                :
                <h1 className="text-black text-md lg:text-xl font-bold text-center italic">{error}</h1>
            }

            {deletemodalOnforUser && 
                <DeleteUser setdeleteModalOn={setdeleteModalOnforUser} deleteuserid={deleteUserid}/>
            }

            {updatemodalOnforUser && 
                <UpdateUser setupdateModalOn={setupdateModalOnforUser} updateuserid={updateUserid} updateusername={updateusername} setupdateusername={setupdateusername} updateemail={updateemail} setupdateemail={setupdateemail} setupdateUsername={setupdateusername}/>
            }

            {deletemodalOnforStudent && 
                <DeleteStudent setdeleteModalOn={setdeleteModalOnforStudent} deleteStudentid={deleteStudentid} />
            }

            { updatemodalOnforStudent && 
                <DeleteStudent setdeleteModalOn={setupdateModalOnforStudent} updateStudentid={updateStudentid} updateusername={updateusername} setupdateusername={setupdateusername} updateemail={updateemail} setupdateemail={setupdateemail} setupdateUsername={setupdateusername} />
            }

            { deletemodalOnforTeacher && 
                <DeleteTeacher setdeleteModalOn={setdeleteModalOnforTeacher} deleteuserid={deleteTeacherid} />
            }

            { updatemodalOnforTeacher && 
                <UpdateTeacher setdeleteModalOn={setupdateModalOnforTeacher} updateuserid={updateTeacherid} updateusername={updateusername} setupdateusername={setupdateusername} updateemail={updateemail} setupdateemail={setupdateemail} setupdateUsername={setupdateusername} />
            }
        </div>
>>>>>>> 0306f37bdbd9c29dc14158fb38dab803e1b3073a
  );
}
