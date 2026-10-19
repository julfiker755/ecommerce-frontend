import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbProps {
  items: { label: string; href?: string }[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="bg-secondary/50 border-b border-border">
      <ol className="wrapper flex items-center gap-1.5 py-3 text-sm text-muted-foreground overflow-x-auto scrollbar-hide whitespace-nowrap">
        <li>
          <Link href="/" className="flex items-center gap-1 hover:text-primary">
            <Home className="size-4" /> Home
          </Link>
        </li>
        {items.map((item) => (
          <li key={item.label} className="flex items-center gap-1.5">
            <ChevronRight className="size-3.5" />
            {item.href ? (
              <Link href={item.href} className="hover:text-primary">{item.label}</Link>
            ) : (
              <span className="font-medium text-foreground">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
