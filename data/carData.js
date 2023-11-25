import DezireCarImage from '../public/car_rental_pictures/Suzuki-Desire.webp';
import CorollaCarImage from '../public/car_rental_pictures/toyota corrola.webp';
import VitzCarImage from '../public/car_rental_pictures/vitz.jpg';
//four by four cars
import NissanPatrolImage from '../public/car_rental_pictures/Nissan Patrol.jpg';
import LandCruiserImage from '../public/car_rental_pictures/Toyota-LC-Hard-Top-St-Wagon-original.jpg';
import LandCruiser105Image from '../public/car_rental_pictures/Toyota-Land-Cruiser-105-2003-white.jpg';
import V8CarImage from '../public/car_rental_pictures/land-cruiser-exterior-right-front-three-quarter.webp';
// minibus
import HighRoofCarImage from '../public/car_rental_pictures/TOYOTA-HIACE.jpg';
import StarexCarImage from '../public/car_rental_pictures/starex-exterior-creamy-white.jpg';
// bus
import FiftySeaterBusImage from '../public/car_rental_pictures/50seaterBus.png';
import CaosterBusImage from '../public/car_rental_pictures/Coaster_WB-1.jpg';


export const packages = [
  {
    id: 1,
    name: 'Toyota Corolla',
    type: 'Sedan',
    seating: 5,
    luggage: 'Medium',
    fuel: 'Petrol',
    transmission: 'Automatic',
    airConditioning: true,
    features: ['Airbags', 'Bluetooth', 'USB Ports'],
    description:
      'A comfortable and reliable sedan for city and highway travel.',
    image: CorollaCarImage,
  },
  {
    id: 2,
    name: 'Land Cruiser Hard Top',
    type: '4x4',
    seating: 8,
    luggage: 'Limited',
    fuel: 'Diesel',
    transmission: 'Manual',
    airConditioning: true,
    features: ['4x4 capabilities', 'Spacious', 'Off-road performance'],
    description:
      'Experience the ultimate off-road adventure in our rugged Land Cruiser Hard Top.',
    image: LandCruiserImage,
  },
  {
    id: 3,
    name: 'Toyota High Roof',
    type: 'Mini Bus',
    seating: 15,
    luggage: 'Ample',
    fuel: 'Diesel',
    transmission: 'Manual',
    airConditioning: true,
    features: [
      'Spacious interior',
      'Comfortable seats',
      'Air conditioning for all',
    ],
    description:
      'Travel with a group in style and comfort with our High Roof Mini Bus.',
    image: HighRoofCarImage,
  },
  {
    id: 4,
    name: 'Coaster Bus',
    type: 'Bus',
    seating: 28,
    luggage: 'Ample',
    fuel: 'Diesel',
    transmission: 'Manual',
    airConditioning: true,
    features: [
      'Spacious interior',
      'Comfortable seats',
      'Air conditioning for all',
    ],
    description:
      'Travel with a group in style and comfort with our Coaster Bus.',
    image: CaosterBusImage,
  },
];

export const ServicesArray = [
  {
    title: 'Airport Transfers',
    //   icon: <FaBusAlt size={75} color="white" />,
    description:
      'Start your journey hassle-free with our reliable airport transfer service. Our courteous drivers will greet you with a warm welcome and ensure a smooth and comfortable ride to your destination.',
  },
  {
    title: 'Intercity Trips',
    //   icon: <AiFillStar size={75} color="white" />,
    description:
      'Embark on an unforgettable adventure with our well-planned intercity trips. Discover diverse landscapes and iconic landmarks as you travel to your desired destinations.',
  },
  {
    title: 'Wedding Events',
    //   icon: <BsHeadset size={75} color="white" />,
    description:
      'Make your special day even more memorable with our luxury car service. Arrive in style and elegance with our beautifully decorated vehicles, adding an extra touch of sophistication to your wedding.',
  },
  {
    title: 'Business Meetings',
    //   icon: <BsPersonBoundingBox size={75} color="white" />,
    description:
      'Impress your clients and partners with our professional car service for business meetings. Our punctual chauffeurs will ensure you reach your destination on time, allowing you to focus on your agenda.',
  },
  {
    title: 'Safety Measures',
    //   icon: <FaHotel size={75} color="white" />,
    description:
      'Your safety is our top priority. Our vehicles undergo regular maintenance, and our experienced drivers follow all safety guidelines to ensure a secure and comfortable journey.',
  },
  {
    title: 'Professional Guides',
    //   icon: <MdPriceCheck size={75} color="white" />,
    description:
      'Enhance your travel experience with our knowledgeable guides who will share interesting insights and stories about the places you visit, enriching your journey with valuable information.',
  },
];

// car types
export const sedanCars = [
  {
    id: 1,
    name: 'Toyota Corolla',
    type: 'Sedan',
    seating: 5,
    luggage: 'Medium',
    fuel: 'Petrol',
    transmission: 'Automatic',
    airConditioning: true,
    features: ['Airbags', 'Bluetooth', 'USB Ports'],
    description:
      'A comfortable and reliable sedan for city and highway travel.',
    image: CorollaCarImage,
  },
  {
    id: 2,
    name: 'Suzuki Dezire',
    type: 'Sedan',
    seating: 5,
    luggage: 'Small',
    fuel: 'Petrol',
    transmission: 'Automatic',
    airConditioning: true,
    features: ['Airbags', 'Aux Input', 'Central Locking'],
    description: 'An economical sedan perfect for urban commuting.',
    image: DezireCarImage,
  },
  {
    id: 3,
    name: 'Vitz',
    type: 'Sedan',
    seating: 4,
    luggage: 'Small',
    fuel: 'Petrol',
    transmission: 'Automatic',
    airConditioning: true,
    features: ['Airbags', 'Keyless Entry', 'Power Steering'],
    description: 'A compact sedan with modern features ideal for city trips.',
    image: VitzCarImage,
  },
];

export const fourByFourCars = [
  {
    id: 1,
    name: 'Land Cruiser Hard Top',
    type: '4x4',
    seating: 8,
    luggage: 'Limited',
    fuel: 'Diesel',
    transmission: 'Manual',
    airConditioning: true,
    features: ['4x4 capabilities', 'Spacious', 'Off-road performance'],
    description:
      'Experience the ultimate off-road adventure in our rugged Land Cruiser Hard Top.',
    image: LandCruiserImage,
  },
  {
    id: 2,
    name: 'Nissan Patrol',
    type: '4x4',
    seating: 7,
    luggage: 'Limited',
    fuel: 'Petrol',
    transmission: 'Automatic',
    airConditioning: true,
    features: [
      'Luxurious interior',
      'Powerful engine',
      'Advanced safety features',
    ],
    description:
      'Embark on a journey of luxury and power with our Nissan Patrol 4x4.',
    image: NissanPatrolImage,
  },
  {
    id: 3,
    name: 'Land Cruiser 105',
    type: '4x4',
    seating: 8,
    luggage: 'Limited',
    fuel: 'Diesel',
    transmission: 'Manual',
    airConditioning: true,
    features: [
      'Sturdy design',
      'Off-road capabilities',
      'Comfortable interior',
    ],
    description:
      'Conquer the wilderness with the dependable Land Cruiser 105 4x4.',
    image: LandCruiser105Image,
  },
  {
    id: 4,
    name: 'Land Cruiser V8',
    type: '4x4',
    seating: 7,
    luggage: 'Limited',
    fuel: 'Diesel',
    transmission: 'Automatic',
    airConditioning: true,
    features: ['Powerful engine', 'Luxurious features', 'Smooth ride'],
    description: 'Experience power and elegance with our Land Cruiser V8 4x4.',
    image: V8CarImage,
  },
];

export const miniBusCars = [
  {
    id: 1,
    name: 'Toyota High Roof',
    type: 'Mini Bus',
    seating: 15,
    luggage: 'Ample',
    fuel: 'Diesel',
    transmission: 'Manual',
    airConditioning: true,
    features: [
      'Spacious interior',
      'Comfortable seats',
      'Air conditioning for all',
    ],
    description:
      'Travel with a group in style and comfort with our High Roof Mini Bus.',
    image: HighRoofCarImage,
  },
  {
    id: 2,
    name: 'Hyundai Grand Starex',
    type: 'Mini Bus',
    seating: 12,
    luggage: 'Ample',
    fuel: 'Diesel',
    transmission: 'Manual',
    airConditioning: true,
    features: [
      'Compact size',
      'Efficient fuel consumption',
      'Comfortable seating',
    ],
    description:
      'Navigate the city and beyond with our efficient Starx Mini Bus.',
    image: StarexCarImage,
  },
];

export const busCars = [
  {
    id: 1,
    name: 'Coaster Bus',
    type: 'Bus',
    seating: 28,
    luggage: 'Ample',
    fuel: 'Diesel',
    transmission: 'Manual',
    airConditioning: true,
    features: [
      'Spacious interior',
      'Comfortable seats',
      'Air conditioning for all',
    ],
    description:
      'Travel with a group in style and comfort with our Coaster Bus.',
    image: CaosterBusImage,
  },
  {
    id: 2,
    name: '50-Seater Bus',
    type: 'Bus',
    seating: 50,
    luggage: 'Ample',
    fuel: 'Diesel',
    transmission: 'Manual',
    airConditioning: true,
    features: [
      'Ample seating',
      'Large luggage capacity',
      'Air conditioning for all',
    ],
    description: 'Experience hassle-free group travel with our 50-Seater Bus.',
    image: FiftySeaterBusImage,
  },
];
