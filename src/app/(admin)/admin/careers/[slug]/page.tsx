import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AdminPageHeader, StatusBadge } from "@/components/admin";
import { JOB_STATUS_META, JobForm, listAdminJobs } from "@/modules/careers";

type EditJobPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: EditJobPageProps): Promise<Metadata> {
  const { slug } = await params;
  const jobs = await listAdminJobs();
  const job = jobs.find((item) => item.slug === slug);
  return { title: job ? `Edit ${job.title}` : "Job not found" };
}

export default async function EditJobPage({ params }: EditJobPageProps) {
  const { slug } = await params;
  const jobs = await listAdminJobs();
  const job = jobs.find((item) => item.slug === slug);

  if (!job) notFound();

  const status = JOB_STATUS_META[job.status];

  return (
    <>
      <AdminPageHeader
        title={job.title}
        description="Preview this listing. Saves stay in demo mode until the database is connected."
        back={{ href: "/admin/careers", label: "Careers" }}
        actions={<StatusBadge label={status.label} tone={status.tone} />}
      />
      <JobForm job={job} takenSlugs={jobs.filter((item) => item.id !== job.id).map((item) => item.slug)} />
    </>
  );
}
