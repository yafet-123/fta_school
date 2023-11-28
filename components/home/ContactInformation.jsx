import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router';

export default function ContactInformation (){
	const router = useRouter();
  const handleContact = () => {
    router.push(`/contact`);
  };
	return(
		<section className="py-10">
	      <div className="text-left text-black px-5 lg:px-32">
				<div className="text-center font-semibold text-black text-2xl md:text-4xl lg:text-5xl p-3 md:p-14">
					<span className="font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text" >
						Get in Touch
					</span>
					<ul className="md:text-xl text-base text-center my-5">
						<span className="">{`Curious to learn more about Future Talent Academy? Feel free to get in touch with us! Whether you have inquiries about our programs, admissions, or simply want to explore how we can nurture your child's potential, our friendly team is here to assist. Connect with us today and embark on a journey towards educational excellence and a future filled with possibilities. Your questions are important to us, and we look forward to hearing from you soon.`}</span>
					</ul>
					<ul className="flex flex-col md:flex-row items-center justify-center md:text-xl text-base text-center my-1">
						<span className="font-bold">Phone : </span>
						<Link
              				target="_blank"
              				className="flex flex-row items-center gap-2 hover:text-gray-300"
              				href={`tel:${+251777940161}`}
            			>
              				<p className="ml-3">+251777940161</p>
            			</Link>
					</ul>

					<ul className="flex flex-col md:flex-row items-center justify-center md:text-xl text-base text-center my-1">
						<span className="font-bold">Email : </span>
						<Link
              				target="_blank"
              				className="flex flex-row items-center gap-2 hover:text-gray-300"
              				href="mailto:info@futuretalentacademy.com"
            			>
              				<p className="ml-3">info@futuretalentacademy.com</p>
      
            			</Link>
					</ul>
					<button 
						onClick={() => handleContact()}
						className="bottom-5 font-bold md:text-lg text-md  py-1 md:py-2 px-5 bg-gradient-to-r from-red-500 to-blue-500 hover:bg-[#00D1BB] text-white  border-2 border-white rounded-md">
						Chat with Us
					</button>
				</div>
			</div>
    	</section>
	)
}