"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar, MapPin, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import SkeletonCard from "./skeleton/SkeletonCard";
import EmptyState from "./ui/Empty";


const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  location: string;
  attendees: [];
  maxAttendees: number;
}

const Events = () => {
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [dateFilter, setDateFilter] = useState("");
  const [countyFilter, setCountyFilter] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [loading, setIsLoading] = useState(true);


  const { toast } = useToast();

  const handleFilter = () => {
    const filtered = filteredEvents.filter((event) => {
      const dateMatch = dateFilter ? event.date >= dateFilter : true;
      const countyMatch = countyFilter ? event.location === countyFilter : true;
      return dateMatch && countyMatch;
    });
    setFilteredEvents(filtered);
  };

  useEffect(() => {
    const fetchEvents = async () => {
      const access_token = localStorage.getItem("accessToken");

            setIsLoading(true);


      try {
        const response = await fetch(`${API_URL}/events/upcoming`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
          },
        });

        const data = await response.json();

        if (response.ok) {
          setFilteredEvents(data);
          setEvents(data);
        }
      } catch (error) {
        console.error("Failed to fetch Events", error);
      }finally{

        setIsLoading(false);
      }

    };
    fetchEvents();
  }, []);

  const rsvp = async (id: number) => {
    const access_token = localStorage.getItem("accessToken");
    setDisabled(true);

    try {
      const response = await fetch(`${API_URL}/events/${id}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
      });

      if (response.ok) {
        toast({
          title: "Action Successful",
          description: "Successfully rsvp for event",
        });
      }

      if (response.status === 402) {
        toast({
          title: "Action Failed",
          description: "You already rsvp'd for event",
          variant: "destructive",
        });
      }
      if (response.status === 401) {
        toast({
          title: "Action Failed",
          description: "Kindly login or create account to RSVP",
          variant: "destructive",
        });
      }

      if (!response.ok && response.status !== 402 && response.status !== 401) {
        toast({
          title: "Action Failed",
          description: "Failed to rsvp for event",
          variant: "destructive",
        });
      }

      setDisabled(false);
    } catch (error: any) {
      console.error("An error occurred", error);
      toast({
        title: "Action Failed",
        description: "Something went wrong",
        variant: "destructive",
      });

      setDisabled(false);
    }
  };

  return (
    <section className="py-16">
      <h2 className="text-3xl font-bold  mb-12"> Events</h2>
      {events.length == 0 && !loading ? (
        <EmptyState message="We are planning more events, chillax" />
      ) : (
        <div className="container">
          {!loading && (
            <div className="flex flex-wrap gap-4 mb-8">
              <Input
                type="date"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="w-full sm:w-auto"
              />
              <Select value={countyFilter} onValueChange={setCountyFilter}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Select county" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Nairobi">Nairobi</SelectItem>
                  <SelectItem value="Mombasa">Mombasa</SelectItem>
                  <SelectItem value="Kisumu">Kisumu</SelectItem>
                  <SelectItem value="Nakuru">Nakuru</SelectItem>
                </SelectContent>
              </Select>
              <Button onClick={handleFilter}>Filter</Button>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading && (
              <>
                {[...Array(6)].map((_, index) => (
                  <SkeletonCard key={index} />
                ))}
              </>
            )}
            {filteredEvents?.slice(0, 6).map((event, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{event.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-2">{event.description}</p>
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <Calendar className="h-4 w-4 mr-2" />
                    {new Date(event.date).toLocaleDateString()}{" "}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin className="h-4 w-4 mr-2" />
                    {event.location}
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-2" />
                    {event.attendees?.length || 0}/{event.maxAttendees}{" "}
                    Attendees
                  </div>
                  <div className="w-full flex justify-end mt-2">
                    <Button
                      type="submit"
                      onClick={() => rsvp(event.id)}
                      disabled={disabled}>
                      RSVP
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          {filteredEvents?.length > 6 && (
            <div className="w-full flex justify-end mt-4">
              <Link href="/events">
                <Button>More events</Button>
              </Link>
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default Events;


