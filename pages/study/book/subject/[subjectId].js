import { useRouter } from "next/router";
import { prisma } from "../../../../util/db.server";
import React from "react";
import { MainHeader } from "../../../../components/common/MainHeader";
import { FaBook } from "react-icons/fa";
import Link from "next/link";

export async function getServerSideProps(context) {
  const { subjectId } = context.params;

  // Fetch subject name
  let subject = null;
  try {
    subject = await prisma.subject.findUnique({
      where: { id: Number(subjectId) },
      select: { id: true, name: true },
    });
  } catch (err) {
    console.error("Subject fetch error:", err.message);
  }

  // Fetch books directly — filter through BookCategory.subjectId
  let books = [];
  try {
    books = await prisma.book.findMany({
      where: {
        BookCategory: {
          subjectId: Number(subjectId),
        },
      },
      include: {
        BookTopic: true,
        BookCategory: {
          select: { id: true, title: true },
        },
      },
      orderBy: { id: "asc" },
    });
  } catch (err) {
    console.error("Books fetch error:", err.message);
    books = [];
  }

  return {
    props: {
      subject: JSON.parse(JSON.stringify(subject)),
      books: JSON.parse(JSON.stringify(books)),
    },
  };
}

export default function BooksBySubject({ subject = null, books = [] }) {
  const router = useRouter();

  return (
    <div className="py-32 px-5 lg:px-20 bg-gray-50 min-h-screen">
      <MainHeader title={`Aceit : ${subject?.name || "Books"}`} />

      <h1 className="text-3xl font-bold mb-2 text-gray-800">
        {subject?.name || "Books"}
      </h1>
      <p className="text-gray-500 mb-10">
        {books?.length ?? 0} book{(books?.length ?? 0) !== 1 ? "s" : ""} available
      </p>

      {books.length === 0 ? (
        <div className="text-center py-16">
          <FaBook className="mx-auto text-gray-300 text-6xl mb-4" />
          <p className="text-gray-500 text-lg">No books available for this subject yet.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {books.map((book) => (
            <div
              key={book.id}
              className="flex justify-between items-center bg-white py-5 px-6 rounded-2xl hover:bg-indigo-50 border border-gray-100 shadow-sm transition"
            >
              <div className="flex items-center gap-4">
                <FaBook size={36} className="text-indigo-500 flex-shrink-0" />
                <div>
                  <h2 className="text-gray-800 font-bold text-lg">{book.title}</h2>
                  {book.BookCategory && (
                    <p className="text-sm text-gray-400">{book.BookCategory.title}</p>
                  )}
                  {book.BookTopic?.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-1">
                      {book.BookTopic.map((topic) => (
                        <button
                          key={topic.id}
                          onClick={() => router.push(`/study/book/${topic.id}`)}
                          className="bg-indigo-50 hover:bg-indigo-100 text-indigo-600 text-xs px-2 py-1 rounded-full transition"
                        >
                          {topic.title}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {book.bookFile && (
                <a
                  href={book.bookFile}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-xl text-sm font-semibold transition flex-shrink-0 ml-4"
                >
                  Open Book
                </a>
              )}
            </div>
          ))}
        </div>
      )}

      <div className="mt-10">
        <Link href="/study/book" className="text-indigo-500 hover:underline text-sm">
          ← Back to all subjects
        </Link>
      </div>
    </div>
  );
}
