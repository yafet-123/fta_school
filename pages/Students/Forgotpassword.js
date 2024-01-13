import { MainHeader } from '../components/common/MainHeader';
import React from "react";
import axios from 'axios';
import { useState,useEffect, useContext} from 'react'
export default function ForgotPassword() {
  const [email, setemail] = useState("")
  const [status, setStatus] = useState("")
  async function forgotPasswordregister(e){
    e.preventDefault()
    const data = await axios.post(`api/forgotPassword`,{
        "email": email,
    }).then(function (response) {
      setStatus(response.data.status)
    }).catch(function (error) {
        console.log("Password Changing Failed")
    });
  }

  return (
    <React.Fragment>
      <MainHeader title="Hulu Media : Forgot Password" />
      <div className="flex flex-col justify-center items-center h-screen w-full bg-[#e6e6e6] dark:bg-[#02201D]"> 
        <p className="mb-5 text-black text-xl font-bold">{status}</p> 
    
        <form className="flex flex-col bg-neutral-100 dark:bg-slate-700 border border-slate-300 rounded-xl w-full lg:w-[45rem] h-full lg:h-[35rem]" onSubmit={forgotPasswordregister}>
          <h1 className="text-black dark:text-white text-xl lg:text-4xl font-bold text-center italic my-20">Reset Password</h1>
          <div className="flex flex-col">
            <div className="relative my-10 mx-5">
              <input 
                  id="email" 
                  type="email" 
                  required
                  className="block w-full px-3 text-sm lg:text-xl text-black dark:text-white bg-transparent py-4 border-2 border-black rounded-xl appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-500 peer" placeholder=" "
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
              />
              <label 
                  htmlFor="floating_outlined" 
                  className="absolute text-sm lg:text-xl text-black dark:text-white duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-neutral-100 dark:bg-slate-700 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
              >
                  Email
              </label>
            </div>

            <div className="flex justify-end mx-5">
              <button 
                  className="w-32 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-xl p-4"
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