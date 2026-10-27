import type { StatusTone } from "@/components/admin";
import type { JobStatus } from "./types";

export const JOB_STATUS_META: Record<
  JobStatus,
  { label: string; tone: StatusTone; description: string }
> = {
  open: {
    label: "Open",
    tone: "success",
    description: "Visible as an open role on the careers page.",
  },
  closed: {
    label: "Closed",
    tone: "neutral",
    description: "Shows under recently closed. The listing URL still works.",
  },
  draft: {
    label: "Draft",
    tone: "warning",
    description: "Only visible here until you open it.",
  },
};

export const JOB_LIMITS = {
  title: 80,
  location: 80,
  salary: 80,
  overview: 600,
  listItem: 160,
  minList: 1,
  maxList: 10,
} as const;
