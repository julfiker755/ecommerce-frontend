import type { OrderStatus } from '@/lib/data';
import { cn } from '@/lib/utils';

export const statusStyles: Record<OrderStatus, { label: string; className: string; dot: string }> = {
  pending: { label: 'Pending', className: 'bg-amber-50 text-amber-700 ring-amber-200', dot: 'bg-amber-500' },
  accepted: { label: 'Accepted', className: 'bg-sky-50 text-sky-700 ring-sky-200', dot: 'bg-sky-500' },
  packed: { label: 'Packed', className: 'bg-violet-50 text-violet-700 ring-violet-200', dot: 'bg-violet-500' },
  shipped: { label: 'Shipped', className: 'bg-indigo-50 text-indigo-700 ring-indigo-200', dot: 'bg-indigo-500' },
  delivered: { label: 'Delivered', className: 'bg-emerald-50 text-emerald-700 ring-emerald-200', dot: 'bg-emerald-500' },
  cancelled: { label: 'Cancelled', className: 'bg-red-50 text-red-700 ring-red-200', dot: 'bg-red-500' },
};

export function OrderStatusBadge({ status, className }: { status: OrderStatus; className?: string }) {
  const s = statusStyles[status];
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset',
        s.className,
        className
      )}
    >
      <span className={cn('size-1.5 rounded-full', s.dot)} />
      {s.label}
    </span>
  );
}
