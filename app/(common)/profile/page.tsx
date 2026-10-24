import Link from 'next/link';
import { ArrowRight, CircleCheck, CircleX, PackageCheck, Wallet } from 'lucide-react';
import NavTitle from '@/components/reuseable/nav-title';
import { OrderList } from '@/components/common/landing/order-list';
import { Button } from '@/components/ui/button';
import { orders, orderTotal } from '@/lib/data';


export default function Dashboard() {
  const cancelled = orders.filter((o) => o.status === 'cancelled').length;
  const delivered = orders.filter((o) => o.status === 'delivered').length;


  const stats = [
    { icon: PackageCheck, label: 'Total orders', value: orders.length, tone: 'bg-secondary text-primary' },
    { icon: CircleCheck, label: 'Delivered', value: delivered, tone: 'bg-emerald-50 text-emerald-600' },
    { icon: CircleX, label: 'Cancelled', value: cancelled, tone: 'bg-red-50 text-red-600' }
  ];

  return (
    <div className="space-y-6">
      <NavTitle title="Dashboard" subTitle="Overview of your account and recent activity." />

      {/* ===== Stats ===== */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
        {stats.map(({ icon: Icon, label, value, tone }) => (
          <div key={label} className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4">
            <span className={`grid size-11 shrink-0 place-items-center rounded-xl ${tone}`}>
              <Icon className="size-5" />
            </span>
            <div className="min-w-0">
              <p className="truncate text-lg font-bold text-foreground">{value}</p>
              <p className="text-xs text-muted-foreground">{label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ===== Recent orders ===== */}
      <section>
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">Recent orders</h2>
          <Button variant="outline" size="sm" className="bg-card" nativeButton={false} render={<Link href="/profile/orders" />}>
            View all <ArrowRight />
          </Button>
        </div>
        <OrderList orders={orders.slice(0, 4)} />
      </section>
    </div>
  );
}


