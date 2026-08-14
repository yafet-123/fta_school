import React, { useState } from "react";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { UpdatePastPaper } from "./UpdatePastPaper";
import { DeletePastPaper } from "./DeletePastPaper";

export function DisplayPastPapers({ subjects, onRefresh }) {
  const [selectedPaper, setSelectedPaper] = useState(null);
  const [updateModalOn, setUpdateModalOn] = useState(false);
  const [deleteModalOn, setDeleteModalOn] = useState(false);

  return (
    <div className="px-4 lg:px-12 py-12 bg-gradient-to-b from-orange-50 to-white min-h-screen">
      <h1 className="text-center text-4xl font-bold mb-12 text-orange-700 italic tracking-wide">
        Past Papers
      </h1>

      {subjects.map((subject) => (
        <div
          key={subject.id}
          className="mb-12 bg-white rounded-3xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-all"
        >
          <h2 className="text-3xl font-bold mb-6 text-orange-600 border-b pb-2">
            {subject.name}
          </h2>

          {subject.Topics?.length > 0 ? (
            subject.Topics.map((topic) => (
              <div
                key={topic.id}
                className="bg-gray-50 rounded-2xl shadow-sm p-6 mb-6 hover:shadow-md transition-shadow border border-gray-100"
              >
                {/* Topic Title (one topic can hold many papers) */}
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Topic: {topic.title}
                                </h3>

                {/* Papers inside this topic */}
                {topic.papers?.length > 0 ? (
                  topic.papers.map((paper) => (
                    <div
                      key={paper.id}
                      className="flex justify-between items-center mb-3 last:mb-0 bg-white rounded-xl p-4 shadow-sm border border-gray-100"
                    >
                      <div className="flex-1">
                        <p className="text-lg font-medium text-gray-800">
                          {paper.title}{" "}
                          {paper.year && (
                            <span className="text-sm text-gray-500">
                              ({paper.year})
                            </span>
                          )}
                        </p>
                        {paper.paperFile ? (
                          <a
                            href={paper.paperFile}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 underline text-sm"
                          >
                            View Paper
                          </a>
                        ) : (
                          <span className="text-gray-400 italic text-sm">
                            No link provided
                          </span>
                        )}
                      </div>

                      <div className="flex justify-end gap-3 ml-3">
                        <button
                          onClick={() => {
                            setSelectedPaper(paper);
                            setUpdateModalOn(true);
                          }}
                          className="bg-orange-500 hover:bg-orange-600 text-white p-2 rounded-md shadow-md transition"
                        >
                          <FiEdit2 />
                        </button>
                        <button
                          onClick={() => {
                            setSelectedPaper(paper);
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
                  <p className="text-gray-400 italic">No papers added yet.</p>
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-500 italic">
              No past papers added for this subject yet.
            </p>
          )}
        </div>
            ))}

      {/* Update & Delete Modals */}

      {updateModalOn && selectedPaper && (
        <UpdatePastPaper
          paper={selectedPaper}
          setUpdateModalOn={setUpdateModalOn}
        />
      )}

      {deleteModalOn && selectedPaper && (
        <DeletePastPaper
          paper={selectedPaper}
          setDeleteModalOn={setDeleteModalOn}
          onRefresh={onRefresh}
        />
      )}
    </div>
  );
}
