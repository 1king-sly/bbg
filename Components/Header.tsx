"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "./mode-toggle";
import { Heart } from "lucide-react";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Heart className="h-6 w-6" />
            <span className="hidden font-bold sm:inline-block">
              BabyGal
            </span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link href="/about">About</Link>
            <Link href="/services">Services</Link>
            <Link href="/events">Events</Link>
            <Link href="/profiles/1">Girls</Link>
            <Link href="/organizations">Organizations</Link>
            <Link href="/contact">Contact</Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            {/* Add search functionality if needed */}
          </div>
          <nav className="flex items-center">
            <Link href="/auth/login" passHref>
              <Button variant="ghost" className="mr-2">
                Log in
              </Button>
            </Link>
            <Link href="/auth/signup" passHref>
              <Button>Sign up</Button>
            </Link>
            <ModeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;