import type { ReactNode } from "react";

import { Sidebar } from "./components/Sidebar";

export const dynamic = "force-dynamic";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-[#f7f7f5] text-[#111]">
      <Sidebar />

      <div className="min-h-screen lg:pl-[250px]">
        {children}
      </div>
    </div>
  );
}