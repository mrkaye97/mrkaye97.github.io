import { DesktopNavbar, MobileNavbar } from "@/src/components/navbar";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-blue-600">
      <DesktopNavbar />
      <MobileNavbar />
      {children}
    </div>
  );
}
