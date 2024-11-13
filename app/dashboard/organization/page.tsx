"use client";

import { useState,useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Calendar, Users, BookOpen, Video } from "lucide-react";
import OrganizationCourses from '@/components/dashboard/organization/OrganizationCourses';
import OrganizationEvents from '@/components/dashboard/organization/OrganizationEvents';
import OrganizationProfile from '@/components/dashboard/organization/OrganizationProfile';
import OrganiztaionSessions from '@/components/dashboard/organization/OrganiztaionSessions';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

type Stats = {
  courses_count: number;
  events_count: number;
  sessions_count: number;
  monthly_counts: {
    courses: { [key: string]: number };
    events: { [key: string]: number };
    sessions: { [key: string]: number };
  };
};




export default function ExpertDashboard() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");
  const [stats, setStats] = useState<Stats | null>(null);
  const [sessionData, setSessionData] = useState<{ month: string, sessions: number }[]>([]);

  const fetchStats = async()=>{
    const access_token = localStorage.getItem("accessToken");
    
    try{
      const response = await fetch(`${API_URL}/organizations/me/stats`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
         
        }
      });

      const data = await response.json();

      console.log(data)


      if (response.ok) {
        setStats(data);
        setSessionData(
          data.monthly_counts.sessions ? Object.entries(data.monthly_counts.sessions).map(([month, count]) => ({
            month, 
            sessions: Number(count)
          })) : []
        );
      }
    }catch(error){
      console.error('Failed to fetch stats',error)
    }
  }

  useEffect(()=>{
  
    fetchStats();
  },[])

  const calculateChange = (monthlyCounts: { [key: string]: number }, currentMonth: string) => {
    const months = Object.keys(monthlyCounts);
    const currentIndex = months.indexOf(currentMonth);
    if (currentIndex > 0) {
      const previousMonth = months[currentIndex - 1];
      return monthlyCounts[currentMonth] - monthlyCounts[previousMonth];
    }
    return 0; // No previous month data available
  };

  const getMostRecentMonth = (monthlyCounts: { [key: string]: number }) => {
    const months = Object.keys(monthlyCounts);
    return months.length > 0 ? months[months.length - 1] : null;
  };

  const currentMonth = stats ? getMostRecentMonth(stats.monthly_counts.events) : null;

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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Events Created
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{stats?.events_count || 0 }</p>
                <p className="text-sm text-muted-foreground">                   +{currentMonth && stats?.monthly_counts?.events ? calculateChange(stats?.monthly_counts.events, currentMonth) : 0} this month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Active Courses
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{stats?.courses_count || 0}</p>
                <p className="text-sm text-muted-foreground">                   +{currentMonth && stats?.monthly_counts?.events ? calculateChange(stats?.monthly_counts.events, currentMonth) : 0} this month

                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Video className="h-5 w-5" />
                  Sessions Held
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{stats?.sessions_count || 0}</p>
                <p className="text-sm text-muted-foreground">                   +{currentMonth && stats?.monthly_counts?.courses ? calculateChange(stats?.monthly_counts.courses, currentMonth) : 0} this month
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Session Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={sessionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="sessions" fill="#8884d8" name="Total Sessions" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="profile">
          <OrganizationProfile />
        </TabsContent>

        <TabsContent value="events">
          <OrganizationEvents />
        </TabsContent>

        <TabsContent value="courses">
          <OrganizationCourses />
        </TabsContent>

        <TabsContent value="sessions">
          <OrganiztaionSessions/>
        </TabsContent>
      </Tabs>
    </div>
  );
}