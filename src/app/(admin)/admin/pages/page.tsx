import type { Metadata } from "next";
import { SectionPlaceholder } from "@/components/admin";

export const metadata: Metadata = { title: "Pages" };

export default function PagesPage() {
  return (
    <SectionPlaceholder
      title="Pages"
      description="Edit the content of your Home and About pages, testimonials, and legal pages."
    />
  );
}
