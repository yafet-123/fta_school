<<<<<<< HEAD
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import Loader from "../../common/Loading";
import ReactModal from "react-modal";

export function UpdateUser({
  setupdateModalOn,
  updateuserid,
  updateemail,
  updateusername,
  setupdateemail,
  setupdateusername,
}) {
  const router = useRouter();
  const [LoadingmodalIsOpen, setLoadingModalIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleOKClickForupdate = async () => {
    setLoading(true);
    setLoadingModalIsOpen(true);
    console.log(updateuserid)
    try {
      await axios.patch(`/api/user/updateUser/${updateuserid}`, {
        UserName: updateusername,
        email: updateemail,
      });
      router.reload();
    } catch (error) {
      console.error(error);
      alert("Failed to update user. Please try again.");
      setLoadingModalIsOpen(false);
      setLoading(false);
    }
  };

  const handleCancelClickForupdate = () => {
    setupdateModalOn(false);
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl p-8 relative animate-fadeIn">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Update User Information
          </h2>
          <p className="text-gray-500 text-sm">
            Modify the user’s details below and click <strong>Update</strong> to
            save changes.
          </p>
        </div>

        {/* Form Fields */}
        <div className="space-y-6">
          <div className="relative">
            <label
              htmlFor="username"
              className="block text-gray-700 font-medium mb-2"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
              value={updateusername}
              onChange={(e) => setupdateusername(e.target.value)}
              placeholder="Enter username"
            />
          </div>

          <div className="relative">
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-2"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
              value={updateemail}
              onChange={(e) => setupdateemail(e.target.value)}
              placeholder="Enter email address"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4 mt-10">
          <button
            onClick={handleCancelClickForupdate}
            className="px-5 py-3 rounded-xl bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300 transition"
          >
            Cancel
          </button>
          <button
            disabled={loading}
            onClick={handleOKClickForupdate}
            className={`px-6 py-3 rounded-xl text-white font-semibold transition ${
              loading
                ? "bg-teal-300 cursor-not-allowed"
                : "bg-teal-600 hover:bg-teal-700"
            }`}
          >
            {loading ? "Updating..." : "Update"}
          </button>
        </div>

        {/* Loading Modal */}
        <ReactModal
          isOpen={LoadingmodalIsOpen}
          className="flex items-center justify-center w-full h-full"
        >
          <Loader />
        </ReactModal>
      </div>
    </div>
  );
}
=======
import axios from 'axios';
import { useRouter } from 'next/router'
import { useState,useEffect, useContext} from 'react'
import Loader from "../../common/Loading";
import ReactModal from "react-modal";

export function UpdateUser({setupdateModalOn, updateuserid, updateemail, updateusername, setupdateemail , setupdateusername}) {
    const router = useRouter();
    console.log(updateuserid)
    const [LoadingmodalIsOpen, setLoadingModalIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const handleOKClickForupdate = async() => {
        setLoadingModalIsOpen(true)
        const data = await axios.patch(`../api/user/updateUser/${updateuserid}`,{
            "UserName": updateusername,
            "email": updateemail
        }).then(function (response) {
            console.log(response.data);
            router.reload()
        }).catch(function (error) {
            console.log(error);
            setLoadingModalIsOpen(false)
        });
        setupdateModalOn(false)
       
    }

    const handleCancelClickForupdate = () => {
        setupdateModalOn(false)
    }

	return(
		<div className="bg-gray-200 opacity-95 fixed inset-0 z-50   ">
            <div className="flex h-screen justify-center items-center ">
                <div className="flex-col justify-center bg-white py-24 px-5 lg:px-10 border-4 border-sky-500 rounded-xl ">
                    <div className="flex text-center text-xl text-zinc-600 font-bold mb-10" >Update User</div>
                        <div className="flex flex-col justify-between items-center">
                            <div className="relative mb-10">
                                <input 
                                id="username" 
                                type="text" 
                                className="block w-full px-3 text-xl text-black bg-transparent py-4 border-2 border-black rounded-xl appearance-none   focus:outline-none focus:ring-0 focus:border-blue-500 peer" placeholder=" "
                                value={updateusername}
                                onChange={(e) => setupdateusername(e.target.value)}
                            />
                            <label 
                                htmlFor="floating_outlined" 
                                className="absolute text-2xl text-black duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                            >
                                Username
                            </label>
                        </div>

                        <div className="relative mb-10">
                            <input 
                                id="email" 
                                type="email" 
                                className="block w-full px-3 text-xl text-black bg-transparent py-4 border-2 border-black rounded-xl appearance-none   focus:outline-none focus:ring-0 focus:border-blue-500 peer" placeholder=" "
                                value={updateemail}
                                onChange={(e) => setupdateemail(e.target.value)}
                            />
                            <label 
                                htmlFor="floating_outlined" 
                                className="absolute text-2xl text-black duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                            >
                                Email
                            </label>
                        </div>
                    </div>
                    <div className="flex">
                        <button 
                            disabled={loading}
                            onClick={handleOKClickForupdate} 
                            className={`rounded px-4 py-4  ${loading ? "text-black bg-gray-200" : "text-white  bg-[#009688] hover:bg-[#009688]"}`}
                        >
                            Yes
                        </button>
                        <button onClick={handleCancelClickForupdate} className="rounded px-4 py-4 ml-4 text-white bg-blue-400 hover:bg-blue-600">No</button>
                    </div>

                    <ReactModal
                    isOpen={LoadingmodalIsOpen}
                    // onRequestClose={closeModal}
                    className="flex items-center justify-center w-full h-full"
                >
                    <Loader />
                </ReactModal>
                </div>
           	</div>
        </div>
	)
}
>>>>>>> 0306f37bdbd9c29dc14158fb38dab803e1b3073a
