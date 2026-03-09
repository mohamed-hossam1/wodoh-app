"use client";

import { createProject } from "@/actions/projects";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { projects } from "@/db/schema";
import { InferSelectModel } from "drizzle-orm";
import { useEffect, useState } from "react";

export default function Home() {
  const [clientsState, setClients] = useState<
    InferSelectModel<typeof projects>
  >();
  const text = async () => {

    const data = await createProject(
      {
        name: "string",
        status: "active",
        totalValue: 2000,
        description: "string | null | undefined",
      },
      "ad5337de-abb1-4b6e-a3a1-db653a7da465",
    );
    if (data.success) setClients(data?.data.newProject);
    console.log(data);
  };
  useEffect(() => {
    console.log(clientsState);
  }, [clientsState]);
  return (
    <div className="min-h-screen  flex flex-col items-center gap-6 justify-center  font-sans ">
      <Button onClick={text}> text </Button>

      <ModeToggle />
    </div>
  );
}
