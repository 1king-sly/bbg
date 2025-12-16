"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "@/app/dashboard/user/hooks/useUser";

interface UserProfileProps {
  profile: User;
  onProfileUpdate: (
    profile: User
  ) => Promise<{ success: boolean; data?: any; error?: string }>;
}

export default function UserProfile({
  profile: initialProfile,
  onProfileUpdate,
}: UserProfileProps) {
  const { toast } = useToast();
  const [profile, setProfile] = useState<User>(initialProfile);
  const [disabled, setDisabled] = useState(false);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setDisabled(true);

    const result = await onProfileUpdate(profile);

    if (result.success) {
      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated.",
      });
    } else {
      toast({
        title: "Failed to update profile",
        description: result.error || "Your profile failed to update",
        variant: "destructive",
      });
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
  const toDateInputValue = (date?: string) => {
    if (!date) return "";
    return new Date(date).toISOString().split("T")[0];
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
                      value={toDateInputValue(profile.pregnancyDate)}
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
                        value={toDateInputValue(profile.lastPeriodDate)}
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
