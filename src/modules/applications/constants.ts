import type { StatusTone } from "@/components/admin";
import type { ApplicationStatus, ExperienceLevel } from "./types";

export const APPLICATION_STATUS_META: Record<
  ApplicationStatus,
  { label: string; tone: StatusTone }
> = {
  new: { label: "New", tone: "info" },
  reviewing: { label: "Reviewing", tone: "warning" },
  interview: { label: "Interview", tone: "primary" },
  hired: { label: "Hired", tone: "success" },
  rejected: { label: "Rejected", tone: "neutral" },
};

export const EXPERIENCE_LEVEL_LABEL: Record<ExperienceLevel, string> = {
  entry: "Entry level",
  "1-3": "1–3 years",
  "4-6": "4–6 years",
  "7+": "7+ years",
};
