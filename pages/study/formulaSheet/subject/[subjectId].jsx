import { prisma } from "../../../../util/db.server";
import React from "react";
import { MainHeader } from "../../../../components/common/MainHeader";
import { FaFlask } from "react-icons/fa";
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

  let formulas = [];
  try {
    formulas = await prisma.formulaSheet.findMany({
      where: { subjectId: Number(subjectId) },
      orderBy: { id: "asc" },
    });
  } catch (err) {
    console.error("Formula sheets fetch error:", err.message);
    formulas = [];
  }

  return {
    props: {
      subject: JSON.parse(JSON.stringify(subject)),
      formulas: JSON.parse(JSON.stringify(formulas)),
    },
  };
}

export default function FormulaSheetsBySubject({ subject = null, formulas = [] }) {
  return (
    <div className="py-32 px-5 lg:px-20 bg-gray-50 min-h-screen">
      <MainHeader title={`Aceit : ${subject?.name || "Formula Sheets"}`} />

      <h1 className="text-3xl font-bold mb-2 text-gray-800">
        {subject?.name || "Formula Sheets"}
      </h1>
      <p className="text-gray-500 mb-10">
        {formulas?.length ?? 0} formula sheet{(formulas?.length ?? 0) !== 1 ? "s" : ""} available
      </p>

      {formulas.length === 0 ? (
        <div className="text-center py-16">
          <FaFlask className="mx-auto text-gray-300 text-6xl mb-4" />
          <p className="text-gray-500 text-lg">No formula sheets available for this subject yet.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {formulas.map((f) => (
            <div
              key={f.id}
              className="flex justify-between items-center bg-white py-5 px-6 rounded-2xl hover:bg-blue-50 border border-gray-100 shadow-sm transition"
            >
              <div className="flex items-center gap-4">
                <FaFlask size={36} className="text-blue-500 flex-shrink-0" />
                <div>
                  <h2 className="text-gray-800 font-bold text-lg">{f.name}</h2>
                  <p className="text-xs text-gray-400 truncate max-w-xs">{f.link}</p>
                </div>
              </div>

              <a
                href={f.link}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-semibold transition flex-shrink-0 ml-4"
              >
                Open
              </a>
            </div>
          ))}
        </div>
      )}

      <div className="mt-10">
        <Link href="/study/formulaSheet" className="text-blue-500 hover:underline text-sm">
          ← Back to all subjects
        </Link>
      </div>
    </div>
  );
}
