import type { Metadata } from "next";
import { AdminPageHeader } from "@/components/admin";
import { JobForm, listAdminJobs } from "@/modules/careers";

export const metadata: Metadata = { title: "New listing" };

export default async function NewJobPage() {
  const jobs = await listAdminJobs();

  return (
    <>
      <AdminPageHeader
        title="New listing"
        description="Saved as a draft until you open it on the careers page."
        back={{ href: "/admin/careers", label: "Careers" }}
      />
      <JobForm takenSlugs={jobs.map((job) => job.slug)} />
    </>
  );
}
