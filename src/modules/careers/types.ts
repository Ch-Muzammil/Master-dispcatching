export const JOB_STATUSES = ["open", "closed", "draft"] as const;
export type JobStatus = (typeof JOB_STATUSES)[number];

export const JOB_DEPARTMENTS = [
  "Dispatch Operations",
  "Carrier Success",
  "Compliance",
] as const;
export type JobDepartment = (typeof JOB_DEPARTMENTS)[number];

export const JOB_TYPES = ["Full-time", "Part-time", "Contract"] as const;
export type JobType = (typeof JOB_TYPES)[number];

/**
 * A job listing as the admin manages it. Serializable so it can cross the
 * server → client boundary and map to a DB row later.
 */
export type AdminJob = {
  id: string;
  slug: string;
  title: string;
  department: JobDepartment;
  type: JobType;
  location: string;
  salary: string;
  overview: string;
  responsibilities: string[];
  qualifications: string[];
  benefits: string[];
  status: JobStatus;
  /** ISO date string */
  postedAt: string;
  views: number;
  applicants: number;
};
