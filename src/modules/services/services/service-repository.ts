import { connection } from "next/server";
import { buildDemoAdminServices } from "@/data/admin-services";
import type { AdminService } from "../types";

/**
 * Read access for services in the admin. Reads demo data today; swap the
 * bodies for Supabase queries later — pages and components stay unchanged.
 */
export async function listAdminServices(): Promise<AdminService[]> {
  await connection();
  return buildDemoAdminServices();
}
