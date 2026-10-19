'use client';
import { useEffect, useState } from 'react';
import { Zap } from 'lucide-react';
import type { Product } from '@/lib/data';
import { SectionTitle } from '../section-title';
import { ProductCard } from '../product-card';

const pad = (n: number) => String(n).padStart(2, '0');

// Counts down to the end of the current day
function useCountdown() {
  const [left, setLeft] = useState<number | null>(null);

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const end = new Date(now);
      end.setHours(23, 59, 59, 999);
      setLeft(Math.max(0, end.getTime() - now.getTime()));
    };
    tick();
    const timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, []);

  const s = Math.floor((left ?? 0) / 1000);
  return [
    { label: 'Hrs', value: left === null ? '--' : pad(Math.floor(s / 3600)) },
    { label: 'Min', value: left === null ? '--' : pad(Math.floor((s % 3600) / 60)) },
    { label: 'Sec', value: left === null ? '--' : pad(s % 60) },
  ];
}

export function FlashSale({ products }: { products: Product[] }) {
  const time = useCountdown();

  return (
    <section id="offer-zone" className="wrapper py-8 lg:py-12 scroll-mt-32">
      <div className="rounded-3xl bg-linear-to-br from-brand-soft to-secondary/60 p-4 sm:p-6 lg:p-8 border border-border">
        <SectionTitle title="Flash Sale" eyebrow="Today’s Deals" href="/#offer-zone">
          <div className="flex items-center gap-2">
            <span className="hidden sm:flex items-center gap-1 text-sm font-medium text-sale">
              <Zap className="size-4 fill-current" /> Ends in
            </span>
            {time.map((t) => (
              <div key={t.label} className="grid min-w-12 place-items-center rounded-lg bg-brand-dark px-2 py-1.5 text-white">
                <span className="text-base font-bold tabular-nums leading-none">{t.value}</span>
                <span className="text-[10px] opacity-70">{t.label}</span>
              </div>
            ))}
          </div>
        </SectionTitle>

        <div className="grid grid-cols-2 gap-3 sm:gap-6 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
