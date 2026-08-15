import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import Loader from "../../common/Loading";
import ReactModal from "react-modal";

export function UpdateBookCategory({ category, setUpdateModalOn }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [loadingModalIsOpen, setLoadingModalIsOpen] = useState(false);
  const [title, setTitle] = useState(category.title);
  const [error, setError] = useState("");

  const handleUpdate = async () => {
    if (!title) {
      setError("Category title is required.");
      return;
    }

    setLoading(true);
    setLoadingModalIsOpen(true);
    setError("");

    try {
      await axios.patch(`/api/book-category/update/${category.id}`, { title });
      router.reload();
    } catch (err) {
      console.error(err);
      setError("Failed to update category. Try again.");
      setLoadingModalIsOpen(false);
    } finally {
      setLoading(false);
      setUpdateModalOn(false);
    }
  };

  return (
    <div className="bg-gray-200 bg-opacity-95 fixed inset-0 z-50">
      <div className="flex h-screen justify-center items-center px-4">
        <div className="bg-white py-10 px-8 lg:px-10 border-t-4 border-purple-500 rounded-2xl shadow-2xl w-full max-w-lg">
          <h2 className="text-center text-3xl font-extrabold text-purple-600 mb-6">
            Update Book Category
          </h2>

          {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

          <div className="mb-5">
            <label className="block mb-2 text-gray-700 font-semibold">Category Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter category title"
              className="w-full border-2 border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:border-purple-500 transition"
            />
          </div>

          <div className="flex justify-center space-x-4">
            <button
              disabled={loading}
              onClick={handleUpdate}
              className={`rounded-xl px-6 py-2.5 font-semibold shadow-sm ${
                loading
                  ? "text-gray-600 bg-gray-200 cursor-not-allowed"
                  : "text-white bg-purple-500 hover:bg-purple-600 transition-all"
              }`}
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
            <button
              onClick={() => setUpdateModalOn(false)}
              className="rounded-xl px-6 py-2.5 font-semibold text-white bg-gray-400 hover:bg-gray-500 transition-all"
            >
              Cancel
            </button>
          </div>

          <ReactModal
            isOpen={loadingModalIsOpen}
            className="flex items-center justify-center w-full h-full"
          >
            <Loader />
          </ReactModal>
        </div>
      </div>
    </div>
  );
}
