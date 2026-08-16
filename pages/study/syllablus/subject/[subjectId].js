import React from "react";
import { prisma } from "../../../../util/db.server";
import { FaGraduationCap } from "react-icons/fa";
import { MainHeader } from "../../../../components/common/MainHeader";

export async function getServerSideProps(context) {
  const { subjectId } = context.params;

  try {
    const subject = await prisma.subject.findUnique({
      where: { id: Number(subjectId) },
      include: {
        Syllablus: true,
      },
    });

    if (!subject) {
      return { notFound: true };
    }

    return {
      props: {
        subjectName: subject.name,
        syllabi: JSON.parse(JSON.stringify(subject.Syllablus || [])),
      },
    };
  } catch (error) {
    console.error("Error fetching subject syllabus:", error);
    return {
      props: {
        subjectName: "",
        syllabi: [],
      },
    };
  }
}

export default function SyllablusBySubject({ subjectName, syllabi }) {
  const getLink = (content) => {
    if (!content) return "#";
    const trimmed = content.trim();
    if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
      return trimmed;
    }
    if (trimmed.startsWith("www.") || trimmed.includes("drive.google.com") || trimmed.includes("dropbox.com")) {
      return `https://${trimmed}`;
    }
    return trimmed;
  };

  return (
    <>
      <MainHeader title={`Aceit : ${subjectName} Syllabus`} />

      <div className="py-32 px-5 lg:px-20 min-h-screen bg-gray-50">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">{subjectName} Syllabus</h1>

        {syllabi.length === 0 ? (
          <p className="text-gray-600 text-lg">
            No syllabus available for this subject yet.
          </p>
        ) : (
          <div className="flex flex-col gap-4">
            {syllabi.map((item) => {
              const link = getLink(item.content);
              return (
                <div
                  key={item.id}
                  className="flex justify-between items-center bg-[#f8f8f9] py-5 px-6 rounded-2xl hover:bg-[#ededf2] mb-3 transition"
                >
                  <div className="flex items-center">
                    <FaGraduationCap size={40} color="#3699ff" />
                    <h2 className="pl-4 text-black font-bold text-md md:text-lg">
                      {item.title}
                    </h2>
                  </div>

                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#3699ff] hover:bg-[#002244] text-white px-4 py-2 rounded-2xl text-md md:text-lg font-bold transition"
                  >
                    Open Syllabus
                  </a>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
