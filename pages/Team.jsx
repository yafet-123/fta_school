import { MainHeader } from "../components/common/MainHeader";
import CommonHeroSection from '../components/home/CommonHeroSection.jsx';
import TeamSection from "../components/Team/TeamSection"
import {useRouter} from 'next/router'


export default function Home() {
  const router = useRouter();
  const handleQuiz = () => {
    router.push(`/quiz`);
  };
  return (
    <div className="">
      <MainHeader title="Future Talent Academy" />
      <div className="flex flex-col pt-20">
        <TeamSection />
      </div>
    </div>
  );
}
