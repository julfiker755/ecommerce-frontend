import { helpers } from '@/lib/helpers';
import { discountPercent } from '@/lib/data';
import { cn } from '@/lib/utils';

interface PriceTagProps {
  price: number;
  oldPrice?: number;
  size?: 'sm' | 'lg';
  showSave?: boolean;
  className?: string;
}

export function PriceTag({ price, oldPrice, size = 'sm', showSave, className }: PriceTagProps) {
  const off = discountPercent(price, oldPrice);
  return (
    <div className={cn('flex flex-wrap items-baseline gap-x-2 gap-y-1', className)}>
      <span className={cn('font-bold text-primary', size === 'lg' ? 'text-3xl' : 'text-lg')}>
        {helpers.currency(price)}
      </span>
      {off > 0 && (
        <del className={cn('text-muted-foreground', size === 'lg' ? 'text-lg' : 'text-sm')}>
          {helpers.currency(oldPrice!)}
        </del>
      )}
      {showSave && off > 0 && (
        <span className="rounded-full bg-sale/10 px-2.5 py-0.5 text-xs font-semibold text-sale">
          Save {helpers.currency(oldPrice! - price)} ({off}%)
        </span>
      )}
    </div>
  );
}
