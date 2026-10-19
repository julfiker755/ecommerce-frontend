'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useForm, useWatch, type FieldValues } from 'react-hook-form';
import { Loader2, Lock, ShieldCheck, ShoppingBag, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Form from '@/components/reuseable/from';
import { FromInput } from '@/components/reuseable/from-input';
import { InputSelectField } from '@/components/reuseable/from-select';
import { FromTextArea } from '@/components/reuseable/from-textarea';
import sonner from '@/components/reuseable/sonner';
import { CheckoutCard } from '../checkout-card';
import { CartItem } from '../cart-item';
import { useCart } from '@/context/cart';
import {
  deliveryCharge,
  districts,
  siteInfo,
  type PaymentMethod as Method,
} from '@/lib/data';
import { helpers } from '@/lib/helpers';
import { PaymentMethod } from '../payment-method';
import { OrderSummary } from '../order-summary';
import { OrderSuccess, PlacedOrder } from '../order-success';

const defaultValues = {
  name: '',
  phone: '',
  email: '',
  address: '',
  district: '',
  thana: '',
  note: '',
};

const inputStyle = 'border-input bg-card text-foreground';
const labelStyle = 'text-sm text-foreground mb-1.5';

export function Checkout() {
  const { items, total: subtotal, count, hydrated, clearCart } = useCart();
  const from = useForm({ defaultValues });
  const district = useWatch({ control: from.control, name: 'district' });

  const [payment, setPayment] = useState<Method>('cod');
  const [placing, setPlacing] = useState(false);
  const [order, setOrder] = useState<PlacedOrder | null>(null);

  // Reset thana when district changes
  useEffect(() => {
    from.setValue('thana', '');
  }, [district, from]);

  const thanas = districts.find((d) => d.value === district)?.thanas ?? [];

  const delivery = !district
    ? null
    : subtotal >= siteInfo.freeDeliveryOver
      ? 0
      : district === 'dhaka'
        ? deliveryCharge.insideDhaka
        : deliveryCharge.outsideDhaka;

  const grandTotal = subtotal + (delivery ?? 0);

  const validate = (v: FieldValues) => {
    const errors: [keyof typeof defaultValues, string][] = [];
    if (!v.name?.trim()) errors.push(['name', 'Full name is required']);
    if (!/^01[3-9]\d{8}$/.test(v.phone ?? '')) errors.push(['phone', 'Enter a valid 11 digit number']);
    if (v.email && !/^\S+@\S+\.\S+$/.test(v.email)) errors.push(['email', 'Enter a valid email']);
    if (!v.address?.trim()) errors.push(['address', 'Address is required']);
    if (!v.district) errors.push(['district', 'Please select a district']);
    errors.forEach(([name, message]) => from.setError(name, { message }));
    return errors.length === 0;
  };

  const onSubmit = async (values: FieldValues) => {
    from.clearErrors();
    if (!validate(values)) {
      sonner.error('Please check your shipping details');
      return;
    }
    if (payment !== 'cod') {
      sonner.info('Online payment is coming soon', 'Please choose Cash on Delivery for now.');
      return;
    }

    setPlacing(true);
    // TODO: replace with order API call
    await new Promise((r) => setTimeout(r, 900));

    const districtLabel = districts.find((d) => d.value === values.district)?.label;
    setOrder({
      id: `SB${Date.now().toString().slice(-8)}`,
      name: values.name.trim(),
      phone: values.phone,
      address: [values.address, values.thana, districtLabel].filter(Boolean).join(', '),
      items: count,
      total: grandTotal,
    });
    clearCart();
    setPlacing(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (order) return <OrderSuccess order={order} />;

  if (!hydrated) {
    return (
      <div className="wrapper grid min-h-[50vh] place-items-center">
        <Loader2 className="size-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!items.length) return <EmptyCart />;

  return (
    <section className="wrapper py-8 lg:py-10">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-heading text-3xl font-bold">Checkout</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {count} item{count > 1 ? 's' : ''} in your cart
          </p>
        </div>
        <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <Lock className="size-4 text-primary" /> Secure checkout
        </p>
      </div>

      <Form from={from} onSubmit={onSubmit} className="grid items-start gap-6 lg:grid-cols-[1fr_420px]">
        {/* ===== Left ===== */}
        <div className="space-y-6">
          <CheckoutCard
            title="Order Review"
            action={
              <Button type="button" variant="link" size="xs" className="px-0" nativeButton={false} render={<Link href="/" />}>
                + Add more
              </Button>
            }
          >
            <ul className="max-h-90 divide-y divide-border overflow-y-auto pr-1">
              {items.map((item) => (
                <CartItem key={item.key} item={item} />
              ))}
            </ul>
          </CheckoutCard>

          <CheckoutCard step={1} title="Shipping Address">
            <div className="grid gap-4 sm:grid-cols-2">
              <FromInput name="name" label="Full name *" placeholder="Your full name" className={inputStyle} stylelabel={labelStyle} />
              <FromInput
                name="phone"
                label="Phone number *"
                type="tel"
                inputMode="numeric"
                maxLength={11}
                placeholder="01XXXXXXXXX"
                icon={<span className="text-sm font-semibold text-foreground">+88</span>}
                className={`${inputStyle} pl-13`}
                stylelabel={labelStyle}
              />
              <div className="sm:col-span-2">
                <FromInput name="email" type="email" label="Email (optional)" placeholder="example@gmail.com" className={inputStyle} stylelabel={labelStyle} />
              </div>
              <div className="sm:col-span-2">
                <FromInput name="address" label="Full address *" placeholder="House no. / building / street / area" className={inputStyle} stylelabel={labelStyle} />
              </div>
              <InputSelectField
                name="district"
                label="District *"
                placeholder="Select district"
                items={districts.map(({ label, value }) => ({ label, value }))}
                className={`${inputStyle} rounded-lg px-4`}
                stylelabel={labelStyle}
              />
              <InputSelectField
                key={district || 'none'}
                name="thana"
                label="Thana / Area (optional)"
                placeholder={district ? 'Select thana' : 'Select district first'}
                items={thanas.map((t) => ({ label: t, value: t }))}
                className={`${inputStyle} rounded-lg px-4`}
                stylelabel={labelStyle}
              />
              <div className="sm:col-span-2">
                <FromTextArea
                  name="note"
                  label="Order note (optional)"
                  placeholder="Any special instruction for delivery…"
                  className={`${inputStyle} min-h-20 rounded-lg py-3`}
                  stylelabel={labelStyle}
                />
              </div>
            </div>
            <p className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 rounded-lg border border-accent/50 bg-accent/15 px-3 py-2.5 text-sm text-accent-foreground">
              <Truck className="size-4 shrink-0" />
              <span className="font-semibold">Delivery charge:</span>
              <span>
                Inside Dhaka <span className="font-bold">{helpers.currency(deliveryCharge.insideDhaka)}</span>
              </span>
              <span className="opacity-50">·</span>
              <span>
                Outside Dhaka <span className="font-bold">{helpers.currency(deliveryCharge.outsideDhaka)}</span>
              </span>
            </p>
          </CheckoutCard>
        </div>

        {/* ===== Right ===== */}
        <div className="space-y-6 lg:sticky lg:top-36">
          <CheckoutCard step={2} title="Payment Method">
            <PaymentMethod value={payment} onChange={setPayment} />
          </CheckoutCard>

          <CheckoutCard title="Order Summary">
            <OrderSummary subtotal={subtotal} delivery={delivery}>
              <Button type="submit" size="lg" className="h-13 w-full text-base" disabled={placing}>
                {placing ? (
                  <>
                    <Loader2 className="animate-spin" /> Placing order…
                  </>
                ) : (
                  <>Place Order · {helpers.currency(grandTotal)}</>
                )}
              </Button>
              <p className="flex items-center justify-center gap-1.5 text-center text-xs text-muted-foreground">
                <ShieldCheck className="size-4 text-primary" /> No account needed. Pay cash when you receive.
              </p>
            </OrderSummary>
          </CheckoutCard>
        </div>
      </Form>
    </section>
  );
}

function EmptyCart() {
  return (
    <section className="wrapper py-16 lg:py-24">
      <div className="mx-auto max-w-md text-center">
        <span className="mx-auto grid size-20 place-items-center rounded-full bg-secondary text-primary">
          <ShoppingBag className="size-9" />
        </span>
        <h1 className="mt-6 font-heading text-2xl font-bold sm:text-3xl">Your cart is empty</h1>
        <p className="mt-2 text-muted-foreground">
          Looks like you haven’t added anything yet. Explore our products and find something you love.
        </p>
        <Button size="lg" className="mt-6 rounded-full" nativeButton={false} render={<Link href="/" />}>
          Start Shopping
        </Button>
      </div>
    </section>
  );
}
