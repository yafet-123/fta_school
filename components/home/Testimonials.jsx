import Image from 'next/image';
import ReactStars from "react-rating-stars-component";

export default function Testimonials() {
	const testimonials = [
		{
			name: 'Sarah D',
			job:"student name 1",
      		image: "/Testimonals/cherishe.jpg",
      		star:5,
      		description:"Enrolling our child in Future Talent Academy was one of the best decisions we made for their education. The personalized attention and innovative teaching methods have truly made a positive impact on our child's academic performance and overall development.",
		},
		{
			name: 'David M',
			job:"student name 2",
      		image: "/Testimonals/maleone.jpg",
      		star:5,
      		description:"Future Talent Academy is not just a school; it's a place where learning becomes an exciting adventure. The engaging curriculum and supportive teachers have made my educational journey both enjoyable and enriching. ",
		},
		{
			name: 'Liya A',
			job:"student name 3",
      		image: "/Testimonals/maletwo.jpg",
      		star:5,
      		description:"Reflecting on my time at Future Talent Academy, I am immensely thankful for the strong educational foundation it provided. The school's commitment to academic excellence, coupled with a focus on character development, has played a pivotal role in my success beyond the classroom.",
		},
	]
  	return (
	    <div className="py-20 bg-white mx-5 lg:mx-20">
      		<h2 className="text-center text-3xl font-bold mb-10">What Our Students Have To Say</h2>
      		<div className="flex flex-col lg:flex-row justify-center lg:space-x-8">
        		{testimonials.map((testimonial, index) => (
          			<div key={index} className="bg-gray-100 p-6 rounded-lg shadow-md text-left mb-5">
          				<div className="flex mb-5">
          					<Image
					            alt="Man"
					            src={testimonial.image}
					            priority
					            width={56}
					            height={56}
					            className="h-14 w-14 rounded-full object-cover "
					        />
					        <div className="flex flex-col mx-5">
            					<p className="text-lg font-bold">{testimonial.name}</p>
            					<p className="text-md font-normal mb-2">{testimonial.job}</p>
            				</div>
            			</div>
            			<p className="text-gray-600">{testimonial.description}</p>
          			</div>
        		))}
      		</div>
    	</div>
  	);
};
