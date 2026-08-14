<<<<<<< HEAD
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import ReactModal from "react-modal";
import Loader from "../../common/Loading";
import { FiUserPlus } from "react-icons/fi";
import { FiEye, FiEyeOff } from "react-icons/fi";

export function AddUser() {
  const [loadingModalIsOpen, setLoadingModalIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { data } = useSession();
  const userData = data?.user;
  const user_id = data?.user.user_id
  console.log(user_id)
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [typePassword, setTypePassword] = useState("password");
  const [typePasswordConfirm, setTypePasswordConfirm] = useState("password");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function register(e) {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Password and Confirm Password must match.");
      return;
    }
 
    setLoading(true);
    setLoadingModalIsOpen(true);

    try {
      await axios.post(`/api/user/registerUser`, {
        UserName: userName,
        Password: password,
        email,
        role: "admin",
        user_id: user_id,
      }); 

      setSuccess("User created successfully!");
      setUserName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setLoading(false);
      setLoadingModalIsOpen(false);
      router.reload();
    } catch (err) {
      console.error(err);
      setError(
        "Creating user failed — username may already exist or network error."
      );
      setLoading(false);
      setLoadingModalIsOpen(false);
    }
  }

  return (
    <div className="flex flex-col items-center min-h-screen pt-24 px-2 lg:px-6 w-full">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-10 flex items-center justify-center gap-2">
          <FiUserPlus className="text-[#009688]" />
          Add New User
        </h1>

        <form onSubmit={register} className="space-y-6">
          {/* Username */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Username
            </label>
            <input
              type="text"
              required
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#009688] focus:border-transparent"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#009688] focus:border-transparent"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <label className="block text-gray-700 font-medium mb-2">
              Password
            </label>
            <input
              type={typePassword}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#009688] focus:border-transparent"
            />
            <span
              className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-600 hover:text-gray-900 transition"
              onClick={() =>
                setTypePassword(typePassword === "password" ? "text" : "password")
              }
            >
              {typePassword === "password" ? <FiEye size={24} /> : <FiEyeOff size={24} />}
            </span>
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <label className="block text-gray-700 font-medium mb-2">
              Confirm Password
            </label>
            <input
              type={typePasswordConfirm}
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#009688] focus:border-transparent"
            />
            <span
              className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-600 hover:text-gray-900 transition"
              onClick={() =>
                setTypePasswordConfirm(
                  typePasswordConfirm === "password" ? "text" : "password"
                )
              }
            >
              {typePasswordConfirm === "password" ? <FiEye size={24} /> : <FiEyeOff size={24} />}
            </span>
          </div>

          {/* Error / Success Messages */}
          {error && <div className="text-red-600 font-semibold text-center">{error}</div>}
          {success && (
            <div className="text-green-600 font-semibold text-center">{success}</div>
          )}

          {/* Submit Button */}
          <div className="flex justify-center mt-8">
            <button
              type="submit"
              disabled={loading}
              className={`px-8 py-3 text-lg font-semibold rounded-xl transition duration-300 flex items-center justify-center gap-2 ${
                loading
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-[#009688] hover:bg-[#00796b] text-white shadow-md"
              }`}
            >
              {loading ? "Submitting..." : "Submit User"}
            </button>
          </div>
        </form>
      </div>

      <ReactModal
        isOpen={loadingModalIsOpen}
        className="flex items-center justify-center w-full h-full"
      >
        <Loader />
      </ReactModal>
    </div>
  );
=======
import React from "react";
import { useState,useEffect, useContext} from 'react'
import axios from 'axios';
import moment from 'moment';
import { useRouter } from 'next/router'
import {FiEye, FiEyeOff} from 'react-icons/fi'
import Loader from "../../common/Loading";
import ReactModal from "react-modal";
import { useSession } from "next-auth/react";

export function AddUser() {

    const { status, data } = useSession();
    const [typepassword, setTypepassword] = useState('password');
    const [typepasswordconfirm, setTypepasswordconfirm] = useState('password');
    const router = useRouter();
    const [LoadingmodalIsOpen, setLoadingModalIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [UserName, setUserName] =useState("")
    const [email, setemail] = useState("")
    const [password,setpassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [passworderror,setpassworderror] = useState("")
    const [error,seterror] = useState("")
    const UserData = data?.user;

    async function register(e){
        e.preventDefault();
        if(confirmPassword === password){
            setpassworderror("")
            seterror("")
            setLoadingModalIsOpen(true)
            const data = await axios.post(`../api/user/registerUser`,{
                'UserName':UserName,
                'Password':password,
                'email':email,
                'role':'admin',
                "user_id": UserData.user_id,

            }).then(function (response) {
                console.log(response.data);
                router.reload()
            }).catch(function (error) {
                seterror("Creating user failed due to username is still exist or network error")
                setLoadingModalIsOpen(false)
            });
        }else{
            seterror("")
            setpassworderror("Password and confirm password should be same.")
            setLoadingModalIsOpen(false)
        }
                
    }

    return (
        <div className="px-0 lg:px-10 pt-20">
            <form className="max-w-7xl mx-auto mt-10" onSubmit={register} >
                <h1 className="text-black text-xl lg:text-4xl font-bold text-center italic">Add User</h1>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 my-10 mx-2">
                    <div className="relative">
                        <input 
                            id="username" 
                            type="text" 
                            value={UserName}
                            required
                            className="block w-full px-3 text-sm lg:text-xl text-black bg-white py-4 border-2 border-black rounded-xl appearance-none   focus:outline-none focus:ring-0 focus:border-blue-500 peer" placeholder=" "
                            onChange={(e) => setUserName(e.target.value)}
                        />
                        <label 
                            htmlFor="floating_outlined" 
                            className="absolute text-sm lg:text-xl text-black duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                        >
                            UserName
                        </label>
                    </div>

                    <div className="relative">
                        <input 
                            id="email" 
                            type="email" 
                            required
                            className="block w-full px-3 text-sm lg:text-xl text-black bg-white py-4 border-2 border-black rounded-xl appearance-none   focus:outline-none focus:ring-0 focus:border-blue-500 peer" placeholder=" "
                            value={email}
                            onChange={(e) => setemail(e.target.value)}
                        />

                        <label 
                            htmlFor="floating_outlined" 
                            className="absolute text-sm lg:text-xl text-black duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                        >
                            Email
                        </label>
                    </div>

                    <div className="relative">
                        <input 
                            id="password" 
                            required
                            type={typepassword}
                            className="block w-full px-3 text-sm lg:text-xl text-black bg-white py-4 border-2 border-black rounded-xl appearance-none   focus:outline-none focus:ring-0 focus:border-blue-500 peer" placeholder=" "
                            value={password}
                            onChange={(e) => setpassword(e.target.value)}
                        />
                        <div className="absolute right-10 text-sm lg:text-xl text-black duration-300 transform -translate-y-4 scale-75 top-1/2">
                            {typepassword==="password"?(
                                <span className='icon-span' onClick={()=>setTypepassword("text")}>
                                  <FiEye size={30} />
                                </span>
                            ):(
                                <span className='icon-span' onClick={()=>setTypepassword("password")}>
                                  <FiEyeOff size={30} />
                                </span>
                            )}
                        </div>
                        <label 
                            htmlFor="floating_outlined" 
                            className="absolute text-sm lg:text-xl text-black duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                        >
                            Password
                        </label>
                    </div>

                    <div className="relative">
                        <input 
                            id="ConfirmPassword" 
                            required
                            type={typepasswordconfirm}
                            className="block w-full px-3 text-sm lg:text-xl text-black bg-white py-4 border-2 border-black rounded-xl appearance-none   focus:outline-none focus:ring-0 focus:border-blue-500 peer" placeholder=" "
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <div className="absolute right-10 text-sm lg:text-xl text-black duration-300 transform -translate-y-4 scale-75 top-1/2">
                            {typepasswordconfirm==="password"?(
                                <span className='icon-span' onClick={()=>setTypepasswordconfirm("text")}>
                                  <FiEye size={30} />
                                </span>
                            ):(
                                <span className='icon-span' onClick={()=>setTypepasswordconfirm("password")}>
                                  <FiEyeOff size={30} />
                                </span>
                            )}
                        </div>
                        <label 
                            htmlFor="floating_outlined" 
                            className="absolute text-sm lg:text-xl text-black duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                        >
                            Confirm Password
                        </label>
                    </div>
                </div>

                <div className="mx-2 my-5 lg:my-0 flex flex-col lg:flex-row justify-between">
                    <h1 className="text-red-600  text-md lg:text-2xl font-bold text-left mb-5 lg:mb-0">
                        {passworderror || error}
                    </h1>
                    <button 
                        disabled={loading}
                        className={`float-right text-white font-medium rounded-lg text-xl p-4 text-center inline-flex items-center 
                            ${loading ? "bg-gray-200" : "bg-[#009688] hover:bg-[#009688] focus:ring-4 focus:ring-[#009688]" }`}
                    >
                        Submit
                    </button>
                </div>

                <ReactModal
                    isOpen={LoadingmodalIsOpen}
                    // onRequestClose={closeModal}
                    className="flex items-center justify-center w-full h-full"
                >
                    <Loader />
                </ReactModal>
            </form>
        </div>
    );
>>>>>>> 0306f37bdbd9c29dc14158fb38dab803e1b3073a
}
