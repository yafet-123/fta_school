import React, { useState } from "react";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { UpdateSyllablus } from "./UpdateSyllablus";
import { DeleteSyllablus } from "./DeleteSyllablus";

export function DisplaySyllablus({ subjects }) {
  const [selectedItem, setSelectedItem] = useState(null);
  const [subjectId, setSubjectId] = useState(null);
  const [updateModalOn, setUpdateModalOn] = useState(false);
  const [deleteModalOn, setDeleteModalOn] = useState(false);

  return (
    <div className="px-4 lg:px-12 py-12 bg-gradient-to-b from-purple-50 to-white min-h-screen">
      <h1 className="text-center text-4xl font-bold mb-12 text-purple-700 italic tracking-wide">
        Syllabus
      </h1>

      {subjects.map((subject) => (
        <div
          key={subject.id}
          className="mb-12 bg-white rounded-3xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-all"
        >
          <h2 className="text-3xl font-bold mb-6 text-purple-600 border-b pb-2">
            {subject.name}
          </h2>

          {subject.Syllablus?.length > 0 ? (
            subject.Syllablus.map((item) => (
              <div
                key={item.id}
                className="bg-gray-50 rounded-2xl shadow-sm p-6 mb-4 hover:shadow-md transition-shadow border border-gray-100 flex justify-between items-center"
              >
                <div>
                  <h4 className="text-xl font-semibold text-gray-800 mb-1">
                    {item.title}
                  </h4>
                  <a
                    href={item.content}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline text-sm"
                  >
                    View Link / Content
                  </a>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setSelectedItem(item);
                      setSubjectId(subject.id);
                      setUpdateModalOn(true);
                    }}
                    className="bg-purple-500 hover:bg-purple-600 text-white p-2 rounded-md shadow-md transition"
                  >
                    <FiEdit2 />
                  </button>
                  <button
                    onClick={() => {
                      setSelectedItem(item);
                      setDeleteModalOn(true);
                    }}
                    className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-md shadow-md transition"
                  >
                    <FiTrash2 />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 italic">No syllabus added for this subject yet.</p>
          )}
        </div>
      ))}

      {updateModalOn && selectedItem && (
        <UpdateSyllablus
          item={selectedItem}
          subjectId={subjectId}
          setUpdateModalOn={setUpdateModalOn}
          subjects={subjects}
        />
      )}

      {deleteModalOn && selectedItem && (
        <DeleteSyllablus
          item={selectedItem}
          setDeleteModalOn={setDeleteModalOn}
        />
      )}
    </div>
  );
}
