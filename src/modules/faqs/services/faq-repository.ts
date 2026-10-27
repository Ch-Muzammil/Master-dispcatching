import { connection } from "next/server";
import { buildDemoAdminFaqs } from "@/data/admin-faqs";
import type { AdminFaqGroup } from "../types";

/**
 * Read access for FAQs in the admin. Reads demo data today; swap the body
 * for a Supabase query later — the page stays unchanged.
 */
export async function listAdminFaqs(): Promise<AdminFaqGroup[]> {
  await connection();
  return buildDemoAdminFaqs();
}
