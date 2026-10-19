import { cn } from '@/lib/utils';
import React from 'react';

interface VideoPlayerProps {
  src: string;
  className?: string;
  videoClassName?: string;
}

export const VideoPlayer = ({
  src,
  className,
  videoClassName,
}: VideoPlayerProps) => {
  return (
    <div
      className={cn(
        'relative h-[200px] w-full overflow-hidden rounded-lg bg-black',
        className
      )}
    >
      <video
        src={src}
        controls
        className={cn('h-full w-full object-contain', videoClassName)}
      />
    </div>
  );
};
