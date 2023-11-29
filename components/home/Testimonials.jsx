import Image from 'next/image';
import ReactStars from "react-rating-stars-component";

export default function Testimonials() {
	const testimonials = [
		{
			name: 'Sarah D',
      		image: "/Testimonals/cherishe.jpg",
      		star:5,
      		description:"Enrolling our child in Future Talent Academy was one of the best decisions we made for their education. The personalized attention and innovative teaching methods have truly made a positive impact on our child's academic performance and overall development.",
		},
		{
			name: 'David M',
      		image: "/Testimonals/maleone.jpg",
      		star:5,
      		description:"Future Talent Academy is not just a school; it's a place where learning becomes an exciting adventure. The engaging curriculum and supportive teachers have made my educational journey both enjoyable and enriching. ",
		},
		{
			name: 'Liya A',
      		image: "/Testimonals/maletwo.jpg",
      		star:5,
      		description:"Reflecting on my time at Future Talent Academy, I am immensely thankful for the strong educational foundation it provided. The school's commitment to academic excellence, coupled with a focus on character development, has played a pivotal role in my success beyond the classroom.",
		},
	]
  	return (
	    <section className="bg-[#1A3E58] py-5">
	  		<div className="px-4 py-12 sm:px-6 lg:px-8 lg:py-16 h-full md:h-[600px] testimony-1">
	    		<h2 className="text-center text-4xl font-bold tracking-tight text-white sm:text-5xl mb-20">
	      			Read trusted reviews from our customers
	    		</h2>

	    		<div className="mt-8 grid grid-cols-1 gap-16 md:gap-4 md:grid-cols-3 md:gap-8">
	    			{ testimonials.map((testimonial,index)=>(
				      	<blockquote key={index} className="rounded-lg bg-[#EDF1F4] shadow-sm py-6 sm:py-8 px-4 bg-opacity-60">
					        <div className="flex flex-col justify-center items-center gap-4 -mt-16">
					          <Image
					            alt="Man"
					            src={testimonial.image}
					            priority
					            width={56}
					            height={56}
					            className="h-14 w-14 rounded-full object-cover "
					          />
					      
					            <p className="mt-0.5 text-lg font-medium text-white">{testimonial.name}</p>
					     
					        </div>

					        <div className="flex justify-center items-center">
				                <ReactStars
				                  count={5}
				                  value={5}
				                  size={24}
				                  activeColor="#ffd700"
				                />
				            </div>

					        <p className="mt-4 md:text-xl text-lg text-white">
					          {testimonial.description}
					        </p>
				      	</blockquote>
			      	))}
	    		</div>
	  		</div>
	    </section>
  	);
};
