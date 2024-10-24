"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

export default function PartnerDashboard() {
  const { toast } = useToast();
  const [newEvent, setNewEvent] = useState({ title: '', date: '', description: '' });

  const handleEventSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the new event to your backend
    console.log('New event:', newEvent);
    toast({
      title: "Event Created",
     
    });
    setNewEvent({ title: '', date: '', description: '' });
  };

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-4xl font-bold mb-8">Partner Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Partnership Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Girls supported: 50</p>
            <p>Events hosted: 5</p>
            <p>Resources provided: 100</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Create New Event</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleEventSubmit}>
              <Input
                placeholder="Event Title"
                value={newEvent.title}
                onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                className="mb-2"
              />
              <Input
                type="date"
                value={newEvent.date}
                onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
                className="mb-2"
              />
              <Input
                placeholder="Event Description"
                value={newEvent.description}
                onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
                className="mb-2"
              />
              <Button type="submit">Create Event</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}