"use cleint"
import React from 'react'
import { useService } from '../hooks/useService'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function ServiceContact() {
    const {
      formData,
      handleChange,
      handleSubmit,
      isSubmitting,
    } =  useService();
  return (
    <div className="container mx-auto py-12">
      <h1 className="text-4xl font-bold mb-8">Contact Us</h1>
     
      
          <form  onSubmit={handleSubmit}>
            <div className="mb-4">
              <Input
                disabled={isSubmitting}
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
                disabled={isSubmitting}
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <Input
                disabled={isSubmitting}
                type="phone"
                name="phoneNumber"
                placeholder="Your Phone Nuber"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <Textarea
                disabled={isSubmitting}
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>
            <Button disabled={isSubmitting} type="submit">
              Send Message
            </Button>
          </form>
      
      
    </div>
  );
}
