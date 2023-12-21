import { MainHeader } from "../components/common/MainHeader";
import CommonHeroSection from '../components/home/CommonHeroSection.jsx';
// import PopularDestination from '../components/home/popularDestination';
// import OurServices from '../components/home/OurServices';
// import FeaturedTours from "../components/home/FeaturedTours1"
import Testimonials from "../components/home/Testimonials"
// import PhotographyFocus from "../components/home/PhotographyFocus"
// import WhyChooseUs from "../components/home/WhyChooseUs" 
// import ExploringUniqueDestinations from "../components/home/ExploringUniqueDestinations"
import ContactInformation from "../components/home/ContactInformation"
// import CapturingtheExtraordinary from "../components/home/CapturingtheExtraordinary"
// import CommunityServiceatOurCore from "../components/home/CommunityServiceatOurCore"
import {useRouter} from 'next/router'


export default function Home() {
  const router = useRouter();
  const handleQuiz = () => {
    router.push(`/quiz`);
  };
  return (
    <div className="">
      <MainHeader title="Future Talent Academy" />
      <div className="flex flex-col">
        <CommonHeroSection  
          Tag="Empowering minds and shaping futures at Future Talent Academy - where excellence meets opportunity."
          Welcome_Message="At Future Talent Academy, we take pride in fostering an environment where every student is empowered to unleash their potential. Our commitment lies in the holistic development of young minds, providing a dynamic platform where academic excellence meets individualized opportunities."
        />
        <Testimonials />
        <ContactInformation />

      </div>
    </div>
  );
}
