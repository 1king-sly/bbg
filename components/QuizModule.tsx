"use client";

import { useState,useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";


interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

interface QuizModuleProps {
  moduleId: string;
  questions: Question[];
  onComplete: (score: number) => void;
  courseId:string
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;



export default function QuizModule({moduleId,courseId, questions, onComplete }: QuizModuleProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [testScore, setTestScore] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [currentIndex, setCurrentModuleIndex] = useState<number | null>(null);
  const [nextModuleId, setNextModuleId] = useState<string | null>(null);
  const [loading, setIsLoading] = useState(false);


  const { toast } = useToast();

  useEffect(() => {
    const currentModuleIndex = sessionStorage.getItem("currentModuleIndex");
    if (currentModuleIndex) {
      setCurrentModuleIndex(parseInt(currentModuleIndex));
    }
  }, []);

  const handleAnswer = (answer: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answer;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResults();
    }
  };

  const handleNavigation = (index: number | null) => {
    if (index !== null) {
      const nextIndex = index + 1
      sessionStorage.setItem("currentModuleIndex", nextIndex.toString());
      setCurrentModuleIndex(nextIndex)

    } else {
      sessionStorage.removeItem("currentModuleIndex");
    }
  };

  const calculateResults =async () => {
    const correctAnswers = questions.filter((q, index) => q.correctAnswer === answers[index]).length;
    const score = (correctAnswers / questions.length) * 100;
    setTestScore(score)
    
    setIsLoading(true)
    if (score >= 70) {

      const access_token = localStorage.getItem("accessToken");


      try {
        const response = await fetch(`${API_URL}/courses/modules/${moduleId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
          },
          body:JSON.stringify({index:currentIndex})
        });
  
        const data = await response.json();
        console.log(data)

        if (response.ok) {

          handleNavigation(currentIndex)

          setNextModuleId(data.nextModule?.moduleId)

          toast({
            title: "Congratulations!",
            description: `You passed with a score of ${score}%`,
          });
          onComplete(score);
        }
      } catch (error) {
        console.error("Failed to update module progress ", error);
        toast({
          title: "Something went wrong",
          description: `Try re-submitting.`,
          variant: "destructive",
        });

        setShowResults(true);

      }

    } else {
      setShowResults(true);

      toast({
        title: "Try Again",
        description: `You scored ${score}%. You need 70% to pass.`,
        variant: "destructive",
      });
    }

    setIsLoading(false)
  };



  if (showResults) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Quiz Results</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg mb-4">
            You got {questions.filter((q, index) => q.correctAnswer === answers[index]).length} out of {questions.length} questions correct.
          </p>

          {testScore > 70  ?(
            nextModuleId ?(
              <Link href={`/dashboard/user/courses/${courseId}/module/${nextModuleId}`}>
                            <Button onClick={() => {
                setShowResults(false);
                setCurrentQuestion(0);
                setAnswers([]);
              }}>
                Next Module
              </Button>
              </Link>

            ):(

              <Link href={`/dashboard/user/courses/${courseId}}`}>
              <Button onClick={() => {
  setShowResults(false);
  setCurrentQuestion(0);
  setAnswers([]);
}}>
  Go to Modules
</Button>
</Link>

            )
                      
          ):(

            <Button onClick={() => {
              setShowResults(false);
              setCurrentQuestion(0);
              setAnswers([]);
            }}>
              Try Again
            </Button>
          )}
       

        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Question {currentQuestion + 1} of {questions.length}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-lg mb-4">{questions[currentQuestion].question}</p>
        <RadioGroup
          value={answers[currentQuestion]?.toString()}
          onValueChange={(value) => handleAnswer(parseInt(value))}
        >
          {questions[currentQuestion].options.map((option, index) => (
            <div key={index} className="flex items-center space-x-2 mb-2">
              <RadioGroupItem value={index.toString()} id={`option-${index}`} />
              <Label htmlFor={`option-${index}`}>{option}</Label>
            </div>
          ))}
        </RadioGroup>
        <Button
          onClick={handleNext}
          className="mt-4"
          disabled={loading}
        >
          {currentQuestion === questions.length - 1 ? 'Finish' : 'Next'}
        </Button>
      </CardContent>
    </Card>
  );
}