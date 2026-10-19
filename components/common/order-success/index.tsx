import Link from 'next/link';
import { ArrowRight, Check, Phone, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { siteInfo } from '@/lib/data';
import { helpers } from '@/lib/helpers';

export interface PlacedOrder {
  id: string;
  name: string;
  phone: string;
  address: string;
  items: number;
  total: number;
}

export function OrderSuccess({ order }: { order: PlacedOrder }) {
  return (
    <section className="wrapper py-12 lg:py-20">
      <div className="mx-auto max-w-xl text-center">
        <div className="relative mx-auto grid size-20 place-items-center">
          <span className="absolute inset-0 animate-ping rounded-full bg-primary/20" />
          <span className="relative grid size-20 place-items-center rounded-full bg-primary text-primary-foreground shadow-lg">
            <Check className="size-10" strokeWidth={3} />
          </span>
        </div>
        <h1 className="mt-6 font-heading text-3xl font-bold sm:text-4xl">Thank you, {order.name.split(' ')[0]}!</h1>
        <p className="mt-2 text-muted-foreground">
          Your order has been placed successfully. Our team will call you shortly to confirm.
        </p>

        <div className="mt-8 rounded-2xl border border-border bg-card p-6 text-left">
          <div className="flex items-center justify-between border-b border-dashed border-border pb-4">
            <span className="text-sm text-muted-foreground">Order number</span>
            <span className="rounded-lg bg-secondary px-3 py-1 font-mono font-bold text-primary">#{order.id}</span>
          </div>
          <dl className="mt-4 space-y-3 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-muted-foreground">Deliver to</dt>
              <dd className="text-right font-medium">{order.address}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-muted-foreground">Phone</dt>
              <dd className="font-medium">+88 {order.phone}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-muted-foreground">Items</dt>
              <dd className="font-medium">{order.items}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-muted-foreground">Payment</dt>
              <dd className="font-medium">Cash on Delivery</dd>
            </div>
            <div className="flex items-center justify-between gap-4 rounded-xl bg-brand-soft px-4 py-3">
              <dt className="font-semibold">Pay on delivery</dt>
              <dd className="text-xl font-bold text-primary">{helpers.currency(order.total)}</dd>
            </div>
          </dl>
          <p className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
            <Truck className="size-4 text-primary" /> Estimated delivery: 1–3 working days
          </p>
        </div>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button size="lg" className="rounded-full" nativeButton={false} render={<Link href="/" />}>
            Continue Shopping <ArrowRight />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="rounded-full"
            nativeButton={false}
            render={<a href={`tel:${siteInfo.phone}`} />}
          >
            <Phone /> {siteInfo.phone}
          </Button>
        </div>
      </div>
    </section>
  );
}
