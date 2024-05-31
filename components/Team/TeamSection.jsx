import Image from 'next/image';

const teamMembers = [
  {
    name: 'Hilary Sedgwick',
    title: 'Founder & CEO',
    image: '/1.png', // Add your image paths here
    description:`Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
      quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
      consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
      cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
      proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
    shape: 'circle',
  },
  {
    name: 'Scott Peters',
    title: 'Founder & CEO',
    image: '/2.png',
    description:`Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
      quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
      consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
      cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
      proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
    shape: 'custom',
  },
  {
    name: 'Jack Hartman',
    title: 'Founder & CEO',
    image: '/3.png',
    description:`Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
      quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
      consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
      cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
      proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
    shape: 'rounded',
  },
  {
    name: 'Heather Kramer',
    title: 'Founder & CEO',
    image: '/4.png',
    description:`Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
      quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
      consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
      cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
      proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
    shape: 'custom',
  },
];

export const TeamMember = ({ name, title, image, description, shape }) => {
  let shapeClasses = '';

  switch (shape) {
    case 'circle':
      shapeClasses = 'rounded-full';
      break;
    case 'rounded':
      shapeClasses = 'rounded-lg';
      break;
    case 'custom':
      shapeClasses = 'clip-path-polygon';
      break;
    default:
      shapeClasses = '';
  }

  return (
    <div className="flex flex-col md:flex-row mb-12 relative z-10">
      <div className="md:w-1/2">
        <div className={`w-full h-full overflow-hidden ${shapeClasses}`}>
          <Image
            src={image}
            alt={name}
            width={500}
            height={500}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <div className="md:w-1/2 flex flex-col justify-center p-6">
        <h3 className="text-2xl font-bold text-blue-600">{name}</h3>
        <p className="text-gray-600 font-semibold mb-4">{title}</p>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
};

const TeamSection = () => {

  return (
    <section className="bg-white text-gray-800 py-16 px-4 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center">
          <div className="mb-10">
            <h2 className="text-xl lg:text-5xl font-bold text-blue-600">Meet <br/> our team</h2>
            <p className="text-lg lg:text-xl text-gray-600 mt-4">
              Award-winning national and international <br /> key opinion leaders
            </p>
          </div>
    
          <div class="relative w-48 h-24 bg-blue-600 flex justify-center rounded-b-full tansform -rotate-45">
            <div class="absolute w-32 h-16 bg-white border-blue-600 rounded-b-full"></div>
          </div>
          {/*<div className="absolute bottom-0 right-0 w-64 h-32 bg-indigo-500 rounded-b-full"></div>
          <div className="absolute top-1/4 left-1/2 w-32 h-16 bg-blue-500 rounded-t-full"></div>
          <div className="absolute top-1/2 right-1/3 w-20 h-10 bg-indigo-400 rounded-b-full"></div>*/}
        </div>

        {teamMembers.map((member, index) => (
          <TeamMember
            key={index}
            name={member.name}
            title={member.title}
            image={member.image}
            description={member.description}
            shape={member.shape}
          />
        ))}

        <div className="mt-16 text-center relative z-10">
          <h3 className="text-2xl font-bold text-gray-800">Discover our upcoming courses</h3>
          <p className="text-gray-600 mt-2">Foundation courses, Advanced courses, Masterclasses and more.</p>
          <button className="mt-4 px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700">
            Explore
          </button>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;