import React, { useState } from "react";
import axios from "axios";
import ReactModal from "react-modal";
import dynamic from "next/dynamic";
import Loader from "../../common/Loading";

// Dynamically import React Quill
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

export function UpdateNote({ note, subjects, setUpdateModalOn }) {
  const [title, setTitle] = useState(note.title);
  const [selectedSubjectId, setSelectedSubjectId] = useState(() => {
    // Find subject ID that owns the category
    for (const sub of subjects) {
      if (sub.NoteCategory?.some(c => String(c.id) === String(note.noteCategoryId))) {
        return String(sub.id);
      }
    }
    return "";
  });
  const [selectedCategoryId, setSelectedCategoryId] = useState(String(note.noteCategoryId || ""));
  const [content, setContent] = useState(note.content);
  const [loading, setLoading] = useState(false);
  const [loadingModal, setLoadingModal] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const selectedSubject = subjects.find(s => String(s.id) === String(selectedSubjectId));
  const availableCategories = selectedSubject?.NoteCategory || [];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); 
    setSuccess(""); 
    setLoading(true); 
    setLoadingModal(true);

    if (!selectedCategoryId) {
      setError("Please select a category.");
      setLoading(false);
      setLoadingModal(false);
      return;
    }

    try {
      await axios.patch(`/api/note/update-note/${note.id}`, { 
        title, 
        noteCategoryId: Number(selectedCategoryId), 
        content 
      });
      setSuccess("Note updated successfully!");
      setTimeout(() => window.location.reload(), 1000);
    } catch (err) {
      console.error(err);
      setError("Failed to update note");
    } finally {
      setLoading(false);
      setLoadingModal(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-[95%] max-w-4xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-3xl font-bold text-center mb-6">Update Note</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border px-4 py-2 rounded-xl focus:ring-2 focus:ring-[#6b21a8]"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Subject</label>
            <select
              value={selectedSubjectId}
              onChange={(e) => {
                setSelectedSubjectId(e.target.value);
                setSelectedCategoryId("");
              }}
              className="w-full border px-4 py-2 rounded-xl focus:ring-2 focus:ring-[#6b21a8]"
              required
            >
              <option value="">Select Subject</option>
              {subjects.map((sub) => (
                <option key={sub.id} value={sub.id}>{sub.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium">Note Category</label>
            <select
              value={selectedCategoryId}
              onChange={(e) => setSelectedCategoryId(e.target.value)}
              disabled={!selectedSubjectId}
              className="w-full border px-4 py-2 rounded-xl focus:ring-2 focus:ring-[#6b21a8] disabled:bg-gray-100"
              required
            >
              <option value="">Select Category</option>
              {availableCategories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.title}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium">Content</label>
            <ReactQuill
              value={content}
              onChange={setContent}
              theme="snow"
              className="bg-white border rounded-xl"
            />
          </div>

          {error && <p className="text-red-600">{error}</p>}
          {success && <p className="text-green-600">{success}</p>}

          <div className="flex justify-center gap-4 mt-4">
            <button
              type="submit"
              disabled={loading}
              className={`px-6 py-2 rounded-xl text-white font-semibold ${
                loading ? "bg-gray-300 cursor-not-allowed" : "bg-[#6b21a8] hover:bg-[#4c1d95]"
              }`}
            >
              {loading ? "Updating..." : "Update Note"}
            </button>
            <button
              type="button"
              onClick={() => setUpdateModalOn(false)}
              className="px-6 py-2 rounded-xl bg-gray-200 hover:bg-gray-300 font-semibold"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>

      <ReactModal isOpen={loadingModal} className="flex items-center justify-center w-full h-full">
        <Loader />
      </ReactModal>
    </div>
  );
}
