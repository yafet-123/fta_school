import React, { useState } from "react";
import axios from "axios";
import ReactModal from "react-modal";
import Loader from "../../common/Loading";
import { FiPlusCircle } from "react-icons/fi";
import dynamic from "next/dynamic";
import { useSession } from "next-auth/react";

// ✅ Load React Quill dynamically to avoid SSR issues
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

export function AddComprehensiveNotes({ subjects, userId }) {
  const { status, data } = useSession();
  const [loading, setLoading] = useState(false);
  const [loadingModalIsOpen, setLoadingModalIsOpen] = useState(false);
  const [subjectId, setSubjectId] = useState("");
  const [noteCategoryId, setNoteCategoryId] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Get categories for selected subject
  const selectedSubject = subjects.find(s => String(s.id) === String(subjectId));
  const categories = selectedSubject?.NoteCategory || [];

  // Handle form submission
  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!noteCategoryId || !title || !content) {
      setError("Please select a category, enter a title, and provide content.");
      return;
    }

    setLoading(true);
    setLoadingModalIsOpen(true);

    try {
      await axios.post("/api/note/add-note", {
        noteCategoryId,
        title,
        content,
      });

      setSuccess("Note added successfully!");
      setSubjectId("");
      setNoteCategoryId("");
      setTitle("");
      setContent("");
    } catch (err) {
      console.error(err);
      setError("Failed to add note. Please try again later.");
    } finally {
      setLoading(false);
      setLoadingModalIsOpen(false);
    }
  }

  return (
    <div className="flex flex-col items-center min-h-screen py-24 px-2 lg:px-6">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-10 flex items-center justify-center gap-2">
          <FiPlusCircle className="text-[#009688]" />
          Add Comprehensive Note
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Select Subject */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Subject</label>
            <select
              required
              value={subjectId}
              onChange={(e) => {
                setSubjectId(e.target.value);
                setNoteCategoryId("");
              }}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#009688]"
            >
              <option value="">Select Subject</option>
              {subjects.map((subject) => (
                <option key={subject.id} value={subject.id}>
                  {subject.name}
                </option>
              ))}
            </select>
          </div>

          {/* Select Note Category */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Note Category</label>
            <select
              required
              disabled={!subjectId}
              value={noteCategoryId}
              onChange={(e) => setNoteCategoryId(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#009688] disabled:bg-gray-100 disabled:text-gray-400"
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.title}
                </option>
              ))}
            </select>
            {subjectId && categories.length === 0 && (
              <p className="text-sm text-orange-500 mt-1">No note categories found for this subject. Please add one first.</p>
            )}
          </div>

          {/* Note Title */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Note Title</label>
            <input
              type="text"
              required
              placeholder="Enter note title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#009688]"
            />
          </div>

          {/* Rich Text Content */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Note Content (Rich Text)
            </label>
            <ReactQuill
              theme="snow"
              value={content}
              onChange={setContent}
              className="bg-white rounded-xl border border-gray-300"
              placeholder="Write your note here... you can use bold, headings, lists, etc."
            />
          </div>

          {/* Feedback */}
          {error && <div className="text-red-600 font-semibold text-center">{error}</div>}
          {success && <div className="text-green-600 font-semibold text-center">{success}</div>}

          {/* Submit */}
          <div className="flex justify-center mt-8">
            <button
              type="submit"
              disabled={loading}
              className={`px-8 py-3 text-lg font-semibold rounded-xl transition duration-300 flex items-center justify-center gap-2 
                ${loading ? "bg-gray-300 cursor-not-allowed" : "bg-[#009688] hover:bg-[#00796b] text-white shadow-md"}`}
            >
              {loading ? "Submitting..." : "Submit Note"}
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
}
