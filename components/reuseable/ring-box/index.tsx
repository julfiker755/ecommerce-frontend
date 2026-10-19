import { cn } from '@/lib/utils';
import Image from 'next/image';
import React from 'react';

interface CircularImgProps {
  src: any;
  ringSrc: any;
  alt?: string;
  className?: string;
  imgStyle?: string;
  ringClassName?: string;
  photoInset?: string; // fine-tune how much photo shrinks inside ring
  children?: React.ReactNode;
}

export function CircularImgBox({
  src,
  ringSrc,
  alt,
  className,
  imgStyle,
  ringClassName,
  photoInset = '14%',
  children,
}: CircularImgProps) {
  return (
    <div className={cn('w-40 h-40 mx-auto relative', className)}>
      <div
        className="absolute rounded-full overflow-hidden z-10"
        style={{
          top: photoInset,
          left: photoInset,
          right: photoInset,
          bottom: photoInset,
        }}
      >
        <Image
          src={src}
          alt={alt || src?.slice?.(-20)?.toString() || 'photo'}
          fill
          placeholder="blur"
          blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjwvc3ZnPg=="
          className={cn('object-cover object-center w-full h-full', imgStyle)}
          sizes="(max-width: 768px) 100vw, 50vw"
          loading="lazy"
        />
      </div>
      {ringSrc && (
        <div
          className={cn(
            'absolute inset-0 z-20 pointer-events-none',
            ringClassName
          )}
        >
          <Image
            src={ringSrc}
            alt="ring-border"
            fill
            className="object-contain"
          />
        </div>
      )}

      {children}
    </div>
  );
}
