import type { Metadata } from "next";
import { AdminPageHeader } from "@/components/admin";
import {
  ApplicationsView,
  listApplicationJobOptions,
  parseApplicationFilters,
  queryJobApplications,
} from "@/modules/applications";

export const metadata: Metadata = { title: "Job applications" };

type ApplicationsPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function ApplicationsPage({ searchParams }: ApplicationsPageProps) {
  const filters = parseApplicationFilters(await searchParams);
  const [result, jobs] = await Promise.all([
    queryJobApplications(filters),
    listApplicationJobOptions(),
  ]);

  return (
    <>
      <AdminPageHeader
        title="Job applications"
        description="People who applied from your careers pages. Open a candidate to call, email, or move them through hiring."
      />
      <ApplicationsView result={result} filters={filters} jobs={jobs} />
    </>
  );
}
