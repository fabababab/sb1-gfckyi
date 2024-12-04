'use client';

interface HeadingProps {
  children: React.ReactNode;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  className?: string;
}

export default function Heading({ 
  children, 
  level = 2,
  className = '' 
}: HeadingProps) {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  
  const baseStyles = 'font-bold tracking-tight';
  const sizeStyles = {
    1: 'text-4xl md:text-5xl lg:text-6xl',
    2: 'text-3xl md:text-4xl lg:text-5xl',
    3: 'text-2xl md:text-3xl lg:text-4xl',
    4: 'text-xl md:text-2xl lg:text-3xl',
    5: 'text-lg md:text-xl lg:text-2xl',
    6: 'text-base md:text-lg lg:text-xl'
  };

  return (
    <Tag className={`${baseStyles} ${sizeStyles[level]} ${className}`}>
      {children}
    </Tag>
  );
}