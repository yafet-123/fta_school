import Image from 'next/image'
import Image1 from '../../public/heroImge1.jpg';
import Image2 from '../../public/heroImge2.jpg';

export default function NewsEvents() {
  const events = [
    { date: '04 Jan', title: 'Event 1' },
    { date: '05 Jan', title: 'Event 2' },
    { date: '06 Jan', title: 'Event 3' },
  ];

  const eventsTwo = [
    {
      image:'/heroImge1.jpg',
      author:"name",
      date:"12-02-2024",
      description:"This is the descreption for the event one"
    },
    {
      image:Image2,
      author:"Second Name",
      date:"6-10-2023",
      description:"This is the descreption for the event two"
    }
  ]
  return (
    <div className="py-20 bg-gray-100 px-20">
      <h2 className="text-center text-3xl font-bold mb-10">News & Events</h2>
      <div className="flex items-center">
        <div className="flex flex-col justify-center w-1/4">
          {events.map((event, index) => (
            <div key={index} className="bg-white mb-5 p-6 rounded-lg shadow-md text-center">
              <p className="text-blue-900 font-bold mb-2">{event.date}</p>
              <p className="text-gray-600">{event.title}</p>
            </div>
          ))}
        </div>

        <div className="flex justify-between w-3/4 ">
          {eventsTwo.map((data,index)=>(
            <div key={index} className="flex flex-col justify-between w-full h-72 mx-20">
              <Image
                src={data.image}
                alt={`Image ${index}`}
                priority
                
                className="h-14 w-full object-cover "
              />

              <div className="flex justify-between">
                <p className="text-lg font-bold">{data.author}</p>
                <p className="text-md font-normal mb-2">{data.date}</p>
              </div>
              <p>{data.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
