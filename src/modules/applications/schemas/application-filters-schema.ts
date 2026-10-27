import { z } from "zod";
import { APPLICATION_STATUSES, type ApplicationFilters } from "../types";

const applicationFiltersSchema = z.object({
  q: z.string().trim().max(100).catch(""),
  status: z.enum(["all", ...APPLICATION_STATUSES]).catch("all"),
  job: z
    .string()
    .trim()
    .max(80)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$|^all$/)
    .catch("all"),
  page: z.coerce.number().int().min(1).max(10_000).catch(1),
});

type RawSearchParams = Record<string, string | string[] | undefined>;

export function parseApplicationFilters(searchParams: RawSearchParams): ApplicationFilters {
  const first = (value: string | string[] | undefined) =>
    Array.isArray(value) ? value[0] : value;

  return applicationFiltersSchema.parse({
    q: first(searchParams.q) ?? "",
    status: first(searchParams.status) ?? "all",
    job: first(searchParams.job) ?? "all",
    page: first(searchParams.page) ?? 1,
  });
}
