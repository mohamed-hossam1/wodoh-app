import { StatItem } from "@/types";
import StatCard from "./StatCard";

export default function ListStatsCards({ items }: { items: StatItem[] }) {
  return (
    <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {items.map((item) => (
        <StatCard key={item.title} {...item} />
      ))}
    </div>
  );
}
