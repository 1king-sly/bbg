"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lock, CheckCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const courseData = {
  id: 1,
  title: "Introduction to Software Engineering",
  description: "Learn the fundamentals of software development",
  type: "IT",
  modules: [
    {
      id: 1,
      title: "Getting Started with Programming",
      content: "Learn the basics of programming concepts...",
      completed: true,
      locked: false
    },
    {
      id: 2,
      title: "Variables and Data Types",
      content: "Understanding different types of data...",
      completed: false,
      locked: false
    },
    {
      id: 3,
      title: "Control Structures",
      content: "Learn about if statements and loops...",
      completed: false,
      locked: true
    }
  ]
};

export default function CoursePage({ params }: { params: { id: string } }) {
  const [activeModule, setActiveModule] = useState(courseData.modules[0]);
  const { toast } = useToast();

  const handleNextModule = () => {
    const currentIndex = courseData.modules.findIndex(m => m.id === activeModule.id);
    if (currentIndex < courseData.modules.length - 1) {
      setActiveModule(courseData.modules[currentIndex + 1]);
      toast({
        title: "Module Complete!",
        description: "Moving to the next module.",
      });
    }
  };

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-4xl font-bold mb-8">{courseData.title}</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Module List */}
        <div className="space-y-4">
          {courseData.modules.map((module) => (
            <Card 
              key={module.id}
              className={`cursor-pointer transition-all ${
                module.locked ? 'opacity-50' : 
                module.completed ? 'border-green-500' : 
                activeModule.id === module.id ? 'border-blue-500' : ''
              }`}
              onClick={() => !module.locked && setActiveModule(module)}
            >
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{module.title}</span>
                  {module.locked ? (
                    <Lock className="h-5 w-5" />
                  ) : module.completed ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : null}
                </CardTitle>
              </CardHeader>
            </Card>
          ))}
        </div>

        {/* Module Content */}
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>{activeModule.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose max-w-none">
                <p>{activeModule.content}</p>
                {/* Add your module content here */}
              </div>
              <div className="mt-8 flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => {
                    const currentIndex = courseData.modules.findIndex(m => m.id === activeModule.id);
                    if (currentIndex > 0) {
                      setActiveModule(courseData.modules[currentIndex - 1]);
                    }
                  }}
                  disabled={courseData.modules.indexOf(activeModule) === 0}
                >
                  Previous
                </Button>
                <Button
                  onClick={handleNextModule}
                  disabled={courseData.modules.indexOf(activeModule) === courseData.modules.length - 1}
                >
                  Next
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}