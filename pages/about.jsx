import { MainHeader } from "../components/common/MainHeader";
import CommonHeroSection from '../components/home/CommonHeroSection.jsx';
import ImageGallery from "../components/home/ImageGallery"
import Testimonials from "../components/home/Testimonials"
import ContactInformation from "../components/home/ContactInformation"
import NewsEvents from "../components/home/NewsEvents"
import {useRouter} from 'next/router'


export default function About() {
  return (
    <div className="">
      <MainHeader title="Future Talent Academy : About" />
      <div className="flex flex-col">
        <CommonHeroSection  
          Tag="Empowering minds and shaping futures at Future Talent Academy - where excellence meets opportunity."
          Welcome_Message="At Future Talent Academy, we take pride in fostering an environment where every student is empowered to unleash their potential. Our commitment lies in the holistic development of young minds, providing a dynamic platform where academic excellence meets individualized opportunities."
        />
        <Testimonials />
        <ImageGallery />
        <ContactInformation />
        <NewsEvents />
      </div>
    </div>
  );
}
