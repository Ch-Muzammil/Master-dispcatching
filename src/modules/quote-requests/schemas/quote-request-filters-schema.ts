import { z } from "zod";
import { equipmentOptions } from "@/data/contact";
import { QUOTE_REQUEST_STATUSES, type QuoteRequestFilters } from "../types";

/**
 * Validates list filters from the URL. Anything invalid falls back to a safe
 * default instead of erroring, so a hand-edited URL never breaks the page.
 */
const quoteRequestFiltersSchema = z.object({
  q: z.string().trim().max(100).catch(""),
  status: z.enum(["all", ...QUOTE_REQUEST_STATUSES]).catch("all"),
  equipment: z.enum(["all", ...equipmentOptions]).catch("all"),
  page: z.coerce.number().int().min(1).max(10_000).catch(1),
});

type RawSearchParams = Record<string, string | string[] | undefined>;

export function parseQuoteRequestFilters(searchParams: RawSearchParams): QuoteRequestFilters {
  const first = (value: string | string[] | undefined) =>
    Array.isArray(value) ? value[0] : value;

  return quoteRequestFiltersSchema.parse({
    q: first(searchParams.q) ?? "",
    status: first(searchParams.status) ?? "all",
    equipment: first(searchParams.equipment) ?? "all",
    page: first(searchParams.page) ?? 1,
  });
}
