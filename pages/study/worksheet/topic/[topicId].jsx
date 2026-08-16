import { prisma } from "../../../../util/db.server";
import React from "react";
import { MainHeader } from "../../../../components/common/MainHeader";
import { FaClipboardList } from "react-icons/fa";
import Link from "next/link";

export async function getServerSideProps(context) {
  const { topicId } = context.params;

  let topic = null;
  try {
    topic = await prisma.worksheetTopic.findUnique({
      where: { id: Number(topicId) },
      select: { id: true, title: true, subjectId: true },
    });
  } catch (err) {
    console.error("Topic fetch error:", err.message);
  }

  let worksheets = [];
  try {
    worksheets = await prisma.worksheet.findMany({
      where: { worksheetTopicId: Number(topicId) },
      orderBy: { id: "asc" },
    });
  } catch (err) {
    console.error("Worksheets fetch error:", err.message);
    worksheets = [];
  }

  return {
    props: {
      topic: JSON.parse(JSON.stringify(topic)),
      worksheets: JSON.parse(JSON.stringify(worksheets)),
    },
  };
}

export default function WorksheetsByTopic({ topic = null, worksheets = [] }) {
  return (
    <div className="py-32 px-5 lg:px-20 bg-gray-50 min-h-screen">
      <MainHeader title={`Aceit : ${topic?.title || "Worksheets"}`} />

      <h1 className="text-3xl font-bold mb-2 text-gray-800">
        {topic?.title || "Worksheets"}
      </h1>
      <p className="text-gray-500 mb-10">
        {worksheets?.length ?? 0} worksheet{(worksheets?.length ?? 0) !== 1 ? "s" : ""} available
      </p>

      {worksheets.length === 0 ? (
        <div className="text-center py-16">
          <FaClipboardList className="mx-auto text-gray-300 text-6xl mb-4" />
          <p className="text-gray-500 text-lg">No worksheets available for this topic yet.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {worksheets.map((ws) => (
            <div
              key={ws.id}
              className="flex justify-between items-center bg-white py-5 px-6 rounded-2xl hover:bg-green-50 border border-gray-100 shadow-sm transition"
            >
              <div className="flex items-center gap-4">
                <FaClipboardList size={36} className="text-green-500 flex-shrink-0" />
                <div>
                  <h2 className="text-gray-800 font-bold text-lg">{ws.title}</h2>
                  <p className="text-xs text-gray-400 truncate max-w-xs">{ws.link}</p>
                </div>
              </div>

              <a
                href={ws.link}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl text-sm font-semibold transition flex-shrink-0 ml-4"
              >
                Open Worksheet
              </a>
            </div>
          ))}
        </div>
      )}

      <div className="mt-10">
        <Link
          href={topic?.subjectId ? `/study/worksheet/subject/${topic.subjectId}` : "/study/worksheet"}
          className="text-green-500 hover:underline text-sm"
        >
          ← Back to topics
        </Link>
      </div>
    </div>
  );
}
