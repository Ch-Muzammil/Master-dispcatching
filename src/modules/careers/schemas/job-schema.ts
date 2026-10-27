import { z } from "zod";
import { SLUG_PATTERN } from "@/lib/slugify";
import { JOB_LIMITS as L } from "../constants";
import { JOB_DEPARTMENTS, JOB_STATUSES, JOB_TYPES, type AdminJob } from "../types";

const requiredText = (label: string, max: number) =>
  z
    .string()
    .trim()
    .min(1, `${label} is required.`)
    .max(max, `${label} can be up to ${max} characters.`);

const listField = (label: string) =>
  z
    .array(z.object({ value: requiredText(label, L.listItem) }))
    .min(L.minList, `Add at least one ${label.toLowerCase()}.`)
    .max(L.maxList, `Up to ${L.maxList} items.`);

/** @param takenSlugs slugs used by *other* jobs — keeps URLs unique. */
export function createJobFormSchema(takenSlugs: string[] = []) {
  return z.object({
    title: requiredText("Title", L.title),
    slug: z
      .string()
      .trim()
      .min(1, "URL slug is required.")
      .max(80, "URL slug can be up to 80 characters.")
      .regex(SLUG_PATTERN, "Use lowercase letters, numbers, and single hyphens only.")
      .refine((slug) => !takenSlugs.includes(slug), "Another job already uses this URL."),
    department: z.enum(JOB_DEPARTMENTS),
    type: z.enum(JOB_TYPES),
    location: requiredText("Location", L.location),
    salary: requiredText("Pay", L.salary),
    overview: requiredText("Overview", L.overview),
    responsibilities: listField("Responsibility"),
    qualifications: listField("Qualification"),
    benefits: listField("Benefit"),
    status: z.enum(JOB_STATUSES),
  });
}

export type JobFormValues = z.infer<ReturnType<typeof createJobFormSchema>>;

function toList(values?: string[]) {
  return (values?.length ? values : [""]).map((value) => ({ value }));
}

export function toJobFormValues(job?: AdminJob): JobFormValues {
  return {
    title: job?.title ?? "",
    slug: job?.slug ?? "",
    department: job?.department ?? "Dispatch Operations",
    type: job?.type ?? "Full-time",
    location: job?.location ?? "",
    salary: job?.salary ?? "",
    overview: job?.overview ?? "",
    responsibilities: toList(job?.responsibilities),
    qualifications: toList(job?.qualifications),
    benefits: toList(job?.benefits),
    status: job?.status ?? "draft",
  };
}
