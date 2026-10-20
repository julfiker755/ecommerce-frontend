"use client";
import React from "react";
import { Plus } from "lucide-react";
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

const initialCategories = [
  {
    id: 1,
    name: "Electronics",
    slug: "electronics",
    status: "ACTIVE",
    image:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=100&auto=format&fit=crop&q=80",
  },
  {
    id: 2,
    name: "Mobiles",
    slug: "mobiles",
    status: "ACTIVE",
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=100&auto=format&fit=crop&q=80",
  },
  {
    id: 3,
    name: "Featured",
    slug: "featured",
    status: "INACTIVE",
    image:
      "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=100&auto=format&fit=crop&q=80",
  },
  {
    id: 4,
    name: "Mobile Accessories",
    slug: "mobile-accessories",
    status: "ACTIVE",
    image:
      "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=100&auto=format&fit=crop&q=80",
  },
  {
    id: 5,
    name: "Power Bank",
    slug: "power-bank",
    status: "ACTIVE",
    image:
      "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=100&auto=format&fit=crop&q=80",
  },
  {
    id: 6,
    name: "Brands",
    slug: "brands",
    status: "ACTIVE",
    image:
      "https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?w=100&auto=format&fit=crop&q=80",
  },
];

const statusOptions = [
  { label: "All Status", value: "all" },
  { label: "Active", value: "ACTIVE" },
  { label: "Inactive", value: "INACTIVE" },
];

const CategoryPage = () => {
  const { confirm } = useConfirmation();

  const handleDelete = async (id: number) => {
    const confirmed = await confirm({
      title: "Are you sure?",
      description: "This action will delete this category permanently.",
    });

    if (confirmed) {
      console.log("delete category", id);
    }
  };

  const headers = ["Id", "Category Name", "Status", "Action"];

  return (
    <div>
      <NavTitle
        title="Categories"
        subTitle="Manage your product categories and organize your store."
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

            <Button className="px-5" onClick={() => console.log("add category")}>
              <Plus size={18} className="mr-1" /> Add Category
            </Button>
          </div>
        </div>

        <CustomTable
          headers={headers}
          pagination={
            <div className="mt-4">
              <Pagination
                name="Categories"
                total={20}
                page={1}
                per_page={10}
                onPageChange={() => {}}
              />
            </div>
          }
        >
          {initialCategories.length > 0 ? (
            initialCategories.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="text-gray-700">{item.id}</TableCell>

                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatars
                      src={item.image}
                      fallback={item.name}
                      alt={item.name}
                      fallbackStyle="avatar"
                    />
                    <div>
                      <p className="font-medium text-gray-900">{item.name}</p>
                      <p className="text-xs text-gray-500">{item.slug}</p>
                    </div>
                  </div>
                </TableCell>

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

                <TableCell>
                  <ul className="flex items-center gap-2">
                    <li>
                      <EditBtn onClick={() => console.log("edit category", item.id)} />
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
              title="No categories found"
              tdStyle="!bg-background"
            />
          )}
        </CustomTable>
      </div>
    </div>
  );
};

export default CategoryPage;
