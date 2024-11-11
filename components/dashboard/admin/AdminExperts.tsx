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
import { Plus, Pencil, Trash, Search, Star } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface Expert{
  id:number,
  name:string,
  email:string,
  phone:string,
  fieldOfExpertise:string,
  bio:string 
  rating:number,
  eventsCreated: number,
  coursesCreated: number,
  sessionsHeld: number,
  isVerified: boolean,

}




export default function AdminExperts() {
  const { toast } = useToast();
  const [experts, setExperts] = useState<Expert[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingExpert, setEditingExpert] = useState<any>(null);
  const [expertForm, setExpertForm] = useState({
    name: "",
    email: "",
    phone: "",
    fieldOfExpertise: "",
    bio: "",
    isVerified: false,
    password:''
  });
  const [disabled,setDisabled] = useState(false)


  const fetchExperts=async()=>{      
    try{
      const response = await fetch(`${API_URL}/experts`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
         
        }
      });

      const data = await response.json();
      if (response.ok) {

        setExperts(data);
      }
    }catch(error){
      console.error('Failed to fetch Events',error)
    }
  }


  useEffect(()=>{
  
    fetchExperts();
  },[])


  const handleSubmit =async (e: React.FormEvent) => {
    e.preventDefault();

    const access_token = localStorage.getItem("accessToken");

    setDisabled(true)


    
    if (editingExpert) {
      try{

        const response = await fetch(`${API_URL}/experts/${editingExpert.id}`, {
           method: "PUT",
           headers: {
             "Content-Type": "application/json",
             Authorization: `Bearer ${access_token}`,
           },
           body: JSON.stringify(expertForm),
         });
 
 
         if (response.ok) {
          const updatedExpert = await response.json();

          setExperts((prevExperts) =>
              prevExperts.map((expert) =>
                  expert.id === editingExpert.id ? updatedExpert : expert
              )
          );

          toast({
            title: "Expert Updated",
            description: "The expert has been successfully updated.",
        });

        setIsDialogOpen(false);
        setEditingExpert(null);
        setExpertForm({
            name: "",
            email: "",
            phone: "",
            fieldOfExpertise: "",
            bio: "",
            isVerified: false,
            password: "",
        });
         }else{
           toast({
             title: "Action Failed",
             description: "Failed to create  expert",
             variant: "destructive",
           });
         }
 
     }catch(error:any){
        console.error(error);
 
         toast({
           title: "Action Failed",
           description: "Failed to create  expert",
           variant: "destructive",
         });
     }

    } else {

      try {     
        
        const response = await fetch(`${API_URL}/experts`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
          },
          body: JSON.stringify(expertForm),
        });

        const newExpert = await response.json();


        if (response.ok) {

          toast({
            title: "Action Successful",
            description: "Expert Successfully created",
          });

          setExperts((prevExperts) => [...prevExperts, newExpert]);

          

          setIsDialogOpen(false);
          setEditingExpert(null);
          setExpertForm({
            name: "",
            email: "",
            phone: "",
            fieldOfExpertise: "",
            bio: "",
            isVerified: false,
            password:'',
          });
        
        }

        if(!response.ok){
          toast({
            title: "Action Failed",
            description: "Failed to create  expert",
            variant: "destructive",
          });
        }
        setDisabled(false)

       
      } catch (error: any) {
        console.error(error);

        toast({
          title: "Action Failed",
          description: "Failed to create  expert",
          variant: "destructive",
        });
      }  

      setDisabled(false)

     

    
    }

    setDisabled(false)

  };

  const handleEdit =async (expert: any) => {

    setEditingExpert(expert);
    setExpertForm({
        name: expert.name,
        email: expert.email,
        phone: expert.phone,
        fieldOfExpertise: expert.fieldOfExpertise,
        bio: expert.bio,
        isVerified: expert.isVerified,
        password: expert.email,
    });
    setIsDialogOpen(true);

  };

  const handleDelete =async (expertId: number) => {

        const access_token = localStorage.getItem("accessToken");

        setDisabled(true)



     try{

        const response = await fetch(`${API_URL}/experts/${expertId}`, {
           method: "DELETE",
           headers: {
             "Content-Type": "application/json",
             Authorization: `Bearer ${access_token}`,
           },
         });

         const data = await response.json()

         console.log(data)
 
 
         if (response.ok) {
          toast({
            title: "Expert Deleted",
            description: "The expert has been successfully deleted.",
        });
         }else{
           toast({
             title: "Action Failed",
             description: "Failed to delete expert",
             variant: "destructive",
           });
         }

         setDisabled(false)

 
     }catch(error:any){
        console.error(error);
 
         toast({
           title: "Action Failed",
           description: "Failed to delete  expert",
           variant: "destructive",

         });

         setDisabled(false)

     }
    
  };

  // const filteredExperts = experts.filter(expert =>
  //   expert.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //   expert.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //   expert.fieldOfExpertise.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="relative w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search experts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => {
              setEditingExpert(null);
              setExpertForm({
                name: "",
                email: "",
                phone: "",
                fieldOfExpertise: "",
                bio: "",
                isVerified: false,
                password:'',

              });
            }}>
              <Plus className="h-4 w-4 mr-2" />
              Add Expert
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingExpert ? "Edit Expert" : "Create New Expert"}</DialogTitle>
              <DialogDescription>
                Fill in the expert details below.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Name</label>
                  <Input
                    value={expertForm.name}
                    onChange={(e) => setExpertForm({ ...expertForm, name: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Email</label>
                  <Input
                    type="email"
                    value={expertForm.email}
                    onChange={(e) => setExpertForm({ ...expertForm, email: e.target.value,password:e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Phone</label>
                  <Input
                    value={expertForm.phone}
                    onChange={(e) => setExpertForm({ ...expertForm, phone: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Field of Expertise</label>
                  <Input
                    value={expertForm.fieldOfExpertise}
                    onChange={(e) => setExpertForm({ ...expertForm, fieldOfExpertise: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Bio</label>
                <Textarea
                  value={expertForm.bio}
                  onChange={(e) => setExpertForm({ ...expertForm, bio: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium">Verified</label>
                <Input
                  type="checkbox"
                  checked={expertForm.isVerified}
                  onChange={(e) => setExpertForm({ ...expertForm, isVerified: e.target.checked })}
                />
              </div>
              <Button type="submit" disabled={disabled}>{editingExpert ? "Update Expert" : "Create Expert"}</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Experts</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Field</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Events</TableHead>
                <TableHead>Courses</TableHead>
                <TableHead>Sessions</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
            {Array.isArray(experts) && experts.map((expert,index) =>  (
                <TableRow key={index}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{expert.name}</p>
                      <p className="text-sm text-muted-foreground">{expert.email}</p>
                    </div>
                  </TableCell>
                  <TableCell>{expert.fieldOfExpertise}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 mr-1" />
                      {expert.rating}
                    </div>
                  </TableCell>
                  <TableCell>{expert.eventsCreated}</TableCell>
                  <TableCell>{expert.coursesCreated}</TableCell>
                  <TableCell>{expert.sessionsHeld}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(expert)} disabled={disabled}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(expert.id)} disabled={disabled}>
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






























