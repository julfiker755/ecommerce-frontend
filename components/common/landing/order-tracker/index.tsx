import { Check, CircleX, ClipboardList, Hourglass, PackageCheck, Truck } from 'lucide-react';
import { orderSteps, type Order } from '@/lib/data';
import { helpers } from '@/lib/helpers';
import { cn } from '@/lib/utils';

const stepIcons = {
  pending: Hourglass,
  accepted: ClipboardList,
  packed: PackageCheck,
  shipped: Truck,
  delivered: Check,
};

interface OrderTrackerProps {
  order: Order;
  size?: 'sm' | 'lg';
}

export function OrderTracker({ order, size = 'lg' }: OrderTrackerProps) {
  const sm = size === 'sm';

  if (order.status === 'cancelled') {
    return (
      <div className="flex items-center gap-3 rounded-xl bg-red-50 p-4 text-red-700">
        <CircleX className="size-6 shrink-0" />
        <div>
          <p className="font-semibold">This order was cancelled</p>
          {order.timeline.cancelled && (
            <p className="text-xs opacity-80">
              Cancelled on {helpers.formatDate(order.timeline.cancelled, 'DD MMM YYYY')}
            </p>
          )}
        </div>
      </div>
    );
  }

  const current = orderSteps.findIndex((s) => s.status === order.status);

  return (
    <ol className="flex w-full items-start">
      {orderSteps.map((step, i) => {
        const Icon = stepIcons[step.status];
        const done = i <= current;
        const active = i === current;
        const date = order.timeline[step.status];
        const last = i === orderSteps.length - 1;

        return (
          <li key={step.status} className="relative flex flex-1 flex-col items-center text-center">
            {/* connector line to the next step */}
            {!last && (
              <span
                aria-hidden
                className={cn(
                  'absolute left-1/2 w-full border-t-2',
                  sm ? 'top-4' : 'top-6',
                  i < current ? 'border-solid border-primary' : 'border-dashed border-border'
                )}
              />
            )}
            <span
              className={cn(
                'relative z-10 grid place-items-center rounded-full transition-colors',
                sm ? 'size-8' : 'size-12',
                done ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground ring-1 ring-border',
                active && 'ring-4 ring-primary/20'
              )}
            >
              <Icon className={sm ? 'size-4' : 'size-5'} />
            </span>
            <span
              className={cn(
                'mt-2 font-medium',
                sm ? 'text-[11px]' : 'text-xs sm:text-sm',
                done ? 'text-foreground' : 'text-muted-foreground'
              )}
            >
              {step.label}
            </span>
            {!sm && (
              <span className="mt-0.5 hidden text-[11px] text-muted-foreground sm:block">
                {date ? helpers.formatDate(date, 'DD MMM YYYY') : '—'}
              </span>
            )}
          </li>
        );
      })}
    </ol>
  );
}
