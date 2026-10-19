import NavTitle from '@/components/reuseable/nav-title';
import { OrderList } from '@/components/common/landing/order-list';
import { orders } from '@/lib/data';

export default function OrdersPage() {
  return (
    <>
      <NavTitle title="My Orders" subTitle="View all your orders and track their delivery status." />
      <OrderList orders={orders} />
    </>
  );
}
