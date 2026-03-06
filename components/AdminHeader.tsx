import { Plus } from "lucide-react";
import React from "react";

export default function AdminHeader({
  header,
  title,
  buttonText,
}: {
  header: string;
  title: string;
  buttonText?: string;
}) {
  return (
    <div className="flex w-full flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-col gap-2">
        <h1 className="font-bold text-xl">{header}</h1>
        <p className="text-text-secondary">{title}</p>
      </div>
      {buttonText && (
        <div className="flex w-full cursor-pointer items-center justify-center rounded-xl bg-primary p-2 font-bold text-secondary shadow-2xl shadow-primary/5 sm:w-auto">
          {buttonText}
          <Plus className="pl-1"></Plus>
        </div>
      )}
    </div>
  );
}
