import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { promoBanners } from '@/lib/data';
import { cn } from '@/lib/utils';

const tones = {
  emerald: 'bg-primary text-primary-foreground',
  amber: 'bg-accent text-accent-foreground',
};

export function PromoBanner() {
  return (
    <section className="wrapper py-6 lg:py-8">
      <div className="grid gap-4 md:grid-cols-2">
        {promoBanners.map((b) => (
          <div
            key={b.id}
            className={cn('group relative flex min-h-56 overflow-hidden rounded-3xl', tones[b.tone])}
          >
            <div className="relative z-10 flex w-3/5 flex-col justify-center p-6 sm:p-8">
              <span className="text-xs font-semibold uppercase tracking-wider opacity-80">{b.eyebrow}</span>
              <h3 className="mt-2 font-heading text-2xl sm:text-3xl font-bold leading-tight">{b.title}</h3>
              <p className="mt-2 text-sm opacity-85">{b.text}</p>
              <Button
                variant={b.tone === 'emerald' ? 'accent' : 'default'}
                className="mt-5 w-fit rounded-full"
                nativeButton={false}
                render={<Link href={b.href} />}
              >
                Shop Now <ArrowRight />
              </Button>
            </div>
            <div className="absolute inset-y-0 right-0 w-2/5">
              <Image
                src={b.image}
                alt={b.title}
                fill
                sizes="(max-width: 768px) 40vw, 20vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105 [mask-image:linear-gradient(to_right,transparent,black_35%)]"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
