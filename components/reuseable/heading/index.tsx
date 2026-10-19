import React from 'react';
import { cn } from '@/lib/utils';

type HeadingVariants = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

interface SubTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  variant?: HeadingVariants;
  className?: string;
}

export default function Heading({
  variant = 'h2',
  className,
  ...props
}: SubTitleProps) {
  const Tag = variant;

  const baseStyles: Record<HeadingVariants, string> = {
    h1: 'text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-tight',
    h2: 'text-2xl sm:text-3xl font-bold text-foreground tracking-tight',
    h3: 'text-xl sm:text-2xl font-semibold text-foreground',
    h4: 'text-lg sm:text-xl font-semibold text-foreground',
    h5: 'text-base sm:text-lg font-bold text-foreground',
    h6: 'text-sm sm:text-base font-medium text-foreground',
  };

  return <Tag className={cn(baseStyles[variant], className)} {...props} />;
}
