import { Quote, Star } from 'lucide-react';
import { SectionTitle } from '../section-title';
import { testimonials } from '@/lib/data';
import { cn } from '@/lib/utils';

export function Testimonials() {
  return (
    <section className="bg-secondary/50 py-12 lg:py-16">
      <div className="wrapper">
        <SectionTitle title="What Our Customers Say" eyebrow="Testimonials" />
        <div className="grid gap-4 md:grid-cols-3">
          {testimonials.map((t) => (
            <figure key={t.id} className="relative rounded-2xl border border-border bg-card p-6 shadow-sm">
              <Quote className="absolute right-5 top-5 size-8 text-primary/15" />
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={cn('size-4', i < t.rating ? 'fill-gold text-gold' : 'text-border')}
                  />
                ))}
              </div>
              <blockquote className="mt-4 text-sm leading-relaxed text-foreground/80">“{t.text}”</blockquote>
              <figcaption className="mt-5 flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-full bg-primary font-semibold text-primary-foreground">
                  {t.name.charAt(0)}
                </span>
                <span>
                  <span className="block text-sm font-semibold">{t.name}</span>
                  <span className="block text-xs text-muted-foreground">{t.location}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
