import { describe, expect, it } from "vitest";
import { parseApplicationFilters } from "@/modules/applications/schemas/application-filters-schema";

describe("parseApplicationFilters", () => {
  it("returns defaults for empty params", () => {
    expect(parseApplicationFilters({})).toEqual({
      q: "",
      status: "all",
      job: "all",
      page: 1,
    });
  });

  it("keeps valid values and trims search", () => {
    expect(
      parseApplicationFilters({
        q: "  maya ",
        status: "interview",
        job: "dispatch-manager",
        page: "2",
      }),
    ).toEqual({
      q: "maya",
      status: "interview",
      job: "dispatch-manager",
      page: 2,
    });
  });

  it("falls back on invalid values instead of throwing", () => {
    expect(
      parseApplicationFilters({
        q: "x".repeat(500),
        status: "archived",
        job: "Not A Slug",
        page: "0",
      }),
    ).toEqual({ q: "", status: "all", job: "all", page: 1 });
  });
});
