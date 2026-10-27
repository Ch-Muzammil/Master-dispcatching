import { describe, expect, it } from "vitest";
import { parseQuoteRequestFilters } from "@/modules/quote-requests/schemas/quote-request-filters-schema";
import { isFollowUpOverdue } from "@/modules/quote-requests/constants";
import type { QuoteRequest } from "@/modules/quote-requests/types";

describe("parseQuoteRequestFilters", () => {
  it("returns defaults for empty params", () => {
    expect(parseQuoteRequestFilters({})).toEqual({
      q: "",
      status: "all",
      equipment: "all",
      page: 1,
    });
  });

  it("keeps valid values and trims search", () => {
    expect(
      parseQuoteRequestFilters({ q: "  acme ", status: "won", equipment: "Flatbed", page: "3" }),
    ).toEqual({ q: "acme", status: "won", equipment: "Flatbed", page: 3 });
  });

  it("falls back on invalid values instead of throwing", () => {
    expect(
      parseQuoteRequestFilters({
        q: "x".repeat(500),
        status: "deleted",
        equipment: "Spaceship",
        page: "-4",
      }),
    ).toEqual({ q: "", status: "all", equipment: "all", page: 1 });
    expect(parseQuoteRequestFilters({ page: "abc" }).page).toBe(1);
  });

  it("uses the first value when a param repeats", () => {
    expect(parseQuoteRequestFilters({ status: ["new", "won"] }).status).toBe("new");
  });
});

describe("isFollowUpOverdue", () => {
  const now = Date.parse("2026-10-27T12:00:00Z");
  const base = { status: "contacted", followUpAt: "2026-10-27T10:00:00Z" } as QuoteRequest;

  it("flags open leads past their follow-up time", () => {
    expect(isFollowUpOverdue(base, now)).toBe(true);
  });

  it("ignores closed leads and future or missing follow-ups", () => {
    expect(isFollowUpOverdue({ ...base, status: "won" }, now)).toBe(false);
    expect(isFollowUpOverdue({ ...base, followUpAt: "2026-10-28T10:00:00Z" }, now)).toBe(false);
    expect(isFollowUpOverdue({ ...base, followUpAt: undefined }, now)).toBe(false);
  });
});
