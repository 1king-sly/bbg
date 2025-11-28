"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";

const testimonials = [
  {
    name: "Mercyline Nyaboke",
    occupation: "University Student",
    image:
      "https://media.licdn.com/dms/image/v2/D4D03AQH2-AITKrM9aQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1703816473262?e=1766016000&v=beta&t=UiWd7ploNUF5SgVlJhOEdP5g-WN1BidEZQ8F-ikM8Lg",
    text: "BabyGal had invaluable impact to me as a young lady trying to figure out who I am in campus as I continue pursuing my dreams and goals .",
  },
  {
    name: "Mercy Korir",
    occupation: "Software Engineer",
    image:
      "https://media.licdn.com/dms/image/v2/D5603AQEXh6nWeu5LUg/profile-displayphoto-crop_800_800/B56Zm67JtqI4AQ-/0/1759777694979?e=1766016000&v=beta&t=JWonS26LcubB-ZGq3kogoU82lLQDZd71_8039U1cfwY",
    text: "BabyGal's mentorship program through MMUST iHub opened doors for me in the tech industry. I'm grateful for their continuous support throughout my career.",
  },
  {
    name: "Marion Jairo",
    occupation: "University Student",
    image:
      "https://media.licdn.com/dms/image/v2/D4D03AQHCQJHAS3y41g/profile-displayphoto-shrink_200_200/B4DZYQ9kXbGkAc-/0/1744041326648?e=1766016000&v=beta&t=lDYQ7jRIEvuH-fsMHn8OvfSzumpzS98R6uqK-H4WsTg",
    text: "Finding a platform that enables we the ladies to speak freely, communicate and interact was difficult until I found about BabyGal",
  },
];

const Testimonials = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-16 bg-primary text-primary-foreground ">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Testimonials</h2>
        <div className="relative h-96">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentTestimonial ? "opacity-100" : "opacity-0"
              }`}
            >
              <CardContent className="h-full flex flex-col items-center justify-center text-center p-8">
                <Quote className="h-10 w-10 mb-4" />
                <p className="text-lg mb-6">{testimonial.text}</p>
                <div className="flex items-center">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={60}
                    height={60}
                    className="rounded-full mr-4"
                  />
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm">{testimonial.occupation}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;