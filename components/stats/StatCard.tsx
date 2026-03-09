import { StatItem } from "@/types/global";

export default function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
}: StatItem) {
  return (
    <div className="flex items-start justify-between gap-4 rounded-xl border border-border bg-secondary/70 p-5 shadow-sm">
      <div className="flex flex-col gap-2">
        <p className="text-text-secondary">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
        {subtitle && <p className="text-primary font-medium">{subtitle}</p>}
      </div>
      <div className="flex  items-center justify-center rounded-lg border border-border bg-background">
        <Icon className="h-6 w-6 text-primary m-3" />
      </div>
    </div>
  );
}
