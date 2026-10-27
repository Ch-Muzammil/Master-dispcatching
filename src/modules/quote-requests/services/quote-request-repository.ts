import { connection } from "next/server";
import { buildDemoQuoteRequests } from "@/data/quote-requests";
import {
  QUOTE_REQUEST_STATUSES,
  type QuoteRequest,
  type QuoteRequestFilters,
  type QuoteRequestListResult,
} from "../types";

export const QUOTE_REQUESTS_PAGE_SIZE = 10;

/**
 * Read access for quote requests. Reads demo data today; swap the bodies for
 * Supabase queries later — callers (dashboard, list page) stay unchanged.
 * `connection()` marks reads as per-request so counts are never frozen at build time.
 */
export async function listQuoteRequests(): Promise<QuoteRequest[]> {
  await connection();
  return buildDemoQuoteRequests().sort(
    (a, b) => Date.parse(b.receivedAt) - Date.parse(a.receivedAt),
  );
}

export async function countNewQuoteRequests(): Promise<number> {
  const requests = await listQuoteRequests();
  return requests.filter((request) => request.status === "new").length;
}

function matchesSearch(request: QuoteRequest, q: string): boolean {
  if (!q) return true;
  const needle = q.toLowerCase();
  return [request.name, request.company, request.email, request.phone].some((value) =>
    value.toLowerCase().includes(needle),
  );
}

/** Filtered, paginated list + per-status counts for the list page. */
export async function queryQuoteRequests(
  filters: QuoteRequestFilters,
): Promise<QuoteRequestListResult> {
  const all = await listQuoteRequests();

  const searched = all.filter(
    (request) =>
      matchesSearch(request, filters.q) &&
      (filters.equipment === "all" || request.equipment === filters.equipment),
  );

  const statusCounts = { all: searched.length } as QuoteRequestListResult["statusCounts"];
  for (const status of QUOTE_REQUEST_STATUSES) {
    statusCounts[status] = searched.filter((request) => request.status === status).length;
  }

  const filtered =
    filters.status === "all"
      ? searched
      : searched.filter((request) => request.status === filters.status);

  const pageCount = Math.max(1, Math.ceil(filtered.length / QUOTE_REQUESTS_PAGE_SIZE));
  const page = Math.min(filters.page, pageCount);
  const start = (page - 1) * QUOTE_REQUESTS_PAGE_SIZE;

  return {
    items: filtered.slice(start, start + QUOTE_REQUESTS_PAGE_SIZE),
    total: filtered.length,
    page,
    pageCount,
    pageSize: QUOTE_REQUESTS_PAGE_SIZE,
    statusCounts,
  };
}
