"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/Components/ui/button";

const images = [
  "/images/Teenage-girls.jpg",
  "/images/influencers.jpg",
  "/images/graduate.webp",
  "/images/graduates.jpg",
];

const Hero = () => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 4000); // Changed to 4000ms to reduce blank screen time
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-[calc(100vh-3.5rem)] overflow-hidden">
      {images.map((src, index) => (
        <Image
          key={index}
          src={src}
          width={1000}
          height={1000}
          alt={`BabyGal hero image ${index + 1}`}
          className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
            index === currentImage ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-5xl font-bold mb-4">Empowering Girls, Shaping Futures</h1>
          <p className="text-xl mb-8">Supporting girls through every stage of life</p>
          <Button size="lg">Learn More</Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
