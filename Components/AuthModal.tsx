"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useToast } from "@/components/ui/use-toast"

export function AuthModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically authenticate with your backend
    console.log('Auth attempt:', { email, password, name: isLogin ? undefined : name })
    toast({
      title: isLogin ? "Login Successful" : "Signup Successful",
      
    })
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{isLogin ? 'Login' : 'Sign Up'}</DialogTitle>
          <DialogDescription>
            {isLogin ? 'Enter your credentials to login.' : 'Create an account to get started.'}
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
            <Button type="submit">{isLogin ? 'Login' : 'Sign Up'}</Button>
          </DialogFooter>
        </form>
        <div className="mt-4 text-center">
          <Button variant="link" onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "Don't have an account? Sign up" : "Already have an account? Login"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}