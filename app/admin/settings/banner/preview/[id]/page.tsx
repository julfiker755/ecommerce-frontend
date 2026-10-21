"use client";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { notFound, useParams } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { toneStyles } from "@/components/common/landing/hero-banner";
import { Button } from "@/components/ui";
import { heroSlides } from "@/lib/data";
import { cn } from "@/lib/utils";
import NavTitle from "@/components/reuseable/nav-title";

export default function BannerPreviewPage() {
  return (
    <Suspense>
      <BannerPreview />
    </Suspense>
  );
}

function BannerPreview() {
  const {id} = useParams();
  // TODO: replace with banner details API
  const slide = heroSlides.find((s) => String(s.id) === id);
  if (!slide) notFound();

  return (
    <div className="space-y-4">
       <NavTitle title="Banner Preview" subTitle="Preview the hero banner as customers will see it." />
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm text-gray-500">This is how the banner looks on the homepage.</p>
        <Button variant="outline" nativeButton={false} render={<Link href="/admin/settings/banner" />}>
          <ArrowLeft /> Back
        </Button>
      </div>

      {/* ===== Same card as landing <HeroBanner /> ===== */}
      <div
        className={cn(
          "relative w-full overflow-hidden rounded-2xl min-h-80 sm:min-h-96 lg:min-h-120 bg-linear-to-br",
          toneStyles[slide.tone] ?? toneStyles.emerald
        )}
      >
        <div className="grid h-full min-h-[inherit] grid-cols-1 sm:grid-cols-2 items-center gap-4 p-6 sm:p-10 lg:px-16 lg:py-12">
          <div className="relative z-10">
            <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              {slide.eyebrow}
            </span>
            <h1 className="mt-4 font-heading text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-foreground">
              {slide.title}
            </h1>
            <p className="mt-3 max-w-lg text-sm sm:text-base lg:text-lg text-muted-foreground">{slide.text}</p>
            <Button
              size="lg"
              className="mt-6 rounded-full"
              nativeButton={false}
              render={<Link href={slide.href} target="_blank" />}
            >
              {slide.cta} <ArrowRight />
            </Button>
          </div>
          <div className="absolute right-0 bottom-0 top-0 w-1/2 lg:w-[45%] hidden sm:block">
            <div className="absolute inset-y-8 right-8 left-4 lg:inset-y-10 lg:right-16 lg:left-0 rounded-[2rem] overflow-hidden shadow-2xl rotate-2">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                priority
                sizes="(max-width: 1024px) 50vw, 40vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
