import type { Metadata } from "next";
import { CareersPageContent } from "@/components/sections/careers";

export const metadata: Metadata = { title: "Careers", description: "Join a dispatch team that treats freight like a craft. Open roles in dispatch operations, carrier success, and compliance." };

export default function CareersPage() {
  return <CareersPageContent />;
}
