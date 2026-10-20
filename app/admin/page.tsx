"use client";
import { DollarSign, Package, ShoppingCart, Users } from "lucide-react";
import NavTitle from "@/components/reuseable/nav-title";
import SalesOverview from "@/components/common/admin/sales-overview";
import TopProducts from "@/components/common/admin/top-products";
import RecentOrders from "@/components/common/admin/recent-orders";

const stats = [
  {
    label: "Total Revenue",
    value: "৳58.7K",
    icon: DollarSign,
  },
  {
    label: "Total Orders",
    value: "12",
    icon: ShoppingCart,
  },
  {
    label: "Total Customers",
    value: "8",
    icon: Users,
  },
  {
    label: "Active Products",
    value: "16",
    icon: Package,
  },
];

export default function DashbordOverview() {
  return (
    <div>
      <NavTitle title="Dashboard" subTitle="Overview of your store performance." />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map(({ label, value, icon: Icon }) => (
          <div
            key={label}
            className="relative overflow-hidden rounded-xl border border-gray-200 bg-white p-5"
          >
            <Icon
              size={72}
              strokeWidth={1.5}
              className="pointer-events-none absolute -bottom-1 right-4 text-gray-100"
            />

            <span className="grid size-12 place-items-center rounded-xl bg-secondary text-primary">
              <Icon size={20} />
            </span>

            <p className="mt-4 text-sm font-medium text-gray-500">{label}</p>
            <h3 className="mt-1 text-3xl font-bold leading-tight text-gray-900">{value}</h3>
          </div>
        ))}
      </div>

      <div className="mt-5">
        <SalesOverview />
      </div>

      <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-2">
        <TopProducts />
        <RecentOrders />
      </div>
    </div>
  );
}
