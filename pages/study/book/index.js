import { FaBook, FaFolderOpen, FaStar } from "react-icons/fa";
import React from "react";
import { prisma } from "../../../util/db.server";
import { MainHeader } from "../../../components/common/MainHeader";
import Link from "next/link";
import Image from "next/image";

const reasons = [
  {
    id: 1,
    icon: <FaBook className="text-blue-500 w-8 h-8" />,
    title: "Find Recommended Books",
    description: "Access top-quality textbooks organized by subject.",
  },
  {
    id: 2,
    icon: <FaFolderOpen className="text-green-500 w-8 h-8" />,
    title: "Study Easily",
    description: "All your required and reference books in one place.",
  },
  {
    id: 3,
    icon: <FaStar className="text-yellow-500 w-8 h-8" />,
    title: "Boost Understanding",
    description: "Use well-structured books to improve your learning.",
  },
];

export default function Books({ subjects }) {
  return (
    <React.Fragment>
      <MainHeader title="Aceit: Books" />
      <div className="bg-gray-50 min-h-screen py-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-32 text-center px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Books</h1>
          <p className="text-lg md:text-xl mb-8">
            Access recommended textbooks and reading materials.
          </p>
        </section>

        {/* Why Use Books */}
        <section className="py-16 px-6 max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Why Use Books?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {reasons.map((reason) => (
              <div
                key={reason.id}
                className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition flex flex-col items-center space-y-4"
              >
                <div>{reason.icon}</div>
                <h3 className="text-xl font-semibold text-gray-700 text-center">
                  {reason.title}
                </h3>
                <p className="text-gray-600 text-center">{reason.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Subjects Grid */}
        <section className="py-16 px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
            All Books by Subject
          </h2>

          <div className="max-w-6xl mx-auto">
            {subjects.length === 0 ? (
              <p className="text-center text-gray-500 text-lg">No subjects found.</p>
            ) : (
              <div className="py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                {subjects.map((subject) => (
                  <Link href={`/study/book/subject/${subject.id}`} key={subject.id}>
                    <div className="group bg-gradient-to-b from-white to-gray-50 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 cursor-pointer flex flex-col items-center text-center p-6">
                      {/* Image Section */}
                      {subject.svg ? (
                        <div className="relative w-full h-48 overflow-hidden rounded-xl mb-4">
                          <Image
                            src={subject.svg}
                            alt={subject.name}
                            layout="fill"
                            objectFit="cover"
                            className="rounded-xl group-hover:scale-110 transition-transform duration-500 ease-in-out"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        </div>
                      ) : (
                        <div className="w-full h-48 bg-gradient-to-br from-blue-100 to-indigo-200 rounded-xl mb-4 flex items-center justify-center">
                          <FaBook className="text-blue-500 w-16 h-16" />
                        </div>
                      )}

                      <h2 className="mt-2 text-2xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                        {subject.name}
                      </h2>
                      <p className="text-sm text-gray-500 mt-1">
                        {subject.bookCount} book{subject.bookCount !== 1 ? "s" : ""}
                      </p>
                      <div className="mt-4 w-16 h-1 bg-blue-500 rounded-full group-hover:w-24 transition-all duration-500"></div>
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
  try {
    // Try to load subjects with book counts
    const subjects = await prisma.subject.findMany({
      orderBy: { id: "asc" },
      include: {
        BookCategory: {
          include: {
            Books: true,
          },
        },
      },
    });

    const formatted = subjects.map((sub) => {
      const bookCount = (sub.BookCategory || []).reduce(
        (acc, cat) => acc + (cat.Books?.length || 0),
        0
      );
      return {
        id: sub.id,
        name: sub.name,
        svg: sub.svg || null,
        bookCount,
      };
    });

    return {
      props: { subjects: JSON.parse(JSON.stringify(formatted)) },
    };
  } catch (error) {
    // Fallback: BookCategory table may not exist yet — just fetch subjects
    console.error("Error loading books (falling back):", error);
    try {
      const subjects = await prisma.subject.findMany({
        orderBy: { id: "asc" },
        select: { id: true, name: true, svg: true },
      });
      const formatted = subjects.map((sub) => ({
        id: sub.id,
        name: sub.name,
        svg: sub.svg || null,
        bookCount: 0,
      }));
      return { props: { subjects: JSON.parse(JSON.stringify(formatted)) } };
    } catch (e) {
      return { props: { subjects: [] } };
    }
  }
}
