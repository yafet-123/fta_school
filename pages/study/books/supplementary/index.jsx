import { prisma } from "../../../../util/db.server";
import { MainHeader } from '../../../../components/common/MainHeader';
import React from "react";
import Link from "next/link";
import { FaBookOpen, FaExternalLinkAlt } from "react-icons/fa";

export async function getServerSideProps() {
  // Fetch subjects → BookCategories → Books → BookTopics
  const subjects = await prisma.subject.findMany({
    include: {
      BookCategory: {
        include: {
          Books: {
            include: {
              BookTopic: true,
            },
          },
        },
      },
    },
    orderBy: { name: "asc" },
  });

  const formattedSubjects = subjects
    .map(sub => ({
      id: sub.id,
      name: sub.name,
      BookCategory: sub.BookCategory.map(cat => ({
        id: cat.id,
        title: cat.title,
        Books: cat.Books.map(book => ({
          id: book.id,
          title: book.title,
          bookFile: book.bookFile,
          topics: book.BookTopic.map(t => t.title),
        })),
      })).filter(cat => cat.Books.length > 0),
    }))
    .filter(sub => sub.BookCategory.length > 0);

  return {
    props: {
      subjects: JSON.parse(JSON.stringify(formattedSubjects)),
    },
  };
}

export default function SupplementaryBooks({ subjects }) {
  return (
    <React.Fragment>
      <MainHeader title="Aceit : Supplementary Books" />
      <div className="bg-gray-50 min-h-screen py-20 px-6">

        {/* Hero */}
        <section className="bg-gradient-to-r from-green-500 to-teal-500 text-white py-16 text-center rounded-2xl mb-12 px-6">
          <FaBookOpen className="mx-auto text-6xl mb-4 opacity-90" />
          <h1 className="text-4xl md:text-5xl font-bold mb-3">Supplementary Books</h1>
          <p className="text-lg md:text-xl opacity-90">
            Curated digital books to enhance your learning, organized by subject.
          </p>
        </section>

        {subjects.length === 0 ? (
          <div className="text-center py-20 text-gray-400 text-xl">
            No books available yet. Check back soon!
          </div>
        ) : (
          <div className="max-w-6xl mx-auto space-y-12">
            {subjects.map(subject => (
              <div key={subject.id} className="bg-white rounded-3xl shadow-lg p-8 border border-gray-100">
                <h2 className="text-3xl font-bold text-green-700 border-b pb-3 mb-6">
                  {subject.name}
                </h2>

                {subject.BookCategory.map(category => (
                  <div key={category.id} className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-600 mb-4 flex items-center gap-2">
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                        {category.title}
                      </span>
                    </h3>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                      {category.Books.map(book => (
                        <div
                          key={book.id}
                          className="bg-gradient-to-br from-green-50 to-white border border-green-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all"
                        >
                          <h4 className="text-lg font-bold text-gray-800 mb-2">{book.title}</h4>

                          {book.topics.length > 0 && (
                            <ul className="text-sm text-gray-500 mb-4 list-disc ml-4 space-y-0.5">
                              {book.topics.map((topic, i) => (
                                <li key={i}>{topic}</li>
                              ))}
                            </ul>
                          )}

                          {book.bookFile ? (
                            <a
                              href={book.bookFile}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl text-sm font-semibold transition"
                            >
                              <FaExternalLinkAlt className="text-xs" />
                              Open Book
                            </a>
                          ) : (
                            <span className="text-gray-400 italic text-sm">No link available</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </React.Fragment>
  );
}
