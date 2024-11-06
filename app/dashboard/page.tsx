"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Bell, Download } from "lucide-react";
import Link from 'next/link';

// Dummy data
const userCourses = [
  {
    id: 1,
    title: "Software Engineering",
    progress: 75,
    completed: false
  },
  {
    id: 2,
    title: "Digital Marketing",
    progress: 100,
    completed: true
  }
];

const events = [
  {
    title: "Tech Workshop",
    date: new Date(2024, 2, 15),
    status: "upcoming" // upcoming, today, past
  },
  {
    title: "Career Fair",
    date: new Date(2024, 2, 20),
    status: "upcoming"
  }
];

const menstrualData = {
  lastPeriod: new Date(2024, 2, 1),
  cycleLength: 28,
  currentDay: 15,
  status: "normal" // normal, fertile, menstruating, warning
};

export default function Dashboard() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "normal": return "bg-blue-500";
      case "fertile": return "bg-green-500";
      case "menstruating": return "bg-red-500";
      case "warning": return "bg-yellow-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <div className="container mx-auto py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Menstrual Cycle Progress */}
        <Card>
          <CardHeader>
            <CardTitle>Cycle Tracking</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative pt-1">
              <div className="flex mb-2 items-center justify-between">
                <div>
                  <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-white bg-pink-600">
                    Day {menstrualData.currentDay}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-semibold inline-block text-pink-600">
                    {Math.round((menstrualData.currentDay / menstrualData.cycleLength) * 100)}%
                  </span>
                </div>
              </div>
              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-pink-200">
                <div
                  style={{ width: `${(menstrualData.currentDay / menstrualData.cycleLength) * 100}%` }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-pink-500"
                ></div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Calendar */}
        <Card>
          <CardHeader>
            <CardTitle>Events Calendar</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={new Date()}
              className="rounded-md border"
            />
          </CardContent>
        </Card>

        {/* Daily Notification */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Daily Update
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              Remember to take your prenatal vitamins today! Stay hydrated and get plenty of rest.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Enrolled Courses */}
      <h2 className="text-2xl font-bold mt-12 mb-6">Your Courses</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {userCourses.map((course) => (
          <Card key={course.id}>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                {course.title}
                {course.completed && (
                  <Button size="sm" variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Certificate
                  </Button>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Progress value={course.progress} className="mb-2" />
              <p className="text-sm text-gray-500">{course.progress}% Complete</p>
              {!course.completed && (
                <Link href={`/courses/${course.id}`}>
                  <Button className="mt-4">Continue Learning</Button>
                </Link>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}