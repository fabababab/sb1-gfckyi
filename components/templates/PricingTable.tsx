'use client';

import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const plans = [
  {
    name: 'Basic',
    price: '$9',
    description: 'Perfect for individuals',
    features: [
      'Up to 5 projects',
      '1GB storage',
      'Basic support',
      'Basic analytics',
    ]
  },
  {
    name: 'Pro',
    price: '$29',
    description: 'Great for professionals',
    features: [
      'Up to 20 projects',
      '10GB storage',
      'Priority support',
      'Advanced analytics',
      'Custom domains',
    ],
    popular: true
  },
  {
    name: 'Enterprise',
    price: '$99',
    description: 'For large teams',
    features: [
      'Unlimited projects',
      'Unlimited storage',
      '24/7 support',
      'Advanced analytics',
      'Custom domains',
      'SLA',
    ]
  }
];

export default function PricingTable() {
  return (
    <div className="py-24 px-6">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold mb-4">Simple, Transparent Pricing</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Choose the perfect plan for your needs. Always know what you'll pay.
        </p>
      </div>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`rounded-lg border p-8 ${
              plan.popular ? 'ring-2 ring-primary' : ''
            }`}
          >
            {plan.popular && (
              <span className="inline-block px-3 py-1 text-xs font-semibold text-primary bg-primary/10 rounded-full mb-4">
                Most Popular
              </span>
            )}
            <h3 className="text-2xl font-bold">{plan.name}</h3>
            <div className="mt-4 flex items-baseline">
              <span className="text-4xl font-extrabold">{plan.price}</span>
              <span className="ml-1 text-muted-foreground">/month</span>
            </div>
            <p className="mt-4 text-muted-foreground">{plan.description}</p>
            <ul className="mt-6 space-y-4">
              {plan.features.map((feature, featureIndex) => (
                <li key={featureIndex} className="flex items-center">
                  <Check className="h-4 w-4 text-primary mr-3" />
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>
            <Button className="w-full mt-8" variant={plan.popular ? 'default' : 'outline'}>
              Get Started
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}