"use client";

import { useState,useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Pencil, Trash, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";

const API_URL = process.env.NEXT_PUBLIC_API_URL;



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





export default function AdminCourses() {
  const { toast } = useToast();
  const [courses, setCourses] = useState<Course[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setIsLoading] = useState(true);




  
  const access_token = localStorage.getItem("accessToken");

  const fetchCourses = async () => {
    try {
      const response = await fetch(`${API_URL}/courses/my-courses`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
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

 
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "in_progress":
        return <Badge variant="secondary">Active</Badge>;
      case "completed":
        return <Badge>Completed</Badge>;
      case "draft":
        return <Badge variant="outline">Draft</Badge>;
      default:
        return null;
    }
  };

  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.category.toLowerCase().includes(searchTerm.toLowerCase()) 
  );

  return (
    <div className="space-y-6 mx-2">
      <div className="flex justify-between items-center">
        <div className="relative w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>

      </div>

      <Card>
        <CardHeader>
          <CardTitle>Courses</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Course Details</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead>Instructors</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCourses.map((course,index) => (
                <TableRow key={course.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{course.title}</p>
                      <p className="text-sm text-muted-foreground">{course.description}</p>
                      <div className="mt-2">
                        <p className="text-sm font-medium">Modules ({course.modules.length})</p>
                        <ul className="text-sm text-muted-foreground">
                          {course.modules.slice(0,3).map((module) => (
                            <li key={module.id}>{module.title}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{course.category}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Progress: {(course.modules[index].ModuleProgress?.filter((progress)=>progress.isCompleted)?.length / course.modules[index].ModuleProgress?.length) * 100 || 0} %</span>
                      </div>

                      <Progress value={(course.modules[index].ModuleProgress?.filter((progress)=>progress.isCompleted)?.length / course.modules[index].ModuleProgress?.length) * 100 || 0} />
                    
 
                     
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      {course.expert && (
                        <p className="text-sm">Expert: {course.expert.name}</p>
                      )}
                      {course.partner && (
                        <p className="text-sm">Partner: {course.partner.name}</p>
                      )}
                      {course.organization&& (
                        <p className="text-sm">Org: {course.organization.name}</p>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(course.enrollments[index].status)}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">

                    <Link href={`/dashboard/user/courses/${course.id}`}>
              <Button>View Course</Button>
            </Link>

                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}