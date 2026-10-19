'use client';
import { useState } from 'react';
import { CheckCircle2, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getCategory, testimonials, type Product } from '@/lib/data';
import { cn } from '@/lib/utils';

const tabs = ['Description', 'Additional Info', 'Reviews'] as const;

export function ProductTabs({ product }: { product: Product }) {
  const [tab, setTab] = useState<(typeof tabs)[number]>('Description');

  return (
    <section className="wrapper pb-8">
      <div className="rounded-2xl border border-border bg-card">
        <div role="tablist" className="flex gap-1 overflow-x-auto scrollbar-hide border-b border-border px-2 sm:px-4">
          {tabs.map((t) => (
            <Button
              key={t}
              role="tab"
              aria-selected={tab === t}
              variant="ghost"
              onClick={() => setTab(t)}
              className={cn(
                'relative h-14 rounded-none px-4 text-muted-foreground hover:bg-transparent',
                tab === t && 'text-primary after:absolute after:inset-x-2 after:bottom-0 after:h-0.5 after:rounded-full after:bg-primary'
              )}
            >
              {t}
              {t === 'Reviews' && ` (${product.reviews})`}
            </Button>
          ))}
        </div>

        <div className="p-5 sm:p-8">
          {tab === 'Description' && (
            <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
              <div className="space-y-4 leading-relaxed text-foreground/80">
                {product.description.map((d) => (
                  <p key={d.slice(0, 24)}>{d}</p>
                ))}
              </div>
              <div className="rounded-xl bg-secondary/60 p-5">
                <h4 className="mb-3 font-semibold">Key Features</h4>
                <ul className="space-y-2.5">
                  {product.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-foreground/80">
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" /> {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {tab === 'Additional Info' && (
            <dl className="divide-y divide-border overflow-hidden rounded-xl border border-border text-sm">
              {[
                ['Brand', product.brand],
                ['Category', getCategory(product.category)?.name],
                ['SKU', product.sku],
                ['Origin', product.origin],
                [`Available ${product.optionLabel ?? 'Sizes'}`, product.weights?.map((w) => w.label).join(', ') || '—'],
                ['Colors', product.colors?.map((c) => c.name).join(', ') || '—'],
              ].map(([k, v]) => (
                <div key={k} className="grid grid-cols-[140px_1fr] sm:grid-cols-[200px_1fr]">
                  <dt className="bg-muted px-4 py-3 font-medium">{k}</dt>
                  <dd className="px-4 py-3 text-foreground/80">{v}</dd>
                </div>
              ))}
            </dl>
          )}

          {tab === 'Reviews' && (
            <div className="grid gap-8 lg:grid-cols-[1fr_2fr]">
              <div className="rounded-xl bg-brand-soft p-6 text-center h-fit">
                <p className="text-5xl font-bold text-foreground">{product.rating}</p>
                <div className="mt-2 flex justify-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={cn('size-5', i < Math.round(product.rating) ? 'fill-gold text-gold' : 'text-border')} />
                  ))}
                </div>
                <p className="mt-1 text-sm text-muted-foreground">Based on {product.reviews} reviews</p>
                <Button className="mt-5 w-full">Write a Review</Button>
              </div>
              <ul className="space-y-5">
                {testimonials.map((r) => (
                  <li key={r.id} className="flex gap-4 border-b border-border pb-5 last:border-0">
                    <span className="grid size-10 shrink-0 place-items-center rounded-full bg-primary font-semibold text-primary-foreground">
                      {r.name.charAt(0)}
                    </span>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-semibold">{r.name}</span>
                        <span className="flex items-center gap-1 rounded-full bg-secondary px-2 py-0.5 text-[11px] font-medium text-primary">
                          <CheckCircle2 className="size-3" /> Verified buyer
                        </span>
                      </div>
                      <div className="mt-1 flex gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className={cn('size-3.5', i < r.rating ? 'fill-gold text-gold' : 'text-border')} />
                        ))}
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-foreground/80">{r.text}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
