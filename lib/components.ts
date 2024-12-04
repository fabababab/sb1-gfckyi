import { ComponentMeta } from './types';
import {
  LayoutGrid,
  Type,
  Image,
  ListTodo,
  ShoppingCart,
  Navigation,
  Mail,
} from 'lucide-react';

export const COMPONENT_CATEGORIES = [
  {
    id: 'layout',
    label: 'Layout',
    icon: LayoutGrid,
  },
  {
    id: 'typography',
    label: 'Typography',
    icon: Type,
  },
  {
    id: 'navigation',
    label: 'Navigation',
    icon: Navigation,
  },
  {
    id: 'marketing',
    label: 'Marketing',
    icon: ShoppingCart,
  },
  {
    id: 'forms',
    label: 'Forms',
    icon: Mail,
  },
] as const;

export const COMPONENTS: ComponentMeta[] = [
  // Layout Components
  {
    id: 'container',
    category: 'layout',
    title: 'Container',
    description: 'A centered container with max-width',
    isLayout: true,
    allowedChildren: ['grid', 'section', 'heading', 'paragraph', 'hero-centered', 'hero-split', 'features-grid', 'pricing-table', 'testimonials', 'contact-form'],
  },
  {
    id: 'grid',
    category: 'layout',
    title: 'Grid',
    description: 'Responsive grid layout',
    isLayout: true,
    allowedChildren: ['heading', 'paragraph', 'features-grid', 'pricing-table', 'testimonials'],
  },
  {
    id: 'section',
    category: 'layout',
    title: 'Section',
    description: 'Full-width section with padding',
    isLayout: true,
    allowedChildren: ['container', 'grid', 'heading', 'paragraph', 'hero-centered', 'hero-split', 'features-grid', 'pricing-table', 'testimonials', 'contact-form'],
  },

  // Typography Components
  {
    id: 'heading',
    category: 'typography',
    title: 'Heading',
    description: 'Large text for sections',
  },
  {
    id: 'paragraph',
    category: 'typography',
    title: 'Paragraph',
    description: 'Body text with options',
  },

  // Navigation Components
  {
    id: 'navbar-simple',
    category: 'navigation',
    title: 'Simple Navbar',
    description: 'Basic navigation bar',
    isFixed: true,
    fixedPosition: 'top',
  },
  {
    id: 'footer-simple',
    category: 'navigation',
    title: 'Simple Footer',
    description: 'Basic footer layout',
    isFixed: true,
    fixedPosition: 'bottom',
  },

  // Marketing Components
  {
    id: 'hero-centered',
    category: 'marketing',
    title: 'Centered Hero',
    description: 'Hero section with centered content',
  },
  {
    id: 'hero-split',
    category: 'marketing',
    title: 'Split Hero',
    description: 'Hero with side-by-side content',
  },
  {
    id: 'features-grid',
    category: 'marketing',
    title: 'Features Grid',
    description: 'Grid of feature cards',
  },
  {
    id: 'pricing-table',
    category: 'marketing',
    title: 'Pricing Table',
    description: 'Comparison of pricing tiers',
  },
  {
    id: 'testimonials',
    category: 'marketing',
    title: 'Testimonials',
    description: 'Customer testimonials grid',
  },

  // Form Components
  {
    id: 'contact-form',
    category: 'forms',
    title: 'Contact Form',
    description: 'Contact form with validation',
  },
];