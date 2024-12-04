'use client';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
}

export default function Section({ children, className = '' }: SectionProps) {
  return (
    <section className={`py-12 md:py-16 lg:py-24 ${className}`}>
      {children}
    </section>
  );
}