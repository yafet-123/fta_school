import Image from 'next/image';

const leaders = [
  {
    name: 'Hilary Sedgwick',
    position: 'Founder & CEO',
    image: '/1.png', // Add your image paths here
  },
  {
    name: 'Scott Peters',
    position: 'Founder & CEO',
    image: '/2.png',
  },
  {
    name: 'Jack Hartman',
    position: 'Founder & CEO',
    image: '/3.png',
  },
  {
    name: 'Heather Kramer',
    position: 'Founder & CEO',
    image: '/4.png',
  },
];

const TeamSection = () => {
  return (
    <div className="bg-gradient-to-r from-purple-500 to-blue-500 py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-white text-center mb-8">Our Leadership</h2>
        <p className="text-white text-center mb-12">
          We've assembled an unprecedented level of hands-on talent under one roof. 
          We are top heavy by senior talents and an experienced leadership.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {leaders.map((leader, index) => (
            <div key={index} className="relative bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="w-full h-56 relative">
                <Image
                  src={leader.image}
                  alt={leader.name}
                  layout="fill"
                  objectFit="cover"
                  className="absolute inset-0 w-full h-full"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800">{leader.name}</h3>
                <p className="text-gray-600 mb-4">{leader.position}</p>
                <button className="text-blue-500 hover:text-blue-600 font-semibold">View Bio</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamSection;
