import type { Metadata } from "next";
import { BlogPageContent } from "@/components/sections/blog";

export const metadata: Metadata = {
  title: "Freight Insights & Dispatch Guides",
  description:
    "Practical articles on rates, compliance, and growing a trucking business — written by working dispatchers, not content marketers.",
};

export default function BlogPage() {
  return <BlogPageContent />;
}
