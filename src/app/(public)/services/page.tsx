import type { Metadata } from "next";
import { ServicesPageContent } from "@/components/sections/services/services-page-content";

export const metadata: Metadata = {
  title: "Dispatch Services",
  description:
    "Specialized dispatch desks for dry van, reefer, flatbed, power only, carrier setup, and billing support.",
};

export default function ServicesPage() {
  return <ServicesPageContent />;
}
