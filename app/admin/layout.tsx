"use client";
import Navber from "@/components/common/dash/navber";
import { adminLinks } from "@/components/common/dash/navdata";
import Sidebar from "@/components/common/dash/sideber";
import { childrenProps } from "@/types";
import { useState } from "react";

export default function AdminCommonLayout({ children }: childrenProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar link={adminLinks} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
        <Navber sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
}
