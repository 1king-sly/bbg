"use client";

import { useState } from "react";
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

interface Module {
  id: number;
  title: string;
  content: string;
  videoUrl?: string;
  quiz: {
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
  enrollments: number;
  maxEnrollments: number;
  completionRate: number;
}

export default function AdminCourses() {
  const { toast } = useToast();
  const [courses, setCourses] = useState<Course[]>([
    {
      id: 1,
      title: "Introduction to Web Development",
      description:
        "Learn the fundamentals of web development including HTML, CSS, and JavaScript",
      category: "Technology",
      enrollments: 75,
      maxEnrollments: 100,
      completionRate: 65,
      modules: [
        {
          id: 1,
          title: "HTML Fundamentals",
          content: `
              # Introduction to HTML
              
              HTML (HyperText Markup Language) is the standard markup language for creating web pages.
              
              ## Key Concepts:
              - Document structure
              - Elements and tags
              - Attributes
              - Semantic HTML
              
              ## Common Elements:
              - Headers (\`<h1>\` to \`<h6>\`)
              - Paragraphs (\`<p>\`)
              - Lists (\`<ul>\`, \`<ol>\`, \`<li>\`)
              - Links (\`<a>\`)
              - Images (\`<img>\`)
            `,
          videoUrl: "https://www.youtube.com/embed/qz0aGYrrlhU",
          quiz: {
            questions: [
              {
                id: 1,
                question: "What does HTML stand for?",
                options: [
                  "HyperText Markup Language",
                  "High-Level Text Language",
                  "HyperTransfer Markup Language",
                  "Home Tool Markup Language",
                ],
                correctAnswer: 0,
              },
              {
                id: 2,
                question: "Which tag is used for creating a hyperlink?",
                options: ["<link>", "<a>", "<href>", "<url>"],
                correctAnswer: 1,
              },
            ],
          },
        },
        {
          id: 2,
          title: "CSS Styling",
          content: `
              # Introduction to CSS
              
              CSS (Cascading Style Sheets) is used to style and layout web pages.
              
              ## Key Concepts:
              - Selectors
              - Properties
              - Values
              - Box model
              
              ## Common Properties:
              - color
              - background
              - margin
              - padding
              - display
            `,
          videoUrl: "https://www.youtube.com/embed/1PnVor36_40",
          quiz: {
            questions: [
              {
                id: 1,
                question: "What does CSS stand for?",
                options: [
                  "Computer Style Sheets",
                  "Creative Style System",
                  "Cascading Style Sheets",
                  "Colorful Style Sheets",
                ],
                correctAnswer: 2,
              },
              {
                id: 2,
                question: "Which property is used to change the text color?",
                options: ["text-color", "font-color", "color", "text-style"],
                correctAnswer: 2,
              },
            ],
          },
        },
      ],
    },
    {
      id: 2,
      title: "Digital Marketing Essentials",
      description:
        "Master the fundamentals of digital marketing and social media strategy",
      category: "Marketing",
      enrollments: 45,
      maxEnrollments: 50,
      completionRate: 85,
      modules: [
        {
          id: 1,
          title: "Social Media Marketing",
          content: `
              # Introduction to Social Media Marketing
              
              Learn how to effectively market your business on social media platforms.
              
              ## Key Topics:
              - Platform selection
              - Content strategy
              - Engagement metrics
              - Paid advertising
              
              ## Popular Platforms:
              - Facebook
              - Instagram
              - Twitter
              - LinkedIn
            `,
          videoUrl: "https://www.youtube.com/embed/q8pqDytjlVc",
          quiz: {
            questions: [
              {
                id: 1,
                question: "What is engagement rate?",
                options: [
                  "Number of followers",
                  "Number of posts",
                  "Interaction with content relative to followers",
                  "Number of advertisements",
                ],
                correctAnswer: 2,
              },
              {
                id: 2,
                question:
                  "Which metric is most important for measuring social media success?",
                options: [
                  "Number of posts",
                  "Follower count",
                  "ROI",
                  "Post frequency",
                ],
                correctAnswer: 2,
              },
            ],
          },
        },
      ],
    },
  ]);
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
      quiz: {
        questions: {
          id: number;
          question: string;
          options: string[];
          correctAnswer: number;
        }[];
      };
    }[],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingCourse) {
      const updatedCourses = courses.map((course) =>
        course.id === editingCourse.id
          ? {
              ...course,
              title: courseForm.title,
              description: courseForm.description,
              category: courseForm.category,
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
      const newCourse = {
        id: courses.length + 1,
        title: courseForm.title,
        description: courseForm.description,
        category: courseForm.category,
        modules: courseForm.modules.map((module, index) => ({
          id: index + 1,
          ...module,
        })),
        enrollments: 0,
        maxEnrollments: 100,
        completionRate: 0,
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
      modules: [],
    });
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
          quiz: {
            questions: [],
          },
        },
      ],
    });
  };

  const handleAddQuestion = (moduleIndex: number) => {
    const updatedModules = [...courseForm.modules];
    updatedModules[moduleIndex].quiz.questions.push({
      id: updatedModules[moduleIndex].quiz.questions.length + 1,
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
      updatedModules[moduleIndex].quiz.questions[questionIndex].correctAnswer =
        optionIndex;
    } else {
      updatedModules[moduleIndex].quiz.questions[questionIndex] = {
        ...updatedModules[moduleIndex].quiz.questions[questionIndex],
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
    updatedModules[moduleIndex].quiz.questions = updatedModules[
      moduleIndex
    ].quiz.questions.filter((_, i) => i !== questionIndex);
    setCourseForm({
      ...courseForm,
      modules: updatedModules,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Your Courses</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
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
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
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
                            "videoUrl",
                            e.target.value
                          )
                        }
                      />

                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <h4 className="font-medium">Quiz Questions</h4>
                          <Button
                            type="button"
                            size="sm"
                            onClick={() => handleAddQuestion(moduleIndex)}>
                            Add Question
                          </Button>
                        </div>

                        {module.quiz.questions.map(
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
                                        ].quiz.questions[questionIndex].options[
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
                  <Button type="button" onClick={handleAddModule}>
                    Add Module
                  </Button>
                </div>
              </div>

              <Button type="submit">
                {editingCourse ? "Update Course" : "Create Course"}
              </Button>
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
                  <Button
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
                      {course.enrollments}/{course.maxEnrollments}
                    </span>
                  </div>
                  <Progress
                    value={(course.enrollments / course.maxEnrollments) * 100}
                  />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Completion Rate</span>
                    <span className="text-sm">{course.completionRate}%</span>
                  </div>
                  <Progress value={course.completionRate} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
