'use client';

import { Button } from "@/components/ui/button";

export default function HeroCentered() {
  return (
    <div className="py-24 px-6 text-center">
      <h1 className="mb-8 text-5xl font-extrabold tracking-tight">
        Welcome to <span className="text-primary">Our Platform</span>
      </h1>
      <p className="mb-8 text-lg text-muted-foreground max-w-2xl mx-auto">
        Transform your ideas into reality with our powerful tools and intuitive interface.
        Start building something amazing today.
      </p>
      <div className="flex justify-center gap-4">
        <Button size="lg">Get Started</Button>
        <Button size="lg" variant="outline">Learn More</Button>
      </div>
    </div>
  );
}