"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface User {
  name: string;
  email: string;
  phone: string;
  image: string;
  hasChild: boolean;
  isPregnant: boolean;
  isMenstruating: boolean;
  pregnancyDate?: string;
  lastPeriodDate?: string;
  cycleDays?: number;
  childBirthDate?: string;
}

export default function ExpertProfile() {
  const { toast } = useToast();
  const [profile, setProfile] = useState<User>({
    name: "",
    email: "",
    phone: "",
    image: "",
    isPregnant: false,
    isMenstruating: false,
    hasChild: false,
  });

  const [disabled, setDisabled] = useState(false);

  const fetchUser = async () => {
    const access_token = localStorage.getItem("accessToken");

    try {
      const response = await fetch(`${API_URL}/users/me`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        setProfile(data);
      }
    } catch (error) {
      console.error("Failed to fetch user", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setDisabled(true);

    const access_token = localStorage.getItem("accessToken");

    try {
      const response = await fetch(`${API_URL}/users/me`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
        body: JSON.stringify(profile),
      });

      const data = await response.json();

      if (response.ok) {
        setProfile(data);

        toast({
          title: "Profile Updated",
          description: "Your profile has been successfully updated.",
        });
      } else {
        toast({
          title: "Failed to update profile",
          description: "Your profile failed to update",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Failed to fetch user", error);
    }

    setDisabled(false);
  };

  const handleStatusChange = (
    status: "isPregnant" | "isMenstruating" | "hasChild"
  ) => {
    setProfile((prevProfile) => ({
      ...prevProfile,
      isPregnant: status === "isPregnant",
      isMenstruating: status === "isMenstruating",
      hasChild: status === "hasChild",
    }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile</CardTitle>
      </CardHeader>
      <CardContent>
        {profile.name !== "" && (
          <>
            <div className="flex items-center gap-4 mb-6">
              <Avatar className="h-24 w-24">
                <AvatarImage src={profile.image} alt={profile.name} />
                <AvatarFallback>
                  {profile.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <Button>Change Avatar</Button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Name</label>
                  <Input
                    value={profile.name}
                    onChange={(e) =>
                      setProfile({ ...profile, name: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Email</label>
                  <Input
                    type="email"
                    value={profile.email}
                    onChange={(e) =>
                      setProfile({ ...profile, email: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Phone</label>
                  <Input
                    value={profile.phone}
                    onChange={(e) =>
                      setProfile({ ...profile, phone: e.target.value })
                    }
                  />
                </div>

                {/* <div>
              <label className="text-sm font-medium">Field of Expertise</label>
              <Input
                value={profile.fieldOfExpertise}
                onChange={(e) => setProfile({ ...profile, fieldOfExpertise: e.target.value })}
              />
            </div> */}
              </div>

              {/* Status Selection */}
              <div className="space-y-4 mt-6">
                <label className="text-sm font-medium">
                  Select your status:
                </label>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="status"
                      checked={profile.isPregnant}
                      onChange={() => handleStatusChange("isPregnant")}
                    />
                    <span>Pregnant</span>
                  </label>

                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="status"
                      checked={profile.isMenstruating}
                      onChange={() => handleStatusChange("isMenstruating")}
                    />
                    <span>Menstruating</span>
                  </label>

                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="status"
                      checked={profile.hasChild}
                      onChange={() => handleStatusChange("hasChild")}
                    />
                    <span>Has Child</span>
                  </label>
                </div>

                {/* Conditional Fields Based on Selected Status */}
                {profile.isPregnant && (
                  <div className="mt-2">
                    <label className="text-sm">Pregnancy Start Date</label>
                    <Input
                      type="date"
                      max={new Date().toISOString().split("T")[0]}
                      value={profile.pregnancyDate || ""}
                      onChange={(e) =>
                        setProfile({
                          ...profile,
                          pregnancyDate: e.target.value,
                        })
                      }
                    />
                  </div>
                )}

                {profile.isMenstruating && (
                  <div className="mt-2 space-y-2">
                    <div>
                      <label className="text-sm">Last Menstruation Date</label>
                      <Input
                        type="date"
                        max={new Date().toISOString().split("T")[0]}
                        value={profile.lastPeriodDate || ""}
                        onChange={(e) =>
                          setProfile({
                            ...profile,
                            lastPeriodDate: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <label className="text-sm">Cycle Days</label>
                      <Input
                        type="number"
                        value={profile.cycleDays || ""}
                        onChange={(e) =>
                          setProfile({
                            ...profile,
                            cycleDays: Number(e.target.value),
                          })
                        }
                      />
                    </div>
                  </div>
                )}

                {profile.hasChild && (
                  <div className="mt-2">
                    <label className="text-sm">Child Birth Date</label>
                    <Input
                      type="date"
                      max={new Date().toISOString().split("T")[0]}
                      value={profile.childBirthDate || ""}
                      onChange={(e) =>
                        setProfile({
                          ...profile,
                          childBirthDate: e.target.value,
                        })
                      }
                    />
                  </div>
                )}
              </div>
              {/* <div>
            <label className="text-sm font-medium">Bio</label>
            <Textarea
              value={profile.bio}
              onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
              rows={4}
            />
          </div> */}
              <Button type="submit" disabled={disabled}>
                Save Changes
              </Button>
            </form>
          </>
        )}
      </CardContent>
    </Card>
  );
}
