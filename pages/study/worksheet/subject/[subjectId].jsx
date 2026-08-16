import React from 'react';
import { prisma } from '../../../../util/db.server';
import { MainHeader } from '../../../../components/common/MainHeader';
import { useRouter } from 'next/router';

export async function getServerSideProps(context) {
  const { subjectId } = context.params;
  try {
    const topics = await prisma.worksheetTopic.findMany({
      where: { subjectId: Number(subjectId) },
      include: { Worksheets: true },
      orderBy: { id: 'desc' },
    });
    const subject = await prisma.subject.findUnique({ where: { id: Number(subjectId) } });
    return {
      props: {
        topics: JSON.parse(JSON.stringify(topics)),
        subjectName: subject?.name || '',
      },
    };
  } catch (error) {
    return { props: { topics: [], subjectName: '' } };
  }
}

export default function WorksheetBySubject({ topics, subjectName }) {
  const router = useRouter();
  return (
    <div className="py-32 px-5 lg:px-20 min-h-screen bg-gray-50">
      <MainHeader title={`Aceit: ${subjectName} Worksheets`} />
      <div className="max-w-5xl mx-auto mb-8">
        <h1 className="text-3xl font-bold text-gray-800">{subjectName} — Worksheets</h1>
        <p className="text-gray-500 text-sm mt-1">{topics.length} topic{topics.length !== 1 ? 's' : ''}</p>
      </div>
      <div className="max-w-5xl mx-auto">
        {topics.length === 0 ? (
          <p className="text-center text-gray-600 text-lg py-12">No worksheet topics available for this subject.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {topics.map((topic) => (
              <div
                key={topic.id}
                className="cursor-pointer bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-2xl shadow-lg p-6 hover:scale-105 transition transform"
                onClick={() => router.push(`/study/worksheet/topic/${topic.id}`)}
              >
                <h2 className="font-bold text-xl md:text-2xl">{topic.title}</h2>
                <p className="mt-2 text-sm opacity-90">
                  {topic.Worksheets?.length || 0} worksheet{topic.Worksheets?.length !== 1 ? 's' : ''}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
