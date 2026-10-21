"use client";
import { useState } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import { CustomTable } from "@/components/reuseable/table";
import { TableNoItem } from "@/components/reuseable/table-no-item";
import Avatars from "@/components/reuseable/avater";
import { DeleteBtn, PreviewBtn } from "@/components/reuseable/btn";
import useConfirmation from "@/context/delete-modal";
import { Button, TableCell, TableRow } from "@/components/ui";
import { heroSlides, type HeroSlide } from "@/lib/data";
import NavTitle from "@/components/reuseable/nav-title";

export default function BannerSetting() {
  const { confirm } = useConfirmation();
  // TODO: replace with banner list API
  const [banners, setBanners] = useState<HeroSlide[]>(heroSlides);

  const handleDelete = async (id: number) => {
    const confirmed = await confirm({
      title: "Are you sure?",
      description: "This action will delete this banner permanently.",
    });

    if (confirmed) {
      console.log("delete banner", id);
      setBanners((prev) => prev.filter((b) => b.id !== id));
    }
  };

  const headers = ["Image", "Title", "Button", "Action"];

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-xs">
       <NavTitle title="Banner" subTitle="Manage the hero banners shown on the homepage." />
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-lg font-semibold text-gray-900">
          Hero Banners <span className="text-gray-500">({banners.length})</span>
        </h2>
        <Button className="px-5" nativeButton={false} render={<Link href="/admin/settings/banner/create" />}>
          <Plus size={18} className="mr-1" /> Add Banner
        </Button>
      </div>

      <CustomTable headers={headers}>
        {banners.length > 0 ? (
          banners.map((item) => (
            <TableRow key={item.id}>
              <TableCell>
                <Avatars
                  src={item.image}
                  fallback={item.title}
                  alt={item.title}
                  className="h-14 w-24 2xl:h-14 2xl:w-24 rounded-md border border-gray-200"
                  imgstyle="object-cover rounded-md"
                  fallbackStyle="rounded-md"
                />
              </TableCell>

              <TableCell>
                <p className="text-xs text-gray-500">{item.eyebrow}</p>
                <p className="max-w-64 truncate font-medium text-gray-900">{item.title}</p>
              </TableCell>

              <TableCell>
                <p className="font-medium text-gray-900">{item.cta}</p>
                <p className="text-xs text-gray-500">{item.href}</p>
              </TableCell>

              <TableCell>
                <ul className="flex items-center gap-2">
                  <li>
                    <Link href={`/admin/settings/banner/preview/${item.id}`}>
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
          <TableNoItem colSpan={headers.length} title="No banners found" tdStyle="!bg-background" />
        )}
      </CustomTable>
    </div>
  );
}
