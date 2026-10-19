'use client';
import { useState } from 'react';
import Link from 'next/link';
import { TableCell, TableRow } from '@/components/ui';
import { CustomTable } from '@/components/reuseable/table';
import { TableNoItem } from '@/components/reuseable/table-no-item';
import { Pagination } from '@/components/reuseable/pagination';
import Avatars from '@/components/reuseable/avater';
import { PreviewBtn } from '@/components/reuseable/btn';
import { OrderStatusBadge } from '../order-status-badge';
import { orderTotal, type Order } from '@/lib/data';
import { helpers } from '@/lib/helpers';

const headers = ['Order ID', 'Product', 'Date', 'Items', 'Total', 'Payment', 'Status', 'Action'];
const PER_PAGE = 10;
const paymentLabel = { cod: 'Cash on Delivery', bkash: 'bKash', online: 'Online' };

export function OrderList({ orders }: { orders: Order[] }) {
  const [page, setPage] = useState(1);
  const list = orders.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <CustomTable
      headers={headers}
      pagination={
        <div className="mt-4">
          <Pagination
            name="Orders"
            total={orders.length}
            current_page={page}
            per_page={PER_PAGE}
            onPageChange={setPage}
          />
        </div>
      }
    >
      {list.length > 0 ? (
        list.map((order) => {
          const [first, ...rest] = order.items;
          const itemCount = order.items.reduce((sum, i) => sum + i.quantity, 0);
          return (
            <TableRow key={order.id} className="[&>td]:bg-card">
              <TableCell>
                <Link
                  href={`/profile/orders/${order.id}`}
                  className="font-mono font-semibold text-primary hover:underline"
                >
                  #{order.id}
                </Link>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatars
                    src={first.image}
                    fallback={first.name}
                    alt={first.name}
                    className="rounded-lg after:rounded-lg"
                    imgstyle="rounded-lg object-cover"
                    fallbackStyle="rounded-lg"
                  />
                  <div className="max-w-56">
                    <p className="truncate font-medium text-foreground">{first.name}</p>
                    {rest.length > 0 && (
                      <p className="text-xs text-muted-foreground">+{rest.length} more product{rest.length > 1 ? 's' : ''}</p>
                    )}
                  </div>
                </div>
              </TableCell>
              <TableCell className="text-gray-700">{helpers.formatDate(order.placedAt, 'DD MMM YYYY')}</TableCell>
              <TableCell className="text-gray-700">{itemCount}</TableCell>
              <TableCell className="font-semibold text-gray-900">{helpers.currency(orderTotal(order))}</TableCell>
              <TableCell className="text-gray-700">{paymentLabel[order.payment]}</TableCell>
              <TableCell>
                <OrderStatusBadge status={order.status} />
              </TableCell>
              <TableCell>
                <Link href={`/profile/orders/${order.id}`} aria-label={`View order ${order.id}`}>
                  <PreviewBtn />
                </Link>
              </TableCell>
            </TableRow>
          );
        })
      ) : (
        <TableNoItem colSpan={headers.length} title="No orders found" tdStyle="!bg-card" />
      )}
    </CustomTable>
  );
}
