import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router';

export default function FeaturedTours() {
  const router = useRouter();
  const handleSeeTour = (tourid) => {
    router.push(`/tours/${tourid}`);
  };
  const tours = [
    {
      id:"1",
      tour: 'Trip to Danakill Depression',
      image: "/Dankil/danakil-hero.jpg",
      description:'This adventurous trip focuses on the arid north – east of the country which counts amongst its treasures the fascinating Danakil Depression.',
    },
    {
      id:'2',
      tour: 'Addis Ababa city tour',
      image: "/Addis Ababa/addis5.jpg",
      description:"Addis Ababa, the largest city in Ethiopia, is a hub of cultural diversity in East Africa due to its high level of industrialization and urbanization.",
    },
    {
      id:"4",
      tour: 'Ancient Rock hewn churches of Tigray',
      image: "/temp/Gheralta3.jpg",
      description:'Ethiopia has a fascinating history stretching back more than 3,000 years to the fabled reign of the Queen of Sheba and King Solomon.',
    },
    // {
    //   id:"6",
    //   tour: 'Excursion to Debre Libanos Monastery',
    //   image: "/DEBRElibanos/DEBRElibanos 6.jpg",
    //   description:'Debre Libanos Monastery, established by Abuna Tekle Haymanot in 1284, played a significant role in the Ethiopian Orthodox Church for nearly five centuries.',
    // },
  ];  
  return (
    <section className="flex flex-col bg-[#edf1f4] py-10">
      <h1 className="z-50 text-center font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text text-3xl md:text-4xl lg:text-5xl mb-10">
        Featured Tours
      </h1>
      <div className="hidden lg:flex bg-gradient-to-r from-[#1A3E58] to-blue-500 h-[200px] mx-10 rounded-lg -mb-32"></div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mx-5 md:mx-10 lg:mx-20">
        { tours.map((data,index)=>(
          <div key={index} className="relative shadow-md shadow-black h-full flex flex-col justify-between bg-white rounded-tr-xl rounded-tl-xl z-10 w-full hover:scale-105 transition duration-300">
            <div className="h-[500px] bg-black rounded-tr-xl rounded-tl-xl relative">
              <Image 
                alt="Our Values Background Image" 
                layout="fill"
                src={data.image}
                className="rounded-tr-xl rounded-tl-xl filter brightness-50"
              />
            </div>
            <div className="absolute bottom-5 flex flex-col justify-between items-center text-white">
              <h1 className="mb-5 text-left px-3 font-bold text-2xl md:text-3xl w-full ">{data.tour}</h1>
              <p className="ml-3 md:text-xl text-lg text-left mb-3">
                {data.description}
              </p>
              <button 
                onClick={() => handleSeeTour(data.id)}
                className="mx-5 lg:mx-10 font-bold md:text-lg text-md py-1 md:py-2 px-5 bg-gradient-to-r from-red-500 to-blue-500 hover:bg-[#00D1BB] text-white hover:text-[#1a3e58] border-2 border-white rounded-md"
              >
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="hidden lg:flex bg-gradient-to-r from-[#1A3E58] to-blue-500 h-[200px] mx-10 rounded-lg -mt-32"></div>
    </section>
  );
}
