"use client";

import { useState } from 'react';
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


const sessionData = [
  { month: 'Jan', sessions: 4 },
  { month: 'Feb', sessions: 6 },
  { month: 'Mar', sessions: 8 },
  { month: 'Apr', sessions: 12 },
  { month: 'May', sessions: 15 },
];

export default function ExpertDashboard() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");

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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Events Created
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">12</p>
                <p className="text-sm text-muted-foreground">+2 this month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Total Attendees
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">245</p>
                <p className="text-sm text-muted-foreground">+45 this month</p>
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
                <p className="text-3xl font-bold">5</p>
                <p className="text-sm text-muted-foreground">+1 this month</p>
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
                <p className="text-3xl font-bold">48</p>
                <p className="text-sm text-muted-foreground">+8 this month</p>
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