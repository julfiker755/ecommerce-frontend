import { helpers } from '@/lib/helpers';
import { cn } from '@/lib/utils';

interface OrderSummaryProps {
  subtotal: number;
  delivery: number | null;
  children?: React.ReactNode;
}

export function OrderSummary({ subtotal, delivery, children }: OrderSummaryProps) {
  const total = subtotal + (delivery ?? 0);

  return (
    <div className="space-y-5">
      <dl className="space-y-3 text-sm">
        <Row label="Subtotal" value={helpers.currency(subtotal)} />
        <Row
          label="Delivery charge"
          value={
            delivery === null ? (
              <span className="text-xs text-muted-foreground">Select district</span>
            ) : delivery === 0 ? (
              <span className="font-semibold text-primary">FREE</span>
            ) : (
              helpers.currency(delivery)
            )
          }
        />
        <div className="flex items-center justify-between border-t border-dashed border-border pt-4">
          <dt className="text-base font-semibold">Total</dt>
          <dd className="text-2xl font-bold text-primary">{helpers.currency(total)}</dd>
        </div>
      </dl>

      {children}
    </div>
  );
}

function Row({ label, value, className }: { label: string; value: React.ReactNode; className?: string }) {
  return (
    <div className={cn('flex items-center justify-between gap-4', className)}>
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="font-medium">{value}</dd>
    </div>
  );
}
