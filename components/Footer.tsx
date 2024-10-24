"use client";

import Link from "next/link";
import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-8 dark:text-black px-4">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <Heart className="h-6 w-6 text-primary" />
              <span className="font-bold text-primary">BabyGal</span>
            </Link>
            <p className="text-sm">Empowering girls, shaping futures.</p>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about">About Us</Link>
              </li>
              <li>
                <Link href="/services">Our Services</Link>
              </li>
              <li>
                <Link href="/events">Events</Link>
              </li>
              <li>
                <Link href="/contact">Contact Us</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Get Involved</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/volunteer">Volunteer</Link>
              </li>
              <li>
                <Link href="/donate">Donate</Link>
              </li>
              <li>
                <Link href="/partner">Become a Partner</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Connect With Us</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" target="_blank" rel="noopener noreferrer">
                  Facebook
                </a>
              </li>
              <li>
                <a href="#" target="_blank" rel="noopener noreferrer">
                  Twitter
                </a>
              </li>
              <li>
                <a href="#" target="_blank" rel="noopener noreferrer">
                  Instagram
                </a>
              </li>
              <li>
                <a href="#" target="_blank" rel="noopener noreferrer">
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200 text-center text-sm">
          <p>
            &copy; {new Date().getFullYear()}{" "}
            <span className="text-primary">BabyGal.</span>
            All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
