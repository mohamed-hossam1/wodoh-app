"use client";

import { ROUTES } from "@/constants/routes";
import { LogOut } from "lucide-react";
import Link from "next/link";
import PinnedProjects from "./PinnedProjects";
import SideLinks from "./SideLinks";
import { ModeToggle } from "../ui/mode-toggle";
export default function Sidebar({ className = "" }: { className?: string }) {
  return (
    <div
      className={`m-4 flex w-full flex-col gap-6 rounded-xl bg-background p-4 sm:m-6 sm:p-5 lg:m-10 lg:min-w-66 lg:w-72 lg:gap-9.5 ${className}`}
    >
      <div className="flex justify-between items-center ">
        <Link href={ROUTES.ADMIN} className="text-primary font-bold text-xl ">
          Wodoh
        </Link>
        <ModeToggle />
      </div>
      <SideLinks />
      <PinnedProjects />
      <button className="flex items-center justify-center gap-5 rounded-xl border bg-secondary py-3">
        <span className="font-bold">Sign out</span>
        <LogOut className="text-red-600" />
      </button>
    </div>
  );
}
