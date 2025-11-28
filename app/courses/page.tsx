"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Book, Code, LineChart } from "lucide-react";
import SkeletonCard from "@/components/skeleton/SkeletonCard";
import { useToast } from "@/hooks/use-toast";
import EmptyState from "@/components/ui/Empty";

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
}

interface Course {
  id: number;
  title: string;
  description: string;
  category: string;
  modules: Module[];
  enrollments: [];
  maxEnrollments: number;
  completionRate: number;
}

const categories = ["All", "IT", "Business", "Accounting"];

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function CoursesPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setIsLoading] = useState(true);
  const [disabled, setDisabled] = useState(false);
  const { toast } = useToast();

  const fetchCourses = async () => {
    try {
      const response = await fetch(`${API_URL}/courses`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      if (response.ok) {
        setCourses(data);
      }
    } catch (error) {
      console.error("Failed to fetch User courses", error);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const enrolCourse = async (id: number) => {
    setDisabled(true);
    const access_token = localStorage.getItem("accessToken");
    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/enrollments/courses/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
      });
      if (response.ok) {
        toast({
          title: "Action Successful",
          description:
            "Successfully enrolled for course, Go to dashboard to access",
        });
      }

      if (response.status === 402) {
        toast({
          title: "Action Failed",
          description:
            "You already Enrolled for course, Go to dashboard to access your courses",
          variant: "destructive",
        });
      }
      if (response.status === 401) {
        toast({
          title: "Action Failed",
          description: "Kindly login or create account to Enrol to course",
          variant: "destructive",
        });
      }

      if (!response.ok && response.status !== 402 && response.status !== 401) {
        toast({
          title: "Action Failed",
          description: "Failed to Enrol for course",
          variant: "destructive",
        });
      }

      setDisabled(false);
    } catch (error: any) {
      console.error("An error occurred", error);
      toast({
        title: "Action Failed",
        description: "Something went wrong",
        variant: "destructive",
      });

      setDisabled(false);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredCourses =
    selectedCategory === "All"
      ? courses
      : courses.filter((course) => course.category === selectedCategory);

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-4xl font-bold"> Courses</h1>
      {courses.length == 0 && !loading ? (
        <EmptyState message="More courses coming soon" />
      ) : (
        <>
          {!loading && (
            <div className="flex justify-between items-center mb-8 mx-2">
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}>
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
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-2">
            {loading && (
              <>
                {[...Array(6)].map((_, index) => (
                  <SkeletonCard key={index} />
                ))}
              </>
            )}
            {filteredCourses.map((course) => (
              <Card
                key={course.id}
                className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Book className="h-6 w-6 text-primary" />
                    <CardTitle>{course.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">{course.description}</p>
                  <div className="space-y-2">
                    <p className="font-semibold">Modules:</p>
                    <ul className="list-disc list-inside space-y-1">
                      {course.modules.map((module, index) => (
                        <li key={index}>{module.title}</li>
                      ))}
                    </ul>
                  </div>
                  <Button
                    onClick={() => enrolCourse(course.id)}
                    disabled={disabled}
                    className="mt-4 w-full">
                    Enroll Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
