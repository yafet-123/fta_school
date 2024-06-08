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
    shape: 'absolute bottom-10 left-10 w-24 h-12 bg-blue-100 rounded-l-full tansform -rotate-45 bg-opacity-50',
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
    shape: 'absolute bottom-10 left-10 w-24 h-12 bg-blue-100 rounded-r-full tansform rotate-45 bg-opacity-50',
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
    shape: 'absolute bottom-10 left-10 w-24 h-12 bg-blue-100 rounded-b-full tansform -rotate-45 bg-opacity-50',
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
    shape: 'absolute bottom-10 left-10 w-24 h-12 bg-blue-100 rounded-t-full tansform -rotate-90 bg-opacity-50',
  },
];

export const TeamMember = ({ index, name, title, image, description, shape }) => {
  const isEven = index % 2 === 0;
  return (
    <div className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} mb-12 relative z-10 px-4`}>
      <div className="w-full md:w-1/2 lg:px-6">
        <div className="relative w-full h-full overflow-hidden lg:clip-path-polygon">
          <Image
            src={image}
            alt={name}
            priority
            width={350}
            height={350}
            className="absolute w-full h-full lg:object-cover"
          />
          <div className={`${shape}`}></div>
        </div>
      </div>
      <div className="md:w-1/2 flex flex-col justify-center lg:px-6">
        <h3 className="text-2xl lg:text-3xl font-bold text-blue-600 mb-5">{name}</h3>
        <p className="text-md lg:text-lg text-gray-600 font-bold mb-5">{title}</p>
        <p className="text-md lg:text-lg text-gray-600">{description}</p>
      </div>
    </div>
  );
};

const TeamSection = () => {

  return (
    <section className="bg-white text-gray-800 pt-16 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center px-4">
          <div className="mb-10">
            <h2 className="text-4xl lg:text-5xl font-bold text-blue-600">Meet <br/> our team</h2>
            <p className="text-lg lg:text-xl text-gray-600 mt-4">
              Award-winning national and international <br /> key opinion leaders
            </p>
          </div>
    
          <div className="hidden lg:flex relative w-48 h-24 bg-blue-600 flex align-center justify-center rounded-b-full tansform -rotate-45">
            <div className="absolute -top-5 w-32 h-20 bg-white border-blue-600 rounded-b-full"></div>
          </div>
        </div>

        {teamMembers.map((member, index) => (
          <TeamMember
            key={index}
            index={index}
            name={member.name}
            title={member.title}
            image={member.image}
            description={member.description}
            shape={member.shape}
          />
        ))}
      </div>

      <div className="mt-16 text-center relative px-4 py-5 z-10 bg-[#44576d] mb-5">
          <h3 className="text-2xl lg:text-3xl font-bold text-white mb-5">
            Discover our upcoming courses
          </h3>
          <p className="text-lg lg:text-xl text-white mb-5">
            Foundation courses, Advanced courses, Masterclasses and more.
          </p>
          <button className="text-lg lg:text-xl mt-4 px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:text-2xl hover:bg-blue-700">
            Explore
          </button>
        </div>
    </section>
  );
};

export default TeamSection;