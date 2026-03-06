export const paymentSummary: Array<{
  statusTone: "paid" | "due" | "upcoming";
  amount: string;
  store: string;
  project: string;
  date: string;
}> = [
  {
    statusTone: "paid",
    amount: "SAR 15,000",
    store: "Elegance Store",
    project: "Mobile App Development",
    date: "Feb 25, 2024",
  },
  {
    statusTone: "due",
    amount: "SAR 15,000",
    store: "Elegance Store",
    project: "Mobile App Development",
    date: "Feb 25, 2024",
  },
  {
    statusTone: "upcoming",
    amount: "SAR 15,000",
    store: "Elegance Store",
    project: "Mobile App Development",
    date: "Feb 25, 2024",
  },
];

export const paymentSummaryCard = {
  title: "Payments Summary",
  subtitle: "Status of your recent payments",
  footerLabel: "View All Payments",
  items: paymentSummary,
} as const;
