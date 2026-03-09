"use client";

import { ROUTES } from "@/constants/routes";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Sidebar from "./sidebar";

export default function AdminShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col md:flex-row md:items-start md:gap-6">
      <div className="flex items-center justify-between px-4 py-4 sm:px-6 md:hidden">
        <Link href={ROUTES.ADMIN} className="text-primary font-bold text-xl">
          Wodoh
        </Link>
        <button
          type="button"
          aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
          aria-controls="admin-sidebar"
          aria-expanded={isSidebarOpen}
          onClick={() => setIsSidebarOpen((open) => !open)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-secondary"
        >
          {isSidebarOpen ? <X /> : <Menu />}
        </button>
      </div>

      <div
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity md:hidden ${
          isSidebarOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setIsSidebarOpen(false)}
        aria-hidden={!isSidebarOpen}
      />

      <aside
        id="admin-sidebar"
        className={`fixed max-h-screen inset-y-0 left-0 z-50 w-72 transform transition-transform duration-300 md:sticky md:self-start md:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-[120%]"
        }`}
      >
        <Sidebar className="h-full md:h-auto md:max-h-[calc(100vh-2rem)] md:overflow-y-hidden" />
      </aside>

      <div className="flex min-w-0 flex-1">
        {children}
      </div>
    </div>
  );
}
