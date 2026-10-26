import Link from "next/link";
import { Eyebrow } from "../shared";
import type { Job } from "@/data/careers";
import { ApplicationForm } from "./application-form";

export function ApplicationPageContent({ job }: { job: Job }) {
  return (
    <>
      <section className="border-b bg-paper">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:py-16">
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-sm">
            <Link href="/" className="text-muted-foreground hover:text-foreground">Home</Link>
            <span aria-hidden className="text-muted-foreground/60">/</span>
            <Link href="/careers" className="text-muted-foreground hover:text-foreground">Careers</Link>
            <span aria-hidden className="text-muted-foreground/60">/</span>
            <Link href={`/careers/${job.slug}`} className="text-muted-foreground hover:text-foreground">{job.title}</Link>
            <span aria-hidden className="text-muted-foreground/60">/</span>
            <span className="font-semibold">Apply</span>
          </nav>
          <div className="mt-6 max-w-2xl">
            <Eyebrow>Application</Eyebrow>
            <h1 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              Apply — {job.title}
            </h1>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Two minutes of your time and one honest paragraph beat a polished but generic cover letter. We read every application ourselves.
            </p>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
        <ApplicationForm job={job} />
      </section>
    </>
  );
}
