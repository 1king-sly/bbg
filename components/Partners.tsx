"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface partner{
  name:string,
  logo:string
}

const partners = [
  { name: "MMUST", logo: "/images/mmustLogo.jpg" },
  { name: "MMUST iHub", logo: "/images/mmustIhub.png" },
  { name: "MMUST Guidance and Counselling", logo: "/images/mmustLogo.jpg" },
  { name: "MMUST Hospital", logo: "/images/mmustLogo.jpg" },
  { name: "MMUST", logo: "/images/mmustLogo.jpg" },
  { name: "MMUST iHub", logo: "/images/mmustIhub.png" },
  { name: "MMUST Guidance and Counselling", logo: "/images/mmustLogo.jpg" },
  { name: "MMUST Hospital", logo: "/images/mmustLogo.jpg" },
  
];


const Partners = () => {
  const [currentPartners, setCurrentPartners] = useState<partner[]>([]);
  const [visibleCount, setVisibleCount] = useState(4);

 
  const updateVisibleCount = () => {
    if (window.innerWidth < 640) {
      setVisibleCount(1); 
    } else if (window.innerWidth < 1024) {
      setVisibleCount(2); 
    } else {
      setVisibleCount(4); 
    }
  };

  useEffect(() => {
    updateVisibleCount(); // Set initial count based on screen size
    window.addEventListener("resize", updateVisibleCount); // Update count on resize
    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);

  useEffect(() => {
    setCurrentPartners(partners.slice(0, visibleCount));

    const interval = setInterval(() => {
      setCurrentPartners((prev) => {
        const next = [...prev];
        next.push(partners[(partners.indexOf(next[visibleCount - 1]) + 1) % partners.length]);
        next.shift();
        return next;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, [visibleCount]);

  return (
    <section className="py-16 bg-gray-50">
      <div className="container">
        <h2 className="text-3xl font-bold text-center mb-12">Our Partners</h2>
        <div className="flex justify-center items-center space-x-8">
          {currentPartners.map((partner, index) => (
            <div
              key={index}
              className="md:w-40 md:h-40 w-60 h-60 flex items-center justify-center bg-white rounded-lg shadow-md transition-all duration-500"
            >
              <Image
                src={partner.logo}
                alt={partner.name}
                width={120}
                height={120}
                objectFit="contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Partners;