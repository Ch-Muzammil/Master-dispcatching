import type { Metadata } from "next";
import { getWebsiteSettings, listMediaLibrary, SettingsForm } from "@/modules/settings";

export const metadata: Metadata = { title: "Website settings" };

export default async function SettingsPage() {
  const [settings, media] = await Promise.all([getWebsiteSettings(), listMediaLibrary()]);
  return <SettingsForm settings={settings} media={media} />;
}
