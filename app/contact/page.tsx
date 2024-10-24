"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

export default function ContactPage() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log(formData);
    toast({
      title: "Message Sent",
    
    });
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-4xl font-bold mb-8">Contact Us</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
          <p className="mb-4">Wed love to hear from you. Please fill out the form below or use our contact information.</p>
          <div className="mb-4">
            <strong>Address:</strong> 123 NGO Street, Nairobi, Kenya
          </div>
          <div className="mb-4">
            <strong>Phone:</strong> +254 123 456 789
          </div>
          <div className="mb-4">
            <strong>Email:</strong> info@babygal.org
          </div>
        </div>
        <div>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <Input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <Input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <Textarea
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>
            <Button type="submit">Send Message</Button>
          </form>
        </div>
      </div>
    </div>
  );
}