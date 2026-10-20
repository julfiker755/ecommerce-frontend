"use client";
import { useState } from "react";
import Image from "next/image";
import { useFormContext } from "react-hook-form";
import { ChevronDown, GripVertical, ImagePlus, Trash2, X } from "lucide-react";
import { FromInput } from "@/components/reuseable/from-input";
import { InputSelectField } from "@/components/reuseable/from-select";
import {
  Badge,
  Button,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui";
import { cn } from "@/lib/utils";

// ===== Types =====
export interface Variation {
  id: number;
  name: string;
  type: string;
  values: VariationValue[];
}

export interface VariationValue {
  id: number;
  label: string;
  color?: string;
  image?: File;
}

export interface Variant {
  name: string;
  enabled: boolean;
  image?: File;
}

interface ProductVariationsProps {
  onChange?: (data: { variations: Variation[]; variants: Variant[]; defaultVariant: string }) => void;
}

// ===== Options =====
const typeOptions = [
  { label: "Text", value: "text" },
  { label: "Color", value: "color" },
  { label: "Image", value: "image" },
];

const templateOptions = [
  { label: "Size (S, M, L, XL)", value: "size" },
  { label: "Color (Grey, Black, Blue)", value: "color" },
];

const templates: Record<string, Omit<Variation, "id">> = {
  size: {
    name: "Size",
    type: "text",
    values: ["S", "M", "L", "XL"].map((label, i) => ({ id: i + 1, label })),
  },
  color: {
    name: "Color",
    type: "color",
    values: [
      { id: 1, label: "Grey", color: "#9ca3af" },
      { id: 2, label: "Black", color: "#111827" },
      { id: 3, label: "Blue", color: "#2563eb" },
    ],
  },
};

const bulkOptions = [
  { label: "Enable all", value: "enable" },
  { label: "Disable all", value: "disable" },
  { label: "In stock all", value: "in_stock" },
  { label: "Out of stock all", value: "out_of_stock" },
];

const stockStatusItems = [
  { label: "In Stock", value: "in_stock" },
  { label: "Out of Stock", value: "out_of_stock" },
];

const inputStyle =
  "h-10 rounded-lg border-slate-300 bg-white px-3 shadow-xs placeholder:text-slate-400 hover:border-slate-400 focus-visible:border-primary focus-visible:ring-3 focus-visible:ring-primary/15";

const emptyVariant = (name: string): Variant => ({ name, enabled: true });

// every combination of the variation values, e.g. "L / Grey"
const combine = (variations: Variation[]) =>
  variations
    .map((v) => v.values.map((val) => val.label.trim()).filter(Boolean))
    .filter((labels) => labels.length)
    .reduce<string[]>(
      (acc, labels) => (acc.length ? acc.flatMap((a) => labels.map((l) => `${a} / ${l}`)) : labels),
      []
    );

export default function ProductVariations({ onChange }: ProductVariationsProps) {
  const [variations, setVariations] = useState<Variation[]>([]);
  const [openVariation, setOpenVariation] = useState<number | null>(null);
  const [template, setTemplate] = useState("");
  const [variantData, setVariantData] = useState<Record<string, Variant>>({});
  const [defaultVariant, setDefaultVariant] = useState("");
  const [openVariant, setOpenVariant] = useState<string | null>(null);
  const { setValue } = useFormContext();

  const variants = combine(variations).map((name) => variantData[name] ?? emptyVariant(name));
  const currentDefault = variants.some((v) => v.name === defaultVariant)
    ? defaultVariant
    : variants[0]?.name ?? "";

  const emit = (
    nextVariations = variations,
    nextData = variantData,
    nextDefault = currentDefault
  ) => {
    onChange?.({
      variations: nextVariations,
      variants: combine(nextVariations).map((name) => nextData[name] ?? emptyVariant(name)),
      defaultVariant: nextDefault,
    });
  };

  // ===== Variations =====
  const updateVariations = (next: Variation[]) => {
    setVariations(next);
    emit(next);
  };

  const addVariation = (
    data: Omit<Variation, "id"> = { name: "", type: "", values: [{ id: Date.now(), label: "" }] }
  ) => {
    const id = Date.now();
    updateVariations([...variations, { id, ...data }]);
    setOpenVariation(id);
  };

  const editVariation = (id: number, patch: Partial<Variation>) =>
    updateVariations(variations.map((v) => (v.id === id ? { ...v, ...patch } : v)));

  const removeVariation = (id: number) => updateVariations(variations.filter((v) => v.id !== id));

  // ===== Variants =====
  const editVariant = (name: string, patch: Partial<Variant>) => {
    const next = { ...variantData, [name]: { ...(variantData[name] ?? emptyVariant(name)), ...patch } };
    setVariantData(next);
    emit(variations, next);
  };

  const bulkEdit = (action: string) => {
    if (action === "in_stock" || action === "out_of_stock") {
      variants.forEach((_, index) => setValue(`variants.${index}.stock_status`, action));
      return;
    }
    const patch: Partial<Variant> = { enabled: action === "enable" };
    const next = { ...variantData };
    variants.forEach((v) => (next[v.name] = { ...v, ...patch }));
    setVariantData(next);
    emit(variations, next);
  };

  return (
    <div className="space-y-5">
      {/* ===== Variations ===== */}
      <Card title="Variations">
        <div className="space-y-4">
          {variations.map((variation) => {
            const open = openVariation === variation.id;
            return (
              <div key={variation.id} className="overflow-hidden rounded-lg border border-gray-200">
                <AccordionHeader
                  open={open}
                  onToggle={() => setOpenVariation(open ? null : variation.id)}
                  title={
                    <span className="flex items-center gap-2">
                      <GripVertical size={16} className="text-gray-400" />
                      {variation.name || "New Variation"}
                    </span>
                  }
                  actions={
                    <button
                      type="button"
                      aria-label="Remove variation"
                      onClick={() => removeVariation(variation.id)}
                      className="cursor-pointer text-gray-500 hover:text-red-500"
                    >
                      <Trash2 size={15} />
                    </button>
                  }
                />

                {open && (
                  <div className="space-y-4 p-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Field label="Name" required>
                        <Input
                          value={variation.name}
                          onChange={(e) => editVariation(variation.id, { name: e.target.value })}
                          placeholder="e.g. Size"
                          className={inputStyle}
                        />
                      </Field>
                      <Field label="Type" required>
                        <SimpleSelect
                          items={typeOptions}
                          value={variation.type}
                          placeholder="Please Select"
                          onChange={(type) => editVariation(variation.id, { type })}
                        />
                      </Field>
                    </div>
                    {variation.type && (
                      <ValueRows
                        type={variation.type}
                        values={variation.values}
                        onChange={(values) => editVariation(variation.id, { values })}
                      />
                    )}
                  </div>
                )}
              </div>
            );
          })}

          <div className="flex flex-wrap items-center justify-between gap-3">
            <Button type="button" variant="secondary" onClick={() => addVariation()}>
              Add Variation
            </Button>
            <div className="flex items-center gap-2">
              <SimpleSelect
                items={templateOptions}
                value={template}
                placeholder="Select Template"
                onChange={setTemplate}
                className="w-48"
              />
              <Button
                type="button"
                variant="outline"
                disabled={!template}
                onClick={() => {
                  addVariation(templates[template]);
                  setTemplate("");
                }}
              >
                Insert
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* ===== Variants ===== */}
      <Card title="Variants">
        {variants.length === 0 ? (
          <p className="py-6 text-center text-sm text-gray-500">
            Add variations with values to generate variants.
          </p>
        ) : (
          <div className="space-y-4">
            <div className="grid gap-3 sm:grid-cols-[180px_1fr] sm:items-center sm:max-w-xl">
              <Label className="text-sm font-medium text-gray-700">Default Variant</Label>
              <SimpleSelect
                items={variants.map((v) => ({ label: v.name, value: v.name }))}
                value={currentDefault}
                onChange={(val) => {
                  setDefaultVariant(val);
                  emit(variations, variantData, val);
                }}
              />
              <Label className="text-sm font-medium text-gray-700">Bulk Edit</Label>
              <SimpleSelect
                items={bulkOptions}
                value=""
                placeholder="Please Select"
                onChange={bulkEdit}
              />
            </div>

            {variants.map((variant, index) => {
              const open = openVariant === variant.name;
              return (
                <div key={variant.name} className="overflow-hidden rounded-lg border border-gray-200">
                  <AccordionHeader
                    open={open}
                    onToggle={() => setOpenVariant(open ? null : variant.name)}
                    title={
                      <span className="flex items-center gap-2">
                        {variant.name}
                        {variant.name === currentDefault && <Badge variant="secondary">Default</Badge>}
                      </span>
                    }
                    actions={
                      <Toggle
                        checked={variant.enabled}
                        onChange={(enabled) => editVariant(variant.name, { enabled })}
                      />
                    }
                  />

                  {open && (
                    <div className="grid gap-5 p-4 md:grid-cols-[140px_1fr]">
                      <VariantImage
                        file={variant.image}
                        onChange={(image) => editVariant(variant.name, { image })}
                      />

                      <div className="grid gap-5 sm:grid-cols-2">
                        <FromInput
                          label="Purchase Price"
                          name={`variants.${index}.purchase_price`}
                          type="number"
                          placeholder="e.g. 25"
                        />
                        <FromInput
                          label="Selling Price"
                          name={`variants.${index}.selling_price`}
                          type="number"
                          placeholder="e.g. 40"
                        />
                        <FromInput
                          label="Offer / Discount Price"
                          name={`variants.${index}.offer_price`}
                          type="number"
                          placeholder="e.g. 30"
                        />
                        <FromInput
                          label="Stock Quantity"
                          name={`variants.${index}.stock`}
                          type="number"
                          placeholder="e.g. 50"
                        />
                        <InputSelectField
                          label="Stock Status"
                          name={`variants.${index}.stock_status`}
                          placeholder="Select stock status"
                          items={stockStatusItems}
                        />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
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

function AccordionHeader({
  title,
  actions,
  open,
  onToggle,
}: {
  title: React.ReactNode;
  actions?: React.ReactNode;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-between gap-3 bg-gray-50 px-4 py-3",
        open && "border-b border-gray-200"
      )}
    >
      <button
        type="button"
        onClick={onToggle}
        className="flex-1 cursor-pointer text-left text-sm font-medium text-gray-900"
      >
        {title}
      </button>
      <div className="flex items-center gap-3">
        {actions}
        <button
          type="button"
          aria-label={open ? "Collapse" : "Expand"}
          aria-expanded={open}
          onClick={onToggle}
          className="cursor-pointer text-gray-500"
        >
          <ChevronDown size={16} className={cn("transition-transform", open && "rotate-180")} />
        </button>
      </div>
    </div>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label className="text-sm font-medium text-gray-800">
        {label}
        {required && <span className="text-red-500">*</span>}
      </Label>
      {children}
    </div>
  );
}

function SimpleSelect({
  items,
  value,
  placeholder,
  onChange,
  className,
}: {
  items: { label: string; value: string }[];
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
  className?: string;
}) {
  return (
    <Select items={items} value={value || null} onValueChange={(val) => val && onChange(val)}>
      <SelectTrigger
        className={cn(
          "w-full cursor-pointer rounded-lg border border-slate-300 bg-white pl-3 pr-3 text-black shadow-xs hover:border-slate-400 focus-visible:border-primary focus-visible:ring-3 focus-visible:ring-primary/15 data-popup-open:border-primary data-popup-open:ring-3 data-popup-open:ring-primary/15",
          className
        )}
      >
        <SelectValue placeholder={<span className="text-slate-400">{placeholder}</span>} />
      </SelectTrigger>
      <SelectContent>
        {items.map((item) => (
          <SelectItem key={item.value} value={item.value}>
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}


function ValueRows({
  type,
  values,
  onChange,
}: {
  type: string;
  values: VariationValue[];
  onChange: (values: VariationValue[]) => void;
}) {
  const edit = (id: number, patch: Partial<VariationValue>) =>
    onChange(values.map((v) => (v.id === id ? { ...v, ...patch } : v)));

  const extraLabel = type === "color" ? "Color" : type === "image" ? "Image" : "";

  return (
    <div className="space-y-3">
      <div className="overflow-hidden rounded-lg border border-gray-200">
        <table className="w-full text-sm">
          <thead className="border-b border-gray-200">
            <tr>
              <th className="w-9" />
              <th className="px-2 py-2 text-left font-medium text-gray-800">
                Label <span className="text-red-500">*</span>
              </th>
              {extraLabel && (
                <th className="w-44 border-l border-gray-200 px-2 py-2 text-left font-medium text-gray-800">
                  {extraLabel} <span className="text-red-500">*</span>
                </th>
              )}
              <th className="w-12" />
            </tr>
          </thead>
          <tbody>
            {values.map((value) => (
              <tr key={value.id} className="border-b border-gray-200 last:border-b-0">
                <td className="border-r border-gray-200 text-center text-gray-400">
                  <GripVertical size={14} className="mx-auto" />
                </td>
                <td className="p-1.5">
                  <Input
                    value={value.label}
                    onChange={(e) => edit(value.id, { label: e.target.value })}
                    className={inputStyle}
                  />
                </td>
                {type === "color" && (
                  <td className="border-l border-gray-200 p-1.5">
                    <label className="flex h-10 cursor-pointer items-center justify-between gap-2 rounded-lg border border-slate-300 bg-white px-3 shadow-xs hover:border-slate-400">
                      <span className="text-sm text-gray-700">{value.color ?? ""}</span>
                      <span
                        className="size-6 rounded border border-gray-200 bg-[repeating-conic-gradient(#d1d5db_0%_25%,white_0%_50%)] bg-size-[8px_8px]"
                        style={value.color ? { background: value.color } : undefined}
                      />
                      <input
                        type="color"
                        value={value.color ?? "#000000"}
                        onChange={(e) => edit(value.id, { color: e.target.value })}
                        className="sr-only"
                      />
                    </label>
                  </td>
                )}
                {type === "image" && (
                  <td className="border-l border-gray-200 p-1.5">
                    <label className="flex h-10 cursor-pointer items-center gap-2 rounded-lg border border-dashed border-slate-300 bg-white px-3 text-sm text-gray-500 hover:border-primary hover:text-primary">
                      <ImagePlus size={16} className="shrink-0" />
                      <span className="truncate">{value.image?.name ?? "Upload"}</span>
                      <input
                        type="file"
                        accept="image/*"
                        hidden
                        onChange={(e) => edit(value.id, { image: e.target.files?.[0] })}
                      />
                    </label>
                  </td>
                )}
                <td className="border-l border-gray-200 p-1.5 text-center">
                  <Button
                    type="button"
                    variant="secondary"
                    size="icon-sm"
                    aria-label="Remove row"
                    onClick={() => onChange(values.filter((v) => v.id !== value.id))}
                  >
                    <Trash2 size={14} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Button
        type="button"
        variant="secondary"
        size="sm"
        onClick={() => onChange([...values, { id: Date.now(), label: "" }])}
      >
        Add Row
      </Button>
    </div>
  );
}

function Toggle({ checked, onChange }: { checked: boolean; onChange: (checked: boolean) => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label="Enable variant"
      onClick={() => onChange(!checked)}
      className={cn(
        "relative h-5 w-9 shrink-0 cursor-pointer rounded-full transition-colors",
        checked ? "bg-primary" : "bg-gray-300"
      )}
    >
      <span
        className={cn(
          "absolute top-0.5 left-0.5 size-4 rounded-full bg-white shadow transition-transform",
          checked && "translate-x-4"
        )}
      />
    </button>
  );
}

function VariantImage({ file, onChange }: { file?: File; onChange: (file?: File) => void }) {
  return (
    <div className="relative size-35 overflow-hidden rounded-lg border-2 border-dashed border-gray-300">
      {file ? (
        <>
          <Image src={URL.createObjectURL(file)} alt={file.name} fill unoptimized className="object-contain p-2" />
          <button
            type="button"
            aria-label="Remove image"
            onClick={() => onChange(undefined)}
            className="absolute right-1.5 top-1.5 cursor-pointer text-gray-400 hover:text-red-500"
          >
            <X size={16} />
          </button>
        </>
      ) : (
        <label className="grid size-full cursor-pointer place-items-center text-gray-300 hover:text-primary">
          <ImagePlus size={44} strokeWidth={1.5} />
          <input
            type="file"
            accept="image/*"
            hidden
            onChange={(e) => onChange(e.target.files?.[0])}
          />
        </label>
      )}
    </div>
  );
}
