"use client";

import { useState } from 'react';
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Pencil, Trash, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";


// Define types for Course and Module
type Module = {
  id?: number;
  title: string;
  order: number;
};

type Course = {
  id: number;
  title: string;
  description: string;
  category: string;
  expertId: number | null;
  expertName: string;
  partnerId: number | null;
  partnerName?: string;
  organizationId: number | null;
  organizationName?: string;
  enrollments: number;
  maxEnrollments: number;
  completionRate: number;
  modules: Module[];
  status: string;
};

const dummyCourses: Course[] = [

    {
      id: 1,
      title: "Introduction to Web Development",
      description: "Learn the basics of web development with HTML, CSS, and JavaScript",
      category: "Technology",
      expertId: 1,
      expertName: "Dr. Sarah Johnson",
      partnerId: 1,
      partnerName: "TechGirls Foundation",
      enrollments: 150,
      maxEnrollments: 200,
      completionRate: 75,
      modules: [
        { id: 1, title: "HTML Basics", order: 1 },
        { id: 2, title: "CSS Fundamentals", order: 2 },
        { id: 3, title: "JavaScript Introduction", order: 3 }
      ],
      status: "active",
      organizationId: null
    },
    {
      id: 2,
      title: "Mental Health Awareness",
      description: "Understanding mental health and well-being for teenagers",
      category: "Health",
      expertId: 2,
      expertName: "Dr. Michael Chen",
      organizationId: 1,
      organizationName: "Youth Development Center",
      enrollments: 80,
      maxEnrollments: 100,
      completionRate: 90,
      modules: [
        { id: 1, title: "Understanding Mental Health", order: 1 },
        { id: 2, title: "Coping Strategies", order: 2 },
        { id: 3, title: "Seeking Help", order: 3 }
      ],
      status: "active",
      partnerId: null
    },
    {
      id: 3,
      title: "Financial Literacy for Teens",
      description: "Essential financial knowledge for young adults",
      category: "Finance",
      expertId: 3,
      expertName: "Prof. Emily Rodriguez",
      partnerId: 2,
      partnerName: "Women's Health Initiative",
      enrollments: 120,
      maxEnrollments: 150,
      completionRate: 60,
      modules: [
        { id: 1, title: "Budgeting Basics", order: 1 },
        { id: 2, title: "Saving and Investing", order: 2 },
        { id: 3, title: "Financial Planning", order: 3 }
      ],
      status: "completed",
      organizationId: null
    }
 
];

export default function AdminCourses() {
  const { toast } = useToast();
  const [courses, setCourses] = useState<Course[]>(dummyCourses);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);

  // Define a type for the form state
  const [courseForm, setCourseForm] = useState<Omit<Course, 'id' | 'enrollments' | 'completionRate' | 'status'>>({
    title: "",
    description: "",
    category: "",
    expertId: null,
    expertName: "",
    partnerId: null,
    partnerName: "",
    organizationId: null,
    organizationName: "",
    maxEnrollments: 0,
    modules: [],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingCourse) {
      const updatedCourses = courses.map(course =>
        course.id === editingCourse.id
          ? {
              ...course,
              ...courseForm,
              modules: courseForm.modules.map((module, index) => ({
                id: index + 1,
                ...module,
              })),
            }
          : course
      );
      setCourses(updatedCourses);
      toast({
        title: "Course Updated",
        description: "The course has been successfully updated.",
      });
    } else {
      const newCourse: Course = {
        id: courses.length + 1,
        ...courseForm,
        enrollments: 0,
        completionRate: 0,
        modules: courseForm.modules.map((module, index) => ({
          id: index + 1,
          ...module,
        })),
        status: "active",
      };
      setCourses([...courses, newCourse]);
      toast({
        title: "Course Created",
        description: "The new course has been created successfully.",
      });
    }

    setIsDialogOpen(false);
    setEditingCourse(null);
    setCourseForm({
      title: "",
      description: "",
      category: "",
      expertId: null,
      expertName: "",
      partnerId: null,
      partnerName: "",
      organizationId: null,
      organizationName: "",
      maxEnrollments: 0,
      modules: [],
    });
  };

  const handleAddModule = () => {
    setCourseForm({
      ...courseForm,
      modules: [
        ...courseForm.modules,
        { title: "", order: courseForm.modules.length + 1 },
      ],
    });
  };

  const handleModuleChange = (index: number, value: string) => {
    const updatedModules = [...courseForm.modules];
    updatedModules[index] = { ...updatedModules[index], title: value };
    setCourseForm({
      ...courseForm,
      modules: updatedModules,
    });
  };

  const handleRemoveModule = (index: number) => {
    const updatedModules = courseForm.modules
      .filter((_, i) => i !== index)
      .map((module, i) => ({ ...module, order: i + 1 }));
    setCourseForm({
      ...courseForm,
      modules: updatedModules,
    });
  };

  const handleEdit = (course: Course) => {
    setEditingCourse(course);
    setCourseForm({
      title: course.title,
      description: course.description,
      category: course.category,
      expertId: course.expertId,
      expertName: course.expertName,
      partnerId: course.partnerId || null,
      partnerName: course.partnerName || "",
      organizationId: course.organizationId || null,
      organizationName: course.organizationName || "",
      maxEnrollments: course.maxEnrollments,
      modules: course.modules.map(({ title, order }) => ({
        title,
        order,
      })),
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (courseId: number) => {
    setCourses(courses.filter(course => course.id !== courseId));
    toast({
      title: "Course Deleted",
      description: "The course has been successfully deleted.",
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
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
    course.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.expertName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (course.partnerName && course.partnerName.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (course.organizationName && course.organizationName.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6">
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
              {filteredCourses.map((course) => (
                <TableRow key={course.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{course.title}</p>
                      <p className="text-sm text-muted-foreground">{course.description}</p>
                      <div className="mt-2">
                        <p className="text-sm font-medium">Modules ({course.modules.length})</p>
                        <ul className="text-sm text-muted-foreground">
                          {course.modules.map((module) => (
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
                        <span className="text-sm">Enrollment</span>
                        <span className="text-sm font-medium">
                          {course.enrollments}/{course.maxEnrollments}
                        </span>
                      </div>
                      <Progress value={(course.enrollments / course.maxEnrollments) * 100} />
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Completion</span>
                        <span className="text-sm font-medium">
                          {course.completionRate}%
                        </span>
                      </div>
                      <Progress value={course.completionRate} />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      {course.expertName && (
                        <p className="text-sm">Expert: {course.expertName}</p>
                      )}
                      {course.partnerName && (
                        <p className="text-sm">Partner: {course.partnerName}</p>
                      )}
                      {course.organizationName && (
                        <p className="text-sm">Org: {course.organizationName}</p>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(course.status)}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">

                    <Link href="/dashboard/user/courses/1">
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