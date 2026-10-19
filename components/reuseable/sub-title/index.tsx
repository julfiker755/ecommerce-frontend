'use client';
import Heading from '../heading';
import { cn } from '@/lib';

export function SubTitle({ title, titleStyle, text, textStyle }: any) {
  return (
    <div>
      <Heading variant="h2" className={cn('text-center', titleStyle)}>
        {title}
      </Heading>
      {text && (
        <p
          className={cn(
            'text-center text-fig-gray text-base max-w-2xl  mx-auto mb-10 mt-1 leading-relaxed',
            textStyle
          )}
        >
          {text}
        </p>
      )}
    </div>
  );
}
