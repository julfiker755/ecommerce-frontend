"use client";
import Image from "next/image";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { Banknote, MapPin, Phone, UserRound } from "lucide-react";
import { PreviewBtn } from "@/components/reuseable/btn";
import NavTitle from "@/components/reuseable/nav-title";
import { OrderStatusBadge } from "@/components/common/landing/order-status-badge";
import { OrderTracker } from "@/components/common/landing/order-tracker";
import {
  getOrder,
  orders,
  orderSubtotal,
  orderTotal,
  siteInfo,
  userProfile,
} from "@/lib/data";
import { helpers } from "@/lib/helpers";
import StatusChange from "../status-change";

export function generateStaticParams() {
  return orders.map((o) => ({ id: o.id }));
}

const paymentLabel = {
  cod: "Cash on Delivery",
  bkash: "bKash",
  online: "Card / Online",
};

export default function OrderDetailsPage({
  admin = false,
}: {
  admin?: boolean;
}) {
  const { id } = useParams();
  const order = getOrder(id as any);
  if (!order) notFound();

  const subtotal = orderSubtotal(order);
  const total = orderTotal(order);

  return (
    <div className="space-y-6">
      <NavTitle
        title={`Order #${order.id}`}
        subTitle="Track your order and view its details."
      />

      {/* ===== Status ===== */}
      <section className="rounded-2xl border border-border bg-card p-5 sm:p-6">
        <div className="mb-8 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs text-muted-foreground">Order number</p>
            <p className="font-mono text-lg font-bold text-primary">
              #{order.id}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Placed on {helpers.formatDate(order.placedAt, "DD MMM YYYY")}
            </p>
          </div>
          {admin ? (
            <StatusChange id={order.id} status={order.status} />
          ) : (
            <OrderStatusBadge status={order.status} className="text-sm" />
          )}
        </div>
        <OrderTracker order={order} />
      </section>

      <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
        {/* ===== Items ===== */}
        <section className="rounded-2xl border border-border bg-card p-5 sm:p-6">
          <h2 className="mb-4 font-semibold">
            Items{" "}
            <span className="text-muted-foreground">
              ({order.items.length})
            </span>
          </h2>
          <ul className="divide-y divide-border">
            {order.items.map((item) => (
              <li
                key={item.slug}
                className="flex items-center gap-4 py-4 first:pt-0 last:pb-0"
              >
                <Link
                  href={`/products/${item.slug}`}
                  className="relative size-16 shrink-0 overflow-hidden rounded-xl border border-border bg-muted"
                >
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                </Link>
                <div className="min-w-0 flex-1">
                  <Link
                    href={`/products/${item.slug}`}
                    className="line-clamp-1 text-sm font-semibold hover:text-primary"
                  >
                    {item.name}
                  </Link>
                  {item.variant && (
                    <p className="text-xs text-muted-foreground">
                      {item.variant}
                    </p>
                  )}
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {helpers.currency(item.price)} × {item.quantity}
                  </p>
                </div>
                <p className="font-semibold text-foreground">
                  {helpers.currency(item.price * item.quantity)}
                </p>
              </li>
            ))}
          </ul>
        </section>

        <div className="space-y-6">
          {/* ===== Summary ===== */}
          <section className="rounded-2xl border border-border bg-card p-5 sm:p-6">
            <h2 className="mb-4 font-semibold">Payment summary</h2>
            <dl className="space-y-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Subtotal</dt>
                <dd className="font-medium">{helpers.currency(subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Delivery charge</dt>
                <dd className="font-medium">
                  {order.deliveryCharge ? (
                    helpers.currency(order.deliveryCharge)
                  ) : (
                    <span className="text-primary">FREE</span>
                  )}
                </dd>
              </div>
              <div className="flex items-center justify-between border-t border-dashed border-border pt-3">
                <dt className="font-semibold">Total</dt>
                <dd className="text-xl font-bold text-primary">
                  {helpers.currency(total)}
                </dd>
              </div>
            </dl>
            <p className="mt-4 flex items-center gap-2 rounded-lg bg-muted/60 px-3 py-2 text-sm">
              <Banknote className="size-4 text-primary" />{" "}
              {paymentLabel[order.payment]}
            </p>
          </section>

          {/* ===== Address ===== */}
          <section className="rounded-2xl border border-border bg-card p-5 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold">Delivery address</h2>
              {admin && (
                <Link href={"/admin/user/details?id=1"} title="View customer">
                  <PreviewBtn className="size-9! border-none" />
                </Link>
              )}
            </div>
            <ul className="space-y-3 text-sm text-foreground/80">
              <li className="flex gap-2.5">
                <UserRound className="mt-0.5 size-4 shrink-0 text-primary" />{" "}
                {userProfile.name}
              </li>
              <li className="flex gap-2.5">
                <Phone className="mt-0.5 size-4 shrink-0 text-primary" /> +88{" "}
                {userProfile.phone}
              </li>
              <li className="flex gap-2.5">
                <MapPin className="mt-0.5 size-4 shrink-0 text-primary" />{" "}
                {order.address}
              </li>
            </ul>
          </section>

          {!admin && (
            <p className="text-center text-xs text-muted-foreground">
              Need help with this order? Call{" "}
              <a
                href={`tel:${siteInfo.phone}`}
                className="font-semibold text-primary"
              >
                {siteInfo.phone}
              </a>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
