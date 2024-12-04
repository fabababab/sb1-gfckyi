'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const testimonials = [
  {
    quote: "This platform has transformed how we work. The features and ease of use are unmatched.",
    author: "Sarah Johnson",
    role: "CEO at TechCorp",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330"
  },
  {
    quote: "The best decision we made was switching to this platform. Our productivity has increased tremendously.",
    author: "Michael Chen",
    role: "Product Manager",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d"
  },
  {
    quote: "Incredible support and powerful features. It's everything we needed and more.",
    author: "Emily Davis",
    role: "Designer",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80"
  }
];

export default function Testimonials() {
  return (
    <div className="py-24 px-6">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold mb-4">What Our Customers Say</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Don't just take our word for it. Here's what our customers have to say.
        </p>
      </div>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="p-6 rounded-lg border bg-card">
            <blockquote className="text-lg mb-6">{testimonial.quote}</blockquote>
            <div className="flex items-center">
              <Avatar className="h-12 w-12">
                <AvatarImage src={testimonial.avatar} alt={testimonial.author} />
                <AvatarFallback>{testimonial.author[0]}</AvatarFallback>
              </Avatar>
              <div className="ml-4">
                <div className="font-semibold">{testimonial.author}</div>
                <div className="text-sm text-muted-foreground">{testimonial.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}