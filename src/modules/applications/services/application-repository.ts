import { connection } from "next/server";
import { buildDemoJobApplications } from "@/data/job-applications";
import { listAdminJobs } from "@/modules/careers";
import {
  APPLICATION_STATUSES,
  type ApplicationFilters,
  type ApplicationJobOption,
  type ApplicationListResult,
  type JobApplication,
} from "../types";

export const APPLICATIONS_PAGE_SIZE = 10;

export async function listJobApplications(): Promise<JobApplication[]> {
  await connection();
  return buildDemoJobApplications().sort(
    (a, b) => Date.parse(b.receivedAt) - Date.parse(a.receivedAt),
  );
}

export async function countNewJobApplications(): Promise<number> {
  const applications = await listJobApplications();
  return applications.filter((application) => application.status === "new").length;
}

export async function listApplicationJobOptions(): Promise<ApplicationJobOption[]> {
  const jobs = await listAdminJobs();
  return jobs.map((job) => ({ slug: job.slug, title: job.title }));
}

function matchesSearch(application: JobApplication, q: string): boolean {
  if (!q) return true;
  const needle = q.toLowerCase();
  return [application.name, application.email, application.phone, application.jobTitle].some(
    (value) => value.toLowerCase().includes(needle),
  );
}

export async function queryJobApplications(
  filters: ApplicationFilters,
): Promise<ApplicationListResult> {
  const all = await listJobApplications();

  const searched = all.filter(
    (application) =>
      matchesSearch(application, filters.q) &&
      (filters.job === "all" || application.jobSlug === filters.job),
  );

  const statusCounts = { all: searched.length } as ApplicationListResult["statusCounts"];
  for (const status of APPLICATION_STATUSES) {
    statusCounts[status] = searched.filter((application) => application.status === status).length;
  }

  const filtered =
    filters.status === "all"
      ? searched
      : searched.filter((application) => application.status === filters.status);

  const pageCount = Math.max(1, Math.ceil(filtered.length / APPLICATIONS_PAGE_SIZE));
  const page = Math.min(filters.page, pageCount);
  const start = (page - 1) * APPLICATIONS_PAGE_SIZE;

  return {
    items: filtered.slice(start, start + APPLICATIONS_PAGE_SIZE),
    total: filtered.length,
    page,
    pageCount,
    pageSize: APPLICATIONS_PAGE_SIZE,
    statusCounts,
  };
}
