import React from 'react'
import Image from "next/image"
import { useRouter } from 'next/router';
 
export default function PopularDestination() {
  const router = useRouter();
  const handleTours = () => {
    router.push(`/attraction`);
  };
  const popularDestination = [
    {
      id:1,
      image:"/Omo Valley/omo 6.jpg",
      text:"Omo Valley"
    },
    {
      id:2,
      image:"/Gurage/Gurage 1.jpg",
      text:"Gurage"
    },
    {
      id:3,
      image:"/Bulga/Bulga 7.jpg",
      text:"Bulga"
    },
    {
      id:4,
      image:"/DEBRElibanos/DEBRElibanos 1.jpg",
      text:"Debrelibanos"
    },
  ]
  return (
    <section className="flex flex-col mx-5 lg:mx-10 my-10">
      <h1 className="text-center font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text text-3xl md:text-4xl lg:text-5xl mb-10">Popular Destination</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid-flow-row gap-5 ">
        { popularDestination.map((destination,index)=>
          <div className={`relative border rounded-xl  ${ destination.id == 1 ? "lg:row-span-2  " : "" } ${ destination.id == 3 ? "lg:row-span-2  " : "" } `} key={index}>
            <div className={`border rounded-xl h-[400px]`}>
              <Image 
                alt="popularDestination Image" 
                layout="fill"
                src={destination.image}
                className="border rounded-xl"
              />
            </div>

            <div className="absolute inset-0">
              <div className="">
                <h1 className="text-left font-semibold text-white text-lg lg:text-4xl p-3 lg:p-14">
                  {destination.text}
                </h1>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center justify-center mt-10">      
        <button 
          onClick={() => handleTours()}
          className="mb-5 mx-5 md:mx-10 lg:mx-10 font-bold md:text-lg text-md  py-1 md:py-2 px-5 bg-gradient-to-r from-red-500 to-blue-500 hover:bg-[#00D1BB] text-white hover:text-[#1a3e58] border-2 border-white rounded-md"
        >
          Explore Destination
        </button>
      </div>
    </section>
  );
}
