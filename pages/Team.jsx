<<<<<<< HEAD
import { MainHeader } from '../components/common/MainHeader';
import React from 'react'
=======
import { MainHeader } from "../components/common/MainHeader";
>>>>>>> 0306f37bdbd9c29dc14158fb38dab803e1b3073a
import TeamSection from "../components/Team/TeamSection"
import {useRouter} from 'next/router'


export default function Home() {
  const router = useRouter();
  const handleQuiz = () => {
    router.push(`/quiz`);
  };
  return (
<<<<<<< HEAD
    <React.Fragment>
      <MainHeader title="Aceit : Team Page" />
      <div className="flex flex-col pt-20">
        <TeamSection />
      </div>
    </React.Fragment>
=======
    <div className="">
      <MainHeader title="Matrick Mate : Team" />
      <div className="flex flex-col pt-20">
        <TeamSection />
      </div>
    </div>
>>>>>>> 0306f37bdbd9c29dc14158fb38dab803e1b3073a
  );
}
