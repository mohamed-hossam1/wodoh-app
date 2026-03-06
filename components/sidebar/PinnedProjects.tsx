import Link from "next/link";
import React from "react";

export default function PinnedProjects() {
  return (
    <div className="flex flex-col gap-5">
      <p className="font-bold text-xl">Pinned Projects</p>
      <Link href={""}>
        <div className="bg-secondary rounded-xl p-2.5 flex flex-col gap-1">
          <div className="flex justify-between items-center">
            <p className="font-bold">Project Name</p>
            <p className="text-text-secondary text-sm ">Days Left</p>
          </div>
          <span className="flex flex-row-reverse">70%</span>
          <div className="relative">
            <div className="h-2.5 w-[70%] bg-primary rounded-2xl absolute" />
            <div className="h-2.5  w-full bg-border rounded-2xl " />
          </div>
        </div>
      </Link>
      <Link href={""}>
        <div className="bg-secondary rounded-xl p-2.5 flex flex-col gap-1">
          <div className="flex justify-between items-center">
            <p className="font-bold">Project Name</p>
            <p className="text-text-secondary text-sm">Days Left</p>
          </div>
          <span className="flex flex-row-reverse">70%</span>
          <div className="relative">
            <div className="h-2.5 w-[70%] bg-primary rounded-2xl absolute" />
            <div className="h-2.5  w-full bg-border rounded-2xl " />
          </div>
        </div>
      </Link>
      <Link href={""}>
        <div className="bg-secondary rounded-xl p-2.5 flex flex-col gap-1">
          <div className="flex justify-between items-center">
            <p className="font-bold">Project Name</p>
            <p className="text-text-secondary text-sm">Days Left</p>
          </div>
          <span className="flex flex-row-reverse">70%</span>
          <div className="relative">
            <div className="h-2.5 w-[70%] bg-primary rounded-2xl absolute" />
            <div className="h-2.5  w-full bg-border rounded-2xl " />
          </div>
        </div>
      </Link>
    </div>
  );
}
