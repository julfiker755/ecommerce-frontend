import { cn } from '@/lib/utils';

interface CheckoutCardProps {
  title: string;
  step?: number;
  action?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}

export function CheckoutCard({ title, step, action, className, children }: CheckoutCardProps) {
  return (
    <div className={cn('rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-[0_1px_2px_rgba(0,0,0,0.03)]', className)}>
      <div className="mb-5 flex items-center justify-between gap-3">
        <h2 className="flex items-center gap-3 text-lg font-semibold text-foreground">
          {step ? (
            <span className="grid size-7 place-items-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
              {step}
            </span>
          ) : (
            <span className="h-5 w-1 rounded-full bg-primary" />
          )}
          {title}
        </h2>
        {action}
      </div>
      {children}
    </div>
  );
}
