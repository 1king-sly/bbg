"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

interface QuizModuleProps {
  questions: Question[];
  onComplete: (score: number) => void;
}

export default function QuizModule({  questions, onComplete }: QuizModuleProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [testScore, setTestScore] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);

  const { toast } = useToast();

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

  const calculateResults = () => {
    const correctAnswers = questions.filter((q, index) => q.correctAnswer === answers[index]).length;
    const score = (correctAnswers / questions.length) * 100;
    setShowResults(true);
    setTestScore(score)
    
    if (score >= 70) {
      toast({
        title: "Congratulations!",
        description: `You passed with a score of ${score}%`,
      });
      onComplete(score);
    } else {
      toast({
        title: "Try Again",
        description: `You scored ${score}%. You need 70% to pass.`,
        variant: "destructive",
      });
    }
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

          {testScore > 70 ?(
                       <Button onClick={() => {
                        setShowResults(false);
                        setCurrentQuestion(0);
                        setAnswers([]);
                      }}>
                        Next Module
                      </Button>
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
          disabled={answers[currentQuestion] === undefined}
        >
          {currentQuestion === questions.length - 1 ? 'Finish' : 'Next'}
        </Button>
      </CardContent>
    </Card>
  );
}