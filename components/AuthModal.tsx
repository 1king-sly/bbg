"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

export function AuthModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const { toast } = useToast();
  const [disabled, setDisabled] = useState(false);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setDisabled(true);

    try {
      const formData = {
        name: name,
        email: email,
        password: password,
      };
      const url = `${API_URL}/${isLogin ? "auth/token" : "users"}`;

      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });


      if (response.ok) {
        const data = await response.json();

        if (isLogin) {
          localStorage.setItem("accessToken", data.access_token);
          localStorage.setItem("role", data.role);

        }

        toast({
          title: isLogin ? "Login Successful" : "Signup Successful",
          description: "You have been successfully  authenticated",
        });
        
        onClose();

      }

      if (!response.ok) {
        toast({
          title: isLogin ? "Login failed" : "Signup Failed",
          description: "You have not been  authenticated",
          variant: "destructive",
        });
      }


      setDisabled(false);
    } catch (error: any) {
      console.error("An error occured", error);

      toast({
        title: isLogin ? "Login failed" : "Signup Failed",
        description: "You have not been  authenticated",
        variant: "destructive",
      });


      setDisabled(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{isLogin ? "Login" : "Sign Up"}</DialogTitle>
          <DialogDescription>
            {isLogin
              ? "Enter your credentials to login."
              : "Create an account to get started."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="grid gap-4 py-4">
              <Input
                id="name"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          )}
          <div className="grid gap-4 py-4">
            <Input
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <DialogFooter>
            <Button disabled={disabled} type="submit">{isLogin ? "Login" : "Sign Up"}</Button>
          </DialogFooter>
        </form>
        <div className="mt-4 text-center">
          <Button disabled={disabled} variant="link" onClick={() => setIsLogin(!isLogin)}>
            {isLogin
              ? "Don't have an account? Sign up"
              : "Already have an account? Login"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
