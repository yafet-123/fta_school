import { FaBook, FaClipboardList, FaStickyNote } from "react-icons/fa";
import React from "react";
import { prisma } from "../../../util/db.server";
import { MainHeader } from "../../../components/common/MainHeader";
import Link from "next/link";
import Image from "next/image";

const reasons = [
  {
    id: 1,
    icon: <FaStickyNote className="text-purple-500 w-8 h-8" />,
    title: "Organized Notes",
    description: "All notes organized by subject and category for easy access.",
  },
  {
    id: 2,
    icon: <FaClipboardList className="text-blue-500 w-8 h-8" />,
    title: "Study Smarter",
    description: "Access curated notes written to help you focus on key topics.",
  },
  {
    id: 3,
    icon: <FaBook className="text-green-500 w-8 h-8" />,
    title: "Comprehensive Coverage",
    description: "Notes covering all subjects and chapters in one place.",
  },
];

export default function NotesIndex({ subjects = [] }) {
  return (
    <React.Fragment>
      <MainHeader title="Aceit: Notes" />
      <div className="bg-gray-50 min-h-screen py-20">

        {/* Hero */}
        <section className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-32 text-center px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Study Notes</h1>
          <p className="text-lg md:text-xl mb-8">
            Access organized notes by subject to boost your understanding.
          </p>
        </section>

        {/* Why Use Notes */}
        <section className="py-16 px-6 max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Why Use Our Notes?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {reasons.map((reason) => (
              <div
                key={reason.id}
                className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition flex flex-col items-center space-y-4"
              >
                <div>{reason.icon}</div>
                <h3 className="text-xl font-semibold text-gray-700 text-center">{reason.title}</h3>
                <p className="text-gray-600 text-center">{reason.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Subjects Grid */}
        <section className="py-16 px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
            Notes by Subject
          </h2>
          <div className="max-w-6xl mx-auto">
            {subjects.length === 0 ? (
              <p className="text-center text-gray-500 text-lg">No subjects found.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                {subjects.map((subject) => (
                  <Link href={`/study/note/subject/${subject.id}`} key={subject.id}>
                    <div className="group bg-gradient-to-b from-white to-gray-50 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 cursor-pointer flex flex-col items-center text-center p-6">
                      {subject.svg ? (
                        <div className="relative w-full h-48 overflow-hidden rounded-xl mb-4">
                          <Image
                            src={subject.svg}
                            alt={subject.name}
                            layout="fill"
                            objectFit="cover"
                            className="rounded-xl group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        </div>
                      ) : (
                        <div className="w-full h-48 bg-gradient-to-br from-purple-100 to-indigo-200 rounded-xl mb-4 flex items-center justify-center">
                          <FaStickyNote className="text-purple-500 w-16 h-16" />
                        </div>
                      )}
                      <h2 className="mt-2 text-2xl font-bold text-gray-800 group-hover:text-purple-600 transition-colors duration-300">
                        {subject.name}
                      </h2>
                      <p className="text-sm text-gray-400 mt-1">
                        {subject.noteCount} note{subject.noteCount !== 1 ? "s" : ""}
                      </p>
                      <div className="mt-4 w-16 h-1 bg-purple-500 rounded-full group-hover:w-24 transition-all duration-500"></div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </React.Fragment>
  );
}

export async function getServerSideProps() {
  let subjects = [];
  try {
    const raw = await prisma.subject.findMany({
      orderBy: { id: "asc" },
      include: {
        NoteCategory: {
          include: { Notes: true },
        },
      },
    });

    subjects = raw.map((sub) => {
      const noteCount = (sub.NoteCategory || []).reduce(
        (acc, cat) => acc + (cat.Notes?.length || 0),
        0
      );
      return {
        id: sub.id,
        name: sub.name,
        svg: sub.svg || null,
        noteCount,
      };
    });
  } catch (err) {
    // Fallback if NoteCategory table doesn't exist yet
    console.error("Notes index fallback:", err.message);
    try {
      const raw = await prisma.subject.findMany({
        orderBy: { id: "asc" },
        select: { id: true, name: true, svg: true },
      });
      subjects = raw.map((s) => ({ id: s.id, name: s.name, svg: s.svg || null, noteCount: 0 }));
    } catch (e) {
      subjects = [];
    }
  }

  return { props: { subjects: JSON.parse(JSON.stringify(subjects)) } };
}
