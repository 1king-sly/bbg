"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { services } from "../data/constants";
import { useRouter } from "next/navigation";

export default function ServicesPage() {
  const router = useRouter();
  return (
    <div className="container mx-auto py-12">
      <h1 className="text-4xl font-bold mb-8">Our Services</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service) => (
          <Card
            key={service.id}
            className="cursor-pointer"
            onClick={() => router.push(`/services/${service.id}`)}>
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
