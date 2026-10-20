"use client";
import { useState } from "react";
import Image from "next/image";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ImagePlus, X } from "lucide-react";
import NavTitle from "@/components/reuseable/nav-title";
import Form from "@/components/reuseable/from";
import { FromInput } from "@/components/reuseable/from-input";
import { FromTextArea } from "@/components/reuseable/from-textarea";
import { InputSelectField } from "@/components/reuseable/from-select";
import TextEditor from "@/components/reuseable/text-editor";
import ProductVariations, {
  type Variant,
  type Variation,
} from "@/components/common/admin/product-variations/product-variations";
import { Button, Label } from "@/components/ui";
import { product_Create } from "@/schema";
import { cn } from "@/lib/utils";

const categoryItems = [
  { label: "Electronics", value: "electronics" },
  { label: "Mobiles", value: "mobiles" },
  { label: "Mobile Accessories", value: "mobile-accessories" },
  { label: "Power Bank", value: "power-bank" },
];

const brandItems = [
  { label: "Samsung", value: "samsung" },
  { label: "SONY", value: "sony" },
  { label: "NOKIA", value: "nokia" },
  { label: "LG", value: "lg" },
];

const stockStatusItems = [
  { label: "In Stock", value: "in_stock" },
  { label: "Out of Stock", value: "out_of_stock" },
];

const statusItems = [
  { label: "Active", value: "active" },
  { label: "Inactive", value: "inactive" },
];

export default function CreateProduct() {
  const [images, setImages] = useState<File[]>([]);
  const [variationData, setVariationData] = useState<{
    variations: Variation[];
    variants: Variant[];
    defaultVariant: string;
  }>({ variations: [], variants: [], defaultVariant: "" });
  const form = useForm({
    resolver: zodResolver(product_Create),
    defaultValues: {
      name: "",
      short_description: "",
      category: "",
      brand: "",
      description: "",
      purchase_price: "",
      selling_price: "",
      offer_price: "",
      stock: "",
      stock_status: "",
      status: "",
    },
  });

  const handleSubmit = (values: FieldValues) => {
    const variants = variationData.variants.map((variant, index) => ({
      ...variant,
      ...values.variants?.[index],
    }));
    console.log({ ...values, images, ...variationData, variants });
  };

  return (
    <>
      <NavTitle
        title="Add Product"
        subTitle="Create a new product for your store."
      />

      <Form from={form} onSubmit={handleSubmit}>
        <div className="grid gap-5 lg:grid-cols-[1fr_340px] lg:items-start">
          <div className="space-y-5">
          {/* ===== General ===== */}
          <div className="rounded-xl border border-gray-200 bg-white">
            <h2 className="border-b border-gray-200 px-5 py-4 text-lg font-semibold text-gray-900">
              General
            </h2>

            <div className="space-y-5 p-5">
              <FromInput
                label="Product Name"
                name="name"
                placeholder="e.g. LG gram Laptop - 13.3 inch Full HD Display"
              />

              <FromTextArea
                label="Short Description"
                name="short_description"
                placeholder="Write a short summary of the product"
                className="min-h-24 rounded-lg"
              />

              <div className="grid gap-5 sm:grid-cols-2">
                <InputSelectField
                  label="Category"
                  name="category"
                  placeholder="Select category"
                  items={categoryItems}
                />
                <InputSelectField
                  label="Brand"
                  name="brand"
                  placeholder="Select brand"
                  items={brandItems}
                />
              </div>

              <div className="pt-4 border-t border-gray-100 space-y-2">
                <label className="text-base font-semibold text-gray-800 block">
                  Description
                </label>
                <TextEditor
                  value={form.watch("description") || ""}
                  onChange={(val) => {
                    form.setValue("description", val);
                  }}
                />
              </div>
            </div>
          </div>

          {/* ===== Variations & Variants ===== */}
          <ProductVariations onChange={setVariationData} />
          </div>

          <div className="space-y-5">
            {/* ===== Media ===== */}
            <MediaBox images={images} setImages={setImages} />
            {/* ===== Pricing & Inventory ===== */}
            <div className="rounded-xl border border-gray-200 bg-white">
              <h2 className="border-b border-gray-200 px-5 py-4 text-lg font-semibold text-gray-900">
                Pricing & Inventory
              </h2>
              <div className="space-y-5 p-5">
                <FromInput
                  label="Purchase Price"
                  name="purchase_price"
                  type="number"
                  placeholder="e.g. 25"
                />
                <FromInput
                  label="Selling Price"
                  name="selling_price"
                  type="number"
                  placeholder="e.g. 40"
                />
                <FromInput
                  label="Offer / Discount Price"
                  name="offer_price"
                  type="number"
                  placeholder="e.g. 30"
                />
                <FromInput
                  label="Stock Quantity"
                  name="stock"
                  type="number"
                  placeholder="e.g. 50"
                />
                <InputSelectField
                  label="Stock Status"
                  name="stock_status"
                  placeholder="Select stock status"
                  items={stockStatusItems}
                />
                <InputSelectField
                  label="Status"
                  name="status"
                  placeholder="Select status"
                  items={statusItems}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="sticky bottom-0 mt-5 flex justify-end border-t border-gray-200 bg-white px-5 py-4">
          <Button type="submit" size="lg" className="px-8">
            Save & Exit
          </Button>
        </div>
      </Form>
    </>
  );
}

function MediaBox({
  images,
  setImages,
}: {
  images: File[];
  setImages: React.Dispatch<React.SetStateAction<File[]>>;
}) {
  const handleAdd = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    setImages((prev) => [...prev, ...files]);
    e.target.value = "";
  };

  const handleRemove = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white">
      <h2 className="border-b border-gray-200 px-5 py-4 text-lg font-semibold text-gray-900">
        Media
      </h2>

      <div className="grid grid-cols-3 gap-2.5 p-4">
        {images.map((file, index) => (
          <div
            key={`${file.name}-${index}`}
            className={cn(
              "relative aspect-square overflow-hidden rounded-lg border border-gray-200 bg-white",
              index === 0 && "col-span-2 row-span-2",
            )}
          >
            <Image
              src={URL.createObjectURL(file)}
              alt={file.name}
              fill
              unoptimized
              className="object-contain p-2"
            />
            <button
              type="button"
              aria-label="Remove image"
              onClick={() => handleRemove(index)}
              className="absolute right-1.5 top-1.5 cursor-pointer text-gray-400 hover:text-red-500"
            >
              <X size={16} />
            </button>
          </div>
        ))}

        <label className="grid aspect-square cursor-pointer place-items-center rounded-lg border-2 border-dashed border-gray-300 text-gray-300 hover:border-primary hover:text-primary">
          <ImagePlus size={36} strokeWidth={1.5} />
          <input
            type="file"
            accept="image/*"
            multiple
            hidden
            onChange={handleAdd}
          />
        </label>
      </div>
    </div>
  );
}
