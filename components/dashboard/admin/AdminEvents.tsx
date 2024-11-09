"use client";

import { useState } from 'react';
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Pencil, Trash, Search, Calendar, MapPin, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Define types for Event and Form State
interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  location: string;
  maxAttendees: number;
  currentAttendees: number;
  expertId: number | null;
  expertName?: string;
  partnerId: number | null;
  partnerName?: string;
  organizationId: number | null;
  organizationName?: string;
  status: "upcoming" | "ongoing" | "completed";
}

interface EventFormState {
  title: string;
  description: string;
  date: string;
  location: string;
  maxAttendees: number;
  expertId: number | null;
  expertName?: string;
  partnerId: number | null;
  partnerName?: string;
  organizationName?: string;
  organizationId: number | null;

}

// Dummy data
const dummyEvents: Event[] = [
  
    {
      id: 1,
      title: "Tech Girls Summit 2024",
      description: "Annual technology conference for young women in tech",
      date: "2024-04-15",
      location: "Nairobi Convention Center",
      maxAttendees: 500,
      currentAttendees: 350,
      expertId: 1,
      expertName: "Dr. Sarah Johnson",
      partnerId: 1,
      partnerName: "TechGirls Foundation",
      status: "upcoming",
      organizationId: null
    },
    {
      id: 2,
      title: "Mental Health Workshop",
      description: "Interactive workshop on mental health awareness",
      date: "2024-04-20",
      location: "Virtual",
      maxAttendees: 200,
      currentAttendees: 150,
      expertId: 2,
      expertName: "Dr. Michael Chen",
      organizationId: 1,
      organizationName: "Youth Development Center",
      status: "upcoming",
      partnerId: null
    },
    {
      id: 3,
      title: "Career Development Day",
      description: "Career guidance and mentorship program",
      date: "2024-03-10",
      location: "Mombasa Community Hall",
      maxAttendees: 300,
      currentAttendees: 300,
      expertId: 3,
      expertName: "Prof. Emily Rodriguez",
      partnerId: 2,
      partnerName: "Women's Health Initiative",
      status: "completed",
      organizationId: null
    }
  
];

export default function AdminEvents() {
  const { toast } = useToast();
  const [events, setEvents] = useState<Event[]>(dummyEvents);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [eventForm, setEventForm] = useState<EventFormState>({
    title: "",
    description: "",
    date: "",
    location: "",
    maxAttendees: 0,
    expertId: null,
    expertName: "",
    partnerId: null,
    partnerName: "",
    organizationId: null,
    organizationName: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingEvent) {
      const updatedEvents = events.map(event => 
        event.id === editingEvent.id 
          ? { ...event, ...eventForm, maxAttendees: Number(eventForm.maxAttendees) }
          : event
      );
      setEvents(updatedEvents);
      toast({
        title: "Event Updated",
        description: "The event has been successfully updated.",
      });
    } else {
      const newEvent: Event = {
        id: events.length + 1,
        ...eventForm,
        maxAttendees: Number(eventForm.maxAttendees),
        currentAttendees: 0,
        status: "upcoming",
      };
      setEvents([...events, newEvent]);
      toast({
        title: "Event Created",
        description: "The new event has been created successfully.",
      });
    }
    
    setIsDialogOpen(false);
    setEditingEvent(null);
    setEventForm({
      title: "",
      description: "",
      date: "",
      location: "",
      maxAttendees: 0,
      expertId: 0,
      expertName: "",
      partnerId: 0,
      partnerName: "",
      organizationId: 0,
      organizationName: ""
    });
  };

  const handleEdit = (event: Event) => {
    setEditingEvent(event);
    setEventForm({
      title: event.title,
      description: event.description,
      date: event.date,
      location: event.location,
      maxAttendees: event.maxAttendees,
      expertId: event.expertId || null,
      expertName: event.expertName || "",
      partnerId: event.partnerId || null,
      partnerName: event.partnerName || "",
      organizationId: event.organizationId || null,
      organizationName: event.organizationName || ""
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (eventId: number) => {
    setEvents(events.filter(event => event.id !== eventId));
    toast({
      title: "Event Deleted",
      description: "The event has been successfully deleted.",
    });
  };

  const getStatusBadge = (status: Event['status']) => {
    switch (status) {
      case 'upcoming':
        return <Badge variant="outline">Upcoming</Badge>;
      case 'ongoing':
        return <Badge variant="secondary">Ongoing</Badge>;
      case 'completed':
        return <Badge>Completed</Badge>;
      default:
        return null;
    }
  };

  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.expertName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.partnerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.organizationName?.toLowerCase().includes(searchTerm.toLowerCase())
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
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => {
              setEditingEvent(null);
              setEventForm({
                title: "",
                description: "",
                date: "",
                location: "",
                maxAttendees: 0,
                expertId: 0,
                expertName: "",
                partnerId: 0,
                partnerName: "",
                organizationId: null,
                organizationName: ""
              });
            }}>
              <Plus className="h-4 w-4 mr-2" />
              Add Event
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingEvent ? "Edit Event" : "Create New Event"}</DialogTitle>
              <DialogDescription>
                Fill in the event details below.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Title</label>
                  <Input
                    value={eventForm.title}
                    onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Date</label>
                  <Input
                    type="date"
                    value={eventForm.date}
                    onChange={(e) => setEventForm({ ...eventForm, date: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Description</label>
                <Textarea
                  value={eventForm.description}
                  onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Location</label>
                  <Input
                    value={eventForm.location}
                    onChange={(e) => setEventForm({ ...eventForm, location: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Maximum Attendees</label>
                  <Input
                    type="number"
                    value={eventForm.maxAttendees}
                    onChange={(e) => setEventForm({ ...eventForm, maxAttendees: Number(e.target.value) })}
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Expert</label>
                  <Input
                    value={eventForm.expertName}
                    onChange={(e) => setEventForm({ ...eventForm, expertName: e.target.value })}
                    placeholder="Expert Name"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Partner/Organization</label>
                  <Input
                    value={eventForm.partnerName || eventForm.organizationName}
                    onChange={(e) => setEventForm({ 
                      ...eventForm, 
                      partnerName: e.target.value,
                      organizationName: e.target.value 
                    })}
                    placeholder="Partner/Organization Name"
                  />
                </div>
              </div>
              <Button type="submit">{editingEvent ? "Update Event" : "Create Event"}</Button>
            </form>
          </DialogContent>
        </Dialog>
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
                      {event.currentAttendees}/{event.maxAttendees}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      {event.expertName && (
                        <p className="text-sm">Expert: {event.expertName}</p>
                      )}
                      {event.partnerName && (
                        <p className="text-sm">Partner: {event.partnerName}</p>
                      )}
                      {event.organizationName && (
                        <p className="text-sm">Org: {event.organizationName}</p>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(event.status)}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(event)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(event.id)}>
                        <Trash className="h-4 w-4" />
                      </Button>
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