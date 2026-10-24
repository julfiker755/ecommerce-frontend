"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronDown, LogOut, Settings } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui";
import sonner from "@/components/reuseable/sonner";
import { adminProfile } from "@/lib/data";
import { authKey } from "@/lib/constants";
import { helpers } from "@/lib/helpers";

const roleLabels = {
  super_admin: "Administrator",
  admin: "Admin",
};

const initials = (name: string) =>
  name
    .split(" ")
    .slice(0, 2)
    .map((w) => w.charAt(0))
    .join("")
    .toUpperCase();

export default function AdminProfile() {
  const router = useRouter();
  const shortName = adminProfile.name.split(" ").slice(0, 2).join(" ");

  const handleLogout = () => {
    helpers.removeAuthCookie(authKey);
    sonner.success("Logged out", "See you again soon!");
    router.push("/login");
  };

  return (
    <Popover>
      <PopoverTrigger className="flex cursor-pointer items-center gap-2.5 rounded-full py-1 pl-1 pr-2 outline-none transition-colors hover:bg-gray-50 data-popup-open:bg-gray-50">
        <span className="grid size-9 shrink-0 place-items-center rounded-full bg-black text-sm font-bold text-white">
          {initials(adminProfile.name)}
        </span>
        <span className="hidden text-left sm:block">
          <span className="block text-sm font-semibold leading-tight text-gray-900">
            {shortName}
          </span>
          <span className="block text-xs text-gray-500">{roleLabels[adminProfile.role]}</span>
        </span>
        <ChevronDown className="hidden size-4 text-gray-400 sm:block" />
      </PopoverTrigger>

      <PopoverContent align="end" sideOffset={8} className="w-64 gap-0 overflow-hidden rounded-xl p-0">
        <div className="border-b border-border px-4 py-3">
          <p className="truncate font-semibold text-gray-900">{adminProfile.name}</p>
          <p className="truncate text-sm text-gray-500">{adminProfile.email}</p>
        </div>

        <ul className="py-1">
          <li>
            <Link
              href="/admin/settings/profile"
              className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
            >
              <Settings className="size-4 text-gray-500" /> Account Settings
            </Link>
          </li>
          <li className="border-t border-border">
            <button
              type="button"
              onClick={handleLogout}
              className="flex w-full cursor-pointer items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50"
            >
              <LogOut className="size-4" /> Sign Out
            </button>
          </li>
        </ul>
      </PopoverContent>
    </Popover>
  );
}
