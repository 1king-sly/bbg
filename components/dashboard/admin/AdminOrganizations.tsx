"use client";

import { useState,useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Pencil, Trash, Search, Building2, Calendar, BookOpen } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;


interface Organization{
  id:number,
  name:string,
  email:string,
  phone:string,
  description:string | null,
  website:string | null,
  eventsCreated: number,
  coursesCreated:number,
  sessionsHeld: number,
  isVerified: boolean,
}



export default function AdminOrganizations() {
  const { toast } = useToast();
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingOrganization, setEditingOrganization] = useState<any>(null);
  const [organizationForm, setOrganizationForm] = useState({
    name: "",
    email: "",
    phone: "",
    description: "",
    website: "",
    isVerified: false,
  });
  const [disabled,setDisabled] = useState(false)


  useEffect(()=>{
    const fetchOrganizations=async()=>{      
      try{
        const response = await fetch(`${API_URL}/organizations`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
           
          }
        });

        const data = await response.json();
        if (response.ok) {


          setOrganizations(data);
        }
      }catch(error){
        console.error('Failed to fetch Parners',error)
      }
    }
    fetchOrganizations();
  },[])

  const handleSubmit =async (e: React.FormEvent) => {
    e.preventDefault();

    const access_token = localStorage.getItem("accessToken");

    setDisabled(true)


    
    if (editingOrganization) {
      try{

        const response = await fetch(`${API_URL}/organizations/${editingOrganization.id}`, {
           method: "PUT",
           headers: {
             "Content-Type": "application/json",
             Authorization: `Bearer ${access_token}`,
           },
           body: JSON.stringify(organizationForm),
         });
 
 
         if (response.ok) {
          const updatedOrganization = await response.json();

          setOrganizations((prevOrganization) =>
              prevOrganization.map((organization) =>
                organization.id === editingOrganization.id ? updatedOrganization : organization
              )
          );

          toast({
            title: "Organization Updated",
            description: "The organization has been successfully updated.",
        });

        setIsDialogOpen(false);
        setEditingOrganization(null);
        setOrganizationForm({
          name: "",
          email: "",
          phone: "",
          description: "",
          website: "",
          isVerified: false,
        });
         }else{
           toast({
             title: "Action Failed",
             description: "Failed to create  organization",
             variant: "destructive",
           });
         }
 
     }catch(error:any){
        console.error(error);
 
         toast({
           title: "Action Failed",
           description: "Failed to create  organization",
           variant: "destructive",
         });
     }
    } else {

      try {     
        
        const response = await fetch(`${API_URL}/organizations`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
          },
          body: JSON.stringify(organizationForm),
        });

        const data = await response.json();




        if (response.ok) {


          const newOrganization = await response.json();
          if (response.ok) {
  
  
            setOrganizations((prevOrganizations) => [...prevOrganizations, 
              newOrganization]);
          }   
          
          toast({
            title: "Action Successful",
            description: "Partner Successfully created",
          });

          

          setIsDialogOpen(false);
          setEditingOrganization(null);
          setOrganizationForm({
            name: "",
            email: "",
            phone: "",
            description: "",
            website: "",
            isVerified: false,
          });
        
        }

        if(!response.ok){
          toast({
            title: "Action Failed",
            description: "Failed to create  partner",
            variant: "destructive",
          });
        }

        setDisabled(false)

       
      } catch (error: any) {
        console.error(error);

        toast({
          title: "Action Failed",
          description: "Failed to create  partner",
          variant: "destructive",
        });
      } 
    
    }
    
  };

  const handleEdit = (organization: any) => {
    setEditingOrganization(organization);
    setOrganizationForm({
      name: organization.name,
      email: organization.email,
      phone: organization.phone,
      description: organization.description,
      website: organization.website,
      isVerified: organization.isVerified,
    });
    setIsDialogOpen(true);
  };

  const handleDelete =async (organizationId: number) => {

    const access_token = localStorage.getItem("accessToken");


    try{

       const response = await fetch(`${API_URL}/organizations/${organizationId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
          },
        });


        if (response.ok) {
         toast({
           title: "Organization Deleted",
           description: "The organization has been successfully deleted.",
       });
        }else{
          toast({
            title: "Action Failed",
            description: "Failed to delete organization",
            variant: "destructive",
          });
        }

    }catch(error:any){
       console.error(error);

        toast({
          title: "Action Failed",
          description: "Failed to create  organization",
          variant: "destructive",
        });
    }
    // setOrganizations(organizations.filter(org => org.id !== organizationId));
   
  };

  const filteredOrganizations = organizations.filter(org =>
    org.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    org.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="relative w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search organizations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => {
              setEditingOrganization(null);
              setOrganizationForm({
                name: "",
                email: "",
                phone: "",
                description: "",
                website: "",
                isVerified: false,
              });
            }}>
              <Plus className="h-4 w-4 mr-2" />
              Add Organization
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingOrganization ? "Edit Organization" : "Create New Organization"}
              </DialogTitle>
              <DialogDescription>
                Fill in the organization details below.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Name</label>
                  <Input
                    value={organizationForm.name}
                    onChange={(e) => setOrganizationForm({ ...organizationForm, name: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Email</label>
                  <Input
                    type="email"
                    value={organizationForm.email}
                    onChange={(e) => setOrganizationForm({ ...organizationForm, email: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Phone</label>
                  <Input
                    value={organizationForm.phone}
                    onChange={(e) => setOrganizationForm({ ...organizationForm, phone: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Website</label>
                  <Input
                    type="url"
                    value={organizationForm.website}
                    onChange={(e) => setOrganizationForm({ ...organizationForm, website: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Description</label>
                <Textarea
                  value={organizationForm.description}
                  onChange={(e) => setOrganizationForm({ ...organizationForm, description: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium">Verified</label>
                <Input
                  type="checkbox"
                  checked={organizationForm.isVerified}
                  onChange={(e) => setOrganizationForm({ ...organizationForm, isVerified: e.target.checked })}
                />
              </div>
              <Button disabled={disabled} type="submit">
                {editingOrganization ? "Update Organization" : "Create Organization"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Organizations</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Organization</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Events</TableHead>
                <TableHead>Courses</TableHead>
                <TableHead>Sessions</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrganizations.map((org) => (
                <TableRow key={org.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{org.name}</p>
                      <p className="text-sm text-muted-foreground">{org.website}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p>{org.email}</p>
                      <p className="text-sm text-muted-foreground">{org.phone}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                      {org.eventsCreated}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <BookOpen className="h-4 w-4 mr-1 text-muted-foreground" />
                      {org.coursesCreated}
                    </div>
                  </TableCell>
                  <TableCell>{org.sessionsHeld}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button disabled={disabled} variant="ghost" size="icon" onClick={() => handleEdit(org)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button disabled={disabled} variant="ghost" size="icon" onClick={() => handleDelete(org.id)}>
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}