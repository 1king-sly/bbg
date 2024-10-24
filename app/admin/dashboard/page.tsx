import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Calendar, BarChart } from "lucide-react";

export default function AdminDashboard() {
  return (
    <div className="container mx-auto py-12">
      <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="mr-2" />
              Total Users
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">1,234</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="mr-2" />
              Upcoming Events
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">5</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart className="mr-2" />
              Monthly Growth
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">12%</p>
          </CardContent>
        </Card>
      </div>
      {/* Add more admin features like user management, content moderation, etc. */}
    </div>
  );
}