"use client";

import { ServiceProvider } from "./hooks/ServiceContext";

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ServiceProvider>{children}</ServiceProvider>;
}
