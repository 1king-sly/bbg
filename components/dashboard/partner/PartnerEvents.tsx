"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Calendar, MapPin, Users, Plus, Pencil, Trash } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  location: string;
  attendees: number;
  maxAttendees: number;
}

export default function ExpertEvents() {
  const { toast } = useToast();
  const [events, setEvents] = useState<Event[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<any>(null);
  const [eventForm, setEventForm] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    maxAttendees: "",
  });
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      const access_token = localStorage.getItem("accessToken");

      try {
        const response = await fetch(`${API_URL}/events/me`, {
          method: "GET",
          mode: "no-cors",
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
        console.error("Failed to fetch Events", error);
      }
    };
    fetchEvents();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setDisabled(true);

    const access_token = localStorage.getItem("accessToken");

    if (editingEvent) {
      try {
        const response = await fetch(`${API_URL}/experts/${editingEvent.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
          },
          body: JSON.stringify(eventForm),
        });

        if (response.ok) {
          const updatedEvent = await response.json();
          setDisabled(false);

          setEvents((prev) =>
            prev.map((event) =>
              event.id === editingEvent.id ? updatedEvent : event
            )
          );

          toast({
            title: "Expert Updated",
            description: "The expert has been successfully updated.",
          });

          setIsDialogOpen(false);
          setEditingEvent(null);
          setEventForm({
            title: "",
            description: "",
            date: "",
            location: "",
            maxAttendees: "",
          });
        } else {
          toast({
            title: "Action Failed",
            description: "Failed to create  expert",
            variant: "destructive",
          });
          setDisabled(false);
        }
      } catch (error: any) {
        console.error(error);
        setDisabled(false);

        toast({
          title: "Action Failed",
          description: "Failed to create  expert",
          variant: "destructive",
        });
      }
    } else {
      try {
        const newEvent = {
          id: events.length + 1,
          ...eventForm,
          attendees: 0,
          maxAttendees: parseInt(eventForm.maxAttendees),
        };
        const response = await fetch(`${API_URL}/events`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
          },
          body: JSON.stringify(newEvent),
        });

        const data = await response.json();

        if (response.ok) {
          setEvents((prev) => [...prev, data]);
          toast({
            title: "Action Successful",
            description: "Event Successfully created",
          });
          setIsDialogOpen(false);
          setEditingEvent(null);
          setEventForm({
            title: "",
            description: "",
            date: "",
            location: "",
            maxAttendees: "",
          });

          setDisabled(false);
        }

        if (!response.ok) {
          toast({
            title: "Action Failed",
            description: "Failed to create  event",
            variant: "destructive",
          });

          setDisabled(false);
        }
      } catch (error: any) {
        console.error(error);

        toast({
          title: "Action Failed",
          description: "Failed to create  event",
          variant: "destructive",
        });

        setDisabled(false);
      }
    }
  };

  const handleEdit = (event: any) => {
    setEditingEvent(event);
    setEventForm({
      title: event.title,
      description: event.description,
      date: event.date,
      location: event.location,
      maxAttendees: event.maxAttendees.toString(),
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (eventId: number) => {
    const access_token = localStorage.getItem("accessToken");

    setDisabled(true);

    try {
      const response = await fetch(`${API_URL}/events/${eventId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: "Event Deleted",
          description: "The event has been successfully deleted.",
        });
      } else {
        toast({
          title: "Action Failed",
          description: "Failed to delete event",
          variant: "destructive",
        });
      }

      setDisabled(false);
    } catch (error: any) {
      console.error(error);

      toast({
        title: "Action Failed",
        description: "Failed to delete  expert",
        variant: "destructive",
      });

      setDisabled(false);
    }
  };

  // const handleDelete = (eventId: number) => {
  //   setEvents(events.filter((event) => event.id !== eventId));
  //   toast({
  //     title: "Event Deleted",
  //     description: "The event has been successfully deleted.",
  //   });
  // };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Your Events</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              disabled={disabled}
              onClick={() => {
                setEditingEvent(null);
                setEventForm({
                  title: "",
                  description: "",
                  date: "",
                  location: "",
                  maxAttendees: "",
                });
              }}>
              <Plus className="h-4 w-4 mr-2" />
              Create Event
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingEvent ? "Edit Event" : "Create New Event"}
              </DialogTitle>
              <DialogDescription>
                Fill in the details for your event below.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium">Title</label>
                <Input
                  value={eventForm.title}
                  onChange={(e) =>
                    setEventForm({ ...eventForm, title: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium">Description</label>
                <Textarea
                  value={eventForm.description}
                  onChange={(e) =>
                    setEventForm({ ...eventForm, description: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium">Date</label>
                <Input
                  type="date"
                  value={eventForm.date}
                  min={new Date().toISOString().split("T")[0]}
                  onChange={(e) =>
                    setEventForm({ ...eventForm, date: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium">Location</label>
                <Input
                  value={eventForm.location}
                  onChange={(e) =>
                    setEventForm({ ...eventForm, location: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium">Maximum Attendees</label>
                <Input
                  type="number"
                  value={eventForm.maxAttendees}
                  onChange={(e) =>
                    setEventForm({ ...eventForm, maxAttendees: e.target.value })
                  }
                  required
                />
              </div>
              <Button type="submit">
                {editingEvent ? "Update Event" : "Create Event"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {events.map((event) => (
          <Card key={event.id}>
            <CardHeader>
              <CardTitle className="flex justify-between items-start">
                <span>{event.title}</span>
                <div className="flex gap-2">
                  <Button
                    disabled={disabled}
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEdit(event)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    disabled={disabled}
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(event.id)}>
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">{event.description}</p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  {event.date}
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2" />
                  {event.location}
                </div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-2" />
                  {event.attendees}/{event.maxAttendees} Attendees
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
