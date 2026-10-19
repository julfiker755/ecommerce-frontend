import Link from 'next/link';
import { Leaf } from 'lucide-react';
import { cn } from '@/lib/utils';
import { siteInfo } from '@/lib/data';

interface BrandLogoProps {
  className?: string;
  light?: boolean;
}

export function BrandLogo({ className, light }: BrandLogoProps) {
  const [first, ...rest] = siteInfo.name.split(' ');
  return (
    <Link href="/" className={cn('flex items-center gap-2 shrink-0', className)}>
      <span className="grid place-items-center size-10 rounded-xl bg-primary text-primary-foreground shadow-sm">
        <Leaf className="size-5" />
      </span>
      <span className="leading-none">
        <span
          className={cn(
            'block font-heading text-xl font-bold tracking-tight',
            light ? 'text-white' : 'text-foreground'
          )}
        >
          {first} <span className="text-accent">{rest.join(' ')}</span>
        </span>
        <span
          className={cn(
            'block text-[11px] mt-1',
            light ? 'text-white/60' : 'text-muted-foreground'
          )}
        >
          {siteInfo.tagline}
        </span>
      </span>
    </Link>
  );
}
