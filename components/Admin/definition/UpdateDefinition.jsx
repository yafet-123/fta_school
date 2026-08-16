import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import Loader from "../../common/Loading";
import ReactModal from "react-modal";

export function UpdateDefinition({ subjects, item, subjectId, setUpdateModalOn }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [loadingModalIsOpen, setLoadingModalIsOpen] = useState(false);
  const [error, setError] = useState("");

  const [selectedSubjectId, setSelectedSubjectId] = useState(String(subjectId || item.subjectId || ""));
  const [term, setTerm] = useState(item.term);
  const [meaning, setMeaning] = useState(item.meaning || "");
  const [example, setExample] = useState(item.example || "");

  const handleUpdate = async () => {
    if (!selectedSubjectId || !term || !meaning) {
      setError("Subject, Term, and Meaning are required.");
      return;
    }

    setLoading(true);
    setLoadingModalIsOpen(true);
    setError("");

    try {
      await axios.patch(`/api/definition/update/${item.id}`, {
        subjectId: selectedSubjectId,
        term,
        meaning,
        example,
      });

      router.reload();
    } catch (err) {
      console.error(err);
      setError("Failed to update Definition. Try again.");
      setLoadingModalIsOpen(false);
    } finally {
      setLoading(false);
      setUpdateModalOn(false);
    }
  };

  return (
    <div className="bg-gray-200 bg-opacity-95 fixed inset-0 z-50">
      <div className="flex h-screen justify-center items-center px-4">
        <div className="bg-white py-10 px-8 lg:px-10 border-t-4 border-amber-500 rounded-2xl shadow-2xl w-full max-w-lg transition-all">
          <h2 className="text-center text-3xl font-extrabold text-amber-600 mb-6">
            Update Definition
          </h2>

          {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

          <div className="mb-5">
            <label className="block mb-2 text-gray-700 font-semibold">Subject</label>
            <select
              value={selectedSubjectId}
              onChange={(e) => setSelectedSubjectId(e.target.value)}
              className="w-full border-2 border-gray-300 rounded-xl px-3 py-2 bg-white focus:outline-none focus:border-amber-500 transition"
            >
              <option value="">Select Subject</option>
              {subjects.map((subject) => (
                <option key={subject.id} value={subject.id}>
                  {subject.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-5">
            <label className="block mb-2 text-gray-700 font-semibold">Term</label>
            <input
              type="text"
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              className="w-full border-2 border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:border-amber-500 transition"
            />
          </div>

          <div className="mb-5">
            <label className="block mb-2 text-gray-700 font-semibold">Meaning</label>
            <textarea
              rows={3}
              value={meaning}
              onChange={(e) => setMeaning(e.target.value)}
              className="w-full border-2 border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:border-amber-500 transition"
            />
          </div>

          <div className="mb-5">
            <label className="block mb-2 text-gray-700 font-semibold">Example</label>
            <textarea
              rows={2}
              value={example}
              onChange={(e) => setExample(e.target.value)}
              className="w-full border-2 border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:border-amber-500 transition"
            />
          </div>

          <div className="flex justify-center space-x-4">
            <button
              disabled={loading}
              onClick={handleUpdate}
              className="rounded-xl px-6 py-2.5 font-semibold text-white bg-amber-500 hover:bg-amber-600 transition-all"
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
