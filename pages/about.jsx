import { MainHeader } from "../components/common/MainHeader";
import CommonHeroSection from '../components/home/CommonHeroSection.jsx';
import AboutDetail from "../components/about/aboutDetail"
import AboutHeroSection from "../components/about/AboutHeroSection"

export default function About() {
  return (
    <div className="">
      <MainHeader title="Future Talent Academy : About" />
      <div className="flex flex-col pt-20 bg-[#5790ab]">
        <AboutHeroSection />
        <AboutDetail />
      </div>
    </div>
  );
}
