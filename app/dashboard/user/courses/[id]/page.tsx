"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Lock, Unlock, CheckCircle } from "lucide-react";
import Link from 'next/link';
import { useParams } from 'next/navigation';
import SkeletonCard from '@/components/skeleton/SkeletonCard';

interface Module {
  id: number;
  title: string;
  content: string;
  videoUrl?: string;
  Quiz: {
    questions: {
      id: number;
      question: string;
      options: string[];
      correctAnswer: number;
    }[];
  };
  ModuleProgress:[{
    isCompleted:boolean,
    isLocked:boolean,
    lastAccessed:Date,
    modulId:string

  }]
}

interface Course {
  id: number;
  title: string;
  description: string;
  category: string;
  modules: Module[];
  partner:{
    name:string
  }
  expert:{
    name:string
  }
  organization:{
    name:string
  }
  enrollments: [
    {
      status:string
    }
  ];
  maxEnrollments: number;
  completionRate: number;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;


export default function CoursePage() {

const params = useParams()
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setIsLoading] = useState(true);



  
  const fetchCourses = async () => {
    const access_token = localStorage.getItem("accessToken");
    try {
      const response = await fetch(`${API_URL}/courses/${params.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
      });

      const data = await response.json();
      if (response.ok) {
        setCourse(data);
      }
    } catch (error) {
      console.error("Failed to fetch User course", error);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  

  if (loading) {
    return  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-2 py-12">

<>
                  {[...Array(6)].map((_, index) => (
          <SkeletonCard key={index} />
        ))}

          </>

    </div>;
  }

  if(!course){
    return null
  }

  return (
    <div className="container mx-auto py-12 ">
      <div className="mb-8 mx-3">
        <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
        <p className="text-lg text-muted-foreground mb-2">{course.description}</p>
        <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
          {course.category}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-3">
        {course.modules.map((module,index) => (
          <Card key={module.id} className={module.ModuleProgress[index]?.isLocked ? 'opacity-75' : ''}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{module.title}</span>
                {module.ModuleProgress[index]?.isLocked ? (
                  <Lock className="h-5 w-5 text-muted-foreground" />
                ) : module.ModuleProgress[index]?.isCompleted ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : (
                  <Unlock className="h-5 w-5 text-primary" />
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 flex flex-col gap-2 ">
                {/* <div>
                  <div className="flex justify-between mb-2 ">
                    <span className="text-sm text-muted-foreground">Progress</span>
                    <span className="text-sm font-medium">{module.ModuleProgress.length}%</span>
                  </div>
                  <Progress value={module.ModuleProgress.length} />
                </div> */}
                {!module.ModuleProgress[index]?.isLocked && (
                  <Link href={`/dashboard/user/courses/${course.id}/module/${module.id}`}>
                    <Button className="w-full">
                      {module.ModuleProgress[index]?.isCompleted ? 'Review Module' : 'Start Module'}
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