"use client";

import { useState,useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Plus, Pencil, Trash, Search, Calendar, MapPin, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";


// Define types for Event and Form State
interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  location: string;
  maxAttendees: number;
  attendees:[]
  expert:{
    name:string
  }
  partner:{
    name:string
  }
  organization:{
    name:string
  }
}



const API_URL = process.env.NEXT_PUBLIC_API_URL;


export default function AdminEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setIsLoading] = useState(true);



  const access_token = localStorage.getItem("accessToken");

  const fetchEvents = async () => {
    try {
      const response = await fetch(`${API_URL}/events/enrolled/me`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
      });

      const data = await response.json();
      if (response.ok) {
        setEvents(data);
      }
    } catch (error) {
      console.error("Failed to fetch User courses", error);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    fetchEvents();
  }, []);


  const getStatusBadge = (date: Event['date']) => {
    const eventDate = new Date(date);
    const todayDate = new Date();
  
    if (eventDate > todayDate) {
      return <Badge variant="outline">Upcoming</Badge>;
    } else if (eventDate == todayDate) {
      return <Badge variant="secondary">Ongoing</Badge>;
    } else {
      return <Badge>Completed</Badge>;
    }
  };

  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.expert?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.partner?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.organization?.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="relative w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>

      </div>

      <Card>
        <CardHeader>
          <CardTitle>Events</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Event Details</TableHead>
                <TableHead>Date & Location</TableHead>
                <TableHead>Attendees</TableHead>
                <TableHead>Organizers</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEvents.map((event) => (
                <TableRow key={event.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{event.title}</p>
                      <p className="text-sm text-muted-foreground">{event.description}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                        {new Date(event.date).toLocaleDateString()}
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1 text-muted-foreground" />
                        {event.location}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1 text-muted-foreground" />
                      {event.attendees.length}/{event.maxAttendees}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      {event.expert && (
                        <p className="text-sm">Expert: {event.expert.name}</p>
                      )}
                      {event.partner && (
                        <p className="text-sm">Partner: {event.partner.name}</p>
                      )}
                      {event.organization && (
                        <p className="text-sm">Org: {event.organization.name}</p>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(event.date)}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                    <Link href={`/dashboard/user/events/${event.id}`}>
              <Button>View Event</Button>
            </Link>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}