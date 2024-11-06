"use client";

import { useState } from 'react';
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Event {
  id: number;
  title: string;
  date: Date;
  status: 'upcoming' | 'today' | 'past';
}

interface EventCalendarProps {
  events: Event[];
}

export default function EventCalendar({ events }: EventCalendarProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  const getEventsForDate = (date: Date) => {
    return events.filter(event => 
      event.date.toDateString() === date.toDateString()
    );
  };

  const getDateClassName = (date: Date) => {
    const dayEvents = getEventsForDate(date);
    if (dayEvents.length === 0) return '';

    const status = dayEvents[0].status;
    switch (status) {
      case 'upcoming':
        return 'bg-blue-200 text-blue-800';
      case 'today':
        return 'bg-green-200 text-green-800';
      case 'past':
        return 'bg-gray-200 text-gray-800';
      default:
        return '';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Event Calendar</CardTitle>
      </CardHeader>
      <CardContent>
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
          className="rounded-md border"
          modifiers={{
            hasEvent: (date) => getEventsForDate(date).length > 0,
          }}
          modifiersClassNames={{
            hasEvent: getDateClassName(selectedDate || new Date()),
          }}
        />

        {selectedDate && getEventsForDate(selectedDate).length > 0 && (
          <div className="mt-4">
            <h3 className="font-semibold mb-2">Events on {selectedDate.toLocaleDateString()}</h3>
            {getEventsForDate(selectedDate).map(event => (
              <div key={event.id} className="flex items-center justify-between mb-2">
                <span>{event.title}</span>
                <Badge variant={
                  event.status === 'upcoming' ? 'default' :
                  event.status === 'today' ? 'secondary' : 'outline'
                }>
                  {event.status}
                </Badge>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}