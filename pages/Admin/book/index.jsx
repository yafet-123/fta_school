import React from "react";
import { useSession, getSession } from "next-auth/react";
import { prisma } from '../../../util/db.server.js';
import { VerticalNavbar } from "../../../components/Admin/VerticalNavbar";
import { MainHeader } from '../../../components/common/MainHeader';
import { AddBook } from "../../../components/Admin/Book/AddBook";
import { DisplayBooks } from "../../../components/Admin/Book/DisplayBooks";

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
    orderBy: { createdAt: "desc" },
  });

  const formattedSubjects = subjects.map(sub => ({
    id: sub.id,
    name: sub.name,
    description: sub.description,
    BookCategory: sub.BookCategory.map(cat => ({
      id: cat.id,
      title: cat.title,
      Books: cat.Books.map(book => ({
        id: book.id,
        title: book.title,
        bookFile: book.bookFile,
        bookCategoryId: book.bookCategoryId,
        BookTopic: book.BookTopic.map(topic => ({
          id: topic.id,
          title: topic.title,
        })),
      })),
    })),
  }));

  return {
    props: {
      subjects: JSON.parse(JSON.stringify(formattedSubjects)),
    },
  };
}

export default function BookPage({ subjects }) {
  const { data } = useSession();

  return (
    <React.Fragment>
      <MainHeader title="Books Dashboard" />
      <section className="flex flex-col w-full h-full bg-[#e6e6e6] pt-10">
        <div className='w-full h-full flex flex-row'>
          <VerticalNavbar data={data} />
          <div className="w-full px-6">
            {/* Add Book Form */}
            <AddBook subjects={subjects} />

            {/* Display Existing Books */}
            <DisplayBooks subjects={subjects} />
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}
