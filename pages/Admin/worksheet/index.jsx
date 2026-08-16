import React from 'react';
import { useSession, getSession } from 'next-auth/react';
import { prisma } from '../../../util/db.server';
import { VerticalNavbar } from '../../../components/Admin/VerticalNavbar';
import { MainHeader } from '../../../components/common/MainHeader';
import { AddWorksheet } from '../../../components/Admin/worksheet/AddWorksheet';
import { DisplayWorksheet } from '../../../components/Admin/worksheet/DisplayWorksheet';

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (session?.user?.role !== 'admin') {
    return { redirect: { destination: '/auth/Admin/Login/signin-user', permanent: false } };
  }

  const subjects = await prisma.subject.findMany({
    include: {
      WorksheetTopic: {
        include: { Worksheets: true },
      },
    },
    orderBy: { createdAt: 'desc' },
  });

  const topics = await prisma.worksheetTopic.findMany({
    orderBy: { id: 'desc' },
  });

  return {
    props: {
      subjects: JSON.parse(JSON.stringify(subjects)),
      topics: JSON.parse(JSON.stringify(topics)),
    },
  };
}

export default function WorksheetPage({ subjects, topics }) {
  const { data } = useSession();
  return (
    <React.Fragment>
      <MainHeader title="Worksheet Dashboard" />
      <section className="flex flex-col w-full h-full bg-[#e6e6e6] pt-10">
        <div className="w-full h-full flex flex-row">
          <VerticalNavbar data={data} />
          <div className="w-full px-6">
            <AddWorksheet subjects={subjects} topics={topics} />
            <DisplayWorksheet subjects={subjects} />
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}
