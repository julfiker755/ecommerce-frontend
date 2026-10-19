"use client";
import React, { useState } from "react";
import Link from "next/link";
import { CircleCheck, Package, Plus, TriangleAlert } from "lucide-react";
import NavTitle from "@/components/reuseable/nav-title";
import { Button, TableCell, TableRow } from "@/components/ui";
import { CustomTable } from "@/components/reuseable/table";
import { TableNoItem } from "@/components/reuseable/table-no-item";
import { Pagination } from "@/components/reuseable/pagination";
import SearchBox from "@/components/reuseable/search-box";
import Avatars from "@/components/reuseable/avater";
import { DeleteBtn, OrderBtn, PreviewBtn } from "@/components/reuseable/btn";
import useConfirmation from "@/context/delete-modal";
import sonner from "@/components/reuseable/sonner";

const initialProducts = [
  {
    id: 1,
    name: "Baby shoes",
    price: "$20",
    offer: "25% OFF",
    purchased: 61,
    stock: 5421,
    status: "ACTIVE",
    date: "2021-10-30",
    avatar:
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=100&auto=format&fit=crop&q=80",
  },
  {
    id: 2,
    name: "Full Sleeve Cap T-Shirt",
    price: "$40",
    offer: "30% OFF",
    purchased: 80,
    stock: 621,
    status: "ACTIVE",
    date: "2021-10-30",
    avatar:
      "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=100&auto=format&fit=crop&q=80",
  },
  {
    id: 3,
    name: "Full Sleeve T-Shirt",
    price: "$30",
    offer: "30% OFF",
    purchased: 100,
    stock: 621,
    status: "ACTIVE",
    date: "2021-10-30",
    avatar:
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=100&auto=format&fit=crop&q=80",
  },
  {
    id: 4,
    name: "Round Cap with Belt",
    price: "$10",
    offer: "30% OFF",
    purchased: 250,
    stock: 621,
    status: "ACTIVE",
    date: "2021-10-30",
    avatar:
      "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=100&auto=format&fit=crop&q=80",
  },
  {
    id: 5,
    name: "Purse For Woman",
    price: "$20",
    offer: "30% OFF",
    purchased: 220,
    stock: 621,
    status: "ACTIVE",
    date: "2021-10-30",
    avatar:
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=100&auto=format&fit=crop&q=80",
  },
  {
    id: 6,
    name: "Doctor Kit for Kids",
    price: "$30",
    offer: "20% OFF",
    purchased: 120,
    stock: 621,
    status: "ACTIVE",
    date: "2021-10-30",
    avatar:
      "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=100&auto=format&fit=crop&q=80",
  },
  {
    id: 7,
    name: "Shirt For Men",
    price: "$40",
    offer: "30% OFF",
    purchased: 550,
    stock: 621,
    status: "ACTIVE",
    date: "2021-10-30",
    avatar:
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=100&auto=format&fit=crop&q=80",
  },
  {
    id: 8,
    name: "Digital Watch",
    price: "$120",
    offer: "80% OFF",
    purchased: 250,
    stock: 621,
    status: "ACTIVE",
    date: "2021-10-30",
    avatar:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&auto=format&fit=crop&q=80",
  },
];

const stats = [
  {
    label: "Total Products",
    value: 14,
    icon: Package,
    style: "bg-violet-50 text-violet-600",
  },
  {
    label: "Active",
    value: 14,
    icon: CircleCheck,
    style: "bg-emerald-50 text-emerald-600",
  },
  {
    label: "Out of Stock",
    value: 0,
    icon: TriangleAlert,
    style: "bg-rose-50 text-rose-600",
  },
  {
    label: "Low Stock (<50)",
    value: 5,
    icon: TriangleAlert,
    style: "bg-amber-50 text-amber-600",
  },
];

const ProductListPage = () => {
  const { confirm } = useConfirmation();

  const handleDelete = async (id: number) => {
    const confirmed = await confirm({
      title: "Are you sure?",
      description: "This action will delete this product permanently.",
    });

    if (confirmed) {
    }
  };

  const headers = ["Product", "Price", "Stock", "Status", "Action"];

  return (
    <div>
      <NavTitle
        title="Product"
        subTitle="Manage store products, pricing, stock, and catalog items."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-5">
        {stats.map(({ label, value, icon: Icon, style }) => (
          <div
            key={label}
            className="flex items-center gap-4 bg-white border border-gray-200 rounded-xl p-4"
          >
            <span
              className={`grid size-12 shrink-0 place-items-center rounded-xl ${style}`}
            >
              <Icon size={20} />
            </span>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 leading-tight">
                {value}
              </h3>
              <p className="text-sm text-gray-500">{label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
          <div className="w-full sm:w-64">
            <SearchBox onChange={(val) => console.log(val)} />
          </div>

          <Link href="/admin/product/add">
            <Button className="px-5">
              <Plus size={18} className="mr-1" /> Add Product
            </Button>
          </Link>
        </div>

        <CustomTable
          headers={headers}
          pagination={
            <div className="mt-4">
              <Pagination
                name="Products"
                total={20}
                page={1}
                per_page={10}
                onPageChange={() => {}}
              />
            </div>
          }
        >
          {initialProducts.length > 0 ? (
            initialProducts.slice(0, 10).map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatars
                      src={item.avatar}
                      fallback={item.name}
                      alt={item.name}
                      fallbackStyle="avatar"
                    />
                    <span>{item.name}</span>
                  </div>
                </TableCell>

                <TableCell className="text-gray-900 font-medium">
                  {item.price}
                </TableCell>

                <TableCell className="text-gray-700">{item.stock}</TableCell>

                <TableCell className="text-gray-700">active</TableCell>

                <TableCell>
                  <ul className="flex items-center gap-2">
                    <li>
                      <Link href={`/admin/order/${item.id}`}>
                        <OrderBtn />
                      </Link>
                    </li>
                    <li>
                      <Link
                        href={`/admin/product/details/${item.id}`}
                        className="hover:text-primary hover:underline"
                      >
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
              title="No products found"
              tdStyle="!bg-background"
            />
          )}
        </CustomTable>
      </div>
    </div>
  );
};

export default ProductListPage;
