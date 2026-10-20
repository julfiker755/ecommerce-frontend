"use client";
import { Suspense, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { Package, Star } from "lucide-react";
import NavTitle from "@/components/reuseable/nav-title";
import { RatingScore } from "@/components/reuseable/rating";
import { QuillText } from "@/components/reuseable/text-editor";
import { CustomTable } from "@/components/reuseable/table";
import { Badge, TableCell, TableRow } from "@/components/ui";
import { helpers } from "@/lib/helpers";
import { cn } from "@/lib/utils";

// ===== Dummy data (same shape as the CreateProduct form) =====
const img = (id: string) =>
  `https://images.unsplash.com/${id}?w=800&auto=format&fit=crop&q=80`;

const product = {
  id: 1,
  name: 'LG gram Laptop - 13.3" Full HD Display, Intel 8th Gen Core i5, 8GB RAM, 256GB SSD',
  short_description:
    "Ultra-light 13.3 inch laptop with all-day battery, 8th Gen Core i5 processor and a fast 256GB SSD.",
  category: "Electronics",
  brand: "LG",
  description:
    "<p>The ultra-slim LG gram laptop with a 13.3-inch display combines portability and performance with up to 24.5 hours of battery life.</p><ul><li>Ultra-light weight, just over 2 pounds</li><li>Long lasting 72Wh battery</li><li>USB Type-C for faster data transfer</li></ul>",
  purchase_price: "85000",
  selling_price: "99000",
  offer_price: "94500",
  stock: "24",
  stock_status: "in_stock",
  status: "active",
  createdAt: "2026-10-12",
  images: [
    img("photo-1496181133206-80ce9b88a853"),
    img("photo-1517336714731-489689fd1ca8"),
    img("photo-1525547719571-a2d4ac8945e2"),
    img("photo-1593642632823-8f785ba67e45"),
  ],
  variations: [
    {
      id: 1,
      name: "Size",
      type: "text",
      values: [
        { id: 1, label: "L" },
        { id: 2, label: "XL" },
      ],
    },
    {
      id: 2,
      name: "Color",
      type: "color",
      values: [
        { id: 1, label: "Grey", color: "#9ca3af" },
        { id: 2, label: "Black", color: "#111827" },
      ],
    },
  ],
  defaultVariant: "L / Grey",
  variants: [
    { name: "L / Grey", enabled: true, purchase_price: "85000", selling_price: "99000", offer_price: "94500", stock: "10", stock_status: "in_stock" },
    { name: "L / Black", enabled: true, purchase_price: "85000", selling_price: "99000", offer_price: "", stock: "6", stock_status: "in_stock" },
    { name: "XL / Grey", enabled: true, purchase_price: "87000", selling_price: "101000", offer_price: "", stock: "8", stock_status: "in_stock" },
    { name: "XL / Black", enabled: false, purchase_price: "87000", selling_price: "101000", offer_price: "", stock: "0", stock_status: "out_of_stock" },
  ],
};

const reviews = [
  {
    id: 1,
    name: "Rahim Uddin",
    rating: 5,
    comment: "Very light and the battery easily lasts a full working day. Highly recommended!",
    variant: "L / Grey",
    date: "2026-10-15",
  },
  {
    id: 2,
    name: "Nusrat Jahan",
    rating: 4,
    comment: "Great display and build quality. The keyboard could be a bit better.",
    variant: "L / Black",
    date: "2026-10-11",
  },
  {
    id: 3,
    name: "Tanvir Ahmed",
    rating: 5,
    comment: "Fast SSD and boots in seconds. Delivery was quick too.",
    variant: "XL / Grey",
    date: "2026-10-06",
  },
  {
    id: 4,
    name: "Farhana Akter",
    rating: 3,
    comment: "Good laptop, but it gets a little warm under heavy use.",
    variant: "L / Grey",
    date: "2026-09-29",
  },
];

const stockLabel = (status: string) => (status === "in_stock" ? "In Stock" : "Out of Stock");
const money = (value: string) => (value ? helpers.currency(Number(value)) : "—");

export default function ProductDetailsPage() {
  return (
    <Suspense>
      <ProductDetails />
    </Suspense>
  );
}

function ProductDetails() {
  const { id } = useParams();
  const [activeImage, setActiveImage] = useState(0);

  const profit = Number(product.offer_price || product.selling_price) - Number(product.purchase_price);
  const averageRating = reviews.length
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
    : 0;
  const ratingBars = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter((r) => r.rating === star).length,
  }));

  return (
    <div className="space-y-5">
      <NavTitle title="Product Details" subTitle="View product information, pricing and variants." />

      <div className="grid gap-5 lg:grid-cols-[1fr_340px] lg:items-start">
        {/* ===== Left ===== */}
        <div className="space-y-5">
          <Card title="General">
            <dl className="grid gap-5 sm:grid-cols-2">
              <Info label="Product Name" value={product.name} className="sm:col-span-2" />
              <Info label="Category" value={product.category} />
              <Info label="Brand" value={product.brand} />
              <Info label="Short Description" value={product.short_description} className="sm:col-span-2" />
            </dl>
          </Card>

          <Card title="Description">
            <QuillText text={product.description} />
          </Card>

          <Card title="Variations">
            {product.variations.length ? (
              <ul className="divide-y divide-gray-100">
                {product.variations.map((variation) => (
                  <li key={variation.id} className="flex flex-col gap-2 py-3 first:pt-0 last:pb-0 sm:flex-row sm:items-center">
                    <div className="w-40 shrink-0">
                      <p className="font-medium text-gray-900">{variation.name}</p>
                      <p className="text-xs capitalize text-gray-500">{variation.type}</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {variation.values.map((value) => (
                        <Badge key={value.id} variant="outline" className="gap-1.5 py-1">
                          {"color" in value && (
                            <span
                              className="size-3 rounded-full border border-gray-200"
                              style={{ backgroundColor: value.color }}
                            />
                          )}
                          {value.label}
                        </Badge>
                      ))}
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-500">No variations added.</p>
            )}
          </Card>

          <Card title="Variants">
            <CustomTable headers={["Variant", "Purchase", "Selling", "Offer", "Stock", "Status"]}>
              {product.variants.map((variant) => (
                <TableRow key={variant.name} className={cn(!variant.enabled && "opacity-60")}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-900">{variant.name}</span>
                      {variant.name === product.defaultVariant && <Badge variant="secondary">Default</Badge>}
                      {!variant.enabled && <Badge variant="outline">Disabled</Badge>}
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-700">{money(variant.purchase_price)}</TableCell>
                  <TableCell className="font-medium text-gray-900">{money(variant.selling_price)}</TableCell>
                  <TableCell className="text-gray-700">{money(variant.offer_price)}</TableCell>
                  <TableCell className="text-gray-700">{variant.stock}</TableCell>
                  <TableCell>
                    <Badge variant={variant.stock_status === "in_stock" ? "success" : "destructive"}>
                      {stockLabel(variant.stock_status)}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </CustomTable>
          </Card>
        </div>

        {/* ===== Right ===== */}
        <div className="space-y-5">
          <Card title="Media">
            <div className="space-y-3">
              <div className="relative aspect-square overflow-hidden rounded-lg border border-gray-200 bg-white">
                <Image
                  src={product.images[activeImage]}
                  alt={product.name}
                  fill
                  sizes="340px"
                  className="object-contain p-3"
                />
              </div>
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((src, index) => (
                  <button
                    key={src}
                    type="button"
                    aria-label={`Show image ${index + 1}`}
                    onClick={() => setActiveImage(index)}
                    className={cn(
                      "relative aspect-square cursor-pointer overflow-hidden rounded-lg border bg-white",
                      index === activeImage ? "border-primary ring-2 ring-primary/20" : "border-gray-200"
                    )}
                  >
                    <Image src={src} alt="" fill sizes="80px" className="object-contain p-1" />
                  </button>
                ))}
              </div>
            </div>
          </Card>

          <Card title="Pricing & Inventory">
            <dl className="space-y-3">
              <Row label="Purchase Price" value={money(product.purchase_price)} />
              <Row label="Selling Price" value={money(product.selling_price)} />
              <Row label="Offer / Discount Price" value={money(product.offer_price)} />
              <Row
                label="Profit per item"
                value={<span className={profit >= 0 ? "text-emerald-600" : "text-red-600"}>{helpers.currency(profit)}</span>}
              />
              <Row label="Stock Quantity" value={product.stock} />
              <Row
                label="Stock Status"
                value={
                  <Badge variant={product.stock_status === "in_stock" ? "success" : "destructive"}>
                    {stockLabel(product.stock_status)}
                  </Badge>
                }
              />
              <Row
                label="Status"
                value={
                  <Badge variant={product.status === "active" ? "success" : "secondary"}>
                    {product.status === "active" ? "Active" : "Inactive"}
                  </Badge>
                }
              />
            </dl>
          </Card>

          <Card title="Product ID">
            <div className="flex items-center gap-3 text-sm">
              <Package size={18} className="text-gray-400" />
              <span className="font-medium text-gray-900">#{id}</span>
            </div>
          </Card>
        </div>
      </div>

      <Card title={`Reviews (${reviews.length})`}>
        {reviews.length ? (
          <div className="space-y-6">
            {/* summary */}
            <div className="grid gap-6 border-b border-gray-100 pb-6 sm:grid-cols-[160px_1fr] sm:items-center">
              <div className="text-center">
                <p className="text-4xl font-bold text-gray-900">{averageRating.toFixed(1)}</p>
                <div className="mt-1 flex justify-center">
                  <RatingScore value={averageRating} width={110} />
                </div>
                <p className="mt-1 text-xs text-gray-500">{reviews.length} reviews</p>
              </div>
              <ul className="space-y-1.5">
                {ratingBars.map(({ star, count }) => (
                  <li key={star} className="flex items-center gap-3 text-sm">
                    <span className="flex w-8 items-center gap-1 text-gray-700">
                      {star} <Star size={12} className="fill-amber-400 text-amber-400" />
                    </span>
                    <span className="h-2 flex-1 overflow-hidden rounded-full bg-gray-100">
                      <span
                        className="block h-full rounded-full bg-amber-400"
                        style={{ width: `${(count / reviews.length) * 100}%` }}
                      />
                    </span>
                    <span className="w-6 text-right text-gray-500">{count}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* list */}
            <ul className="divide-y divide-gray-100">
              {reviews.map((review) => (
                <li key={review.id} className="flex gap-3 py-4 first:pt-0 last:pb-0">
                  <span className="grid size-10 shrink-0 place-items-center rounded-full bg-secondary font-semibold text-primary">
                    {review.name.charAt(0)}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="font-medium text-gray-900">{review.name}</p>
                      <span className="text-xs text-gray-500">
                        {helpers.formatDate(review.date, "DD MMM YYYY")}
                      </span>
                    </div>
                    <div className="mt-1 flex flex-wrap items-center gap-2">
                      <RatingScore value={review.rating} width={80} />
                      <Badge variant="outline">{review.variant}</Badge>
                    </div>
                    <p className="mt-2 text-sm text-gray-600">{review.comment}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="text-sm text-gray-500">No reviews yet.</p>
        )}
      </Card>
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
