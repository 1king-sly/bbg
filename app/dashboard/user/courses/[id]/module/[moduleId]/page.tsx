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
  Quiz: {
    questions: {
      id: number;
      question: string;
      options: string[];
      correctAnswer: number;
    }[];
  };
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;



export default function ModulePage() {

    const params = useParams()

   


  const { toast } = useToast();
  const [module, setModule] = useState<Module | null>(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [loading, setIsLoading] = useState(true);


  const fetchModule = async () => {
    const access_token = localStorage.getItem("accessToken");
    try {
      const response = await fetch(`${API_URL}/courses/modules/${params.moduleId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
      });

      const data = await response.json();
      if (response.ok) {
        setModule(data);
      }
    } catch (error) {
      console.error("Failed to fetch User course", error);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    fetchModule();
  }, []);



  const handleQuizComplete = (score: number) => {
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
                    title={`${module.title} Video Content`}
                    src={`https://www.youtube.com/embed/${new URL(module.videoUrl).searchParams.get('v')}`}
                    loading="lazy"
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
          moduleId={module.id}
          questions={module.Quiz.questions}
          onComplete={handleQuizComplete}
        />
      )}
    </div>
  );
}