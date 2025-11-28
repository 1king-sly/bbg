"use client";
import { services } from "@/app/data/constants";
import { Check } from "lucide-react";
import { notFound } from "next/navigation";
import ServiceContact from "../components/ServiceContact";
import { useService } from "../hooks/useService";
import { useEffect } from "react";

export default function ServiceDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const { setMessage } = useService();
  const service = services.find((s) => s.id === params.id);

  useEffect(() => {
    setMessage(service?.title ?? "");
  }, [service?.title, setMessage]);

  if (!service) return notFound();

  const Icon = service.icon;

  return (
    <div className="min-h-screen py-12 px-6 max-w-7xl mx-auto gap-6  flex ">
      <div className="flex flex-1 flex-col gap-3">
        <div className="flex  items-center gap-4 mb-6">
          <Icon className="h-10 w-10  text-primary" />
          <h1 className="text-2xl font-semibold leading-none tracking-tight">
            {service.title}
          </h1>
        </div>

        <p className="text-xl text-muted-foreground">{service.description}</p>

        <h2 className="text-lg font-semibold text-gray-800 ">How We Do It</h2>
        <ul className="space-y-2">
          {service.actions.map((action: string, idx: number) => (
            <li key={idx} className="flex flex-row gap-2 items-center ">
              <span>
                <Check className="h-5 w-5  text-primary" />
              </span>{" "}
              {action}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-1 ">
        <ServiceContact />
      </div>
    </div>
  );
}
