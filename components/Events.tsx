"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, MapPin,Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";


const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface Event {
  id:number,
  title: string;
  description: string;
  date: string;
  location: string;
  attendees: number;
  maxAttendees: number;
}


const Events = () => {
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [dateFilter, setDateFilter] = useState("");
  const [countyFilter, setCountyFilter] = useState("");

    const { toast } = useToast();


  const handleFilter = () => {
    const filtered = filteredEvents.filter((event) => {
      const dateMatch = dateFilter ? event.date >= dateFilter : true;
      const countyMatch = countyFilter ? event.location === countyFilter : true;
      return dateMatch && countyMatch;
    });
    setFilteredEvents(filtered);
  };

  useEffect(()=>{
    const fetchEvents=async()=>{

      const access_token = localStorage.getItem("accessToken");
      
      try{
        const response = await fetch(`${API_URL}/events/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
          }
        });

        const data = await response.json();


        if (response.ok) {
         
          setFilteredEvents(data);
        }

      }catch(error){
        console.error('Failed to fetch Events',error)
      }
    }
    fetchEvents();
  },[])

  const rsvp = async(id:number)=>{
          const access_token = localStorage.getItem("accessToken");

      try{

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

        if(!response.ok){
          toast({
            title: "Action Failed",
            description: "Failed to rsvp for event",
            variant: "destructive",
          });
        }

      }catch(error:any){
        console.error("An error occurred",error)
         toast({
          title: "Action Failed",
          description: "Something went wrong",
          variant: "destructive",
        });
      }



  }

  return (
    <section className="py-16">
      <div className="container">
        <h2 className="text-3xl font-bold text-center mb-12">Upcoming Events</h2>
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
              <SelectItem value="all">All Counties</SelectItem>
              <SelectItem value="Nairobi">Nairobi</SelectItem>
              <SelectItem value="Mombasa">Mombasa</SelectItem>
              <SelectItem value="Kisumu">Kisumu</SelectItem>
              <SelectItem value="Nakuru">Nakuru</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={handleFilter}>Filter</Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map((event, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{event.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-2">{event.description}</p>
                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <Calendar className="h-4 w-4 mr-2" />
                  {event.date}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <MapPin className="h-4 w-4 mr-2" />
                  {event.location}
                </div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-2" />
                  {event.attendees|| 0}/{event.maxAttendees} Attendees
                </div>
                <Button type="submit" onClick={()=>rsvp(event.id)}>
                  RSVP
                </Button>      
                
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Events;