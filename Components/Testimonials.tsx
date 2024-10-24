"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Johnson",
    occupation: "University Student",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    text: "BabyGal's support during my teenage years was invaluable. Their guidance helped me navigate challenges and pursue my dreams.",
  },
  {
    name: "Emily Rodriguez",
    occupation: "Young Mother",
    image: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    text: "As a teen mom, BabyGal provided me with the resources and community I needed to care for my child while continuing my education.",
  },
  {
    name: "Aisha Patel",
    occupation: "Software Engineer",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    text: "BabyGal's mentorship program opened doors for me in the tech industry. I'm grateful for their continuous support throughout my career.",
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
    <section className="py-16 bg-primary text-primary-foreground">
      <div className="container">
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