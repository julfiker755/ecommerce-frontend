"use client";
import Link from "next/link";
import { Menu, Store } from "lucide-react";
import { useTitle } from "@/context/title";
import { Button } from "@/components/ui/button";
import Notification from "./notification";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  admin?: boolean;
}

export default function Navber({
  sidebarOpen,
  setSidebarOpen,
  admin = false,
}: SidebarProps) {
  const { title, subtitle } = useTitle();

  return (
    <div className="sticky top-0 z-30 flex h-18 w-full items-center border-b border-border bg-card/95 backdrop-blur">
      <header className="flex w-full h-20 items-center justify-between gap-4 px-4 sm:px-6">
        {/* left side */}
        <div className="flex min-w-0 items-center gap-3">
          <Button
            variant="outline"
            size="icon-sm"
            aria-controls="sidebar"
            aria-label="Open menu"
            className="lg:hidden"
            onClick={(e) => {
              e.stopPropagation();
              setSidebarOpen(!sidebarOpen);
            }}
          >
            <Menu />
          </Button>
          <div className="min-w-0">
            <h1 className="truncate text-lg font-semibold text-foreground sm:text-xl">
              {title}
            </h1>
            {subtitle && (
              <p className="hidden truncate text-sm text-muted-foreground sm:block">
                {subtitle}
              </p>
            )}
          </div>
        </div>

        {/* =========== user side ============== */}
        {!admin && (
          <div className="flex shrink-0 items-center gap-3">
            <Button
              variant="soft"
              size="sm"
              className="hidden sm:inline-flex"
              nativeButton={false}
              render={<Link href="/" />}
            >
              <Store /> Shop
            </Button>

            <span className="grid size-9 place-items-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
              u
            </span>
          </div>
        )}
        {/* =============== admin site ================== */}
        {admin && (
          <div>
            <Notification />
          </div>
        )}
      </header>
    </div>
  );
}
