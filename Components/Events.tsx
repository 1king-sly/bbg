"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, MapPin } from "lucide-react";

const events = [
  {
    title: "Girls in Tech Workshop",
    date: "2023-07-15",
    county: "Nairobi",
    description: "Learn coding and tech skills in this hands-on workshop.",
  },
  {
    title: "Reproductive Health Seminar",
    date: "2023-07-22",
    county: "Mombasa",
    description: "Expert-led seminar on women's reproductive health and rights.",
  },
  {
    title: "Career Mentorship Day",
    date: "2023-08-05",
    county: "Kisumu",
    description: "Connect with successful women in various career fields.",
  },
  {
    title: "Teen Mothers Support Group",
    date: "2023-08-12",
    county: "Nakuru",
    description: "Share experiences and get support from fellow teen mothers.",
  },
];

const Events = () => {
  const [filteredEvents, setFilteredEvents] = useState(events);
  const [dateFilter, setDateFilter] = useState("");
  const [countyFilter, setCountyFilter] = useState("");

  const handleFilter = () => {
    const filtered = events.filter((event) => {
      const dateMatch = dateFilter ? event.date >= dateFilter : true;
      const countyMatch = countyFilter ? event.county === countyFilter : true;
      return dateMatch && countyMatch;
    });
    setFilteredEvents(filtered);
  };

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
                  {event.county}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Events;