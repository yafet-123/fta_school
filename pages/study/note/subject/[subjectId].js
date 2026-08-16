import { useRouter } from "next/router";
import { prisma } from "../../../../util/db.server";
import React from "react";
import { MainHeader } from "../../../../components/common/MainHeader";

export async function getServerSideProps(context) {
  const { subjectId } = context.params;

  try {
    const categories = await prisma.noteCategory.findMany({
      where: {
        subjectId: Number(subjectId),
      },
      include: {
        Notes: true,
      },
      orderBy: {
        id: "desc",
      },
    });

    const formattedCategories = categories.map((cat) => ({
      id: cat.id,
      title: cat.title,
      notes: cat.Notes,
      Note: cat.Notes[0] || null,
    }));

    return {
      props: {
        categories: JSON.parse(JSON.stringify(formattedCategories)),
      },
    };
  } catch (error) {
    console.error("Error fetching note categories:", error);
    return {
      props: {
        categories: [],
        error: "Failed to load note categories.",
      },
    };
  }
}

export default function NotesBySubject({ categories = [] }) {
  const router = useRouter();

  const goToCategoryDetail = (categoryId) => {
    router.push(`/study/note/${categoryId}`);
  };

  return (
    <div className="py-32 px-5 lg:px-20">
      <MainHeader title="Aceit : Notes by Subject" />
      <div>
        {categories.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {categories.map((category) => (
              <div
                key={category.id}
                className="cursor-pointer bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-2xl shadow-lg p-6 hover:scale-105 transition transform"
                onClick={() => goToCategoryDetail(category.id)}
              >
                <h2 className="font-bold text-xl md:text-2xl">
                  {category.title}
                </h2>

                <p className="mt-2 text-sm opacity-90">
                  {category.notes?.length > 1 ? (
                    <>{category.notes.length} notes</>
                  ) : category.Note?.title ? (
                    <>Note: {category.Note.title}</>
                  ) : (
                    <>Note Category</>
                  )}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600 text-lg">
            There are currently no Note categories for this subject. Please check back later.
          </p>
        )}
      </div>
    </div>
  );
}
