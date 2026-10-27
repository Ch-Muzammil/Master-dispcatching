import { connection } from "next/server";
import { buildDemoAdminPosts } from "@/data/admin-posts";
import type { AdminPost } from "../types";

/**
 * Read access for blog posts in the admin. Reads demo data today; swap the
 * bodies for Supabase queries later — pages and components stay unchanged.
 */
export async function listAdminPosts(): Promise<AdminPost[]> {
  await connection();
  return buildDemoAdminPosts();
}
