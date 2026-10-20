"use client";
import React from "react";
import { ImageIcon, Plus } from "lucide-react";
import NavTitle from "@/components/reuseable/nav-title";
import {
  Button,
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
import Avatars from "@/components/reuseable/avater";
import { DeleteBtn, EditBtn } from "@/components/reuseable/btn";
import useConfirmation from "@/context/delete-modal";

const initialBrands = [
  {
    id: 20,
    name: "Bose",
    logo: "",
    status: "ACTIVE",
    created: "2 years ago",
  },
  {
    id: 19,
    name: "NOKIA",
    logo: "https://cdn.simpleicons.org/nokia",
    status: "ACTIVE",
    created: "6 years ago",
  },
  {
    id: 18,
    name: "SONY",
    logo: "https://cdn.simpleicons.org/sony",
    status: "ACTIVE",
    created: "6 years ago",
  },
  {
    id: 17,
    name: "NIKE",
    logo: "https://cdn.simpleicons.org/nike",
    status: "ACTIVE",
    created: "6 years ago",
  },
  {
    id: 16,
    name: "Samsung",
    logo: "https://cdn.simpleicons.org/samsung",
    status: "ACTIVE",
    created: "6 years ago",
  },
  {
    id: 15,
    name: "Adidas",
    logo: "https://cdn.simpleicons.org/adidas",
    status: "INACTIVE",
    created: "7 years ago",
  },
];

const statusOptions = [
  { label: "All Status", value: "all" },
  { label: "Active", value: "ACTIVE" },
  { label: "Inactive", value: "INACTIVE" },
];

const BrandPage = () => {
  const { confirm } = useConfirmation();

  const handleDelete = async (id: number) => {
    const confirmed = await confirm({
      title: "Are you sure?",
      description: "This action will delete this brand permanently.",
    });

    if (confirmed) {
      console.log("delete brand", id);
    }
  };

  const headers = ["Id", "Logo", "Name", "Status", "Created", "Action"];

  return (
    <div>
      <NavTitle
        title="Brands"
        subTitle="Manage your product brands and their logos."
      />

      <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
          <div className="w-full sm:w-64">
            <SearchBox onChange={(val) => console.log(val)} />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <Select
              items={statusOptions}
              defaultValue="all"
              onValueChange={(val) => console.log(val)}
            >
              <SelectTrigger className="min-w-36">
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

            <Button className="px-5" onClick={() => console.log("add brand")}>
              <Plus size={18} className="mr-1" /> Add Brand
            </Button>
          </div>
        </div>

        <CustomTable
          headers={headers}
          pagination={
            <div className="mt-4">
              <Pagination
                name="Brands"
                total={20}
                page={1}
                per_page={10}
                onPageChange={() => {}}
              />
            </div>
          }
        >
          {initialBrands.length > 0 ? (
            initialBrands.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="text-gray-700">{item.id}</TableCell>

                <TableCell>
                  {item.logo ? (
                    <Avatars
                      src={item.logo}
                      fallback={item.name}
                      alt={item.name}
                      className="size-14 2xl:size-14 rounded-lg border border-gray-200 bg-white p-3"
                      imgstyle="object-contain"
                      fallbackStyle="rounded-lg"
                    />
                  ) : (
                    <span className="grid size-14 place-items-center rounded-lg border border-gray-200 bg-white text-gray-300">
                      <ImageIcon size={22} />
                    </span>
                  )}
                </TableCell>

                <TableCell className="font-medium text-gray-900">{item.name}</TableCell>

                <TableCell>
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                      item.status === "ACTIVE"
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {item.status === "ACTIVE" ? "Active" : "Inactive"}
                  </span>
                </TableCell>

                <TableCell className="text-gray-700">{item.created}</TableCell>

                <TableCell>
                  <ul className="flex items-center gap-2">
                    <li>
                      <EditBtn onClick={() => console.log("edit brand", item.id)} />
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
              title="No brands found"
              tdStyle="!bg-background"
            />
          )}
        </CustomTable>
      </div>
    </div>
  );
};

export default BrandPage;
