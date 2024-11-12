"use client";

import { useState,useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface Expert{
  name:string,
  email:string,
  phone:string,
  image:string,
  fieldOfExpertise:string,
  bio:string,
  rating:number

}

export default function ExpertProfile() {
  const { toast } = useToast();
  const [profile, setProfile] = useState<Expert>();

  const fetchExpert=async()=>{  
    const access_token = localStorage.getItem("accessToken");
    
    try{
      const response = await fetch(`${API_URL}/experts/profile/me`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
         
        }
      });

      const data = await response.json();


      if (response.ok) {

        setProfile(data);
      }
    }catch(error){
      console.error('Failed to fetch user',error)
    }
  }


  useEffect(()=>{
  
    fetchExpert();
  },[])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically update the profile via API
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Expert Profile</CardTitle>
      </CardHeader>
      <CardContent>
        {profile && (
          <>
                  <div className="flex items-center gap-4 mb-6">
          <Avatar className="h-24 w-24">
            <AvatarImage src={profile.image} alt={profile.name} />
            <AvatarFallback>{profile.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <Button>Change Avatar</Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Name</label>
              <Input
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Email</label>
              <Input
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Phone</label>
              <Input
                value={profile.phone}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Field of Expertise</label>
              <Input
                value={profile.fieldOfExpertise}
                onChange={(e) => setProfile({ ...profile, fieldOfExpertise: e.target.value })}
              />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium">Bio</label>
            <Textarea
              value={profile.bio}
              onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
              rows={4}
            />
          </div>
          <Button type="submit">Save Changes</Button>
        </form>
          </>
        )}

      </CardContent>
    </Card>
  );
}