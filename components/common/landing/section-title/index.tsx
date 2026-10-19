import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SectionTitleProps {
  title: string;
  eyebrow?: string;
  href?: string;
  linkText?: string;
  className?: string;
  children?: React.ReactNode;
}

export function SectionTitle({
  title,
  eyebrow,
  href,
  linkText = 'View all',
  className,
  children,
}: SectionTitleProps) {
  return (
    <div className={cn('mb-6 flex flex-wrap items-end justify-between gap-4', className)}>
      <div>
        {eyebrow && (
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">{eyebrow}</span>
        )}
        <h2 className="mt-1 font-heading text-2xl sm:text-3xl font-bold text-foreground">{title}</h2>
        <span className="mt-2 flex gap-1">
          <span className="h-1 w-10 rounded-full bg-primary" />
          <span className="h-1 w-3 rounded-full bg-accent" />
        </span>
      </div>
      <div className="flex items-center gap-3">
        {children}
        {href && (
          <Button variant="outline" size="sm" className="rounded-full" nativeButton={false} render={<Link href={href} />}>
            {linkText} <ArrowRight />
          </Button>
        )}
      </div>
    </div>
  );
}
