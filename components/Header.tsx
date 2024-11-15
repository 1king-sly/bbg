"use client"

import { useState ,useEffect} from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "./mode-toggle"
import { Heart } from "lucide-react"
import { usePathname } from 'next/navigation'
import { AuthModal } from "./AuthModal"
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Compass, Menu, Moon, Sun, User, X } from "lucide-react";



const Header = () => {
  const pathname = usePathname()
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [session,setSession] =useState(false)
  const [dashboardUrl,setDashboardUrl] = useState('#')
  
  const [role,setRole] =useState('')

  const fetchSession = async()=>{
    const access_token = localStorage.getItem("accessToken");
    const accessRole = localStorage.getItem("role")

    if(access_token && accessRole !== "" && accessRole !== null){
      setRole(accessRole)


      switch(accessRole){
        case "partner":
          setDashboardUrl('/dashboard/partner')
          break;
        case "ADMIN":
          setDashboardUrl('/dashboard/admin')
          break;
        case "organization":
          setDashboardUrl('/dashboard/organization')
          break;
        case "expert":
          setDashboardUrl('/dashboard/expert')
          break;
        case "USER":
          setDashboardUrl('/dashboard')
          break;
        default:
          setDashboardUrl('#')
      }





      setSession(true);


      
    }
  }

  useEffect(() => {
    fetchSession()
  }, []);

 

  const clearSession =()=>{
    localStorage.removeItem("accessToken");
    window.location.href = "/";

  }

  const isLoggedIn = pathname.startsWith('/dashboard')
  let dashboardLink = '/dashboard'

  if (pathname.includes('/gal')) {
    dashboardLink = '/dashboard/gal'
  } else if (pathname.includes('/partner')) {
    dashboardLink = '/dashboard/partner'
  } else if (pathname.includes('/organization')) {
    dashboardLink = '/dashboard/organization'
  } else if (pathname.includes('/admin')) {
    dashboardLink = '/dashboard/admin'
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 mx-auto px-5">
      <div className="container flex h-14 items-center  justify-between">
        <div className="flex w-[80%] md:w-[70%] justify-between">
        <Link href="/" className=" flex items-center space-x-2">
            <Heart className="h-6 w-6 text-primary"  />
            <span className=" font-bold sinline-block text-primary">
              BabyGal
            </span>
          </Link>
          <nav className="items-center space-x-6 text-sm font-medium hidden md:block">
            <Link href="/about">About</Link>
            <Link href="/services">Services</Link>
            <Link href="/events">Events</Link>
            <Link href="/organizations">Organizations</Link>
            <Link href="/contact">Contact</Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
           
          </div>

          {/* Mobile Navigation */}
      <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <div className="flex flex-col h-full">
              <nav className="flex flex-col h-full items-center justify-center w-full gap-3">
              <Link href="/about">About</Link>
            <Link href="/services">Services</Link>
            <Link href="/events">Events</Link>
            <Link href="/organizations">Organizations</Link>
            <Link href="/contact">Contact</Link>
            {session ? (
              <>
                <Link href={dashboardUrl}>
                  <Button variant="ghost" className="mr-2">
                    Dashboard
                  </Button>
                </Link>
                <Link href="/" passHref>
                  <Button variant="ghost" className="mr-2">
                    Logout
                  </Button>
                </Link>
              </>
            ) : (
              <Button variant="ghost" className="mr-2" onClick={() => setIsAuthModalOpen(true)}>
                Login / Sign up
              </Button>
            )}

              <ModeToggle />

              </nav>
              <div className="flex flex-col space-y-4 mb-8">
                
              </div>
            </div>
          </SheetContent>
        </Sheet>
          <nav className="hidden md:flex items-center">
            {session ? (
              <>
                <Link href={dashboardUrl} passHref>
                  <Button variant="ghost" className="mr-2">
                    Dashboard
                  </Button>
                </Link>
                
                  <Button variant="ghost" className="mr-2" onClick={()=>clearSession()}>
                    Logout
                  </Button>
              </>
            ) : (
              <Button variant="ghost" className="mr-2" onClick={() => setIsAuthModalOpen(true)}>
                Login / Sign up
              </Button>
            )}
            <ModeToggle />
          </nav>
        </div>
      </div>
      <AuthModal isOpen={isAuthModalOpen} onClose={() => {
    setIsAuthModalOpen(false);
    fetchSession();
  }} />

      
    </header>
  )
}

export default Header