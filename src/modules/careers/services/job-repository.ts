import { connection } from "next/server";
import { buildDemoAdminJobs } from "@/data/admin-jobs";
import type { AdminJob } from "../types";

/**
 * Read access for jobs in the admin. Reads demo data today; swap the bodies
 * for Supabase queries later — pages and components stay unchanged.
 */
export async function listAdminJobs(): Promise<AdminJob[]> {
  await connection();
  return buildDemoAdminJobs();
}

export async function getAdminJob(slug: string): Promise<AdminJob | undefined> {
  const jobs = await listAdminJobs();
  return jobs.find((job) => job.slug === slug);
}
