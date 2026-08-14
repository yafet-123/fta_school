import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router'
import Link from 'next/link'
<<<<<<< HEAD
import { MainHeader } from '../components/common/MainHeader';
import React from "react";

export default function ResetPassword() {
  const router = useRouter();
  const { token } = router.query;

  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post("/api/ResetPassword", {
        password,
        token,
      });

      if (response.data.status === "Password Reset Success") {
        setSuccess(true);
      } else {
        setError(response.data.status || "Failed to reset password.");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  // ✅ Success View
  if (success) {
    return (
      <>
        <MainHeader title="Aceit : Password Reset" />
        <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 px-5">
          <div className="bg-white shadow-xl rounded-2xl p-10 max-w-md w-full text-center">
            <h1 className="text-2xl font-bold text-blue-700 mb-4">
              Password Reset Successful 🎉
            </h1>
            <p className="text-gray-700 mb-8">
              Your password has been successfully updated. You can now log in
              to your account.
            </p>

            <Link
              href="/auth/Admin/Login/signin-user"
              className="inline-block w-full py-3 text-lg text-white bg-blue-700 rounded-xl hover:bg-blue-800 transition duration-200"
            >
              Go to Login
            </Link>
          </div>
        </div>
      </>
    );
  }

  // 🧩 Reset Password Form
  return (
    <>
      <MainHeader title="Aceit : Reset Password" />
      <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-gray-100 to-blue-50 px-5">
        <div className="bg-white shadow-2xl rounded-2xl p-10 w-full max-w-md">
          <h1 className="text-3xl font-bold text-center text-blue-700 mb-8">
            Reset Your Password
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative w-full mb-8">
              <label className="block text-gray-700 font-medium mb-3">
                Password
              </label>

              <input
                id="password"
                type="password"
                required
                placeholder=" "
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="peer w-full px-4 py-3 border-2 border-gray-300 rounded-xl text-gray-900 text-lg bg-transparent focus:border-blue-600 focus:outline-none transition"
              />
            </div> 

            {error && (
              <p className="text-red-600 text-center text-sm font-medium">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 text-lg font-semibold rounded-xl text-white transition duration-200 ${
                loading
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-700 hover:bg-blue-800"
              }`}
            >
              {loading ? "Updating..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </>
=======
export default function ResetPassword() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [status, setStatus] = useState("")
  const { token } = router.query
  async function handleSubmit(e){
        e.preventDefault()
        const data = await axios.post(`../api/teacher/ResetPasswordapi`,{
            "password": password,
            "token": token,
        }).then(function (response) {
            setError(response.data.status);
            setSuccess(true);
        }).catch(function (error) {
            console.log(error)
            seterror("Reset Passwor Failed")        
        });
       
  }

  if (success) {
    return(
      <div className="flex flex-col justify-center items-center h-screen w-full bg-[#e6e6e6]" >
        <p className="mb-5 text-black text-xl font-bold">Your password has been successfully reset password.</p>
        <Link href="/auth/Teacher/Login/signin-teacher">
          <a className="w-32 text-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-xl p-4">
            Login
          </a>
        </Link>

      </div>
    )
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen w-full bg-[#e6e6e6]" >
      <h1 className="text-black text-xl lg:text-4xl font-bold text-center italic my-5">Reset Password</h1>
      <form className="flex flex-col rounded-xl w-full lg:w-[45rem] py-10" onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <div className="relative mx-5 mb-10">
            <input 
              id="password" 
              type="password" 
              required
              className="block w-full px-3 text-sm lg:text-xl text-black bg-transparent py-4 border-2 border-black rounded-xl appearance-none   focus:outline-none focus:ring-0 focus:border-blue-500 peer" placeholder=" "
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <label 
                htmlFor="floating_outlined" 
                className="absolute text-sm lg:text-xl text-black duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-[#e6e6e6] px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
            >
                New Password
            </label>
          </div>
          {error && <p>{error}</p>}
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
>>>>>>> 0306f37bdbd9c29dc14158fb38dab803e1b3073a
  );
}