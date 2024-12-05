"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash, BookOpen } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from 'primereact/skeleton';


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

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function ExpertCourses() {
  const { toast } = useToast();
  const [disabled, setDisabled] = useState(false);
  const [loading, setIsLoading] = useState(true);

  const [courses, setCourses] = useState<Course[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [courseForm, setCourseForm] = useState({
    title: "",
    description: "",
    category: "",
    modules: [] as {
      title: string;
      content: string;
      videoUrl?: string;
      Quiz: {
        questions: {
          question: string;
          options: string[];
          correctAnswer: number;
        }[];
      };
    }[],
  });

  const access_token = localStorage.getItem("accessToken");

  const fetchCourses = async () => {
    try {
      const response = await fetch(`${API_URL}/courses/created`, {
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
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setDisabled(true);

    if (editingCourse) {
      const updatedCourses = courses.map((course) =>
        course.id === editingCourse.id
          ? {
              ...course,
              title: courseForm.title,
              description: courseForm.description,
              category: courseForm.category,
              modules: courseForm.modules.map((module, index) => ({
                ...module,
              })),
            }
          : course
      );
      // setCourses(updatedCourses);
      toast({
        title: "Course Updated",
        description: "The course has been successfully updated.",
      });
    } else {
      const newCourse = {
        // id: courses.length + 1,
        title: courseForm.title,
        description: courseForm.description,
        category: courseForm.category,
        modules: courseForm.modules.map((module, index) => ({
          order: index,
          ...module,
        })),
        max_enrollments: 100,
      };

      try {
        const response = await fetch(`${API_URL}/courses`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
          },
          body: JSON.stringify(newCourse),
        });

        const newCourseCreated = await response.json();

        if (response.ok) {
          toast({
            title: "Action Successful",
            description: "Course Successfully created",
          });

          setCourses([...courses, newCourseCreated]);

          setIsDialogOpen(false);
          setEditingCourse(null);
          setCourseForm({
            title: "",
            description: "",
            category: "",
            modules: [],
          });
        }

        if (!response.ok) {
          toast({
            title: "Action Failed",
            description: "Failed to create  Course",
            variant: "destructive",
          });
        }
        setDisabled(false);
      } catch (error: any) {
        console.error(error);

        toast({
          title: "Action Failed",
          description: "Failed to create  Course",
          variant: "destructive",
        });
      }
    }
  };

  const handleAddModule = () => {
    setCourseForm({
      ...courseForm,
      modules: [
        ...courseForm.modules,
        {
          title: "",
          content: "",
          videoUrl: "",
          Quiz: {
            questions: [],
          },
        },
      ],
    });
  };

  const handleAddQuestion = (moduleIndex: number) => {
    const updatedModules = [...courseForm.modules];
    updatedModules[moduleIndex].Quiz.questions.push({
      question: "",
      options: ["", "", "", ""],
      correctAnswer: 0,
    });
    setCourseForm({
      ...courseForm,
      modules: updatedModules,
    });
  };

  const handleModuleChange = (index: number, field: string, value: string) => {
    const updatedModules = [...courseForm.modules];
    updatedModules[index] = {
      ...updatedModules[index],
      [field]: value,
    };
    setCourseForm({
      ...courseForm,
      modules: updatedModules,
    });
  };

  const handleQuestionChange = (
    moduleIndex: number,
    questionIndex: number,
    field: string,
    value: string | number
  ) => {
    const updatedModules = [...courseForm.modules];
    if (field === "options") {
      const optionIndex = parseInt(value.toString());
      updatedModules[moduleIndex].Quiz.questions[questionIndex].correctAnswer =
        optionIndex;
    } else {
      updatedModules[moduleIndex].Quiz.questions[questionIndex] = {
        ...updatedModules[moduleIndex].Quiz.questions[questionIndex],
        [field]: value,
      };
    }
    setCourseForm({
      ...courseForm,
      modules: updatedModules,
    });
  };

  const handleRemoveModule = (index: number) => {
    const updatedModules = courseForm.modules.filter((_, i) => i !== index);
    setCourseForm({
      ...courseForm,
      modules: updatedModules,
    });
  };

  const handleRemoveQuestion = (moduleIndex: number, questionIndex: number) => {
    const updatedModules = [...courseForm.modules];
    updatedModules[moduleIndex].Quiz.questions = updatedModules[
      moduleIndex
    ].Quiz.questions.filter((_, i) => i !== questionIndex);
    setCourseForm({
      ...courseForm,
      modules: updatedModules,
    });
  };

  const SkeletonCard = () => (
    <Card >
      <CardHeader>
        <Skeleton width="70%" height="1.5rem" className="mb-2" />
        <Skeleton width="40%" height="1rem" />
      </CardHeader>
      <CardContent>
        <Skeleton height="1.5rem" className="mb-2" />
        <Skeleton height="1.5rem" className="mb-2" />
        <Skeleton height="1.5rem" className="mb-2" />
        <Skeleton width="50%" height="1rem" />
      </CardContent>
    </Card>
  );


  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mx-2">
        <h2 className="text-2xl font-bold">Your Courses</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              disabled={disabled}
              onClick={() => {
                setEditingCourse(null);
                setCourseForm({
                  title: "",
                  description: "",
                  category: "",
                  modules: [],
                });
              }}>
              <Plus className="h-4 w-4 mr-2" />
              Create Course
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingCourse ? "Edit Course" : "Create New Course"}
              </DialogTitle>
              <DialogDescription>
                Fill in the course details and add modules below.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Title</label>
                  <Input
                    value={courseForm.title}
                    onChange={(e) =>
                      setCourseForm({ ...courseForm, title: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Category</label>
                  <Input
                    value={courseForm.category}
                    onChange={(e) =>
                      setCourseForm({ ...courseForm, category: e.target.value })
                    }
                    required
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Description</label>
                <Textarea
                  value={courseForm.description}
                  onChange={(e) =>
                    setCourseForm({
                      ...courseForm,
                      description: e.target.value,
                    })
                  }
                  required
                />
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Modules</h3>
                </div>

                {courseForm.modules.map((module, moduleIndex) => (
                  <Card key={moduleIndex}>
                    <CardHeader>
                      <CardTitle className="flex justify-between">
                        <span>Module {moduleIndex + 1}</span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveModule(moduleIndex)}>
                          <Trash className="h-4 w-4" />
                        </Button>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Input
                        placeholder="Module Title"
                        value={module.title}
                        onChange={(e) =>
                          handleModuleChange(
                            moduleIndex,
                            "title",
                            e.target.value
                          )
                        }
                        required
                      />
                      <Textarea
                        placeholder="Module Content"
                        value={module.content}
                        onChange={(e) =>
                          handleModuleChange(
                            moduleIndex,
                            "content",
                            e.target.value
                          )
                        }
                        required
                      />
                      <Input
                        placeholder="Video URL (optional)"
                        value={module.videoUrl}
                        onChange={(e) =>
                          handleModuleChange(
                            moduleIndex,
                            "VideoUrl",
                            e.target.value
                          )
                        }
                      />

                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <h4 className="font-medium">Quiz Questions</h4>
                          <Button
                            disabled={disabled}
                            type="button"
                            size="sm"
                            onClick={() => handleAddQuestion(moduleIndex)}>
                            Add Question
                          </Button>
                        </div>

                        {module.Quiz?.questions.map(
                          (question, questionIndex) => (
                            <Card key={questionIndex}>
                              <CardContent className="space-y-4 pt-4">
                                <div className="flex justify-between items-start">
                                  <Input
                                    placeholder="Question"
                                    value={question.question}
                                    onChange={(e) =>
                                      handleQuestionChange(
                                        moduleIndex,
                                        questionIndex,
                                        "question",
                                        e.target.value
                                      )
                                    }
                                    required
                                  />
                                  <Button
                                    disabled={disabled}
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={() =>
                                      handleRemoveQuestion(
                                        moduleIndex,
                                        questionIndex
                                      )
                                    }>
                                    <Trash className="h-4 w-4" />
                                  </Button>
                                </div>

                                {question.options.map((option, optionIndex) => (
                                  <div
                                    key={optionIndex}
                                    className="flex items-center gap-2">
                                    <Input
                                      placeholder={`Option ${optionIndex + 1}`}
                                      value={option}
                                      onChange={(e) => {
                                        const updatedModules = [
                                          ...courseForm.modules,
                                        ];
                                        updatedModules[
                                          moduleIndex
                                        ].Quiz.questions[questionIndex].options[
                                          optionIndex
                                        ] = e.target.value;
                                        setCourseForm({
                                          ...courseForm,
                                          modules: updatedModules,
                                        });
                                      }}
                                      required
                                    />
                                    <input
                                      title="Correct Answer"
                                      type="radio"
                                      name={`correct-answer-${moduleIndex}-${questionIndex}`}
                                      checked={
                                        question.correctAnswer === optionIndex
                                      }
                                      onChange={() =>
                                        handleQuestionChange(
                                          moduleIndex,
                                          questionIndex,
                                          "options",
                                          optionIndex
                                        )
                                      }
                                      required
                                    />
                                  </div>
                                ))}
                              </CardContent>
                            </Card>
                          )
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
                <div className="w-full flex justify-end">
                  <Button
                    disabled={disabled}
                    type="button"
                    onClick={handleAddModule}>
                    Add Module
                  </Button>
                </div>
              </div>

              <Button disabled={disabled} type="submit">
                {editingCourse ? "Update Course" : "Create Course"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mx-2">
        {loading && (
        <>
        {[...Array(4)].map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </>     
        )}
        {courses?.map((course) => (
          <Card key={course.id}>
            <CardHeader>
              <CardTitle className="flex justify-between items-start">
                <span>{course.title}</span>
                <div className="flex gap-2">
                  <Button
                    disabled={true}
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setEditingCourse(course);
                      setCourseForm({
                        title: course.title,
                        description: course.description,
                        category: course.category,
                        modules: course.modules.map(
                          ({ id, ...module }) => module
                        ),
                      });
                      setIsDialogOpen(true);
                    }}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    disabled={true}
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setCourses(courses.filter((c) => c.id !== course.id));
                      toast({
                        title: "Course Deleted",
                        description:
                          "The course has been successfully deleted.",
                      });
                    }}>
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">{course.description}</p>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">
                    Category: {course.category}
                  </span>
                  <div className="flex items-center">
                    <BookOpen className="h-4 w-4 mr-2" />
                    <span className="text-sm">
                      {course.modules.length} Modules
                    </span>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Enrollments</span>
                    <span className="text-sm">
                      {course.enrollments.length} People
                    </span>
                  </div>

                </div>

              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
