'use client';

import { 
  Zap, Shield, Bell, Search, 
  Settings, Users, BarChart, Lock
} from 'lucide-react';

const features = [
  {
    title: 'Lightning Fast',
    description: 'Built for speed and performance',
    icon: Zap
  },
  {
    title: 'Secure by Default',
    description: 'Enterprise-grade security built-in',
    icon: Shield
  },
  {
    title: 'Smart Notifications',
    description: 'Stay informed with real-time updates',
    icon: Bell
  },
  {
    title: 'Advanced Search',
    description: 'Find anything in seconds',
    icon: Search
  },
  {
    title: 'Customizable',
    description: 'Tailor the platform to your needs',
    icon: Settings
  },
  {
    title: 'Team Collaboration',
    description: 'Work together seamlessly',
    icon: Users
  },
  {
    title: 'Analytics',
    description: 'Insights to grow your business',
    icon: BarChart
  },
  {
    title: 'Privacy First',
    description: 'Your data stays private',
    icon: Lock
  }
];

export default function FeaturesGrid() {
  return (
    <div className="py-24 px-6">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold mb-4">Powerful Features</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Everything you need to build amazing products, all in one place.
        </p>
      </div>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, index) => (
          <div key={index} className="p-6 rounded-lg border bg-card hover:shadow-lg transition-shadow">
            <feature.icon className="w-10 h-10 text-primary mb-4" />
            <h3 className="font-semibold mb-2">{feature.title}</h3>
            <p className="text-sm text-muted-foreground">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}