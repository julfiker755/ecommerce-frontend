'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { QuantityInput } from '../quantity-input';
import { useCart, type CartItem as CartItemType } from '@/context/cart';
import { helpers } from '@/lib/helpers';

export function CartItem({ item }: { item: CartItemType }) {
  const { updateQuantity, removeItem } = useCart();
  const variant = [item.color, item.weight].filter(Boolean).join(' · ');

  return (
    <li className="flex gap-3 sm:gap-4 py-4 first:pt-0 last:pb-0">
      <Link
        href={`/products/${item.slug}`}
        className="relative size-18 sm:size-20 shrink-0 overflow-hidden rounded-xl border border-border bg-muted"
      >
        <Image src={item.image} alt={item.name} fill sizes="80px" className="object-cover" />
      </Link>

      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <Link
              href={`/products/${item.slug}`}
              className="line-clamp-2 text-sm font-semibold leading-snug text-foreground hover:text-primary"
            >
              {item.name}
            </Link>
            {variant && <p className="mt-0.5 text-xs text-muted-foreground">{variant}</p>}
          </div>
          <Button
            type="button"
            variant="destructive"
            size="icon-sm"
            aria-label={`Remove ${item.name}`}
            onClick={() => removeItem(item.key)}
          >
            <Trash2 />
          </Button>
        </div>

        <div className="flex items-center justify-between gap-2">
          <QuantityInput
            size="sm"
            value={item.quantity}
            onChange={(q) => updateQuantity(item.key, q)}
          />
          <div className="text-right">
            <p className="font-bold text-primary">{helpers.currency(item.price * item.quantity)}</p>
            {item.quantity > 1 && (
              <p className="text-[11px] text-muted-foreground">
                {helpers.currency(item.price)} each
              </p>
            )}
          </div>
        </div>
      </div>
    </li>
  );
}
