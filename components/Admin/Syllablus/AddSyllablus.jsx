import React, { useState } from "react";
import axios from "axios";
import { FiPlusCircle } from "react-icons/fi";
import Loader from "../../common/Loading";
import ReactModal from "react-modal";

export function AddSyllablus({ subjects }) {
  const [loading, setLoading] = useState(false);
  const [loadingModalIsOpen, setLoadingModalIsOpen] = useState(false);
  const [subjectId, setSubjectId] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!subjectId || !title || !content) {
      setError("Please fill all required fields.");
      return;
    }

    setLoading(true);
    setLoadingModalIsOpen(true);

    try {
      await axios.post("/api/syllablus/add", {
        subjectId,
        title,
        content,
      });

      setSuccess("Syllabus added successfully!");
      setSubjectId("");
      setTitle("");
      setContent("");
    } catch (err) {
      console.error(err);
      setError("Failed to add syllabus. Please try again.");
    } finally {
      setLoading(false);
      setLoadingModalIsOpen(false);
    }
  };

  return (
    <div className="flex flex-col items-center py-24 px-4 lg:px-6 bg-gray-50">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-center mb-10 flex items-center justify-center gap-2 text-gray-800">
          <FiPlusCircle className="text-[#673ab7] text-4xl" />
          Add Syllabus
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Subject */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Subject</label>
            <select
              value={subjectId}
              onChange={(e) => setSubjectId(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#673ab7]"
            >
              <option value="">Select Subject</option>
              {subjects.map((sub) => (
                <option key={sub.id} value={sub.id}>
                  {sub.name}
                </option>
              ))}
            </select>
          </div>

          {/* Title */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Syllabus Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="Enter syllabus title"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#673ab7]"
            />
          </div>

          {/* Content / Link */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Syllabus Link / File URL (Google Drive, Dropbox, etc.)
            </label>
            <input
              type="text"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              placeholder="https://..."
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#673ab7]"
            />
          </div>

          {error && <div className="text-red-600 font-semibold text-center">{error}</div>}
          {success && <div className="text-green-600 font-semibold text-center">{success}</div>}

          <div className="flex justify-center mt-6">
            <button
              type="submit"
              disabled={loading}
              className={`px-8 py-3 text-lg font-semibold rounded-xl shadow-md ${
                loading ? "bg-gray-300" : "bg-[#673ab7] hover:bg-[#5e35b1] text-white"
              }`}
            >
              {loading ? "Submitting..." : "Submit Syllabus"}
            </button>
          </div>
        </form>
      </div>

      <ReactModal
        isOpen={loadingModalIsOpen}
        className="flex items-center justify-center w-full h-full"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <Loader />
      </ReactModal>
    </div>
  );
}
