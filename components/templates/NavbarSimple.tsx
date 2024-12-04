'use client';

import { Button } from "@/components/ui/button";

export default function NavbarSimple() {
  return (
    <nav className="border-b">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0 font-bold text-xl">Logo</div>
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-sm font-medium hover:text-primary">Home</a>
            <a href="#" className="text-sm font-medium hover:text-primary">Features</a>
            <a href="#" className="text-sm font-medium hover:text-primary">Pricing</a>
            <a href="#" className="text-sm font-medium hover:text-primary">About</a>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost">Sign in</Button>
            <Button>Sign up</Button>
          </div>
        </div>
      </div>
    </nav>
  );
}