import React from "react";
import { useSession, getSession } from "next-auth/react";
import { prisma } from '../../../util/db.server.js';
import { VerticalNavbar } from "../../../components/Admin/VerticalNavbar";
import { MainHeader } from '../../../components/common/MainHeader';
import { AddSyllablus } from "../../../components/Admin/Syllablus/AddSyllablus";
import { DisplaySyllablus } from "../../../components/Admin/Syllablus/DisplaySyllablus";

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const userRole = session?.user?.role;

  if (userRole !== 'admin') {
    return {
      redirect: {
        destination: '/auth/Admin/Login/signin-user',
        permanent: false,
      },
    };
  }

  const subjects = await prisma.subject.findMany({
    include: {
      Syllablus: true,
    },
    orderBy: { createdAt: "desc" },
  });

  const formattedSubjects = subjects.map((sub) => ({
    id: sub.id,
    name: sub.name,
    description: sub.description,
    Syllablus: sub.Syllablus.map((item) => ({
      id: item.id,
      title: item.title,
      content: item.content,
      subjectId: item.subjectId,
    })),
  }));

  return {
    props: {
      subjects: JSON.parse(JSON.stringify(formattedSubjects)),
    },
  };
}

export default function SyllablusPage({ subjects }) {
  const { data } = useSession();

  return (
    <React.Fragment>
      <MainHeader title="Syllabus Dashboard" />
      <section className="flex flex-col w-full h-full bg-[#e6e6e6] pt-10">
        <div className="w-full h-full flex flex-row">
          <VerticalNavbar data={data} />
          <div className="w-full px-6">
            <AddSyllablus subjects={subjects} />
            <DisplaySyllablus subjects={subjects} />
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}
