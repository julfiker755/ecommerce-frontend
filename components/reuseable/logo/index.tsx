import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib';

interface ImgProps {
  src: any;
  alt?: string;
  className?: string;
  imgStyle?: string;
}

export default function Logo({ src, alt, className, imgStyle }: ImgProps) {
  return (
    <div className={cn(`w-50 h-20 relative rounded-md`, className)}>
      <Image
        src={src}
        alt={alt || src?.slice(-20)?.toString()}
        fill
        placeholder="blur"
        blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjwvc3ZnPg=="
        className={cn(
          `object-cover object-center absolute inset-0 w-full h-full rounded-md`,
          imgStyle
        )}
        sizes="(max-width: 768px) 100vw, 50vw"
        loading="lazy"
      />
    </div>
  );
}
