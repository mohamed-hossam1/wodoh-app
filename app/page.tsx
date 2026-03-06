"use client";

import { ModeToggle } from "@/components/ui/mode-toggle";


export default function Home() {
  return (
    <div className="min-h-screen  flex flex-col items-center gap-6 justify-center  font-sans ">
      <ModeToggle></ModeToggle>
    </div>
  );
}
