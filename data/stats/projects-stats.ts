import { Blocks, FolderClosed, FolderKanban, FolderOpen } from "lucide-react";

export const projectStats = [
  {
    title: "Total projects",
    value: "24",
    icon: Blocks,
  },
  {
    title: "Active projects",
    value: "8",
    icon: FolderOpen,
  },

  {
    title: "Completed projects",
    value: "14",
    icon: FolderKanban,
  },
  {
    title: "stalled projects",
    value: "2",
    icon: FolderClosed,
  },
];
