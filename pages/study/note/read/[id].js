import React from "react";
import { prisma } from "../../../../util/db.server";
import { MainHeader } from "../../../../components/common/MainHeader";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

export async function getServerSideProps(context) {
  const { id } = context.params;

  try {
    const note = await prisma.note.findUnique({
      where: { id: Number(id) },
      include: {
        NoteCategory: {
          include: {
            Subject: {
              select: { id: true, name: true },
            },
          },
        },
      },
    });

    if (!note) {
      return { notFound: true };
    }

    return {
      props: {
        note: JSON.parse(JSON.stringify(note)),
      },
    };
  } catch (error) {
    console.error("Error fetching note detail:", error);
    return {
      props: {
        note: null,
      },
    };
  }
}

export default function NoteReaderPage({ note }) {
  if (!note) {
    return (
      <div className="py-32 text-center text-gray-500 text-lg">
        Note not found.
      </div>
    );
  }

  const category = note.NoteCategory;
  const subject = category?.Subject;

  return (
    <>
      <MainHeader title={`Aceit : ${note.title}`} />
      <div className="bg-gray-50 min-h-screen py-32 px-4 md:px-10">
        <div className="max-w-4xl mx-auto">
          {/* Navigation Breadcrumb */}
          <div className="mb-6 flex items-center gap-2 text-sm text-gray-600">
            <Link
              href={`/study/note/subject/${subject?.id || ""}`}
              className="text-purple-600 hover:underline font-semibold flex items-center gap-2"
            >
              <FaArrowLeft /> {subject?.name || "Subject"}
            </Link>
            {category && (
              <>
                <span>/</span>
                <Link
                  href={`/study/note/${category.id}`}
                  className="text-purple-600 hover:underline font-semibold"
                >
                  {category.title}
                </Link>
              </>
            )}
          </div>

          {/* Note View Card */}
          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-gray-100">
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 border-b pb-4">
              {note.title}
            </h1>

            {category && (
              <div className="mb-8 text-sm text-gray-500">
                Category: <span className="font-semibold text-purple-700">{category.title}</span>
              </div>
            )}

            <div
              className="prose prose-purple max-w-none text-gray-800 leading-relaxed text-base md:text-lg overflow-x-auto"
              dangerouslySetInnerHTML={{ __html: note.content }}
            />

            <div className="mt-10 pt-6 border-t border-gray-100 flex justify-between items-center">
              <Link
                href={`/study/note/${category?.id || ""}`}
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2.5 rounded-xl font-semibold transition"
              >
                ← Back to Category
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
