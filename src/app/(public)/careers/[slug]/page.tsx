import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JobDetail } from "@/components/sections/careers";
import { getJob, jobs } from "@/data/careers";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return jobs.map((job) => ({ slug: job.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const job = getJob((await params).slug);
  return job ? { title: `${job.title} | Careers`, description: job.overview } : { title: "Job Not Found" };
}

export default async function CareerDetailPage({ params }: Props) {
  const job = getJob((await params).slug);
  if (!job) notFound();
  return <JobDetail job={job} />;
}
