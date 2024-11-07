"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Users, BookOpen, Calendar, Building2, UserPlus, GraduationCap } from "lucide-react";

const monthlyData = [
  { month: 'Jan', users: 120, experts: 8, partners: 4, organizations: 3 },
  { month: 'Feb', users: 150, experts: 10, partners: 5, organizations: 4 },
  { month: 'Mar', users: 180, experts: 12, partners: 6, organizations: 5 },
  { month: 'Apr', users: 220, experts: 15, partners: 7, organizations: 6 },
  { month: 'May', users: 250, experts: 18, partners: 8, organizations: 7 },
];

const courseData = [
  { month: 'Jan', enrollments: 80, completions: 45 },
  { month: 'Feb', enrollments: 100, completions: 60 },
  { month: 'Mar', enrollments: 120, completions: 75 },
  { month: 'Apr', enrollments: 150, completions: 90 },
  { month: 'May', enrollments: 180, completions: 110 },
];

export default function AdminOverview() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Total Users
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">920</p>
            <p className="text-sm text-muted-foreground">+30 this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5" />
              Active Experts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">53</p>
            <p className="text-sm text-muted-foreground">+3 this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              Partners & Organizations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">25</p>
            <p className="text-sm text-muted-foreground">+2 this month</p>
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
            <p className="text-3xl font-bold">45</p>
            <p className="text-sm text-muted-foreground">+5 this month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Growth Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="users" fill="#8884d8" name="Users" />
                  <Bar dataKey="experts" fill="#82ca9d" name="Experts" />
                  <Bar dataKey="partners" fill="#ffc658" name="Partners" />
                  <Bar dataKey="organizations" fill="#ff7300" name="Organizations" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Course Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={courseData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="enrollments" 
                    stroke="#8884d8" 
                    name="Enrollments"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="completions" 
                    stroke="#82ca9d" 
                    name="Completions"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}