import { ProductCard } from '../product-card';
import { SectionTitle } from '../section-title';
import type { Product } from '@/lib/data';
import { cn } from '@/lib/utils';

interface ProductSectionProps {
  id?: string;
  title: string;
  eyebrow?: string;
  href?: string;
  products: Product[];
  className?: string;
}

export function ProductSection({ id, title, eyebrow, href, products, className }: ProductSectionProps) {
  if (!products.length) return null;
  return (
    <section id={id} className={cn('wrapper py-8 lg:py-12 scroll-mt-32', className)}>
      <SectionTitle title={title} eyebrow={eyebrow} href={href} />
      <div className="grid grid-cols-2 gap-3 sm:gap-6 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
