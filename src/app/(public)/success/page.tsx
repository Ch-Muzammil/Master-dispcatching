import type { Metadata } from "next";
import { SuccessPageContent } from "@/components/sections/success";
import { getJob } from "@/data/careers";

export const metadata: Metadata = {
  title: "Thank You",
  description: "Your message has been received by Meridian Dispatch Group.",
};

type Props = {
  searchParams: Promise<{
    from?: string;
    job?: string;
  }>;
};

export default async function SuccessPage({ searchParams }: Props) {
  const { from, job } = await searchParams;
  const jobTitle = from === "application" && job ? getJob(job)?.title : undefined;

  return <SuccessPageContent jobTitle={jobTitle} />;
}
