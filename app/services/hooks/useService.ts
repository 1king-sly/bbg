"use client";
import { useToast } from "@/hooks/use-toast";
import { useServiceContext } from "./ServiceContext";

export function useService() {
  const { formData, setFormData, isSubmitting, setIsSubmitting } =
    useServiceContext();
  const { toast } = useToast();

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise((res) => setTimeout(res, 1000));

    toast({
      title: `Message sent. We will contact you soon.`,
    });

    setFormData({
      name: "",
      email: "",
      message: "",
      phoneNumber: "",
    });
    setIsSubmitting(false);
  };

  return {
    formData,
    handleChange,
    handleSubmit,
    isSubmitting,
    setMessage: useServiceContext().setMessage,
  };
}
