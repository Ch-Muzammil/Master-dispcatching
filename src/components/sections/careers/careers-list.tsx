"use client";

import { useState } from "react";
import { jobDepartments, jobs } from "@/data/careers";
import { JobCard } from "./job-card";

export function CareersList() {
  const [department, setDepartment] = useState<(typeof jobDepartments)[number]>(jobDepartments[0]);
  const open = jobs.filter((job) => job.status === "Open" && (department === jobDepartments[0] || job.department === department));
  const closed = jobs.filter((job) => job.status === "Closed");

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-20">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Open positions</p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{open.length} roles open right now</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {jobDepartments.map((item) => <button key={item} type="button" onClick={() => setDepartment(item)} className={item === department ? "rounded-full bg-primary px-4 py-1.5 text-sm font-semibold text-primary-foreground" : "rounded-full border border-input bg-background px-4 py-1.5 text-sm font-semibold text-muted-foreground transition-colors hover:bg-secondary"}>{item}</button>)}
        </div>
      </div>
      <div className="mt-10 space-y-4">
        {open.map((job) => <JobCard key={job.slug} job={job} />)}
        {!open.length ? <p className="rounded-xl border bg-card p-8 text-center text-sm text-muted-foreground">No open roles in this department right now — check back soon.</p> : null}
      </div>
      {closed.length ? <div className="mt-10 border-t pt-8"><h3 className="text-sm font-bold uppercase tracking-[0.18em] text-muted-foreground">Recently closed</h3><ul className="mt-4 space-y-2">{closed.map((job) => <li key={job.slug} className="flex flex-wrap items-center gap-3 text-sm"><span className="font-semibold text-muted-foreground">{job.title}</span><span className="rounded-full border px-3 py-1 text-xs">Closed · {job.posted}</span></li>)}</ul></div> : null}
    </section>
  );
}
