'use client';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ProductCard } from '../product-card';
import { SectionTitle } from '../section-title';
import { categories, products } from '@/lib/data';
import { cn } from '@/lib/utils';

const ALL = 'all';

export function PopularProducts() {
  const [active, setActive] = useState(ALL);

  // Navbar / footer category links point to "/#<category-slug>"
  useEffect(() => {
    const sync = () => {
      const hash = window.location.hash.slice(1);
      if (categories.some((c) => c.slug === hash)) setActive(hash);
    };
    sync();
    window.addEventListener('hashchange', sync);
    return () => window.removeEventListener('hashchange', sync);
  }, []);

  const list = active === ALL ? products : products.filter((p) => p.category === active);
  const tabs = [{ slug: ALL, name: 'All' }, ...categories];

  return (
    <section id="popular" className="wrapper relative py-8 lg:py-12 scroll-mt-32">
      {categories.map((c) => (
        <span key={c.slug} id={c.slug} className="absolute -top-32" aria-hidden />
      ))}
      <SectionTitle title="Popular Products" eyebrow="Handpicked for you" />

      <div className="scrollbar-hide -mx-1 mb-6 flex gap-2 overflow-x-auto px-1 pb-1">
        {tabs.map((t) => (
          <Button
            key={t.slug}
            size="sm"
            variant={active === t.slug ? 'default' : 'outline'}
            className={cn('rounded-full shrink-0', active !== t.slug && 'bg-card')}
            onClick={() => setActive(t.slug)}
          >
            {t.name}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-6 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5">
        {list.map((p) => (
          <ProductCard key={p.id} product={p} className="animate-in fade-in duration-300" />
        ))}
      </div>
    </section>
  );
}
