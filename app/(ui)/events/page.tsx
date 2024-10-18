import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, MapPin } from "lucide-react";

const events = [
  {
    title: "Girls in Tech Workshop",
    date: "2023-07-15",
    location: "Nairobi",
    description: "Learn coding and tech skills in this hands-on workshop.",
  },
  {
    title: "Reproductive Health Seminar",
    date: "2023-07-22",
    location: "Mombasa",
    description: "Expert-led seminar on women's reproductive health and rights.",
  },
  {
    title: "Career Mentorship Day",
    date: "2023-08-05",
    location: "Kisumu",
    description: "Connect with successful women in various career fields.",
  },
  {
    title: "Teen Mothers Support Group",
    date: "2023-08-12",
    location: "Nakuru",
    description: "Share experiences and get support from fellow teen mothers.",
  },
];

export default function EventsPage() {
  return (
    <div className="container mx-auto py-12">
      <h1 className="text-4xl font-bold mb-8">Upcoming Events</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {events.map((event, index) => (
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
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}