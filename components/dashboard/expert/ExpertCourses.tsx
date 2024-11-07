"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { BookOpen, Users, Plus, Pencil, Trash } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";

const dummyCourses = [
  {
    id: 1,
    title: "Teen Mental Health Fundamentals",
    description: "A comprehensive course on understanding and managing teen mental health.",
    category: "Mental Health",
    enrollments: 45,
    modules: [
      { id: 1, title: "Introduction to Mental Health", completed: true },
      { id: 2, title: "Common Mental Health Issues", completed: true },
      { id: 3, title: "Coping Strategies", completed: false },
      { id: 4, title: "Seeking Professional Help", completed: false }
    ]
  },
  {
    id: 2,
    title: "Effective Parenting Techniques",
    description: "Learn proven strategies for positive parenting and building strong relationships.",
    category: "Parenting",
    enrollments: 32,
    modules: [
      { id: 1, title: "Understanding Your Teen", completed: true },
      { id: 2, title: "Communication Skills", completed: true },
      { id: 3, title: "Setting Boundaries", completed: true },
      { id: 4, title: "Managing Conflicts", completed: false }
    ]
  }
];

export default function ExpertCourses() {
  const { toast } = useToast();
  const [courses, setCourses] = useState(dummyCourses);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<any>(null);
  const [courseForm, setCourseForm] = useState({
    title: "",
    description: "",
    category: "",
    modules: [] as { title: string }[]
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingCourse) {
      // Update existing course
      const updatedCourses = courses.map(course => 
        course.id === editingCourse.id 
          ? { ...course, ...courseForm }
          : course
      );
      setCourses(updatedCourses);
      toast({
        title: "Course Updated",
        description: "The course has been successfully updated.",
      });
    } else {
      // Create new course
      const newCourse = {
        id: courses.length + 1,
        ...courseForm,
        enrollments: 0,
        modules: courseForm.modules.map((module, index) => ({
          id: index + 1,
          title: module.title,
          completed: false
        }))
      };
      setCourses([...courses, newCourse]);
      toast({
        title: "Course Created",
        description: "Your new course has been created successfully.",
      });
    }
    
    setIsDialogOpen(false);
    setEditingCourse(null);
    setCourseForm({
      title: "",
      description: "",
      category: "",
      modules: []
    });
  };

  const handleAddModule = () => {
    setCourseForm({
      ...courseForm,
      modules: [...courseForm.modules, { title: "" }]
    });
  };

  const handleModuleChange = (index: number, value: string) => {
    const updatedModules = [...courseForm.modules];
    updatedModules[index] = { title: value };
    setCourseForm({
      ...courseForm,
      modules: updatedModules
    });
  };

  const handleRemoveModule = (index: number) => {
    const updatedModules = courseForm.modules.filter((_, i) => i !== index);
    setCourseForm({
      ...courseForm,
      modules: updatedModules
    });
  };

  const handleEdit = (course: any) => {
    setEditingCourse(course);
    setCourseForm({
      title: course.title,
      description: course.description,
      category: course.category,
      modules: course.modules.map((module: any) => ({ title: module.title }))
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

  const calculateProgress = (modules: any[]) => {
    const completed = modules.filter(module => module.completed).length;
    return (completed / modules.length) * 100;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Your Courses</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => {
              setEditingCourse(null);
              setCourseForm({
                title: "",
                description: "",
                category: "",
                modules: []
              });
            }}>
              <Plus className="h-4 w-4 mr-2" />
              Create Course
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingCourse ? "Edit Course" : "Create New Course"}</DialogTitle>
              <DialogDescription>
                Fill in the details for your course below.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium">Title</label>
                <Input
                  value={courseForm.title}
                  onChange={(e) => setCourseForm({ ...courseForm, title: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium">Description</label>
                <Textarea
                  value={courseForm.description}
                  onChange={(e) => setCourseForm({ ...courseForm, description: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium">Category</label>
                <Input
                  value={courseForm.category}
                  onChange={(e) => setCourseForm({ ...courseForm, category: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium">Modules</label>
                {courseForm.modules.map((module, index) => (
                  <div key={index} className="flex gap-2 mt-2">
                    <Input
                      value={module.title}
                      onChange={(e) => handleModuleChange(index, e.target.value)}
                      placeholder={`Module ${index + 1} Title`}
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveModule(index)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleAddModule}
                  className="mt-2"
                >
                  Add Module
                </Button>
              </div>
              <Button type="submit">{editingCourse ? "Update Course" : "Create Course"}</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {courses.map((course) => (
          <Card key={course.id}>
            <CardHeader>
              <CardTitle className="flex justify-between items-start">
                <span>{course.title}</span>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" onClick={() => handleEdit(course)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(course.id)}>
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">{course.description}</p>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Category: {course.category}</span>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-2" />
                    <span className="text-sm">{course.enrollments} Enrolled</span>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Course Progress</span>
                    <span className="text-sm">{Math.round(calculateProgress(course.modules))}%</span>
                  </div>
                  <Progress value={calculateProgress(course.modules)} />
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-2">Modules</h4>
                  <ul className="space-y-2">
                    {course.modules.map((module) => (
                      <li
                        key={module.id}
                        className="flex items-center text-sm"
                      >
                        <div
                          className={`w-2 h-2 rounded-full mr-2 ${
                            module.completed ? 'bg-green-500' : 'bg-gray-300'
                          }`}
                        />
                        {module.title}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}