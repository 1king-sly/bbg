"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Users, BookOpen, Calendar, Building2 } from "lucide-react";
import AdminOverview from "@/components/dashboard/admin/AdminOverview";
import AdminUsers from "@/components/dashboard/admin/AdminUsers";
import AdminExperts from "@/components/dashboard/admin/AdminExperts";
import AdminPartners from "@/components/dashboard/admin/AdminPartners";
import AdminOrganizations from "@/components/dashboard/admin/AdminOrganizations";
import AdminEvents from "@/components/dashboard/admin/AdminEvents";
import AdminCourses from "@/components/dashboard/admin/AdminCourses";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="container mx-auto py-12">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-7 mb-8">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="experts">Experts</TabsTrigger>
          <TabsTrigger value="partners">Partners</TabsTrigger>
          <TabsTrigger value="organizations">Organizations</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="courses">Courses</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <AdminOverview />
        </TabsContent>

        <TabsContent value="users">
          <AdminUsers />
        </TabsContent>

        <TabsContent value="experts">
          <AdminExperts />
        </TabsContent>

        <TabsContent value="partners">
          <AdminPartners />
        </TabsContent>

        <TabsContent value="organizations">
          <AdminOrganizations />
        </TabsContent>

        <TabsContent value="events">
          <AdminEvents />
        </TabsContent>

        <TabsContent value="courses">
          <AdminCourses />
        </TabsContent>
      </Tabs>
    </div>
  );
}