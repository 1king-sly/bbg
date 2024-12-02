"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Lock, Unlock, CheckCircle } from "lucide-react";
import Link from 'next/link';
import { useParams } from 'next/navigation';

interface Module {
  id: number;
  title: string;
  isLocked: boolean;
  isCompleted: boolean;
  progress: number;
}

interface Course {
  id: number;
  title: string;
  description: string;
  category: string;
  modules: Module[];
}

export default function CoursePage() {

const params = useParams()
  const [course, setCourse] = useState<Course | null>(null);

  useEffect(() => {
    // Fetch course data
    // This is dummy data for demonstration
    setCourse({
      id: 1,
      title: "Introduction to Programming",
      description: "Learn the fundamentals of programming",
      category: "Technology",
      modules: [
        {
          id: 1,
          title: "Getting Started with Programming",
          isLocked: false,
          isCompleted: true,
          progress: 100
        },
        {
          id: 2,
          title: "Variables and Data Types",
          isLocked: false,
          isCompleted: false,
          progress: 0
        },
        {
          id: 3,
          title: "Control Structures",
          isLocked: true,
          isCompleted: false,
          progress: 0
        }
      ]
    });
  }, [params.id]);

  if (!course) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
        <p className="text-lg text-muted-foreground mb-2">{course.description}</p>
        <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
          {course.category}
        </span>
      </div>

      <div className="grid gap-6">
        {course.modules.map((module) => (
          <Card key={module.id} className={module.isLocked ? 'opacity-75' : ''}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{module.title}</span>
                {module.isLocked ? (
                  <Lock className="h-5 w-5 text-muted-foreground" />
                ) : module.isCompleted ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : (
                  <Unlock className="h-5 w-5 text-primary" />
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 flex flex-col gap-2 ">
                <div>
                  <div className="flex justify-between mb-2 ">
                    <span className="text-sm text-muted-foreground">Progress</span>
                    <span className="text-sm font-medium">{module.progress}%</span>
                  </div>
                  <Progress value={module.progress} />
                </div>
                {!module.isLocked && (
                  <Link href={`/dashboard/user/courses/${course.id}/module/${module.id}`}>
                    <Button className="w-full">
                      {module.isCompleted ? 'Review Module' : 'Start Module'}
                    </Button>
                  </Link>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}