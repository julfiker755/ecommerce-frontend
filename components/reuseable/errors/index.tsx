import { cn } from '@/lib';
import { CircleAlert } from 'lucide-react';

interface ErrorTextProps {
  error: string;
  className?: string;
  icon?: boolean;
}

export function ErrorInput({ error, className, icon = true }: ErrorTextProps) {
  if (!error) return null;
  return (
    <>
      {error && (
        <p
          className={cn(
            'text-red-400 flex justify-end items-center text-right',
            className
          )}
        >
          <span className="mr-1"> {error}</span>{' '}
          {icon && <CircleAlert size={14} />}
        </p>
      )}
    </>
  );
}
