import { MainHeader } from "../components/common/MainHeader";
import CommonHeroSection from "../components/home/CommonHeroSection.jsx";
import ContactForm from "../components/contact/ContactForm";
import ReachUs from "../components/contact/ReachUs";

export default function Contact() {
  

  return (
      <main className="w-full h-full px-2 lg:px-10 py-32 bg-white flex flex-col">
        <MainHeader title="Hulu Media Ecommerce : Contact" />
        <ContactForm />
      </main> 
  );
}
