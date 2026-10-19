import type { Metadata } from 'next';
import { Breadcrumb } from '@/components/common/landing/breadcrumb';
import { Checkout } from '@/components/common/landing/checkout';
import { siteInfo } from '@/lib/data';

export const metadata: Metadata = {
  title: `Checkout | ${siteInfo.name}`,
};

export default function CheckoutPage() {
  return (
    <>
      <Breadcrumb items={[{ label: 'Checkout' }]} />
      <Checkout />
    </>
  );
}
