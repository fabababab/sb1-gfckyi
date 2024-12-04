'use client';

interface ParagraphProps {
  children: React.ReactNode;
  size?: 'sm' | 'base' | 'lg';
  className?: string;
}

export default function Paragraph({ 
  children, 
  size = 'base',
  className = '' 
}: ParagraphProps) {
  const sizeClasses = {
    sm: 'text-sm',
    base: 'text-base',
    lg: 'text-lg'
  };

  return (
    <p className={`leading-relaxed text-muted-foreground ${sizeClasses[size]} ${className}`}>
      {children}
    </p>
  );
}