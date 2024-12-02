"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import QuizModule from '@/components/QuizModule';
import { useParams } from 'next/navigation';

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

export default function ModulePage() {

    const params = useParams()

    const {id, moduleId} = params


  const { toast } = useToast();
  const [module, setModule] = useState<Module | null>(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {

    setModule({
      id: 1,
      title: "Introduction to Programming",
      content: "Learn the basics of programming concepts...",
      videoUrl: "https://www.youtube.com/embed/example",
      quiz: {
        questions: [
          {
            id: 1,
            question: "What is a variable?",
            options: [
              "A container for storing data",
              "A mathematical equation",
              "A programming language",
              "A type of loop"
            ],
            correctAnswer: 0
          },
          {
            id: 2,
            question: "What is a function?",
            options: [
              "A type of variable",
              "A reusable block of code",
              "A data type",
              "A loop construct"
            ],
            correctAnswer: 1
          }
        ]
      }
    });
  }, [moduleId]);

  const handleQuizComplete = (score: number) => {
    // Save progress to backend
    toast({
      title: "Module Completed",
      description: `You scored ${score}% on the quiz!`,
    });
    setIsCompleted(true);
  };

  if (!module) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto py-12">
      {!showQuiz ? (
        <>
          <h1 className="text-3xl font-bold mb-8">{module.title}</h1>
          <Tabs defaultValue="content">
            <TabsList>
              <TabsTrigger value="content">Written Content</TabsTrigger>
              {module.videoUrl && <TabsTrigger value="video">Video</TabsTrigger>}
            </TabsList>
            <TabsContent value="content">
              <Card>
                <CardContent className="prose max-w-none mt-6">
                  {module.content}
                </CardContent>
              </Card>
            </TabsContent>
            {module.videoUrl && (
              <TabsContent value="video">
                <Card>
                  <CardContent className="aspect-video mt-6">
                    <iframe
                    title="module video url"
                      src={module.videoUrl}
                      className="w-full h-full"
                      allowFullScreen
                    />
                  </CardContent>
                </Card>
              </TabsContent>
            )}
          </Tabs>
          <div className="mt-8 flex justify-end">
            <Button onClick={() => setShowQuiz(true)}>
              Take Quiz to Continue
            </Button>
          </div>
        </>
      ) : (
        <QuizModule
          moduleId={parseInt(moduleId.toString())}
          questions={module.quiz.questions}
          onComplete={handleQuizComplete}
        />
      )}
    </div>
  );
}