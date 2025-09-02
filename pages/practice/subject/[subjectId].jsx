import { MainHeader } from "../../components/common/MainHeader";
import { getAllSubjects, getSubjectById } from "../../data/BooksData.jsx";
import Subject from "../../components/books/Subject";

export default function BookGradeDetail({ subjects, all_subjects }) {
  console.log(subjects);
  return (
    <div className="antialiased bg-gradient-to-r">
      <MainHeader title={`Future Talent Academy`} />
      <Subject subjects={subjects} />
    </div>
  );
}
 
export const getStaticProps = async (context) => {
  const subjectId = context.params.subjectId;
  const subjects = getSubjectById(subjectId);
  const all_subjects = getAllSubjects();

  if (!all_subjects) {
    return {
      notFound: true,
    };
  }

  if (!subjects) {
    return {
      notFound: true,
    };
  }

  return {
    props: { subjects: subjects, all_subjects: all_subjects },
    revalidate: 3600,
  };
};

export const getStaticPaths = async (context) => {
  const subjects = getAllSubjects();
  //   console.log(context)

  // Get the paths we want to pre-render based on subjects
  const paths = subjects.map((subject) => ({
    params: { subjectId: subject.id },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths: paths, fallback: false };
};
