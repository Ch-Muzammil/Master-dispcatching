import type { Metadata } from "next";
import { SectionPlaceholder } from "@/components/admin";

export const metadata: Metadata = { title: "Website settings" };

export default function SettingsPage() {
  return (
    <SectionPlaceholder
      title="Website settings"
      description="Company details, branding, contact information, navigation, social links, SEO, and media."
    />
  );
}
