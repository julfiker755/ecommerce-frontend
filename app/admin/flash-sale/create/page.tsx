"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FieldValues, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, PackageSearch, Search, Zap } from "lucide-react";
import NavTitle from "@/components/reuseable/nav-title";
import Form from "@/components/reuseable/from";
import { FromInput } from "@/components/reuseable/from-input";
import { RatingScore } from "@/components/reuseable/rating";
import sonner from "@/components/reuseable/sonner";
import {
  Badge,
  Button,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui";
import { products } from "@/lib/data";
import { helpers } from "@/lib/helpers";
import { cn } from "@/lib/utils";
import { flash_Sale_Product } from "@/schema";

const productItems = products.map((p) => ({ label: `#${p.id} — ${p.name}`, value: String(p.id) }));

export default function FlashSaleCreate() {
  const router = useRouter();
  const [productId, setProductId] = useState<string | null>(null);
  const [searchId, setSearchId] = useState("");
  const [searchError, setSearchError] = useState("");
  const [activeImage, setActiveImage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm({
    resolver: zodResolver(flash_Sale_Product),
    defaultValues: {
      discount: "",
    },
  });

  const product = products.find((p) => String(p.id) === productId);
  const discount = Number(useWatch({ control: form.control, name: "discount" })) || 0;
  const price = product?.price ?? 0;
  const discountAmount = Math.round((price * Math.min(Math.max(discount, 0), 99)) / 100);
  const flashPrice = price - discountAmount;

  const selectProduct = (id: string | null) => {
    setProductId(id);
    setActiveImage(0);
    setSearchError("");
    form.reset();
  };

  const handleSearch = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const id = searchId.trim().replace("#", "");
    if (!id) return;
    if (products.some((p) => String(p.id) === id)) {
      selectProduct(id);
    } else {
      setSearchError(`No product found with ID #${id}`);
    }
  };

  const handleSubmit = async (values: FieldValues) => {
    if (!product) return;
    setIsLoading(true);
    // TODO: connect add flash sale product API
    console.log({
      product_id: product.id,
      discount: Number(values.discount),
      discount_amount: discountAmount,
      flash_price: flashPrice,
    });
    await new Promise((r) => setTimeout(r, 600));
    setIsLoading(false);
    sonner.success("Product added", `${product.name} added to flash sale.`);
    router.push("/admin/flash-sale");
  };

  return (
    <div className="space-y-5">
      <NavTitle title="Add Flash Sale Product" subTitle="Find a product and set its flash sale discount." />

      {/* ===== Find product ===== */}
      <Card title="Select Product">
        <div className="grid gap-4 md:grid-cols-[280px_1fr]">
          <form onSubmit={handleSearch}>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <Input
                  value={searchId}
                  onChange={(e) => setSearchId(e.target.value)}
                  placeholder="Search by product ID"
                  className="h-10 pl-9"
                />
              </div>
              <Button type="submit" className="h-10">
                Search
              </Button>
            </div>
            {searchError && <p className="pt-1 text-sm text-[#f73f4e]">{searchError}</p>}
          </form>

          <Select items={productItems} value={productId} onValueChange={(val) => selectProduct(val as string | null)}>
            <SelectTrigger className="h-10 w-full rounded-lg border border-gray-300 px-3">
              <SelectValue placeholder="Or select a product" />
            </SelectTrigger>
            <SelectContent>
              {productItems.map((o) => (
                <SelectItem key={o.value} value={o.value}>
                  {o.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </Card>

      {!product ? (
        <div className="grid place-items-center rounded-xl border border-dashed border-gray-300 bg-white py-20 text-center">
          <PackageSearch size={48} strokeWidth={1.25} className="text-gray-300" />
          <p className="mt-4 font-medium text-gray-700">No product selected</p>
          <p className="text-sm text-gray-500">Search by ID or choose a product to see its details.</p>
        </div>
      ) : (
        <div className="grid gap-5 lg:grid-cols-[1fr_360px] lg:items-start">
          {/* ===== Left: product information ===== */}
          <div className="space-y-5">
            <Card title="General">
              <div className="grid gap-5 sm:grid-cols-[220px_1fr]">
                <div className="space-y-2">
                  <div className="relative aspect-square overflow-hidden rounded-lg border border-gray-200 bg-white">
                    <Image
                      src={product.gallery[activeImage] ?? product.image}
                      alt={product.name}
                      fill
                      sizes="220px"
                      className="object-cover"
                    />
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {product.gallery.map((src, index) => (
                      <button
                        key={src}
                        type="button"
                        aria-label={`Show image ${index + 1}`}
                        onClick={() => setActiveImage(index)}
                        className={cn(
                          "relative aspect-square cursor-pointer overflow-hidden rounded-md border bg-white",
                          index === activeImage ? "border-primary ring-2 ring-primary/20" : "border-gray-200"
                        )}
                      >
                        <Image src={src} alt="" fill sizes="60px" className="object-cover" />
                      </button>
                    ))}
                  </div>
                </div>

                <dl className="grid h-fit gap-5 sm:grid-cols-2">
                  <Info label="Product Name" value={product.name} className="sm:col-span-2" />
                  <Info label="Product ID" value={`#${product.id}`} />
                  <Info label="SKU" value={product.sku} />
                  <Info label="Category" value={<span className="capitalize">{product.category}</span>} />
                  <Info label="Brand" value={product.brand} />
                  <Info label="Origin" value={product.origin} />
                  <Info
                    label="Rating"
                    value={
                      <span className="flex items-center gap-2">
                        <RatingScore value={product.rating} width={80} />
                        <span className="text-xs text-gray-500">({product.reviews})</span>
                      </span>
                    }
                  />
                  <Info label="Short Description" value={product.shortDescription} className="sm:col-span-2" />
                </dl>
              </div>
            </Card>

            <Card title="Description">
              <div className="space-y-3 text-sm text-gray-700">
                {product.description.map((text) => (
                  <p key={text}>{text}</p>
                ))}
              </div>
              {product.features.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {product.features.map((feature) => (
                    <Badge key={feature} variant="outline" className="py-1">
                      {feature}
                    </Badge>
                  ))}
                </div>
              )}
            </Card>

            <Card title="Pricing & Inventory">
              <dl className="space-y-3">
                <Row label="Selling Price" value={helpers.currency(product.price)} />
                <Row
                  label="Regular Price (MRP)"
                  value={product.oldPrice ? helpers.currency(product.oldPrice) : "—"}
                />
                <Row label="Stock Quantity" value={product.stock} />
                <Row
                  label="Stock Status"
                  value={
                    <Badge variant={product.stock > 0 ? "success" : "destructive"}>
                      {product.stock > 0 ? "In Stock" : "Out of Stock"}
                    </Badge>
                  }
                />
              </dl>
            </Card>
          </div>

          {/* ===== Right: flash sale form ===== */}
          <div className="lg:sticky lg:top-4">
            <Card title="Flash Sale Discount">
              <Form from={form} className="space-y-5" onSubmit={handleSubmit}>
                <FromInput label="Discount (%)" name="discount" type="number" placeholder="e.g. 15" />

                <dl className="space-y-3 rounded-lg bg-gray-50 p-4">
                  <Row label="Selling Price" value={helpers.currency(price)} />
                  <Row
                    label={`Discount (${discount || 0}%)`}
                    value={<span className="text-sale">- {helpers.currency(discountAmount)}</span>}
                  />
                  <div className="flex items-center justify-between gap-3 pt-1">
                    <dt className="flex items-center gap-1.5 font-semibold text-gray-900">
                      <Zap size={16} className="fill-accent text-accent" /> Flash Price
                    </dt>
                    <dd className="text-xl font-bold text-gray-900">{helpers.currency(flashPrice)}</dd>
                  </div>
                </dl>

                <Button disabled={isLoading} type="submit" size="lg" className="h-11 w-full">
                  {isLoading ? <Loader2 className="animate-spin" /> : null}
                  {isLoading ? "Adding…" : "Add to Flash Sale"}
                </Button>
              </Form>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}

// ===== Small UI pieces =====
function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white">
      <h2 className="border-b border-gray-200 px-5 py-4 text-lg font-semibold text-gray-900">{title}</h2>
      <div className="p-5">{children}</div>
    </div>
  );
}

function Info({ label, value, className }: { label: string; value: React.ReactNode; className?: string }) {
  return (
    <div className={className}>
      <dt className="text-xs text-gray-500">{label}</dt>
      <dd className="mt-0.5 text-sm font-medium text-gray-900">{value}</dd>
    </div>
  );
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-gray-100 pb-3 last:border-0 last:pb-0">
      <dt className="text-sm text-gray-500">{label}</dt>
      <dd className="text-sm font-medium text-gray-900">{value}</dd>
    </div>
  );
}
