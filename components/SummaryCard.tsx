import { ROUTES } from "@/constants/routes";
import Link from "next/link";

type PaymentSummaryItem = {
  statusTone: "paid" | "due" | "upcoming";
  amount: string;
  store: string;
  project: string;
  date: string;
};

type LatestActivityItem = {
  title: string;
  description: string;
  time: string;
};

type SummaryCardProps =
  | {
      variant: "payments";
      title: string;
      subtitle: string;
      footerLabel: string;
      items: PaymentSummaryItem[];
    }
  | {
      variant: "activities";
      title: string;
      subtitle: string;
      footerLabel: string;
      items: LatestActivityItem[];
    };

const statusToneClasses: Record<
  "paid" | "due" | "upcoming",
  { label: string; className: string }
> = {
  paid: { label: "Paid", className: "text-primary" },
  due: { label: "Due", className: "text-red-500" },
  upcoming: { label: "Upcoming", className: "text-yellow-500" },
};

export default function SummaryCard(props: SummaryCardProps) {
  return (
    <section className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-secondary">
      <div className="border-b border-border bg-background px-4 py-4 sm:px-6">
        <h3 className="text-lg font-semibold">{props.title}</h3>
        <p className="mt-1 text-sm text-text-secondary">{props.subtitle}</p>
      </div>
      {props.variant === "payments" ? (
        <ul className="flex-1 divide-y divide-border/70">
          {props.items.map((item) => {
            const tone = statusToneClasses[item.statusTone];
            return (
              <li
                key={`${item.store}-${item.date}-${item.statusTone}`}
                className="flex flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6"
              >
                <div>
                  <div className="text-sm font-semibold text-text-color">
                    {item.store}
                  </div>
                  <div className="text-xs text-text-secondary">
                    {item.project}
                  </div>
                  <div className="text-xs text-text-secondary">{item.date}</div>
                </div>
                <div className="flex flex-col items-start space-y-1 sm:items-end">
                  <div className={`text-sm font-semibold ${tone.className}`}>
                    {tone.label}
                  </div>
                  <div className="text-sm font-semibold text-primary">
                    {item.amount}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        <ul className="flex-1 divide-y divide-border/70">
          {props.items.map((item) => (
            <li
              key={`${item.title}-${item.time}`}
              className="flex flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6"
            >
              <div>
                <div className="text-sm font-semibold text-text-color">
                  {item.title}
                </div>
                <div className="text-xs text-text-secondary">
                  {item.description}
                </div>
              </div>
              <div className="text-xs text-text-secondary sm:text-right">
                {item.time}
              </div>
            </li>
          ))}
        </ul>
      )}
      <div className="border-t border-border/70 px-4 py-3 sm:px-6">
        <Link
          href={`${props.variant === "payments" ? ROUTES.PAYMENTS : ROUTES.LOGS}`}
          className="flex w-full items-center justify-center text-sm font-semibold text-primary"
        >
          {props.footerLabel}
        </Link>
      </div>
    </section>
  );
}
