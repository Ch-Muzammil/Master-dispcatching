import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { AdminPageHeader } from "@/components/admin";
import {
  DashboardStats,
  getDashboardOverview,
  LeadPipeline,
  OpenPositions,
  RecentQuoteRequests,
} from "@/modules/dashboard";

export const metadata: Metadata = { title: "Dashboard" };

export default async function AdminDashboardPage() {
  const overview = await getDashboardOverview();

  return (
    <>
      <AdminPageHeader
        title="Dashboard"
        description={`Leads, hiring, and content activity for ${siteConfig.name}.`}
      />

      <DashboardStats overview={overview} />

      <div className="grid items-start gap-6 lg:grid-cols-3">
        <RecentQuoteRequests requests={overview.leads.recent} />
        <div className="grid gap-6">
          <LeadPipeline stages={overview.leads.pipeline} total={overview.leads.total} />
          <OpenPositions jobs={overview.careers.openJobs} />
        </div>
      </div>
    </>
  );
}
