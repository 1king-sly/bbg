"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, Heart, BookOpen, Users, Shield } from "lucide-react";

const objectives = [
  {
    title: "Empower Girls",
    description: "Provide resources and support for personal growth and development",
    icon: Heart,
  },
  {
    title: "Promote Education",
    description: "Ensure access to quality education and skill-building opportunities",
    icon: BookOpen,
  },
  {
    title: "Build Community",
    description: "Foster a supportive network for girls and their families",
    icon: Users,
  },
  {
    title: "Advocate for Rights",
    description: "Champion policies that protect and empower girls and young women",
    icon: Shield,
  },
];

const Objectives = () => {
  return (
    <section className="py-16">
      <div className="container">
        <h2 className="text-3xl font-bold text-center mb-12">Our Objectives</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {objectives.map((objective, index) => (
            <Card key={index}>
              <CardHeader>
                <objective.icon className="h-10 w-10 mb-4 text-primary" />
                <CardTitle>{objective.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{objective.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Objectives;