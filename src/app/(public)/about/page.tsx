import type { Metadata } from "next";
import { AboutPageContent } from "@/components/sections/about-page-content";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Founded in 2017 in Dallas, Meridian Dispatch Group runs 24/7 dispatch desks for owner-operators and small fleets across 48 states.",
};

export default function AboutPage() {
  return <AboutPageContent />;
}
