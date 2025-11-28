"use client";
import { createContext, useContext, useState } from "react";

const ServiceContext = createContext<any>(null);

export function ServiceProvider({ children }: { children: React.ReactNode }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    phoneNumber: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const setMessage = (text: string) => {
    setFormData((prev) => ({
      ...prev,
      message: `Requesting for ${text} service`,
    }));
  };

  return (
    <ServiceContext.Provider
      value={{
        formData,
        setFormData,
        isSubmitting,
        setIsSubmitting,
        setMessage,
      }}>
      {children}
    </ServiceContext.Provider>
  );
}

export const useServiceContext = () => useContext(ServiceContext);
