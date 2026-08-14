import { MainHeader } from '../components/common/MainHeader';
<<<<<<< HEAD
import React, { useState } from "react";
import axios from 'axios';
import { HiOutlineLockClosed } from 'react-icons/hi';
import Link from "next/link"
export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  async function forgotPasswordRegister(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`/api/forgotPassword`, { email });
      setStatus(response.data.status);
    } catch (error) {
      console.log("Password Changing Failed", error);
      setStatus("Failed to send reset email. Try again!");
    }
    setLoading(false);
=======
import React from "react";
import axios from 'axios';
import { useState,useEffect, useContext} from 'react'
export default function ForgotPassword() {
  const [email, setemail] = useState("")
  const [status, setStatus] = useState("")
  const [loading, setloading] = useState(false)

  async function forgotPasswordregister(e){
    e.preventDefault()
    setloading(true)
    const data = await axios.post(`../api/teacher/forgotPassword`,{
        "email": email,
    }).then(function (response) {
      setStatus(response.data.status)
      console.log(response)
      setloading(false)
    }).catch(function (error) {
        console.log("Password Changing Failed")
        setloading(false)
        console.log(error)
    });
    setloading(false) 
>>>>>>> 0306f37bdbd9c29dc14158fb38dab803e1b3073a
  }

  return (
    <React.Fragment>
<<<<<<< HEAD
      <MainHeader title="Aceit : Forgot Password" />
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-tr from-blue-50 via-indigo-50 to-purple-50 px-4 pt-10">
        <div className="flex flex-col items-center w-full max-w-md lg:max-w-lg pt-10">
          
          {/* Hero Icon */}
          <div className="bg-blue-100 p-3 rounded-full mb-6 animate-bounce">
            <HiOutlineLockClosed className="text-blue-700 w-12 h-12" />
          </div>

          <div className="bg-white w-full rounded-3xl shadow-2xl p-5 flex flex-col">
            <h1 className="text-3xl lg:text-4xl font-bold text-center text-gray-800 mb-6 italic">
              Reset Password
            </h1>

            {status && (
              <p className="text-center text-red-500 font-semibold mb-6 animate-pulse">
                {status}
              </p>
            )}


            <div className="relative w-full mb-8">
              <label className="block text-gray-700 font-medium mb-3">
                Email
              </label>
              <input 
                id="email" 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="peer block w-full px-4 py-5 text-gray-800 bg-gray-50 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring focus:ring-blue-200 text-lg"
                placeholder="Enter Your Email"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              onClick={forgotPasswordRegister}
              className={`w-full py-4 text-white font-bold text-lg rounded-xl 
                ${loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800'}
                transition-all duration-300 shadow-lg`}
            >
              {loading ? 'Submitting...' : 'Submit'}
            </button>

            <p className="text-center text-gray-500 text-sm mt-6">
              Remembered your password? <Link href="/auth/Admin/Login/signin-user">
              <a className="text-blue-600 hover:underline">Login</a>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
=======
      <MainHeader title="Matrick Mate : Forgot Password" />
      <div className="flex flex-col justify-center items-center h-screen w-full bg-[#e6e6e6]"> 
        
        <form className="flex flex-col bg-neutral-100  border border-slate-300 rounded-xl w-full lg:w-[45rem] h-full lg:h-[35rem]" onSubmit={forgotPasswordregister}>
          <h1 className="text-black text-xl lg:text-4xl font-bold text-center italic mt-20 mb-5">Reset Password</h1>
           <p className="text-red-500 text-xl font-bold text-center">{status}</p> 
          <div className="flex flex-col">
            <div className="relative my-10 mx-5">
              <input 
                  id="email" 
                  type="email" 
                  required
                  className="block w-full px-3 text-sm lg:text-xl text-black bg-transparent py-4 border-2 border-black rounded-xl appearance-none   focus:outline-none focus:ring-0 focus:border-blue-500 peer" placeholder=" "
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
              />
              <label 
                  htmlFor="floating_outlined" 
                  className="absolute text-sm lg:text-xl text-black duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-neutral-100  px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
              >
                  Email
              </label>
            </div>

            <div className="flex justify-end mx-5">
              <button 
                  disabled={loading}
                  className={` ${ loading ? "bg-opacity-10" : "" } w-32 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-xl p-4`}
              >
                  Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
}
>>>>>>> 0306f37bdbd9c29dc14158fb38dab803e1b3073a
