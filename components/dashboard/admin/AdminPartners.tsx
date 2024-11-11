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


interface Partner{
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



export default function AdminPartners() {
  const { toast } = useToast();
  const [partners, setPartners] = useState<Partner[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPartner, setEditingPartner] = useState<any>(null);
  const [partnerForm, setPartnerForm] = useState({
    name: "",
    email: "",
    phone: "",
    description: "",
    website: "",
    isVerified: false,
  });

  const [disabled,setDisabled] = useState(false)



  useEffect(()=>{
    const fetchExperts=async()=>{      
      try{
        const response = await fetch(`${API_URL}/partners`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
           
          }
        });

        const data = await response.json();
        if (response.ok) {

          setPartners(data);
        }
      }catch(error){
        console.error('Failed to fetch Parners',error)
      }
    }
    fetchExperts();
  },[])

  const handleSubmit =async (e: React.FormEvent) => {
    e.preventDefault();

    const access_token = localStorage.getItem("accessToken");

    setDisabled(true)


    
    if (editingPartner) {

      try{

        const response = await fetch(`${API_URL}/partners/${editingPartner.id}`, {
           method: "PUT",
           headers: {
             "Content-Type": "application/json",
             Authorization: `Bearer ${access_token}`,
           },
           body: JSON.stringify(partnerForm),
         });
 
 
         if (response.ok) {
          const updatedPartner = await response.json();

          setPartners((prevPartner) =>
              prevPartner.map((partner) =>
                partner.id === editingPartner.id ? updatedPartner : partner
              )
          );

          toast({
            title: "Partner Updated",
            description: "The partner has been successfully updated.",
        });

        setIsDialogOpen(false);
        setEditingPartner(null);
        setPartnerForm({
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
             description: "Failed to create  partner",
             variant: "destructive",
           });
         }
 
     }catch(error:any){
        console.error(error);
 
         toast({
           title: "Action Failed",
           description: "Failed to create  partner",
           variant: "destructive",
         });
     }
     
    } else {

      try {     
        
        const response = await fetch(`${API_URL}/partners`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
          },
          body: JSON.stringify(partnerForm),
        });

        const newPartner = await response.json();



        if (response.ok) {

          setPartners((prevPartners) => [...prevPartners, 
             newPartner]);
          toast({
            title: "Action Successful",
            description: "Partner Successfully created",
          });

          

          setIsDialogOpen(false);
    setEditingPartner(null);
    setPartnerForm({
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

  const handleEdit = (partner: any) => {
    setEditingPartner(partner);
    setPartnerForm({
      name: partner.name,
      email: partner.email,
      phone: partner.phone,
      description: partner.description,
      website: partner.website,
      isVerified: partner.isVerified,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async(partnerId: number) => {

    const access_token = localStorage.getItem("accessToken");


    try{

       const response = await fetch(`${API_URL}/partners/${partnerId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
          },
        });


        if (response.ok) {
         toast({
           title: "Partner Deleted",
           description: "The partner has been successfully deleted.",
       });
        }else{
          toast({
            title: "Action Failed",
            description: "Failed to delete partner",
            variant: "destructive",
          });
        }

    }catch(error:any){
       console.error(error);

        toast({
          title: "Action Failed",
          description: "Failed to create  partner",
          variant: "destructive",
        });
    }
    // setPartners(partners.filter(partner => partner.id !== partnerId));
  };

  // const filteredPartners = Array.isArray(partners) && partners.filter(partner =>
  //   partner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //   partner.email.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="relative w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search partners..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button  onClick={() => {
              setEditingPartner(null);
              setPartnerForm({
                name: "",
                email: "",
                phone: "",
                description: "",
                website: "",
                isVerified: false,
              });
            }}>
              <Plus className="h-4 w-4 mr-2" />
              Add Partner
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingPartner ? "Edit Partner" : "Create New Partner"}</DialogTitle>
              <DialogDescription>
                Fill in the partner details below.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Name</label>
                  <Input
                    value={partnerForm.name}
                    onChange={(e) => setPartnerForm({ ...partnerForm, name: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Email</label>
                  <Input
                    type="email"
                    value={partnerForm.email}
                    onChange={(e) => setPartnerForm({ ...partnerForm, email: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Phone</label>
                  <Input
                    value={partnerForm.phone}
                    onChange={(e) => setPartnerForm({ ...partnerForm, phone: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Website</label>
                  <Input
                    type="url"
                    value={partnerForm.website}
                    onChange={(e) => setPartnerForm({ ...partnerForm, website: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Description</label>
                <Textarea
                  value={partnerForm.description}
                  onChange={(e) => setPartnerForm({ ...partnerForm, description: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium">Verified</label>
                <Input
                  type="checkbox"
                  checked={partnerForm.isVerified}
                  onChange={(e) => setPartnerForm({ ...partnerForm, isVerified: e.target.checked })}
                />
              </div>
              <Button disabled={disabled} type="submit">{editingPartner ? "Update Partner" : "Create Partner"}</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Partners</CardTitle>
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
              {Array.isArray(partners) && partners.map((partner) => (
                <TableRow key={partner.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{partner.name}</p>
                      <p className="text-sm text-muted-foreground">{partner.website}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p>{partner.email}</p>
                      <p className="text-sm text-muted-foreground">{partner.phone}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                      {partner.eventsCreated}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <BookOpen className="h-4 w-4 mr-1 text-muted-foreground" />
                      {partner.coursesCreated}
                    </div>
                  </TableCell>
                  <TableCell>{partner.sessionsHeld}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button disabled={disabled} variant="ghost" size="icon" onClick={() => handleEdit(partner)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button disabled={disabled} variant="ghost" size="icon" onClick={() => handleDelete(partner.id)}>
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