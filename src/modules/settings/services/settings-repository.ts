import { connection } from "next/server";
import { buildDemoMediaLibrary, buildDemoWebsiteSettings } from "@/data/admin-settings";
import type { MediaItem, WebsiteSettings } from "../types";

export async function getWebsiteSettings(): Promise<WebsiteSettings> {
  await connection();
  return buildDemoWebsiteSettings();
}

export async function listMediaLibrary(): Promise<MediaItem[]> {
  await connection();
  return buildDemoMediaLibrary();
}
