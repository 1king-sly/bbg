"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', users: 400 },
  { name: 'Feb', users: 300 },
  { name: 'Mar', users: 200 },
  { name: 'Apr', users: 278 },
  { name: 'May', users: 189 },
];

export default function AdminDashboard() {
  const { toast } = useToast();
  const [newAnnouncement, setNewAnnouncement] = useState('');

  const handleAnnouncementSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the announcement to your backend
    console.log('New announcement:', newAnnouncement);
    toast({
      title: "Announcement Posted",
     
    });
    setNewAnnouncement('');
  };

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>User Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="users" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Post Announcement</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAnnouncementSubmit}>
              <Input
                placeholder="Write your announcement here..."
                value={newAnnouncement}
                onChange={(e) => setNewAnnouncement(e.target.value)}
                className="mb-2"
              />
              <Button type="submit">Post Announcement</Button>
            </form>
          </CardContent>
        </Card>
      </div>
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Quick Stats</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Total Users: 1,367</p>
          <p>Active Partners: 25</p>
          <p>Resources Shared: 150</p>
          <p>Upcoming Events: 10</p>
        </CardContent>
      </Card>
    </div>
  );
}