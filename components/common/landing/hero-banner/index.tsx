'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { heroSlides, type HeroSlide } from '@/lib/data';
import { cn } from '@/lib/utils';

export const toneStyles: Record<HeroSlide['tone'], string> = {
  emerald: 'from-[oklch(0.93_0_0)] via-[oklch(0.97_0_0)] to-[oklch(1_0_0)]',
  amber: 'from-[oklch(0.94_0_0)] via-[oklch(0.975_0_0)] to-[oklch(1_0_0)]',
  rose: 'from-[oklch(0.92_0_0)] via-[oklch(0.965_0_0)] to-[oklch(1_0_0)]',
};

export function HeroBanner() {
  const [active, setActive] = useState(0);
  const total = heroSlides.length;

  useEffect(() => {
    const timer = setInterval(() => setActive((i) => (i + 1) % total), 6000);
    return () => clearInterval(timer);
  }, [active, total]);

  const go = (dir: number) => setActive((i) => (i + dir + total) % total);

  return (
    <section className="wrapper pt-4 lg:pt-6">
      {/* ===== Slider ===== */}
      <div className="relative w-full overflow-hidden rounded-2xl min-h-80 sm:min-h-96 lg:min-h-120">
        {heroSlides.map((slide, i) => (
          <div
            key={slide.id}
            aria-hidden={i !== active}
            className={cn(
              'absolute inset-0 bg-linear-to-br transition-opacity duration-700',
              toneStyles[slide.tone],
              i === active ? 'opacity-100 z-10' : 'opacity-0 z-0'
            )}
          >
            <div className="grid h-full grid-cols-1 sm:grid-cols-2 items-center gap-4 p-6 sm:p-10 lg:px-16 lg:py-12">
              <div className={cn('relative z-10 transition-all duration-700', i === active ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0')}>
                <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                  {slide.eyebrow}
                </span>
                <h1 className="mt-4 font-heading text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-foreground">
                  {slide.title}
                </h1>
                <p className="mt-3 max-w-lg text-sm sm:text-base lg:text-lg text-muted-foreground">{slide.text}</p>
                <Button
                  size="lg"
                  className="mt-6 rounded-full"
                  nativeButton={false}
                  render={<Link href={slide.href} />}
                >
                  {slide.cta} <ArrowRight />
                </Button>
              </div>
              <div className="absolute right-0 bottom-0 top-0 w-1/2 lg:w-[45%] hidden sm:block">
                <div className="absolute inset-y-8 right-8 left-4 lg:inset-y-10 lg:right-16 lg:left-0 rounded-[2rem] overflow-hidden shadow-2xl rotate-2">
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    fill
                    priority={i === 0}
                    sizes="(max-width: 1024px) 50vw, 40vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}

        <div className="absolute bottom-5 left-6 sm:left-10 lg:left-16 z-20 flex items-center gap-2">
          {heroSlides.map((s, i) => (
            <button
              key={s.id}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => setActive(i)}
              className={cn(
                'h-2 rounded-full transition-all cursor-pointer',
                i === active ? 'w-8 bg-primary' : 'w-2 bg-foreground/20 hover:bg-foreground/40'
              )}
            />
          ))}
        </div>
        <div className="absolute bottom-4 right-4 lg:bottom-6 lg:right-6 z-20 flex gap-2">
          <Button variant="outline" size="icon-sm" className="rounded-full bg-card/80 backdrop-blur" onClick={() => go(-1)} aria-label="Previous slide">
            <ChevronLeft />
          </Button>
          <Button variant="outline" size="icon-sm" className="rounded-full bg-card/80 backdrop-blur" onClick={() => go(1)} aria-label="Next slide">
            <ChevronRight />
          </Button>
        </div>
      </div>
    </section>
  );
}
