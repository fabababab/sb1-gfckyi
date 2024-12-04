import { HeroCenteredWireframe } from './marketing/HeroCenteredWireframe';
import { HeroSplitWireframe } from './marketing/HeroSplitWireframe';
import { FeaturesGridWireframe } from './marketing/FeaturesGridWireframe';
import { PricingTableWireframe } from './marketing/PricingTableWireframe';
import { TestimonialsWireframe } from './marketing/TestimonialsWireframe';
import { NavbarSimpleWireframe } from './navigation/NavbarSimpleWireframe';
import { FooterSimpleWireframe } from './navigation/FooterSimpleWireframe';
import { ContactFormWireframe } from './forms/ContactFormWireframe';
import { ContainerWireframe } from './layout/ContainerWireframe';
import { GridWireframe } from './layout/GridWireframe';
import { SectionWireframe } from './layout/SectionWireframe';
import { HeadingWireframe } from './typography/HeadingWireframe';
import { ParagraphWireframe } from './typography/ParagraphWireframe';

export const wireframes = {
  'container': ContainerWireframe,
  'grid': GridWireframe,
  'section': SectionWireframe,
  'heading': HeadingWireframe,
  'paragraph': ParagraphWireframe,
  'hero-centered': HeroCenteredWireframe,
  'hero-split': HeroSplitWireframe,
  'features-grid': FeaturesGridWireframe,
  'pricing-table': PricingTableWireframe,
  'testimonials': TestimonialsWireframe,
  'navbar-simple': NavbarSimpleWireframe,
  'footer-simple': FooterSimpleWireframe,
  'contact-form': ContactFormWireframe,
};