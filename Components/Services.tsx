"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, BookOpen, Shield, Package } from "lucide-react";

const services = [
  {
    title: "Counselling",
    description: "Professional support for emotional and mental well-being",
    icon: Heart,
  },
  {
    title: "Education",
    description: "Empowering through knowledge and skill development",
    icon: BookOpen,
  },
  {
    title: "Rights Protection",
    description: "Advocating for and safeguarding girls' rights",
    icon: Shield,
  },
  {
    title: "Essential Supplies",
    description: "Providing necessities like sanitary pads and clothing",
    icon: Package,
  },
];

const Services = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container">
        <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <Card key={index}>
              <CardHeader>
                <service.icon className="h-10 w-10 mb-4 text-primary" />
                <CardTitle>{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{service.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;