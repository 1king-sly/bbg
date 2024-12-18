"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Bell, Download } from "lucide-react";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UserProfile from "@/components/dashboard/user/UserProfile";
import UserCourses from "@/components/dashboard/user/UserCourses";
import UserEvents from "@/components/dashboard/user/UserEvents";
import UserSessions from "@/components/dashboard/user/UserSessions";

import { useRouter } from "next/navigation";
import NotAuthorized from "@/components/NotAuthorized";
import { differenceInWeeks } from "date-fns";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface User {
  name: string;
  email: string;
  phone: string;
  image: string;
  hasChild: boolean;
  isPregnant: boolean;
  isMenstruating: boolean;
  pregnancyDate?: string;
  lastPeriodDate?: string;
  cycleDays?: number;
  childBirthDate?: string;
}

// Dummy data
const userCourses = [
  {
    id: 1,
    title: "Software Engineering",
    progress: 75,
    completed: false,
  },
  {
    id: 2,
    title: "Digital Marketing",
    progress: 100,
    completed: true,
  },
];

const events = [
  {
    title: "Tech Workshop",
    date: new Date(2024, 2, 15),
    status: "upcoming", // upcoming, today, past
  },
  {
    title: "Career Fair",
    date: new Date(2024, 2, 20),
    status: "upcoming",
  },
];

const menstrualData = {
  lastPeriod: new Date(2024, 2, 1),
  cycleLength: 28,
  currentDay: 28,
  status: "normal", // normal, fertile, menstruating, warning
};

const pregnancyData = {
  dueDate: new Date(2024, 12, 1),
  weeksPregnant: 20,
  trimester: "Second",
};

export default function Dashboard() {
  const [progress, setProgress] = useState(0);

  const [activeTab, setActiveTab] = useState("overview");
  const [status, setStatus] = useState("normal");
  const [lastPeriod, setLastPeriod] = useState<Date>();
  const [currentDay, setCurrentDay] = useState(0);
  const [tracker, setTracker] = useState<User>();

  const [session, setSession] = useState(false);

  const [role, setRole] = useState("");
  const [pregnancyWeeks, setPregnancyWeeks] = useState<number | null>(null);
  const [childWeeks, setChildWeeks] = useState<number | null>(null);
  const [isVerified, setIsVerified] = useState(false);

  const fetchUser = async () => {
    const access_token = localStorage.getItem("accessToken");

    try {
      const response = await fetch(`${API_URL}/users/me`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        setTracker(data);
      }
    } catch (error) {
      console.error("Failed to fetch user", error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "normal":
        return "bg-blue-500";
      case "fertile":
        return "bg-green-500";
      case "menstruating":
        return "bg-red-500";
      case "warning":
        return "bg-rose-500";
      default:
        return "bg-gray-500";
    }
  };

  const fetchSession = async () => {
    const access_token = localStorage.getItem("accessToken");
    const accessRole = localStorage.getItem("role");

    if (access_token && accessRole !== "" && accessRole !== null) {
      setRole(accessRole);
      setSession(true);
      if (access_token && accessRole) {
        setRole(accessRole);

        if (accessRole !== "USER") {
        } else {
          setIsVerified(true);
        }
      }
    }
  };

  useEffect(() => {
    fetchSession();
    fetchUser();

    const lastTrackerPeriodDate = tracker?.lastPeriodDate
      ? new Date(tracker.lastPeriodDate)
      : new Date();
    setLastPeriod(lastTrackerPeriodDate);

    const day = Math.ceil(
      (new Date().getTime() - lastTrackerPeriodDate.getTime()) /
        (1000 * 60 * 60 * 24)
    );

    setCurrentDay(day);

    if (day >= 1 && day <= 5) {
      setStatus("menstruating");
    } else if (day >= 12 && day <= 16) {
      setStatus("fertile");
    } else if (day >= 24) {
      setStatus("warning");
    } else {
      setStatus("normal");
    }

    if (tracker?.isPregnant && tracker.pregnancyDate) {
      const weeks = differenceInWeeks(
        new Date(),
        new Date(tracker.pregnancyDate)
      );
      setPregnancyWeeks(weeks);
    }

    if (tracker?.hasChild && tracker.childBirthDate) {
      const weeks = differenceInWeeks(
        new Date(),
        new Date(tracker.childBirthDate)
      );
      setChildWeeks(weeks);
    }

    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, [tracker?.childBirthDate, tracker?.cycleDays, tracker?.hasChild, tracker?.isPregnant, tracker?.lastPeriodDate, tracker?.pregnancyDate]);

  if (!isVerified) {
    return <NotAuthorized />;
  }

  return (
    <div className="container mx-auto py-12">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5 mb-8">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="courses">Courses</TabsTrigger>
          <TabsTrigger value="sessions">Sessions</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              {tracker?.isMenstruating && (
                <>
                  <CardHeader>
                    <CardTitle>Cycle Tracking</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="relative pt-1">
                      <div className="flex mb-2 items-center justify-between">
                        <div>
                          <span
                            className={`text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-white ${getStatusColor(
                              status
                            )}`}>
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                          </span>
                        </div>

                        <div className="text-right">
                          <span className="text-xs font-semibold inline-block text-pink-600">
                          Day:  {currentDay}
                          </span>
                        </div>
                      </div>
                      <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-pink-200">
                        <div
                          style={{
                            width: `${
                              (Math.ceil(currentDay) /
                                (tracker?.cycleDays || 28)) *
                              100
                            }%`,
                          }}
                          className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${getStatusColor(
                            status
                          )}`}></div>
                      </div>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setActiveTab("profile");
                        }}
                        className="mt-2">
                        Update Tracker
                      </Button>
                    </div>
                  </CardContent>
                </>
              )}

              {tracker?.hasChild && (
                <>
                  <CardHeader>
                    <CardTitle>Child Development Tracking</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm font-semibold">
                      Weeks Since Birth: {childWeeks}
                    </p>
                    <p className="text-sm font-semibold">
                      Age: {childWeeks && Math.floor(childWeeks / 52)} years,{" "}
                      {(childWeeks || 1) % 52} weeks
                    </p>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setActiveTab("profile");
                        }}
                        className="mt-2">
                        Update Tracker
                      </Button>
                  </CardContent>
                </>
              )}

              {tracker?.isPregnant && (
                <>
                  <CardHeader>
                    <CardTitle>Pregnancy Tracking</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="relative pt-1">
                      <p className="text-sm font-semibold">
                        Weeks Pregnant: {pregnancyWeeks}
                      </p>
                      <p className="text-sm font-semibold">
                        Trimester:{" "}
                        {pregnancyWeeks && Math.ceil(pregnancyWeeks / 13)}
                      </p>
                      <p className="text-sm font-semibold">
                        Due Date: {pregnancyData.dueDate.toDateString()}
                      </p>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setActiveTab("profile");
                        }}
                        className="mt-2">
                        Update Tracker
                      </Button>
                    </div>
                  </CardContent>
                </>
              )}
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
                  Remember to take your prenatal vitamins today! Stay hydrated
                  and get plenty of rest.
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
                  <p className="text-sm text-gray-500">
                    {course.progress}% Complete
                  </p>
                  {!course.completed && (
                    <Link href={`/courses/${course.id}`}>
                      <Button className="mt-4">Continue Learning</Button>
                    </Link>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="profile">
          <UserProfile />
        </TabsContent>

        <TabsContent value="events">
          <UserEvents />
        </TabsContent>

        <TabsContent value="courses">
          <UserCourses />
        </TabsContent>

        <TabsContent value="sessions">
          <UserSessions />
        </TabsContent>
      </Tabs>
    </div>
  );
}
