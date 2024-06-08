import { MainHeader } from "../components/common/MainHeader";
import CommonHeroSection from '../components/home/CommonHeroSection.jsx';
import AboutDetail from "../components/about/aboutDetail"

export default function About() {
  return (
    <div className="">
      <MainHeader title="Future Talent Academy : About" />
      <div className="flex flex-col pt-20">
        <h1 className="text-center text-2xl lg:text-4xl py-5 text-black text-capitalize font-bold">
          About Us
        </h1>
        <AboutDetail />
      </div>
    </div>
  );
}
