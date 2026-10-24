"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
  BadgeCheck,
  CalendarDays,
  CircleCheck,
  CircleX,
  Mail,
  MapPin,
  Package,
  Phone,
  UserRound,
  Wallet,
} from "lucide-react";
import NavTitle from "@/components/reuseable/nav-title";
import {
  Badge,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  TableCell,
  TableRow,
} from "@/components/ui";
import { CustomTable } from "@/components/reuseable/table";
import { TableNoItem } from "@/components/reuseable/table-no-item";
import { Pagination } from "@/components/reuseable/pagination";
import SearchBox from "@/components/reuseable/search-box";
import { PreviewBtn } from "@/components/reuseable/btn";
import { OrderStatusBadge } from "@/components/common/landing/order-status-badge";
import { orders, orderTotal, userProfile } from "@/lib/data";
import { helpers } from "@/lib/helpers";

const roleLabels = {
  customer: "Customer",
  guest: "Guest",
};

const user = {
  ...userProfile,
  role: "customer" as keyof typeof roleLabels,
  status: "ACTIVE",
  emailVerified: true,
  phoneVerified: true,
};

const statusOptions = [
  { label: "All Status", value: "all" },
  { label: "Pending", value: "pending" },
  { label: "Accepted", value: "accepted" },
  { label: "Packed", value: "packed" },
  { label: "Shipped", value: "shipped" },
  { label: "Delivered", value: "delivered" },
  { label: "Cancelled", value: "cancelled" },
];

const stats = [
  {
    label: "Total orders",
    value: orders.length,
    icon: Package,
    style: "bg-emerald-50 text-emerald-700",
  },
  {
    label: "Delivered",
    value: orders.filter((o) => o.status === "delivered").length,
    icon: CircleCheck,
    style: "bg-emerald-50 text-emerald-600",
  },
  {
    label: "Cancelled",
    value: orders.filter((o) => o.status === "cancelled").length,
    icon: CircleX,
    style: "bg-red-50 text-red-600",
  },
  {
    label: "Total spent",
    value: helpers.currency(
      orders
        .filter((o) => o.status !== "cancelled")
        .reduce((sum, o) => sum + orderTotal(o), 0)
    ),
    icon: Wallet,
    style: "bg-amber-50 text-amber-700",
  },
];

const fullAddress = [user.address.line, user.address.thana, user.address.district].join(", ");

const UserDetailsPage = () => {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");

  const filteredOrders = orders.filter(
    (o) =>
      o.id.toLowerCase().includes(search.trim().toLowerCase()) &&
      (status === "all" || o.status === status)
  );

  const info = [
    { icon: UserRound, label: "Full name", value: user.name },
    {
      icon: Mail,
      label: "Email",
      value: user.email,
      verified: user.emailVerified,
    },
    {
      icon: Phone,
      label: "Phone",
      value: `+88 ${user.phone}`,
      verified: user.phoneVerified,
    },
    { icon: UserRound, label: "Gender", value: user.gender },
    {
      icon: CalendarDays,
      label: "Birthday",
      value: helpers.formatDate(user.birthday, "DD MMM YYYY"),
    },
    { icon: MapPin, label: "Address", value: fullAddress },
  ];

  const headers = ["Order ID", "Date", "Items", "Payment", "Total", "Status", "Action"];

  return (
    <div className="space-y-5">
      <NavTitle
        title="User Details"
        subTitle="View customer information and order history."
      />

      {/* ===== Base information ===== */}
      <div className="bg-white border border-gray-200 rounded-xl">
        <div className="flex flex-wrap items-center gap-4 border-b border-gray-200 p-5">
          <span className="grid size-16 shrink-0 place-items-center rounded-full bg-secondary text-2xl font-bold text-primary">
            {user.name.charAt(0)}
          </span>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-lg font-semibold text-gray-900">{user.name}</h2>
              <Badge variant={user.role}>{roleLabels[user.role]}</Badge>
              <Badge variant={user.status === "ACTIVE" ? "success" : "secondary"}>
                {user.status === "ACTIVE" ? "Active" : "Inactive"}
              </Badge>
            </div>
            <p className="truncate text-sm text-gray-500">{user.email}</p>
            <p className="mt-0.5 text-xs text-gray-500">
              Member since {helpers.formatDate(user.joinedAt, "DD MMM YYYY")}
            </p>
          </div>
        </div>

        <ul className="grid gap-5 p-5 sm:grid-cols-2 lg:grid-cols-3">
          {info.map(({ icon: Icon, label, value, verified }) => (
            <li key={label} className="flex items-start gap-3">
              <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-gray-50 text-gray-500">
                <Icon size={18} />
              </span>
              <div className="min-w-0">
                <p className="text-xs text-gray-500">{label}</p>
                <div className="flex flex-wrap items-center gap-2">
                  <p className="break-all text-sm font-medium text-gray-900">{value}</p>
                  {verified !== undefined && (
                    <Badge variant={verified ? "success" : "warning"}>
                      {verified && <BadgeCheck />}
                      {verified ? "Verified" : "Unverified"}
                    </Badge>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* ===== Order stats ===== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map(({ label, value, icon: Icon, style }) => (
          <div
            key={label}
            className="flex items-center gap-4 bg-white border border-gray-200 rounded-xl p-4"
          >
            <span className={`grid size-12 shrink-0 place-items-center rounded-xl ${style}`}>
              <Icon size={20} />
            </span>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 leading-tight">{value}</h3>
              <p className="text-sm text-gray-500">{label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ===== Orders ===== */}
      <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
          <h3 className="text-base font-semibold text-gray-900">All Orders</h3>
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <div className="w-full sm:w-64">
              <SearchBox placeholder="Search by order ID" onChange={setSearch} />
            </div>
            <Select
              items={statusOptions}
              value={status}
              onValueChange={(v) => setStatus(v ?? "all")}
            >
              <SelectTrigger className="min-w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map((o) => (
                  <SelectItem key={o.value} value={o.value}>
                    {o.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <CustomTable
          headers={headers}
          pagination={
            <div className="mt-4">
              <Pagination
                name="Orders"
                total={filteredOrders.length}
                page={1}
                per_page={10}
                onPageChange={() => {}}
              />
            </div>
          }
        >
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium text-gray-900">#{order.id}</TableCell>
                <TableCell className="text-gray-700">
                  {helpers.formatDate(order.placedAt, "DD MMM YYYY")}
                </TableCell>
                <TableCell className="text-gray-700">
                  {order.items.reduce((sum, i) => sum + i.quantity, 0)} items
                </TableCell>
                <TableCell className="text-gray-700 uppercase">{order.payment}</TableCell>
                <TableCell className="text-gray-900 font-medium">
                  {helpers.currency(orderTotal(order))}
                </TableCell>
                <TableCell>
                  <OrderStatusBadge status={order.status} />
                </TableCell>
                <TableCell>
                  <Link href={`/admin/order/${order.id}`}>
                    <PreviewBtn />
                  </Link>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableNoItem
              colSpan={headers.length}
              title="No orders found"
              tdStyle="!bg-background"
            />
          )}
        </CustomTable>
      </div>
    </div>
  );
};

export default UserDetailsPage;
