import HistoricNorthCircuitofEthiopia from '../public/temp/lalibela.jpg';
import AncientRockhewnchurchesofTigray from '../public/temp/Gheralta2.jpg';
import Danakil from '../public/Dankil/danakil-hero.jpg';

const HotelsArray = [
  { 
    id: '1',
    name: 'Sheraton Addis, a Luxury Collection Hotel, Addis Ababa',
    image:"/hotels/Sheraton/sheraton 1.webp",
    location:['2QC5+4R5, Taitu St, Addis Ababa, Ethiopia | 3.39KM from city center',''],
    description:`A stay at Sheraton Addis, a Luxury Collection Hotel, Addis Ababa places you in the heart of Addis Ababa, steps from Friendship 
        Park and a 1-minute drive from Derg Monument. This 5-star hotel is 0.7 mi (1.1 km) from Unity Park and 0.9 mi (1.5 km) from Addis Ababa 
        National Archives and Library.
    `,
    star:"5",
    rooms:[
      {
        id:"1",
        name:"Classic King Room",
        imagePath:"/hotels/Sheraton/sheratonkingclassingbed.jpg",
        bed:"1 king bed(1.81m-3m wide)",
        person:"2 adults",
        roomsize:"30 sqm",
        description:`You can enjoy access to your own private balcony, the room is equiped with modern and most luxurious equipment to bring 
        you the most wonderfull time`

      },
      {
        id:"2",
        name:"Classic Twin Room",
        imagePath:"/hotels/Sheraton/sheratonclassictwinroombed.jpg",
        bed:"2 single beds(0.8m-1.3m wide)",
        person:"2 adults",
        roomsize:"30 sqm",
        description:`You can enjoy access to your own private balcony, the room is equiped with modern and most luxurious equipment to bring 
        you the most wonderfull time`
      },
      {
        id:"3",
        name:"Executive Twin Room",
        imagePath:"/hotels/Sheraton/sheratonexeclusivetwinroombed.jpg",
        bed:"2 single beds(0.8m-1.3m wide)",
        person:"2 adults",
        roomsize:"30 sqm",
        description:`You can enjoy access to your own private balcony, the room is equiped with modern and most luxurious equipment to bring 
        you the most wonderfull time`
      },
    ]
  },
  {
    id:"2",
    name:"Hyatt Regency Addis Ababa",
    image:"/hotels/Hyat/Hyat 1.webp",
    location:["Meskel Square, Addis Ababa, Ethiopia",""],
    description:`With a stay at Hyatt Regency Addis Ababa, you'll be centrally located in Addis Ababa, just a 4-minute walk from Meskel Square and 
      6 minutes by foot from “Red Terror” Martyrs' Memorial Museum. This 5-star hotel is 0.6 mi (1 km) from Addis Ababa Stadium and 0.7 mi (1.2 km) 
      from ECA Conference Center.`,
    star:"5",
    rooms:[
      {
        id:"1",
        name:"Classic King Room",
        imagePath:"/hotels/Sheraton/sheratonkingclassingbed.jpg",
        bed:"1 king bed(1.81m-3m wide)",
        person:"2 adults",
        roomsize:"30 sqm",
        description:`You can enjoy access to your own private balcony, the room is equiped with modern and most luxurious equipment to bring 
        you the most wonderfull time`

      },
      {
        id:"2",
        name:"Classic Twin Room",
        imagePath:"/hotels/Sheraton/sheratonclassictwinroombed.jpg",
        bed:"2 single beds(0.8m-1.3m wide)",
        person:"2 adults",
        roomsize:"30 sqm",
        description:`You can enjoy access to your own private balcony, the room is equiped with modern and most luxurious equipment to bring 
        you the most wonderfull time`
      },
      {
        id:"3",
        name:"Executive Twin Room",
        imagePath:"/hotels/Sheraton/sheratonexeclusivetwinroombed.jpg",
        bed:"2 single beds(0.8m-1.3m wide)",
        person:"2 adults",
        roomsize:"30 sqm",
        description:`You can enjoy access to your own private balcony, the room is equiped with modern and most luxurious equipment to bring 
        you the most wonderfull time`
      },
    ]
  },
  {
    id:"3",
    name:"Radisson Blu Hotel, Addis Ababa",
    image:"/hotels/radison/radison 1.webp",
    location:["17, Kazanchis Business District Kirkos Subcity, 18, Addis Ababa, 21555, Ethiopia",""],
    description:`A stay at Radisson Blu Hotel, Addis Ababa places you in the heart of Addis Ababa, within a 10-minute walk of ECA Conference Center 
      and Africa Hall. This 5-star hotel is 0.6 mi (0.9 km) from Unity Park and 1.1 mi (1.7 km) from “Red Terror” Martyrs' Memorial Museum.`,
    star:"5",
    rooms:[
      {
        id:"1",
        name:"Classic King Room",
        imagePath:"/hotels/Sheraton/sheratonkingclassingbed.jpg",
        bed:"1 king bed(1.81m-3m wide)",
        person:"2 adults",
        roomsize:"30 sqm",
        description:`You can enjoy access to your own private balcony, the room is equiped with modern and most luxurious equipment to bring 
        you the most wonderfull time`

      },
      {
        id:"2",
        name:"Classic Twin Room",
        imagePath:"/hotels/Sheraton/sheratonclassictwinroombed.jpg",
        bed:"2 single beds(0.8m-1.3m wide)",
        person:"2 adults",
        roomsize:"30 sqm",
        description:`You can enjoy access to your own private balcony, the room is equiped with modern and most luxurious equipment to bring 
        you the most wonderfull time`
      },
      {
        id:"3",
        name:"Executive Twin Room",
        imagePath:"/hotels/Sheraton/sheratonexeclusivetwinroombed.jpg",
        bed:"2 single beds(0.8m-1.3m wide)",
        person:"2 adults",
        roomsize:"30 sqm",
        description:`You can enjoy access to your own private balcony, the room is equiped with modern and most luxurious equipment to bring 
        you the most wonderfull time`
      },
    ]
  },
];

export function getAllHotels() {
  return HotelsArray;
}

export function getHotelsById(id) {
  return HotelsArray.filter((hotel) => hotel.id === id);
}