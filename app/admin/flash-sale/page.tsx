"use client";
import React, { useState } from "react";
import Link from "next/link";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Plus, Zap } from "lucide-react";
import NavTitle from "@/components/reuseable/nav-title";
import Form from "@/components/reuseable/from";
import { FromInput } from "@/components/reuseable/from-input";
import { InputSelectField } from "@/components/reuseable/from-select";
import { CustomTable } from "@/components/reuseable/table";
import { TableNoItem } from "@/components/reuseable/table-no-item";
import Avatars from "@/components/reuseable/avater";
import { DeleteBtn } from "@/components/reuseable/btn";
import sonner from "@/components/reuseable/sonner";
import useConfirmation from "@/context/delete-modal";
import { Button, TableCell, TableRow } from "@/components/ui";
import { discountPercent, products } from "@/lib/data";
import { helpers } from "@/lib/helpers";
import { flash_Sale_Setting } from "@/schema";

const statusItems = [
  { label: "Active", value: "active" },
  { label: "Inactive", value: "inactive" },
];

// ===== Dummy data (same as landing flash sale) =====
const initialFlashProducts = products
  .filter((p) => p.oldPrice)
  .slice(0, 5)
  .map((p) => ({
    id: p.id,
    name: p.name,
    image: p.image,
    regular_price: p.oldPrice as number,
    flash_price: p.price,
  }));

const FlashSalePage = () => {
  const { confirm } = useConfirmation();
  const [flashProducts, setFlashProducts] = useState(initialFlashProducts);
  const [isLoading, setIsLoading] = useState(false);

  // ===== Flash sale settings =====
  const settingForm = useForm({
    resolver: zodResolver(flash_Sale_Setting),
    defaultValues: {
      start_at: "2026-10-21T00:00",
      end_at: "2026-10-21T23:59",
      status: "active",
    },
  });

  const handleSetting = async (values: FieldValues) => {
    setIsLoading(true);
    // TODO: connect flash sale setting API
    console.log(values);
    await new Promise((r) => setTimeout(r, 600));
    setIsLoading(false);
    sonner.success("Flash sale updated", "Flash sale time and status saved.");
  };

  const handleDelete = async (id: number) => {
    const confirmed = await confirm({
      title: "Are you sure?",
      description: "This product will be removed from the flash sale.",
    });

    if (confirmed) {
      console.log("remove flash sale product", id);
      setFlashProducts((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const headers = ["Product", "Regular Price", "Flash Price", "Discount", "Action"];

  return (
    <div className="space-y-5">
      <NavTitle
        title="Flash Sale"
        subTitle="Set flash sale time and choose products for today’s deals."
      />

      {/* ===== Settings ===== */}
      <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-xs">
        <div className="mb-5 flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-lg bg-accent/10 text-accent">
            <Zap size={20} className="fill-current" />
          </span>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Flash Sale Settings</h2>
            <p className="text-sm text-gray-500">Countdown on the homepage ends at the end time.</p>
          </div>
        </div>

        <Form from={settingForm} onSubmit={handleSetting}>
          <div className="grid items-start gap-5 md:grid-cols-2 xl:grid-cols-[1fr_1fr_1fr_auto]">
            <FromInput label="Start Time" name="start_at" type="datetime-local" />
            <FromInput label="End Time" name="end_at" type="datetime-local" />
            <InputSelectField
              label="Status"
              name="status"
              placeholder="Select status"
              items={statusItems}
            />
            <Button disabled={isLoading} type="submit" className="h-11 px-8 xl:mt-7">
              {isLoading ? <Loader2 className="animate-spin" /> : null}
              {isLoading ? "Saving…" : "Save"}
            </Button>
          </div>
        </Form>
      </div>

      {/* ===== Products ===== */}
      <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Flash Sale Products <span className="text-gray-500">({flashProducts.length})</span>
          </h2>
          <Button className="px-5" nativeButton={false} render={<Link href="/admin/flash-sale/create" />}>
            <Plus size={18} className="mr-1" /> Add Product
          </Button>
        </div>

        <CustomTable headers={headers}>
          {flashProducts.length > 0 ? (
            flashProducts.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatars
                      src={item.image}
                      fallback={item.name}
                      alt={item.name}
                      className="size-12 2xl:size-12 rounded-lg border border-gray-200"
                      imgstyle="object-cover"
                      fallbackStyle="rounded-lg"
                    />
                    <span className="max-w-56 truncate font-medium text-gray-900">{item.name}</span>
                  </div>
                </TableCell>

                <TableCell className="text-gray-500 line-through">
                  {helpers.currency(item.regular_price)}
                </TableCell>

                <TableCell className="font-semibold text-gray-900">
                  {helpers.currency(item.flash_price)}
                </TableCell>

                <TableCell>
                  <span className="rounded-full bg-sale/10 px-2.5 py-1 text-xs font-semibold text-sale">
                    -{discountPercent(item.flash_price, item.regular_price)}%
                  </span>
                </TableCell>

                <TableCell>
                  <DeleteBtn onClick={() => handleDelete(item.id)} />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableNoItem
              colSpan={headers.length}
              title="No flash sale products"
              tdStyle="!bg-background"
            />
          )}
        </CustomTable>
      </div>

    </div>
  );
};

export default FlashSalePage;
