<<<<<<< HEAD
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export function DeleteUser({setDeleteModalOn,deleteuserid}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/user/deleteuser/${deleteuserid}`);
      router.reload();
    } catch (error) {
      console.error(error);
      setLoading(false);
    } finally {
      setDeleteModalOn(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-lg text-center">
        <h2 className="text-lg font-semibold mb-3">Delete User</h2>
        <p className="text-gray-600 mb-4">
          Are you sure you want to delete this User?
        </p>

        <div className="flex justify-center gap-3">
          <button
            onClick={() => setDeleteModalOn(false)}
            className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
            disabled={loading}
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
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

export function DeleteUser({setdeleteModalOn,deleteuserid}) {
    const router = useRouter();
    const [LoadingmodalIsOpen, setLoadingModalIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
	const handleOKClickFordelete = async() => {
        setLoadingModalIsOpen(true)
        const data = await axios.delete(`../api/user/deleteuser/${deleteuserid}`,{
        }).then(function (response) {
            console.log(response.data);
            router.reload()
        }).catch(function (error) {
            console.log(error);
            setLoadingModalIsOpen(false)
        });
        setdeleteModalOn(false)
    }

    const handleCancelClickFordelete = () => {
        setdeleteModalOn(false)
    }
	return(
		<div className="bg-gray-200 opacity-90 fixed inset-0 z-50   ">
            <div className="flex h-screen justify-center items-center ">
                <div className="flex-col justify-center bg-white py-24 px-5 lg:px-10 border-4 border-sky-500 rounded-xl ">
                    <div className="flex text-xl text-zinc-600 font-bold mb-10" >Are you sure You want to delete User ?</div>
                    <div className="flex">
                    	<button 
                            disabled={loading} 
                            onClick={handleOKClickFordelete} 
                            className={`rounded px-4 py-4  ${loading ? "text-black bg-gray-200" : "text-white  bg-green-400 hover:bg-green-600"}`}
                        >
                            Yes
                        </button>
                    	<button onClick={handleCancelClickFordelete} className="rounded px-4 py-4 ml-4 text-white bg-blue-400 hover:bg-blue-600">No</button>
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
