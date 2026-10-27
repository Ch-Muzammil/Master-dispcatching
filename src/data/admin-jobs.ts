/**
 * DEMO DATA — admin view of job listings until Supabase is connected.
 * Open/closed rows mirror the public careers page; the draft exists only in admin.
 */
import type { AdminJob, JobStatus, JobType } from "@/modules/careers/types";
import { jobs } from "./careers";

const HOUR = 60 * 60 * 1000;

function toStatus(status: (typeof jobs)[number]["status"]): JobStatus {
  return status === "Open" ? "open" : "closed";
}

export function buildDemoAdminJobs(now = Date.now()): AdminJob[] {
  const listed: AdminJob[] = jobs.map((job, index) => ({
    id: `job-${job.slug}`,
    slug: job.slug,
    title: job.title,
    department: job.department as AdminJob["department"],
    type: job.type as JobType,
    location: job.location,
    salary: job.salary,
    overview: job.overview,
    responsibilities: [...job.responsibilities],
    qualifications: [...job.qualifications],
    benefits: [...job.benefits],
    status: toStatus(job.status),
    postedAt: new Date(now - (48 + index * 120) * HOUR).toISOString(),
    views: job.views,
    applicants: job.applicants,
  }));

  const draft: AdminJob = {
    id: "job-weekend-board-operator",
    slug: "weekend-board-operator",
    title: "Weekend Board Operator",
    department: "Dispatch Operations",
    type: "Part-time",
    location: "Remote (US)",
    salary: "$22 – $26 / hour",
    overview:
      "Cover Saturday and Sunday load boards so the weekday desk starts Monday with trucks already booked.",
    responsibilities: [
      "Work DAT and Truckstop from 8 AM to 4 PM CT on weekends",
      "Book freight that fits the Monday plan",
      "Write a handoff for the weekday coordinators",
    ],
    qualifications: [
      "1+ year on a dispatch or brokerage desk",
      "Available every Saturday and Sunday",
    ],
    benefits: ["Weekend differential", "Fully remote", "Path onto the weekday desk"],
    status: "draft",
    postedAt: new Date(now - 6 * HOUR).toISOString(),
    views: 0,
    applicants: 0,
  };

  return [...listed, draft];
}
