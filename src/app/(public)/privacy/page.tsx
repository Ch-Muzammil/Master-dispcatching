import type { Metadata } from "next";
import { LegalPageContent } from "@/components/sections/legal";
import { privacyPolicy } from "@/data/legal";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Meridian Dispatch Group handles information shared through its website.",
};

export default function PrivacyPage() {
  return <LegalPageContent page={privacyPolicy} />;
}
