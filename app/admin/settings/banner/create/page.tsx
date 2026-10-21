"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, X } from "lucide-react";
import Form from "@/components/reuseable/from";
import { FromInput } from "@/components/reuseable/from-input";
import { FromTextArea } from "@/components/reuseable/from-textarea";
import UploadDesign from "@/components/reuseable/uplaod-design";
import sonner from "@/components/reuseable/sonner";
import { Button, Label } from "@/components/ui";
import { banner_Create } from "@/schema";
import NavTitle from "@/components/reuseable/nav-title";

export default function BannerCreate() {
  const router = useRouter();
  const [image, setImage] = useState<File | null>(null);
  const [imageError, setImageError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm({
    resolver: zodResolver(banner_Create),
    defaultValues: {
      eyebrow: "",
      title: "",
      text: "",
      cta: "",
      href: "",
    },
  });

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setImageError("");
    }
    e.target.value = "";
  };

  const handleSubmit = async (values: FieldValues) => {
    if (!image) {
      setImageError("Banner image is required");
      return;
    }
    setIsLoading(true);
    // TODO: connect create banner API ({ ...values, image })
    console.log({ ...values, image });
    await new Promise((r) => setTimeout(r, 600));
    setIsLoading(false);
    sonner.success("Banner added", "New hero banner is now live on the homepage.");
    form.reset();
    setImage(null);
    router.push("/admin/settings/banner");
  };

  return (
    <div className="max-w-3xl bg-white border border-gray-200 rounded-lg p-5 shadow-xs">
        <NavTitle title="Add Banner" subTitle="Create a new hero banner for the homepage." />
      <Form from={form} className="space-y-5" onSubmit={handleSubmit}>
        <div>
          <Label className="mb-1 text-base! font-medium text-black">Banner Image</Label>
          {image ? (
            <div className="relative h-56 overflow-hidden rounded-lg border border-gray-200">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={URL.createObjectURL(image)} alt="Banner preview" className="size-full object-cover" />
              <button
                type="button"
                onClick={() => setImage(null)}
                aria-label="Remove image"
                className="absolute right-2 top-2 grid size-7 place-items-center rounded-full bg-white/90 text-gray-700 shadow hover:bg-white"
              >
                <X size={16} />
              </button>
            </div>
          ) : (
            <label className="block">
              <UploadDesign title="Upload Banner Image" />
              <input type="file" accept="image/*" hidden onChange={handleImage} />
            </label>
          )}
          {imageError && <p className="pt-px text-end text-sm text-[#f73f4e]">{imageError}</p>}
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <FromInput label="Tag Line" name="eyebrow" placeholder="e.g. Seasonal Harvest" />
          <FromInput label="Title" name="title" placeholder="e.g. Fresh Himsagar Mangoes Are Here" />
        </div>
        <FromTextArea
          label="Description"
          name="text"
          placeholder="Write a short banner description"
          className="min-h-20"
        />
        <div className="grid gap-5 sm:grid-cols-2">
          <FromInput label="Button Text" name="cta" placeholder="e.g. Shop Now" />
          <FromInput label="Button Link" name="href" placeholder="/products/..." />
        </div>

        <div className="flex justify-end">
          <Button disabled={isLoading} type="submit" size="lg" className="h-11 px-8">
            {isLoading ? <Loader2 className="animate-spin" /> : null}
            {isLoading ? "Adding…" : "Add Banner"}
          </Button>
        </div>
      </Form>
    </div>
  );
}
