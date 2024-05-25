import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router';

import Image1 from '../../public/heroImge1.jpg';
import Image2 from '../../public/heroImge2.jpg';
import Image3 from '../../public/heroImge3.jpg';

import Image4 from '../../public/heroImge4.jpg';
import Image5 from '../../public/heroImge5.jpg';
import Image6 from '../../public/heroImge6.jpg';

export default function ImageGallery() {
  const router = useRouter();
  const handleSeeTour = (tourid) => {
    router.push(`/tours/${tourid}`);
  };

  const images = [
    Image1,Image2,Image3
  ];

  return (
     <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('prescription-3384324_1920.jpg')" }}
    >
      <div className="relative w-48 h-72 transform-style-preserve-3d animate-bg">
        {images.map((src, index) => (
          <span
            key={index}
            className="absolute inset-0 transform-origin-center transform-style-preserve-3d"
            style={{
              '--i': index + 1,
              transform: `rotateY(calc(var(--i) * 45deg)) translateZ(16rem)`
            }}
          >
            <Image
              src={src}
              alt={`Image ${index}`}
              layout="fill"
              objectFit="cover"
              className="absolute inset-0 w-full h-full"
            />
          </span>
        ))}
      </div>
    </div>
  );
}
