"use client";
import React, { useState } from "react";
import NavTitle from "@/components/reuseable/nav-title";
import { Badge, TableCell, TableRow } from "@/components/ui";
import { CustomTable } from "@/components/reuseable/table";
import { TableNoItem } from "@/components/reuseable/table-no-item";
import { Pagination } from "@/components/reuseable/pagination";
import SearchBox from "@/components/reuseable/search-box";
import { DeleteBtn, PreviewBtn } from "@/components/reuseable/btn";
import StatusChange from "@/components/common/admin/status-change";
import useConfirmation from "@/context/delete-modal";
import type { OrderStatus } from "@/lib/data";
import { helpers } from "@/lib/helpers";
import Link from "next/link";

type OrderType = "customer" | "guest";

const orderTypes: Record<OrderType, string> = {
  customer: "Customer",
  guest: "Guest",
};

const initialOrders: {
  id: string;
  customer: string;
  email: string;
  date: string;
  items: number;
  total: number;
  payment: string;
  status: OrderStatus;
  type: OrderType;
}[] = [
  {
    id: "SB10482931",
    customer: "Rahim Uddin",
    email: "rahim.uddin@gmail.com",
    date: "20 Oct 2026",
    items: 3,
    total: 2450,
    payment: "bKash",
    status: "pending",
    type: "customer",
  },
  {
    id: "SB10482877",
    customer: "Nusrat Jahan",
    email: "nusrat.jahan@gmail.com",
    date: "20 Oct 2026",
    items: 1,
    total: 890,
    payment: "Cash on Delivery",
    status: "accepted",
    type: "guest",
  },
  {
    id: "SB10482815",
    customer: "Karim Hasan",
    email: "karim.hasan@gmail.com",
    date: "19 Oct 2026",
    items: 2,
    total: 1560,
    payment: "Nagad",
    status: "packed",
    type: "customer",
  },
  {
    id: "SB10482764",
    customer: "Farhana Akter",
    email: "farhana.akter@gmail.com",
    date: "19 Oct 2026",
    items: 4,
    total: 3720,
    payment: "bKash",
    status: "packed",
    type: "guest",
  },
  {
    id: "SB10482702",
    customer: "Tanvir Ahmed",
    email: "tanvir.ahmed@gmail.com",
    date: "18 Oct 2026",
    items: 2,
    total: 1180,
    payment: "Card",
    status: "shipped",
    type: "customer",
  },
  {
    id: "SB10482655",
    customer: "Sakib Hossain",
    email: "sakib.hossain@gmail.com",
    date: "18 Oct 2026",
    items: 5,
    total: 4950,
    payment: "Cash on Delivery",
    status: "delivered",
    type: "guest",
  },
  {
    id: "SB10482598",
    customer: "Sadia Islam",
    email: "sadia.islam@gmail.com",
    date: "17 Oct 2026",
    items: 1,
    total: 650,
    payment: "bKash",
    status: "delivered",
    type: "customer",
  },
  {
    id: "SB10482541",
    customer: "Mehedi Hasan",
    email: "mehedi.hasan@gmail.com",
    date: "16 Oct 2026",
    items: 3,
    total: 2290,
    payment: "Nagad",
    status: "delivered",
    type: "guest",
  },
  {
    id: "SB10482487",
    customer: "Ayesha Siddika",
    email: "ayesha.siddika@gmail.com",
    date: "15 Oct 2026",
    items: 2,
    total: 1340,
    payment: "Card",
    status: "delivered",
    type: "customer",
  },
  {
    id: "SB10482430",
    customer: "Imran Khan",
    email: "imran.khan@gmail.com",
    date: "14 Oct 2026",
    items: 6,
    total: 5870,
    payment: "bKash",
    status: "delivered",
    type: "guest",
  },
  {
    id: "SB10482376",
    customer: "Tasnim Rahman",
    email: "tasnim.rahman@gmail.com",
    date: "13 Oct 2026",
    items: 1,
    total: 420,
    payment: "Cash on Delivery",
    status: "delivered",
    type: "customer",
  },
  {
    id: "SB10482319",
    customer: "Arif Chowdhury",
    email: "arif.chowdhury@gmail.com",
    date: "12 Oct 2026",
    items: 2,
    total: 1750,
    payment: "Nagad",
    status: "cancelled",
    type: "guest",
  },
];

const OrderPage = () => {
  const { confirm } = useConfirmation();
  const [search, setSearch] = useState("");

  const handleDelete = async (id: string) => {
    const confirmed = await confirm({
      title: "Are you sure?",
      description: "This action will delete this order permanently.",
    });

    if (confirmed) {
      console.log("delete order", id);
    }
  };

  const keyword = search.trim().toLowerCase();
  const orders = initialOrders.filter(
    (order) =>
      !keyword ||
      order.id.toLowerCase().includes(keyword) ||
      order.customer.toLowerCase().includes(keyword) ||
      order.email.toLowerCase().includes(keyword),
  );

  const headers = [
    "Order ID",
    "Customer",
    "Order Type",
    "Date",
    "Items",
    "Total",
    "Payment",
    "Status",
    "Action",
  ];

  return (
    <div>
      <NavTitle
        title="Orders"
        subTitle="Track and manage all customer orders."
      />

      <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
          <div className="w-full sm:w-64">
            <SearchBox onChange={(val) => setSearch(val)} />
          </div>
        </div>

        <CustomTable
          headers={headers}
          pagination={
            <div className="mt-4">
              <Pagination
                name="Orders"
                total={orders.length}
                page={1}
                per_page={10}
                onPageChange={() => {}}
              />
            </div>
          }
        >
          {orders.length > 0 ? (
            orders.slice(0, 10).map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium text-gray-900">
                  #{item.id}
                </TableCell>

                <TableCell>
                  <p className="font-medium text-gray-900">{item.customer}</p>
                  <p className="text-xs text-gray-500">{item.email}</p>
                </TableCell>

                <TableCell>
                  <Badge variant={item.type}>{orderTypes[item.type]}</Badge>
                </TableCell>

                <TableCell className="text-gray-700">{item.date}</TableCell>

                <TableCell className="text-gray-700">{item.items}</TableCell>

                <TableCell className="font-medium text-gray-900">
                  {helpers.currency(item.total)}
                </TableCell>

                <TableCell className="text-gray-700">{item.payment}</TableCell>

                <TableCell>
                  <div className="flex items-center">
                    <StatusChange id={item.id} status={item.status} rootStyle="flex items-center" />
                  </div>
                </TableCell>

                <TableCell>
                  <ul className="flex items-center gap-2">
                    <li>
                      <Link href={`/admin/order/${item.id}`}>
                        <PreviewBtn />
                      </Link>
                    </li>
                    <li>
                      <DeleteBtn onClick={() => handleDelete(item.id)} />
                    </li>
                  </ul>
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

export default OrderPage;
