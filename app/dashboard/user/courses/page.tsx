"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Book, Code, LineChart } from "lucide-react";

const courses = [
  {
    id: 1,
    title: "Software Engineering Fundamentals",
    category: "IT",
    description: "Learn the basics of software development and engineering principles",
    icon: Code,
    modules: [
      "Introduction to Programming",
      "Data Structures and Algorithms",
      "Web Development Basics"
    ]
  },
  {
    id: 2,
    title: "Digital Content Writing",
    category: "Business",
    description: "Master the art of creating compelling digital content",
    icon: Book,
    modules: [
      "Content Strategy",
      "SEO Writing",
      "Social Media Content"
    ]
  },
  {
    id: 3,
    title: "Digital Marketing",
    category: "Business",
    description: "Learn modern marketing techniques for the digital age",
    icon: LineChart,
    modules: [
      "Marketing Fundamentals",
      "Social Media Marketing",
      "Email Marketing"
    ]
  }
];

const categories = ["All", "IT", "Business", "Accounting"];

export default function CoursesPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  
  const filteredCourses = selectedCategory === "All" 
    ? courses 
    : courses.filter(course => course.category === selectedCategory);

  return (
    <div className="container mx-auto py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Available Courses</h1>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <Card key={course.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-2">
                <course.icon className="h-6 w-6 text-primary" />
                <CardTitle>{course.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="mb-4">{course.description}</p>
              <div className="space-y-2">
                <p className="font-semibold">Modules:</p>
                <ul className="list-disc list-inside space-y-1">
                  {course.modules.map((module, index) => (
                    <li key={index}>{module}</li>
                  ))}
                </ul>
              </div>
              <Button className="mt-4 w-full">Enroll Now</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}