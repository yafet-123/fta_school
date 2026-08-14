import { useRouter } from "next/router";
import { prisma } from "../../../../util/db.server";
import React from "react";
import { MainHeader } from "../../../../components/common/MainHeader";

export async function getServerSideProps(context) {
  const { subjectId } = context.params;

  try {
    const topics = await prisma.PastPaperTopic.findMany({
      where: {
        subjectId: Number(subjectId),
      },
      include: {
        Papers: true,
      },
      orderBy: {
        id: "desc",
      },
    });

    // Provide each topic its list of papers + the first one for display
    const formattedTopics = topics.map((topic) => ({
      id: topic.id,
      title: topic.title,
      papers: topic.Papers,
      PastPaper: topic.Papers[0] || null,
    }));

    return {
      props: {
        topics: JSON.parse(JSON.stringify(formattedTopics)),
      },
    };
  } catch (error) {
    console.error("Error fetching past papers:", error);
    return {
      props: {
        topics: [],
        error: "Failed to load past papers.",
      },
    };
  }
}

export default function PastPapersBySubject({ topics }) {
  const router = useRouter();

  const goToTopicDetail = (topicId) => {
    router.push(`/study/past-paper/${topicId}`);
  };

  return (
    <div className="py-32 px-5 lg:px-20">
      <MainHeader title="Aceit : Past Papers by Subject" />
      <div>
        {topics.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {topics.map((topic) => (
              <div
                key={topic.id}
                className="cursor-pointer bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-2xl shadow-lg p-6 hover:scale-105 transition transform"
                onClick={() => goToTopicDetail(topic.id)}
              >
                <h2 className="font-bold text-xl md:text-2xl">
                  {topic.title}
                </h2>

                <p className="mt-2 text-sm opacity-90">
                  {topic.papers?.length > 1 ? (
                    <>{topic.papers.length} past papers</>
                  ) : topic.PastPaper?.title ? (
                    <>Paper: {topic.PastPaper.title}</>
                  ) : (
                    <>Past Paper</>
                  )}
                </p>

                {topic.papers?.length === 1 && topic.PastPaper?.year && (
                  <p className="text-sm opacity-70">
                    Year: {topic.PastPaper.year}
                  </p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600 text-lg">
            There are currently no Past Paper topics for this subject. Please check back later.
          </p>
        )}
      </div>
    </div>
  );
    }
