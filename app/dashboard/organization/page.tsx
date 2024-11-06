"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

export default function OrganizationDashboard() {
  const { toast } = useToast();
  const [newResource, setNewResource] = useState({ title: '', description: '', link: '' });

  const handleResourceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the new resource to your backend
    console.log('New resource:', newResource);
    toast({
      title: "Resource Added",
      description: "Your new resource has been added to the database.",
    });
    setNewResource({ title: '', description: '', link: '' });
  };

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-4xl font-bold mb-8">Organization Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Organization Impact</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Girls reached: 500</p>
            <p>Programs conducted: 10</p>
            <p>Resources shared: 50</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Add New Resource</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleResourceSubmit}>
              <Input
                placeholder="Resource Title"
                value={newResource.title}
                onChange={(e) => setNewResource({...newResource, title: e.target.value})}
                className="mb-2"
              />
              <Textarea
                placeholder="Resource Description"
                value={newResource.description}
                onChange={(e) => setNewResource({...newResource, description: e.target.value})}
                className="mb-2"
              />
              <Input
                placeholder="Resource Link"
                value={newResource.link}
                onChange={(e) => setNewResource({...newResource, link: e.target.value})}
                className="mb-2"
              />
              <Button type="submit">Add Resource</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}