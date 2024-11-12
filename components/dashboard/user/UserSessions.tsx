"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Video, MessageCircle, Phone, Calendar, Clock, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const dummySessions = [
  {
    id: 1,
    userId: 1,
    userName: "Jane Smith",
    type: "video",
    status: "scheduled",
    startTime: "2024-03-20T10:00:00",
    duration: 60,
    notes: "Initial consultation regarding anxiety management"
  },
  {
    id: 2,
    userId: 2,
    userName: "John Doe",
    type: "chat",
    status: "completed",
    startTime: "2024-03-19T14:00:00",
    duration: 45,
    notes: "Follow-up session on parenting techniques"
  },
  {
    id: 3,
    userId: 3,
    userName: "Sarah Johnson",
    type: "audio",
    status: "ongoing",
    startTime: "2024-03-19T15:30:00",
    duration: 30,
    notes: "Emergency consultation"
  }
];

export default function ExpertSessions() {
  const { toast } = useToast();
  const [sessions, setSessions] = useState(dummySessions);

  const getSessionIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Video className="h-4 w-4" />;
      case 'chat':
        return <MessageCircle className="h-4 w-4" />;
      case 'audio':
        return <Phone className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'scheduled':
        return <Badge variant="outline">Scheduled</Badge>;
      case 'ongoing':
        return <Badge variant="secondary">Ongoing</Badge>;
      case 'completed':
        return <Badge variant="default">Completed</Badge>;
      default:
        return null;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  const handleJoinSession = (sessionId: number) => {
    toast({
      title: "Joining Session",
      description: "Connecting to session...",
    });
    // Here you would typically handle the session connection
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Your Sessions</h2>

      <div className="grid grid-cols-1 gap-6">
        {sessions.map((session) => (
          <Card key={session.id}>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  {getSessionIcon(session.type)}
                  <span>Session with {session.userName}</span>
                </div>
                {getStatusBadge(session.status)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(session.startTime)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{session.duration} minutes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span>User ID: {session.userId}</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-4">{session.notes}</p>
                  {session.status !== 'completed' && (
                    <Button onClick={() => handleJoinSession(session.id)}>
                      Join Session
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}