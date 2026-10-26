import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  Clock3,
  Mail,
  MapPin,
  Users,
} from "lucide-react";
import { buttonVariants } from "@/components/ui/Button";
import { siteConfig } from "@/config/site";
import type { Job } from "@/data/careers";
import { cn } from "@/lib/utils";
import { CtaSection } from "../home/cta-section";
import { SectionHeading } from "../shared";

function BulletList({ items, check = false }: { items: string[]; check?: boolean }) {
  return (
    <ul className="mt-6 space-y-3">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3 text-[0.95rem] text-foreground/90">
          {check ? (
            <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
          ) : (
            <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
          )}
          {item}
        </li>
      ))}
    </ul>
  );
}

function JobHeader({ job }: { job: Job }) {
  const isOpen = job.status === "Open";

  return (
    <section className="border-b bg-paper">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:py-16">
        <Link href="/careers" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline">
          <ArrowLeft className="size-4" aria-hidden />
          All careers
        </Link>
        <div className="mt-8 max-w-3xl">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">{job.department}</span>
            <span className={isOpen ? "rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground" : "rounded-full border px-3 py-1 text-xs font-semibold"}>
              {job.status}
            </span>
          </div>
          <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
            {job.title}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{job.overview}</p>
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="size-4 text-primary" aria-hidden />
              {job.location}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock3 className="size-4 text-primary" aria-hidden />
              {job.type}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Users className="size-4 text-primary" aria-hidden />
              {job.applicants} applicants · {job.views} views
            </span>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            {isOpen ? (
              <Link href={`/careers/${job.slug}/apply`} className={cn(buttonVariants({ size: "lg" }), "rounded-full px-7 font-bold")}>
                Apply for this role
              </Link>
            ) : (
              <span className={cn(buttonVariants({ size: "lg" }), "cursor-not-allowed rounded-full px-7 font-bold opacity-50")}>
                Applications closed
              </span>
            )}
            <a href={`mailto:${siteConfig.contact.careersEmail}`} className={cn(buttonVariants({ variant: "outline", size: "lg" }), "rounded-full px-7 font-bold")}>
              <Mail className="size-4" aria-hidden />
              {siteConfig.contact.careersEmail}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function PositionDetails({ job }: { job: Job }) {
  const details = [
    ["Department", job.department],
    ["Type", job.type],
    ["Location", job.location],
    ["Compensation", job.salary],
    ["Posted", job.posted],
  ];

  return (
    <aside className="space-y-6">
      <div className="rounded-xl border bg-card p-6">
        <h2 className="font-display text-lg font-bold">Position details</h2>
        <dl className="mt-4 space-y-3 text-sm">
          {details.map(([key, value]) => (
            <div key={key} className="flex justify-between gap-4 border-b border-border/60 pb-3 last:border-0 last:pb-0">
              <dt className="text-muted-foreground">{key}</dt>
              <dd className="text-right font-semibold">{value}</dd>
            </div>
          ))}
        </dl>
      </div>
      <div className="rounded-xl border bg-card p-6">
        <h2 className="font-display text-lg font-bold">Benefits</h2>
        <BulletList items={job.benefits} check />
      </div>
      <div className="rounded-xl bg-accent p-6">
        <p className="font-display text-base font-bold leading-snug text-accent-foreground">
          Most candidates complete our process in two weeks — intro call, practical exercise, panel.
        </p>
      </div>
    </aside>
  );
}

export function JobDetail({ job }: { job: Job }) {
  return (
    <>
      <JobHeader job={job} />
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr]">
          <div className="space-y-12">
            <div>
              <SectionHeading eyebrow="The role" title="What you'll do" />
              <BulletList items={job.responsibilities} />
            </div>
            <div>
              <SectionHeading eyebrow="Experience" title="What we're looking for" />
              <BulletList items={job.qualifications} check />
            </div>
          </div>
          <PositionDetails job={job} />
        </div>
      </section>
      {job.status === "Open" ? <CtaSection /> : null}
    </>
  );
}
