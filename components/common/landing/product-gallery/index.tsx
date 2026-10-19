'use client';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface ProductGalleryProps {
  images: string[];
  active: string;
  onChange: (image: string) => void;
  alt: string;
  badge?: React.ReactNode;
}

export function ProductGallery({ images, active, onChange, alt, badge }: ProductGalleryProps) {
  return (
    <div className="flex flex-col-reverse gap-3 sm:flex-row lg:sticky lg:top-36">
      {images.length > 1 && (
        <div className="flex gap-3 sm:flex-col">
          {images.map((img, i) => (
            <button
              key={img + i}
              type="button"
              onClick={() => onChange(img)}
              aria-label={`View image ${i + 1}`}
              className={cn(
                'relative size-18 sm:size-20 shrink-0 overflow-hidden rounded-xl border-2 bg-muted transition-all cursor-pointer',
                img === active ? 'border-primary' : 'border-transparent opacity-70 hover:opacity-100'
              )}
            >
              <Image src={img} alt={`${alt} ${i + 1}`} fill sizes="80px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
      <div className="group relative aspect-square flex-1 overflow-hidden rounded-2xl border border-border bg-muted">
        <Image
          key={active}
          src={active}
          alt={alt}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover animate-in fade-in duration-500 transition-transform group-hover:scale-110"
        />
        {badge && <div className="absolute left-4 top-4">{badge}</div>}
      </div>
    </div>
  );
}
