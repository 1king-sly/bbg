import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, BookOpen, Shield, Package, Users, Briefcase } from "lucide-react";

const services = [
  {
    title: "Counselling",
    description: "Professional support for emotional and mental well-being",
    icon: Heart,
  },
  {
    title: "Education",
    description: "Empowering through knowledge and skill development",
    icon: BookOpen,
  },
  {
    title: "Rights Protection",
    description: "Advocating for and safeguarding girls' rights",
    icon: Shield,
  },
  {
    title: "Essential Supplies",
    description: "Providing necessities like sanitary pads and clothing",
    icon: Package,
  },
  {
    title: "Mentorship",
    description: "Connecting girls with successful role models",
    icon: Users,
  },
  {
    title: "Career Development",
    description: "Preparing young women for successful careers",
    icon: Briefcase,
  },
];

export default function ServicesPage() {
  return (
    <div className="container mx-auto py-12">
      <h1 className="text-4xl font-bold mb-8">Our Services</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <Card key={index}>
            <CardHeader>
              <service.icon className="h-10 w-10 mb-4 text-primary" />
              <CardTitle>{service.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{service.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}