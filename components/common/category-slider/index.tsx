'use client';
import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SectionTitle } from '../section-title';
import { categories, getProductsByCategory } from '@/lib/data';

export function CategorySlider() {
  const trackRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: number) => {
    trackRef.current?.scrollBy({ left: dir * 320, behavior: 'smooth' });
  };

  return (
    <section className="wrapper py-8 lg:py-10">
      <SectionTitle title="Shop by Category" eyebrow="Featured Categories">
        <div className="flex gap-2">
          <Button variant="outline" size="icon-sm" className="rounded-full" onClick={() => scroll(-1)} aria-label="Scroll left">
            <ChevronLeft />
          </Button>
          <Button variant="outline" size="icon-sm" className="rounded-full" onClick={() => scroll(1)} aria-label="Scroll right">
            <ChevronRight />
          </Button>
        </div>
      </SectionTitle>

      <div ref={trackRef} className="scrollbar-hide -mx-1 flex snap-x gap-4 overflow-x-auto px-1 pb-2">
        {categories.map((cat) => (
          <Link
            key={cat.slug}
            href={`/#${cat.slug}`}
            className="group snap-start shrink-0 w-32 sm:w-36 rounded-2xl border border-border bg-card p-4 text-center transition-all hover:border-primary/40 hover:shadow-lg"
          >
            <div className="relative mx-auto size-20 sm:size-24 overflow-hidden rounded-full bg-secondary ring-4 ring-secondary transition-all group-hover:ring-primary/20">
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                sizes="96px"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <h4 className="mt-3 text-sm font-semibold text-foreground group-hover:text-primary">{cat.name}</h4>
            <p className="text-xs text-muted-foreground">{getProductsByCategory(cat.slug).length} items</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
