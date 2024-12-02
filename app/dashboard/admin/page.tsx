"use client";

import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdminOverview from "@/components/dashboard/admin/AdminOverview";
import AdminUsers from "@/components/dashboard/admin/AdminUsers";
import AdminExperts from "@/components/dashboard/admin/AdminExperts";
import AdminPartners from "@/components/dashboard/admin/AdminPartners";
import AdminOrganizations from "@/components/dashboard/admin/AdminOrganizations";
import AdminEvents from "@/components/dashboard/admin/AdminEvents";
import AdminCourses from "@/components/dashboard/admin/AdminCourses";
import { useRouter } from "next/navigation";
import NotAuthorized from "@/components/NotAuthorized";

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("overview");
  const [session, setSession] = useState(false);

  const [role, setRole] = useState("");
  const [isVerified, setIsVerified] = useState(false);


  const fetchSession = async () => {
    const access_token = localStorage.getItem("accessToken");
    const accessRole = localStorage.getItem("role");

    if (access_token && accessRole !== "" && accessRole !== null) {
      setRole(accessRole);
      setSession(true);
      if (access_token && accessRole) {
        setRole(accessRole);

        if (accessRole !== 'ADMIN') {
        } else {
          setIsVerified(true); 
        }
      } 
    }
  };

  useEffect( () => {
     fetchSession();

  }, []);

  if (!isVerified) {
    return <NotAuthorized/>  
  }


  return (
    <div className="container mx-auto py-12">
      
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-7 mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="experts">Experts</TabsTrigger>
            <TabsTrigger value="partners">Partners</TabsTrigger>
            <TabsTrigger value="organizations">Organizations</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="courses">Courses</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <AdminOverview />
          </TabsContent>

          <TabsContent value="users">
            <AdminUsers />
          </TabsContent>

          <TabsContent value="experts">
            <AdminExperts />
          </TabsContent>

          <TabsContent value="partners">
            <AdminPartners />
          </TabsContent>

          <TabsContent value="organizations">
            <AdminOrganizations />
          </TabsContent>

          <TabsContent value="events">
            <AdminEvents />
          </TabsContent>

          <TabsContent value="courses">
            <AdminCourses />
          </TabsContent>
        </Tabs>
    
    </div>
  );
}
