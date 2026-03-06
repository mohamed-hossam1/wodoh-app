export const tableHeaders: {
  key: string;
  label: string;
  align?: "left" | "center" | "right";
}[] = [
  { key: "project", label: "Project" },
  { key: "client", label: "Client" },
  { key: "progress", label: "Progress" },
  { key: "status", label: "Status" },
  { key: "dueDate", label: "Due Date" },
  { key: "amount", label: "Amount" },
  { key: "actions", label: "Actions", align: "center" },
];

export const tableRow = {
  project: "Mobile App Development",
  client: "Advanced Tech Company",
  progress: "75%",
  status: "Active",
  dueDate: "Mar 15, 2024",
  amount: "SAR 45,000",
  actions: true,
};

export const tableData = Array.from({ length: 5 }, () => ({ ...tableRow }));
