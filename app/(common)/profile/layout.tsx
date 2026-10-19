"use client"
import Navber from "@/components/common/dash/navber";
import { profileLinks } from "@/components/common/dash/navdata";
import Sidebar from "@/components/common/dash/sideber";
import React, { useState } from "react";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    
      <div className="flex h-screen overflow-hidden">
        <Sidebar link={profileLinks} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          <Navber sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <div className="flex-1 bg-muted/40 p-4">
           {children}
          </div>
        </div>
      </div>
  );
}
