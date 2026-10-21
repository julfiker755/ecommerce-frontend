"use client";
import React, { useMemo, useState } from "react";
import { ChevronRight, Plus } from "lucide-react";
import NavTitle from "@/components/reuseable/nav-title";
import {
  Button,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui";
import { TableNoItem } from "@/components/reuseable/table-no-item";
import { Pagination } from "@/components/reuseable/pagination";
import SearchBox from "@/components/reuseable/search-box";
import Avatars from "@/components/reuseable/avater";
import { DeleteBtn, EditBtn } from "@/components/reuseable/btn";
import useConfirmation from "@/context/delete-modal";
import { cn } from "@/lib/utils";

type Category = {
  id: number;
  name: string;
  slug: string;
  status: string;
  image: string;
  children?: Category[];
};

const img = (id: string) =>
  `https://images.unsplash.com/photo-${id}?w=100&auto=format&fit=crop&q=80`;

const initialCategories: Category[] = [
  {
    id: 1,
    name: "Electronics",
    slug: "electronics",
    status: "ACTIVE",
    image: img("1496181133206-80ce9b88a853"),
    children: [
      { id: 2, name: "Mobiles", slug: "mobiles", status: "ACTIVE", image: img("1511707171634-5f897ff02aa9") },
      { id: 3, name: "Laptops", slug: "laptops", status: "ACTIVE", image: img("1517336714731-489689fd1ca8") },
      {
        id: 4,
        name: "Accessories",
        slug: "accessories",
        status: "ACTIVE",
        image: img("1505740420928-5e560c06d30e"),
        children: [
          { id: 5, name: "Chargers", slug: "chargers", status: "ACTIVE", image: img("1609091839311-d5365f9ff1c5") },
          { id: 6, name: "Cables", slug: "cables", status: "ACTIVE", image: img("1606220588913-b3aacb4d2f46") },
          { id: 7, name: "Screen Protectors", slug: "screen-protectors", status: "ACTIVE", image: img("1592750475338-74b7b21085ab") },
        ],
      },
    ],
  },
  {
    id: 8,
    name: "Fashion",
    slug: "fashion",
    status: "ACTIVE",
    image: img("1521572163474-6864f9cf17ab"),
    children: [
      { id: 9, name: "T-Shirts", slug: "t-shirts", status: "ACTIVE", image: img("1583743814966-8936f5b7be1a") },
      { id: 10, name: "Jackets", slug: "jackets", status: "ACTIVE", image: img("1551028719-00167b16eac5") },
    ],
  },
  {
    id: 11,
    name: "Home & Kitchen",
    slug: "home-kitchen",
    status: "ACTIVE",
    image: img("1474979266404-7eaacbcd87c5"),
    children: [
      { id: 12, name: "Oil & Ghee", slug: "oil-ghee", status: "ACTIVE", image: img("1474979266404-7eaacbcd87c5") },
    ],
  },
  {
    id: 13,
    name: "Beauty & Health",
    slug: "beauty-health",
    status: "ACTIVE",
    image: img("1471943311424-646960669fbc"),
    children: [
      { id: 14, name: "Honey", slug: "honey", status: "ACTIVE", image: img("1558642452-9d2a7deb7f62") },
    ],
  },
  { id: 15, name: "Sports & Outdoors", slug: "sports-outdoors", status: "ACTIVE", image: img("1608043152269-423dbba4e7e1") },
  { id: 16, name: "Toys & Baby", slug: "toys-baby", status: "INACTIVE", image: img("1526170375885-4d8ecf77b99f") },
];

const statusOptions = [
  { label: "All Status", value: "all" },
  { label: "Active", value: "ACTIVE" },
  { label: "Inactive", value: "INACTIVE" },
];

type Row = Category & {
  level: number;
  parent: string;
  isLast: boolean;
  // one entry per ancestor level: does that branch continue below this row?
  guides: boolean[];
};

// tree -> visible rows (children only of open parents)
const flatten = (
  list: Category[],
  expanded: number[],
  level = 0,
  parent = "",
  guides: boolean[] = []
): Row[] =>
  list.flatMap((item, index) => {
    const isLast = index === list.length - 1;
    const row: Row = { ...item, level, parent, isLast, guides };
    return item.children && expanded.includes(item.id)
      ? [row, ...flatten(item.children, expanded, level + 1, item.name, [...guides, !isLast])]
      : [row];
  });

const CategoryPage = () => {
  const { confirm } = useConfirmation();
  // parent ids that are open
  const [expanded, setExpanded] = useState<number[]>([1, 4]);

  const toggle = (id: number) =>
    setExpanded((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));

  const rows = useMemo(() => flatten(initialCategories, expanded), [expanded]);

  const handleDelete = async (id: number) => {
    const confirmed = await confirm({
      title: "Are you sure?",
      description: "This action will delete this category permanently.",
    });

    if (confirmed) {
      console.log("delete category", id);
    }
  };

  const headers = ["Category", "Parent Category", "Status", "Action"];

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

        <Table className="border-separate border-spacing-y-3 my-0">
          <TableHeader className="translate-y-1">
            <TableRow className="text-[15px] hover:bg-transparent font-semibold border-none">
              {headers.map((header) => (
                <TableHead key={header} className="normal-case">
                  <h5 className="w-max text-gray-700 capitalize font-semibold px-1">{header}</h5>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody className="[&>tr>td]:bg-admin [&>tr>td]:border-y [&>tr>td]:border-border [&>tr>td]:first:border-l [&>tr>td]:first:border-border [&>tr>td]:first:pl-5 [&>tr>td]:first:rounded-l-lg [&>tr>td]:last:border-r [&>tr>td]:last:border-border [&>tr>td]:last:rounded-r-lg [&>tr>td]:last:w-[180px]">
              {rows.length > 0 ? (
                rows.map((item) => {
                  const isOpen = expanded.includes(item.id);
                  const hasChildren = !!item.children?.length;
                  return (
                    <TableRow key={item.id}>
                      <TableCell className="py-0">
                        <div className="flex min-h-16 items-stretch">
                          {/* ancestor guide lines (stretch through the row gap) */}
                          {item.guides.map((show, i) => (
                            <span key={i} className="relative w-6 shrink-0">
                              {show && <span className="absolute -inset-y-3.5 left-3 border-l border-gray-300" />}
                            </span>
                          ))}

                          {/* elbow line for sub items */}
                          {item.level > 0 && (
                            <span className="relative w-6 shrink-0">
                              <span
                                className={cn(
                                  "absolute left-3 -top-3.5 border-l border-gray-300",
                                  item.isLast ? "h-[calc(50%+0.875rem)]" : "-bottom-3.5"
                                )}
                              />
                              <span className="absolute left-3 top-1/2 w-3 border-t border-gray-300" />
                            </span>
                          )}

                          <div className="flex items-center gap-2 py-2.5">
                            {hasChildren ? (
                              <button
                                type="button"
                                aria-label={isOpen ? "Collapse" : "Expand"}
                                aria-expanded={isOpen}
                                onClick={() => toggle(item.id)}
                                className="grid size-6 shrink-0 cursor-pointer place-items-center rounded-md text-gray-500 hover:bg-gray-200"
                              >
                                <ChevronRight
                                  size={16}
                                  className={cn("transition-transform", isOpen && "rotate-90")}
                                />
                              </button>
                            ) : (
                              <span className="size-6 shrink-0" />
                            )}
                            <Avatars
                              src={item.image}
                              fallback={item.name}
                              alt={item.name}
                              className={cn("rounded-lg", item.level > 0 && "size-9 2xl:size-9")}
                              imgstyle="object-cover"
                              fallbackStyle="rounded-lg"
                            />
                            <div>
                              <p className={cn("text-gray-900", item.level === 0 ? "font-semibold" : "font-medium")}>
                                {item.name}
                                {hasChildren && (
                                  <span className="ml-1.5 text-xs font-normal text-gray-500">
                                    ({item.children?.length})
                                  </span>
                                )}
                              </p>
                              <p className="text-xs text-gray-500">{item.slug}</p>
                            </div>
                          </div>
                        </div>
                      </TableCell>

                      <TableCell className="text-gray-700">{item.parent || "—"}</TableCell>

                      <TableCell>
                        <StatusBadge status={item.status} />
                      </TableCell>

                      <TableCell>
                        <ul className="flex items-center gap-2">
                          <li>
                            <EditBtn onClick={() => console.log("edit category", item.id)} />
                          </li>
                          <li>
                            <DeleteBtn onClick={() => handleDelete(item.id)} />
                          </li>
                          <li>
                            <Button
                              title="Add subcategory"
                              aria-label="Add subcategory"
                              className="border border-border bg-transparent size-10 text-gray-700 hover:bg-gray-50"
                              onClick={() => console.log("add subcategory under", item.id)}
                            >
                              <Plus size={18} />
                            </Button>
                          </li>
                        </ul>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableNoItem colSpan={headers.length} title="No categories found" tdStyle="!bg-background" />
              )}
          </TableBody>
        </Table>

        <div className="mt-4">
          <Pagination
            name="Categories"
            total={initialCategories.length}
            page={1}
            per_page={10}
            onPageChange={() => {}}
          />
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;

// ===== Small UI pieces =====
function StatusBadge({ status }: { status: string }) {
  const active = status === "ACTIVE";
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium",
        active ? "bg-emerald-50 text-emerald-700" : "bg-gray-100 text-gray-600"
      )}
    >
      <span className={cn("size-1.5 rounded-full", active ? "bg-emerald-500" : "bg-gray-400")} />
      {active ? "Active" : "Inactive"}
    </span>
  );
}
