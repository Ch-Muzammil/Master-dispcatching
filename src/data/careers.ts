export type Job = {
  slug: string;
  title: string;
  department: string;
  type: string;
  location: string;
  salary: string;
  posted: string;
  status: "Open" | "Closed";
  views: number;
  applicants: number;
  overview: string;
  responsibilities: string[];
  qualifications: string[];
  benefits: string[];
};

export const jobs: Job[] = [
  {
    slug: "dispatch-manager",
    title: "Dispatch Manager",
    department: "Dispatch Operations",
    type: "Full-time",
    location: "Dallas, TX · Hybrid",
    salary: "$68,000 – $85,000 / year",
    posted: "Oct 12, 2026",
    status: "Open",
    views: 486,
    applicants: 17,
    overview: "Own a desk of 15–20 trucks and the dispatchers supporting them. Set lane strategy, mentor junior coordinators, and be the escalation point when a load goes sideways.",
    responsibilities: ["Manage 15–20 active trucks across dry van, reefer, and flatbed", "Build weekly lane plans balancing rate, deadhead, and home time", "Coach 2–4 dispatch coordinators on negotiation and load planning", "Own broker escalations, detention claims, and service failures", "Review rate confirmations before dispatch", "Report weekly on gross per truck and lane mix"],
    qualifications: ["3+ years of freight dispatch or brokerage experience", "Working knowledge of load boards, TMS platforms, and ELD systems", "Track record negotiating rates for carriers", "Clear, calm phone presence", "FMCSA hours-of-service and ELD compliance fluency"],
    benefits: ["Medical, dental, and vision coverage", "401(k) with 4% company match", "Hybrid schedule — 3 days in office", "Paid time off and freight-industry training"],
  },
  {
    slug: "night-shift-freight-coordinator",
    title: "Freight Coordinator — Night Shift",
    department: "Dispatch Operations",
    type: "Full-time",
    location: "Remote (US)",
    salary: "$20 – $25 / hour + shift differential",
    posted: "Oct 8, 2026",
    status: "Open",
    views: 612,
    applicants: 24,
    overview: "Run the overnight desk from 6 PM to 2 AM CT. Source loads, confirm appointments, and keep trucks rolling while the day desk sleeps.",
    responsibilities: ["Source and book overnight freight for 25+ trucks", "Confirm pickup appointments and update delivery schedules", "Handle check calls, breakdowns, and broker issues", "Prepare dispatch packets for morning drivers", "Hand off cleanly with written shift summaries"],
    qualifications: ["1+ year in dispatch, brokerage, or carrier operations", "Comfortable working independently through the night", "Sharp written communication", "Familiarity with DAT, Truckstop, or similar boards"],
    benefits: ["Night shift differential", "Fully remote with company-provided equipment", "Medical, dental, and vision coverage", "Four-day work week rotation"],
  },
  {
    slug: "carrier-relations-liaison",
    title: "Carrier Relations Liaison",
    department: "Carrier Success",
    type: "Full-time",
    location: "Dallas, TX · On-site",
    salary: "$55,000 – $70,000 / year",
    posted: "Sep 30, 2026",
    status: "Open",
    views: 341,
    applicants: 11,
    overview: "Be the face of Meridian to our carriers. Onboard new authorities, run quarterly business reviews, and turn churn risk into renewals.",
    responsibilities: ["Onboard new carriers and match dispatchers", "Run quarterly reviews covering gross and lane mix", "Resolve satisfaction issues before cancellations", "Maintain the carrier playbook", "Feed carrier feedback into service decisions"],
    qualifications: ["2+ years in carrier sales, account management, or dispatch", "Genuine respect for owner-operators and small fleets", "Organized enough to run 40+ relationships", "Bilingual English/Spanish strongly preferred"],
    benefits: ["Medical, dental, and vision coverage", "401(k) with 4% company match", "Annual performance bonus", "Paid industry conferences and certifications"],
  },
  {
    slug: "junior-load-planner",
    title: "Junior Load Planner",
    department: "Dispatch Operations",
    type: "Full-time",
    location: "Remote (US)",
    salary: "$42,000 – $52,000 / year",
    posted: "Oct 18, 2026",
    status: "Open",
    views: 209,
    applicants: 31,
    overview: "Start your freight career on a real desk. Support senior dispatchers with load research, appointment scheduling, and paperwork while learning the negotiation craft.",
    responsibilities: ["Research loads across DAT, Truckstop, and direct boards", "Prepare rate comparison sheets", "Schedule appointments and maintain delivery calendars", "Assemble broker packets", "Log check calls and update the TMS"],
    qualifications: ["Freight curiosity — experience welcome, hunger required", "Solid spreadsheet skills and attention to detail", "Professional phone and chat communication", "Available for a 2 PM – 10 PM CT training rotation"],
    benefits: ["Structured mentorship", "Fully remote with company-provided equipment", "Medical, dental, and vision coverage", "Defined promotion path to coordinator"],
  },
  {
    slug: "safety-compliance-specialist",
    title: "Safety & Compliance Specialist",
    department: "Compliance",
    type: "Full-time",
    location: "Dallas, TX · Hybrid",
    salary: "$60,000 – $78,000 / year",
    posted: "Sep 22, 2026",
    status: "Closed",
    views: 554,
    applicants: 26,
    overview: "Keep 140 carriers audit-ready. Monitor safety scores, manage corrective action plans, and guide carriers through FMCSA reviews.",
    responsibilities: ["Monitor SMS scores and BASIC categories", "Prepare DataQ challenges and corrections", "Guide carriers through FMCSA safety audits", "Maintain insurance, UCR, and IFTA calendars", "Deliver quarterly compliance training"],
    qualifications: ["3+ years in carrier safety or compliance", "Deep FMCSA regulations knowledge", "Experience preparing for audits", "Comfortable presenting to drivers and fleet owners"],
    benefits: ["Medical, dental, and vision coverage", "401(k) with 4% company match", "Hybrid schedule — 3 days in office", "Annual compliance certification budget"],
  },
];

export function getJob(slug: string) {
  return jobs.find((job) => job.slug === slug);
}

export const jobDepartments = ["All departments", "Dispatch Operations", "Carrier Success", "Compliance"] as const;
