<<<<<<< HEAD
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import Loader from "../../common/Loading";
import ReactModal from "react-modal";
import { FiEdit3 } from "react-icons/fi";
import { MdOutlineCancel } from "react-icons/md";

export function UpdateSubject({
  setupdateModalOn,
  subject

}) {
  const router = useRouter();
  const [description, setDescription] = useState("");
  console.log(subject)
  const [subjectid, setsubjectid] = useState(subject.id);
  const [subjectname, setsubjectname] = useState(subject.SubjectName);
  const [subjectdescreption, setsubjectdescreption] = useState(subject.description);
  const [subjectsvg, setsubjectsvg] = useState(subject.svg);

  const [svg, setSvg] = useState("");
  const [loading, setLoading] = useState(false);
  const [LoadingmodalIsOpen, setLoadingModalIsOpen] = useState(false);

  const handleOKClickForupdate = async () => {
    setLoading(true);
    setLoadingModalIsOpen(true);

    try {
      await axios.patch(`../api/subject/updateSubject/${subjectid}`, {
        subjectid,
        subjectname,
        subjectdescreption,
        subjectsvg,
      });

      router.reload();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setLoadingModalIsOpen(false);
      setupdateModalOn(false);
    }
  };

  const handleCancelClickForupdate = () => {
    setupdateModalOn(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/40 backdrop-blur-sm">
      <div className="relative bg-white rounded-2xl shadow-2xl w-[90%] max-w-md p-8 border-t-4 border-emerald-500">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <FiEdit3 className="text-emerald-500" /> Update Subject
          </h2>
          <button
            onClick={handleCancelClickForupdate}
            className="text-gray-500 hover:text-gray-700 transition"
          >
            <MdOutlineCancel size={28} />
          </button>
        </div>

        {/* Subject Name Input */}
        <div className="mb-5">
          <label className="block text-gray-700 font-semibold mb-2 text-sm">
            Subject Name
          </label>
          <input
            type="text"
            className="w-full border border-gray-300 focus:border-emerald-500 focus:ring-emerald-200 rounded-lg px-4 py-3 text-gray-800 text-base outline-none transition"
            value={subjectname}
            onChange={(e) => setsubjectname(e.target.value)}
            placeholder="Enter subject name"
          />
        </div>

        {/* Description Input */}
        <div className="mb-5">
          <label className="block text-gray-700 font-semibold mb-2 text-sm">
            Description
          </label>
          <textarea
            rows={3}
            className="w-full border border-gray-300 focus:border-emerald-500 focus:ring-emerald-200 rounded-lg px-4 py-3 text-gray-800 text-sm outline-none transition"
            value={subjectdescreption}
            onChange={(e) => setsubjectdescreption(e.target.value)}
            placeholder="Enter description for the subject"
          ></textarea>
        </div>

        {/* SVG Input */}
        <div className="mb-5">
          <label className="block text-gray-700 font-semibold mb-2 text-sm">
            SVG (icon URL or code)
          </label>
          <textarea
            rows={3}
            className="w-full border border-gray-300 focus:border-emerald-500 focus:ring-emerald-200 rounded-lg px-4 py-3 text-gray-800 text-sm outline-none transition"
            value={subjectsvg}
            onChange={(e) => setsubjectsvg(e.target.value)}
            placeholder="<svg>...</svg> or https://example.com/icon.svg"
          ></textarea>

          {svg && (
            <div className="flex justify-center mt-4">
              {/* Render SVG preview */}
              <div
                className="w-12 h-12"
                dangerouslySetInnerHTML={{ __html: subjectsvg }}
              ></div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4 mt-8">
          <button
            disabled={loading}
            onClick={handleOKClickForupdate}
            className={`px-5 py-3 rounded-lg font-semibold text-white shadow-md transition-all ${
              loading
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-emerald-500 hover:bg-emerald-600"
            }`}
          >
            {loading ? "Updating..." : "Update"}
          </button>
          <button
            onClick={handleCancelClickForupdate}
            className="px-5 py-3 rounded-lg font-semibold text-white bg-gray-500 hover:bg-gray-600 transition-all shadow-md"
          >
            Cancel
          </button>
        </div>

        {/* Loader Modal */}
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

export function UpdateSubject({setupdateModalOn, updatesubjectid, updatesubjectname, setupdatesubjectname , setupdatesubjectid}) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [LoadingmodalIsOpen, setLoadingModalIsOpen] = useState(false);
    const handleOKClickForupdate = async() => {
        setLoadingModalIsOpen(true)
        const data = await axios.patch(`../api/subject/updateSubject/${updatesubjectid}`,{
            "SubjectName": updatesubjectname
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
                    <div className="flex text-center text-xl text-zinc-600 font-bold mb-10" >Update Subject</div>
                        <div className="flex flex-col justify-between items-center">
                            <div className="relative mb-10">
                                <input 
                                id="ClassName" 
                                type="text" 
                                className="block w-full px-3 text-xl text-black bg-transparent py-4 border-2 border-black rounded-xl appearance-none   focus:outline-none focus:ring-0 focus:border-blue-500 peer" placeholder=" "
                                value={updatesubjectname}
                                onChange={(e) => setupdatesubjectname(e.target.value)}
                            />
                            <label 
                                htmlFor="floating_outlined" 
                                className="absolute text-2xl text-black duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                            >
                                Class Name
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
