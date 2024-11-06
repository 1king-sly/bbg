"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

export default function GalDashboard() {
  const { toast } = useToast();
  const [journal, setJournal] = useState('');

  const handleJournalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the journal entry to your backend
    console.log('Journal entry:', journal);
    toast({
      title: "Journal Entry Saved",
      description: "Your thoughts have been recorded.",
    });
    setJournal('');
  };

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-4xl font-bold mb-8">Welcome, Sarah!</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Your Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Workshops attended: 3</p>
            <p>Mentoring sessions: 2</p>
            <p>Skills learned: Web Development, Public Speaking</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
          </CardHeader>
          <CardContent>
            <ul>
              <li>Tech Workshop - Next Saturday</li>
              <li>Career Counseling - Next Tuesday</li>
            </ul>
          </CardContent>
        </Card>
      </div>
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Daily Journal</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleJournalSubmit}>
            <Textarea
              placeholder="Write your thoughts here..."
              value={journal}
              onChange={(e) => setJournal(e.target.value)}
              className="mb-4"
            />
            <Button type="submit">Save Entry</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}