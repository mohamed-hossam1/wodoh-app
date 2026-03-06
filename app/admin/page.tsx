import AdminHeader from "@/components/AdminHeader";
import SummaryCard from "@/components/SummaryCard";
import Table from "@/components/Table";
import { tableData, tableHeaders } from "@/data/projects";
import { latestActivitiesCard } from "@/data/latest-activities";
import { paymentSummaryCard } from "@/data/payment-summary";
import ListStatsCards from "@/components/stats/ListStatsCards";
import { adminStats } from "@/data/stats/admin-stats";

export default function adminDashboard() {
  return (
    <div className="flex w-full min-w-0 flex-1 flex-col gap-6 rounded-xl bg-background p-4 sm:p-6 lg:p-8 m-4 sm:m-6 lg:m-10">
      <AdminHeader
        header="Hello 👋"
        title="Here's an overview of your projects today."
      />
      <ListStatsCards items={adminStats} />
      <Table headers={tableHeaders} data={tableData} />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <SummaryCard variant="payments" {...paymentSummaryCard} />
        <SummaryCard variant="activities" {...latestActivitiesCard} />
      </div>
    </div>
  );
}
