import { connection } from "next/server";
import { buildDemoAdminPages } from "@/data/admin-pages";
import type { AdminCmsPage } from "../types";

export async function listAdminPages(): Promise<AdminCmsPage[]> {
  await connection();
  return buildDemoAdminPages();
}

export async function getAdminPage(slug: string): Promise<AdminCmsPage | undefined> {
  const pages = await listAdminPages();
  return pages.find((page) => page.slug === slug);
}
