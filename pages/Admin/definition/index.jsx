import React from 'react';
import { useSession, getSession } from 'next-auth/react';
import { prisma } from '../../../util/db.server';
import { VerticalNavbar } from '../../../components/Admin/VerticalNavbar';
import { MainHeader } from '../../../components/common/MainHeader';
import { AddDefinition } from '../../../components/Admin/definition/AddDefinition';
import { DisplayDefinition } from '../../../components/Admin/definition/DisplayDefinition';

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (session?.user?.role !== 'admin') {
    return { redirect: { destination: '/auth/Admin/Login/signin-user', permanent: false } };
  }
  const subjects = await prisma.subject.findMany({
    include: { Definition: true },
    orderBy: { createdAt: 'desc' },
  });
  return { props: { subjects: JSON.parse(JSON.stringify(subjects)) } };
}

export default function DefinitionPage({ subjects }) {
  const { data } = useSession();
  return (
    <React.Fragment>
      <MainHeader title="Definition Dashboard" />
      <section className="flex flex-col w-full h-full bg-[#e6e6e6] pt-10">
        <div className="w-full h-full flex flex-row">
          <VerticalNavbar data={data} />
          <div className="w-full px-6">
            <AddDefinition subjects={subjects} />
            <DisplayDefinition subjects={subjects} />
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}
