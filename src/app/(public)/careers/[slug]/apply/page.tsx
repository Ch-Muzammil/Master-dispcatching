import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ApplicationPageContent } from "@/components/sections/careers";
import { getJob, jobs } from "@/data/careers";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return jobs.map((job) => ({ slug: job.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const job = getJob((await params).slug);
  return job
    ? {
        title: `Apply: ${job.title}`,
        description: "Submit your application for a role on the Meridian dispatch team.",
      }
    : { title: "Application Not Found" };
}

export default async function ApplicationPage({ params }: Props) {
  const job = getJob((await params).slug);
  if (!job) notFound();
  return <ApplicationPageContent job={job} />;
}
