export const APPLICATION_STATUSES = [
  "new",
  "reviewing",
  "interview",
  "hired",
  "rejected",
] as const;

export type ApplicationStatus = (typeof APPLICATION_STATUSES)[number];

export const EXPERIENCE_LEVELS = ["entry", "1-3", "4-6", "7+"] as const;
export type ExperienceLevel = (typeof EXPERIENCE_LEVELS)[number];

export type ApplicationNote = {
  id: string;
  author: string;
  body: string;
  /** ISO date string */
  createdAt: string;
};

export type JobApplication = {
  id: string;
  jobSlug: string;
  jobTitle: string;
  name: string;
  email: string;
  phone: string;
  experience: ExperienceLevel;
  note: string;
  resumeName?: string;
  status: ApplicationStatus;
  /** ISO date string */
  receivedAt: string;
  notes: ApplicationNote[];
};

export type ApplicationFilters = {
  q: string;
  status: ApplicationStatus | "all";
  job: string | "all";
  page: number;
};

export type ApplicationListResult = {
  items: JobApplication[];
  total: number;
  page: number;
  pageCount: number;
  pageSize: number;
  statusCounts: Record<ApplicationStatus | "all", number>;
};

export type ApplicationJobOption = {
  slug: string;
  title: string;
};
