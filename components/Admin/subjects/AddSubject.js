<<<<<<< HEAD
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import ReactModal from "react-modal";
import Loader from "../../common/Loading";
import { FiPlusCircle } from "react-icons/fi";

export function AddSubject() {
  const [loadingModalIsOpen, setLoadingModalIsOpen] = useState(false);
  const router = useRouter();
  const { data } = useSession();
  const [loading, setLoading] = useState(false);
  const [subjectName, setSubjectName] = useState("");
  const [description, setDescription] = useState("");
  const [svg, setSvg] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const userData = data?.user;
  const user_id = data?.user.user_id
  

  console.log(userData)
  async function register(e) {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    setLoadingModalIsOpen(true);

    try {
      await axios.post(`../../api/subject/Add`, {
        SubjectName: subjectName,
        description,
        svg,
        // user_id: userData.user_id,
        user_id: user_id
      });
      setSuccess("Subject created successfully!");
      setSubjectName("");
      setDescription("");
      setSvg("");
      setLoading(false);
      setLoadingModalIsOpen(false);
      router.reload();
    } catch (error) {
      console.error(error);
      setError(
        "Creating subject failed — please check if the subject name already exists or try again later."
      );
      setLoading(false);
      setLoadingModalIsOpen(false);
    }
  }

  return (
    <div className="flex flex-col items-center min-h-screen py-24 px-6">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-10 flex items-center justify-center gap-2">
          <FiPlusCircle className="text-[#009688]" />
          Add New Subject
        </h1>

        <form onSubmit={register} className="space-y-6">
          {/* Subject Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Subject Name
            </label>
            <input
              type="text"
              required
              placeholder="Enter subject name"
              value={subjectName}
              onChange={(e) => setSubjectName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#009688] focus:border-transparent"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Description
            </label>
            <textarea
              rows={4}
              placeholder="Write a short description about the subject..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#009688] focus:border-transparent"
            />
          </div>

          {/* SVG Path */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              SVG File Path (optional)
            </label>
            <input
              type="text"
              placeholder="/categories/image--mathematics.svg"
              value={svg}
              onChange={(e) => setSvg(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#009688] focus:border-transparent"
            />
          </div>

          {/* Error / Success Messages */}
          {error && (
            <div className="text-red-600 font-semibold text-center">
              {error}
            </div>
          )}
          {success && (
            <div className="text-green-600 font-semibold text-center">
              {success}
            </div>
          )}

          {/* Submit Button */}
          <div className="flex justify-center mt-8">
            <button
              type="submit"
              disabled={loading}
              className={`px-8 py-3 text-lg font-semibold rounded-xl transition duration-300 flex items-center justify-center gap-2 
                ${
                  loading
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-[#009688] hover:bg-[#00796b] text-white shadow-md"
                }`}
            >
              {loading ? "Submitting..." : "Submit Subject"}
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

export function AddSubject() {
    const [LoadingmodalIsOpen, setLoadingModalIsOpen] = useState(false);
    const router = useRouter();
    const { status, data } = useSession();
    const [loading, setLoading] = useState(false);
    const [SubjectName, setSubjectName] =useState("")
    const [error,seterror] = useState("")
    const UserData = data?.user;
    async function register(e){
        e.preventDefault();
        seterror("")
        setLoadingModalIsOpen(true);
        const data = await axios.post(`../../api/subject/Add`,{
            'SubjectName':SubjectName,
            "user_id": UserData.user_id,
        }).then(function (response) {
            console.log(response.data);
            router.reload()
            setLoadingModalIsOpen(false);
        }).catch(function (error) {
            console.log(error)
            seterror("Creating subject failed due to username is still exist or network error")
            setLoadingModalIsOpen(false);
        });
    }
                

    return (
        <div className="px-0 lg:px-10 pt-20">
            <form className="max-w-7xl mx-auto mt-20" onSubmit={register} >
                <h1 className="text-black text-xl lg:text-4xl font-bold text-center italic my-5">Subject</h1>

                <div className="relative flex-1 my-5">
                    <input 
                        id="subject" 
                        type="text" 
                        required
                        className="block w-full px-3 text-md lg:text-xl text-black bg-white py-4 border-2 border-black rounded-xl appearance-none   focus:outline-none focus:ring-0 focus:border-blue-500 peer" placeholder=" "
                        value={SubjectName}
                        onChange={(e) => setSubjectName(e.target.value)}
                    />
                    <label 
                        htmlFor="floating_outlined" 
                        className="absolute text-md lg:text-xl text-black duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                    >
                        subject Name
                    </label>
                </div>

                <div className="mx-2 my-5 lg:my-0 flex flex-col lg:flex-row justify-between">
                    <h1 className="text-red-600  text-md lg:text-2xl font-bold text-left mb-5 lg:mb-0">
                        { error }
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
