import React from "react";
import { useSession, getSession } from "next-auth/react";
import { prisma } from '../../../util/db.server.js';
import { VerticalNavbar } from "../../../components/Admin/VerticalNavbar";
import { MainHeader } from '../../../components/common/MainHeader';
import { AddComprehensiveNotes } from "../../../components/Admin/note/AddComprehensiveNotes";
import { DisplayComprehensiveNotes } from "../../../components/Admin/note/DisplayComprehensiveNotes";

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const userRole = session?.user?.role;

  // Redirect non-admins
  if (userRole !== 'admin') {
    return {
      redirect: {
        destination: '/auth/Admin/Login/signin-user',
        permanent: false,
      },
    };
  }

  try {
    // Fetch all notes with category and subject
    const notes = await prisma.Note.findMany({
      include: {
        NoteCategory: {
          include: {
            Subject: true,
          },
        },
      },
      orderBy: { createdAt: "desc" }
    });

    const subjects = await prisma.Subject.findMany({
      include: {
        NoteCategory: true,
      },
      orderBy: { createdAt: "desc" }
    });

    const formattedNotes = notes.map(note => ({
      id: note.id,
      title: note.title,
      content: note.content,
      subject: note.NoteCategory?.Subject ? note.NoteCategory.Subject.name : "No subject",
      categoryTitle: note.NoteCategory ? note.NoteCategory.title : "No category",
      noteCategoryId: note.noteCategoryId,
      createdAt: note.createdAt
    }));

    const formattedSubjects = subjects.map(sub => ({
      id: sub.id,
      name: sub.name,
      description: sub.description,
      svg: sub.svg,
      NoteCategory: sub.NoteCategory.map(cat => ({
        id: cat.id,
        title: cat.title,
      })),
    }));

    return {
      props: {
        subjects: JSON.parse(JSON.stringify(formattedSubjects)),
        notes: JSON.parse(JSON.stringify(formattedNotes)),
        userId: session?.user?.user_id || null
      }
    };
  } catch (error) {
    console.error("Error fetching subjects or notes:", error);
    return {
      props: {
        subjects: [],
        notes: [],
        error: "Failed to fetch data."
      }
    };
  }
}

export default function FlashcardsPage({ subjects, notes, userId }) {
  const { data } = useSession();
  
  return (
    <React.Fragment>
      <MainHeader title="Comprehensive Note Dashboard" />
      <section className="flex flex-col w-full h-full bg-[#e6e6e6] pt-10">
        <div className='w-full h-full flex flex-row'>
          <VerticalNavbar data={data} />
          <div className="w-full px-6">
            <AddComprehensiveNotes subjects={subjects} userId={userId} />
            <DisplayComprehensiveNotes notes={notes} subjects={subjects} />
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}
