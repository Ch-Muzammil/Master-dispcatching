import type { Metadata } from "next";
import { LegalPageContent } from "@/components/sections/legal";
import { termsAndConditions } from "@/data/legal";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Terms governing use of the Meridian Dispatch Group website.",
};

export default function TermsPage() {
  return <LegalPageContent page={termsAndConditions} />;
}
