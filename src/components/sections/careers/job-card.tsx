import Link from "next/link";
import { ArrowRight, MapPin, Users } from "lucide-react";
import type { Job } from "@/data/careers";

export function JobCard({ job }: { job: Job }) {
  return (
    <Link href={`/careers/${job.slug}`} className="group grid gap-4 rounded-xl border bg-card p-6 transition-all hover:-translate-y-0.5 hover:border-accent hover:shadow-lg sm:p-8 lg:grid-cols-[1fr_auto] lg:items-center">
      <div>
        <div className="flex flex-wrap items-center gap-3">
          <h2 className="font-display text-xl font-bold tracking-tight group-hover:underline sm:text-2xl">{job.title}</h2>
          <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground">{job.department}</span>
        </div>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">{job.overview}</p>
        <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-xs font-medium text-muted-foreground">
          <span className="inline-flex items-center gap-1.5"><MapPin className="size-3.5 text-primary" aria-hidden />{job.location}</span>
          <span className="inline-flex items-center gap-1.5"><Users className="size-3.5 text-primary" aria-hidden />{job.applicants} applicants</span>
          <span>{job.salary}</span>
        </div>
      </div>
      <span className="inline-flex items-center gap-1.5 self-start text-sm font-bold text-primary lg:self-center">View role <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden /></span>
    </Link>
  );
}
