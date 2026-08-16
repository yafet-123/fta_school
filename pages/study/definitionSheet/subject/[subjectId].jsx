import { prisma } from "../../../../util/db.server";
import React from "react";
import { MainHeader } from "../../../../components/common/MainHeader";
import { FaLightbulb } from "react-icons/fa";
import Link from "next/link";

export async function getServerSideProps(context) {
  const { subjectId } = context.params;

  let subject = null;
  try {
    subject = await prisma.subject.findUnique({
      where: { id: Number(subjectId) },
      select: { id: true, name: true },
    });
  } catch (err) {
    console.error("Subject fetch error:", err.message);
  }

  let definitions = [];
  try {
    definitions = await prisma.definition.findMany({
      where: { subjectId: Number(subjectId) },
      orderBy: { id: "asc" },
    });
  } catch (err) {
    console.error("Definitions fetch error:", err.message);
    definitions = [];
  }

  return {
    props: {
      subject: JSON.parse(JSON.stringify(subject)),
      definitions: JSON.parse(JSON.stringify(definitions)),
    },
  };
}

export default function DefinitionsBySubject({ subject = null, definitions = [] }) {
  return (
    <div className="py-32 px-5 lg:px-20 bg-gray-50 min-h-screen">
      <MainHeader title={`Aceit : ${subject?.name || "Definitions"}`} />

      <h1 className="text-3xl font-bold mb-2 text-gray-800">
        {subject?.name || "Definitions"}
      </h1>
      <p className="text-gray-500 mb-10">
        {definitions?.length ?? 0} definition{(definitions?.length ?? 0) !== 1 ? "s" : ""} available
      </p>

      {definitions.length === 0 ? (
        <div className="text-center py-16">
          <FaLightbulb className="mx-auto text-gray-300 text-6xl mb-4" />
          <p className="text-gray-500 text-lg">No definitions available for this subject yet.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {definitions.map((def) => (
            <div
              key={def.id}
              className="flex justify-between items-center bg-white py-5 px-6 rounded-2xl hover:bg-amber-50 border border-gray-100 shadow-sm transition"
            >
              <div className="flex items-center gap-4">
                <FaLightbulb size={36} className="text-amber-500 flex-shrink-0" />
                <div>
                  <h2 className="text-gray-800 font-bold text-lg">{def.name}</h2>
                  <p className="text-xs text-gray-400 truncate max-w-xs">{def.link}</p>
                </div>
              </div>

              <a
                href={def.link}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-xl text-sm font-semibold transition flex-shrink-0 ml-4"
              >
                Open
              </a>
            </div>
          ))}
        </div>
      )}

      <div className="mt-10">
        <Link href="/study/definitionSheet" className="text-amber-500 hover:underline text-sm">
          ← Back to all subjects
        </Link>
      </div>
    </div>
  );
}
