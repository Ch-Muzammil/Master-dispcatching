import type { Metadata } from "next";
import { FaqsPageContent } from "@/components/sections/faqs";

export const metadata: Metadata = {
  title: "FAQs",
  description:
    "Answers about Meridian Dispatch Group services, onboarding, pricing, billing, and careers.",
};

export default function FaqsPage() {
  return <FaqsPageContent />;
}
