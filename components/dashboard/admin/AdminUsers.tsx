"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
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
import { Plus, Pencil, Trash, Search } from "lucide-react";

const dummyUsers = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah@example.com",
    role: "USER",
    isPregnant: true,
    pregnancyDate: "2024-01-15",
    hasChild: false,
    lastPeriodDate: "2024-02-20",
    createdAt: "2024-01-01",
  },
  {
    id: 2,
    name: "Emily Davis",
    email: "emily@example.com",
    role: "USER",
    isPregnant: false,
    pregnancyDate: null,
    hasChild: true,
    childBirthDate: "2023-08-15",
    childGender: "Female",
    lastPeriodDate: "2024-03-01",
    createdAt: "2023-12-15",
  },
];

export default function AdminUsers() {
  const { toast } = useToast();
  const [users, setUsers] = useState(dummyUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<any>(null);
  const [userForm, setUserForm] = useState({
    name: "",
    email: "",
    role: "USER",
    isPregnant: false,
    pregnancyDate: "",
    hasChild: false,
    childBirthDate: "",
    childGender: "",
    lastPeriodDate: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingUser) {
      // Update existing user
      const updatedUsers = users.map(user => 
        user.id === editingUser.id 
          ? { ...user, ...userForm }
          : user
      );
      setUsers(updatedUsers);
      toast({
        title: "User Updated",
        description: "The user has been successfully updated.",
      });
    } else {
      // Create new user
      const newUser = {
        id: users.length + 1,
        ...userForm,
        createdAt: new Date().toISOString().split('T')[0],
      };
      setUsers([...users, newUser]);
      toast({
        title: "User Created",
        description: "The new user has been created successfully.",
      });
    }
    
    setIsDialogOpen(false);
    setEditingUser(null);
    setUserForm({
      name: "",
      email: "",
      role: "USER",
      isPregnant: false,
      pregnancyDate: "",
      hasChild: false,
      childBirthDate: "",
      childGender: "",
      lastPeriodDate: "",
    });
  };

  const handleEdit = (user: any) => {
    setEditingUser(user);
    setUserForm({
      name: user.name,
      email: user.email,
      role: user.role,
      isPregnant: user.isPregnant,
      pregnancyDate: user.pregnancyDate || "",
      hasChild: user.hasChild,
      childBirthDate: user.childBirthDate || "",
      childGender: user.childGender || "",
      lastPeriodDate: user.lastPeriodDate || "",
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (userId: number) => {
    setUsers(users.filter(user => user.id !== userId));
    toast({
      title: "User Deleted",
      description: "The user has been successfully deleted.",
    });
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="relative w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => {
              setEditingUser(null);
              setUserForm({
                name: "",
                email: "",
                role: "USER",
                isPregnant: false,
                pregnancyDate: "",
                hasChild: false,
                childBirthDate: "",
                childGender: "",
                lastPeriodDate: "",
              });
            }}>
              <Plus className="h-4 w-4 mr-2" />
              Add User
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingUser ? "Edit User" : "Create New User"}</DialogTitle>
              <DialogDescription>
                Fill in the user details below.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Name</label>
                  <Input
                    value={userForm.name}
                    onChange={(e) => setUserForm({ ...userForm, name: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Email</label>
                  <Input
                    type="email"
                    value={userForm.email}
                    onChange={(e) => setUserForm({ ...userForm, email: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Is Pregnant</label>
                  <Input
                    type="checkbox"
                    checked={userForm.isPregnant}
                    onChange={(e) => setUserForm({ ...userForm, isPregnant: e.target.checked })}
                  />
                </div>
                {userForm.isPregnant && (
                  <div>
                    <label className="text-sm font-medium">Pregnancy Date</label>
                    <Input
                      type="date"
                      value={userForm.pregnancyDate}
                      onChange={(e) => setUserForm({ ...userForm, pregnancyDate: e.target.value })}
                    />
                  </div>
                )}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Has Child</label>
                  <Input
                    type="checkbox"
                    checked={userForm.hasChild}
                    onChange={(e) => setUserForm({ ...userForm, hasChild: e.target.checked })}
                  />
                </div>
                {userForm.hasChild && (
                  <>
                    <div>
                      <label className="text-sm font-medium">Child Birth Date</label>
                      <Input
                        type="date"
                        value={userForm.childBirthDate}
                        onChange={(e) => setUserForm({ ...userForm, childBirthDate: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Child Gender</label>
                      <Input
                        value={userForm.childGender}
                        onChange={(e) => setUserForm({ ...userForm, childGender: e.target.value })}
                      />
                    </div>
                  </>
                )}
              </div>
              <div>
                <label className="text-sm font-medium">Last Period Date</label>
                <Input
                  type="date"
                  value={userForm.lastPeriodDate}
                  onChange={(e) => setUserForm({ ...userForm, lastPeriodDate: e.target.value })}
                />
              </div>
              <Button type="submit">{editingUser ? "Update User" : "Create User"}</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Users</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    {user.isPregnant && "Pregnant"}
                    {user.hasChild && "Parent"}
                    {!user.isPregnant && !user.hasChild && "Regular"}
                  </TableCell>
                  <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(user)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(user.id)}>
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