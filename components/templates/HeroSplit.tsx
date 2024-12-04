'use client';

import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function HeroSplit() {
  return (
    <div className="grid md:grid-cols-2 gap-8 items-center py-24 px-6">
      <div>
        <h1 className="text-5xl font-extrabold tracking-tight mb-8">
          Build Faster, <span className="text-primary">Grow Smarter</span>
        </h1>
        <p className="text-lg text-muted-foreground mb-8">
          Streamline your workflow and boost productivity with our comprehensive platform.
          Everything you need to succeed, all in one place.
        </p>
        <div className="flex gap-4">
          <Button size="lg">Get Started</Button>
          <Button size="lg" variant="outline">Watch Demo</Button>
        </div>
      </div>
      <div className="relative h-[400px] rounded-lg overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1498050108023-c5249f4df085"
          alt="Hero Image"
          fill
          className="object-cover"
          priority
        />
      </div>
    </div>
  );
}