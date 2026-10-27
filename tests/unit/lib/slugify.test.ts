import { describe, expect, it } from "vitest";
import { slugify, SLUG_PATTERN } from "@/lib/slugify";

describe("slugify", () => {
  it("builds URL-safe slugs", () => {
    expect(slugify("Flatbed & Step Deck Dispatching")).toBe("flatbed-step-deck-dispatching");
    expect(slugify("  Hotshot -- Dispatching!  ")).toBe("hotshot-dispatching");
    expect(slugify("Café Logística")).toBe("cafe-logistica");
  });

  it("returns empty string when nothing usable remains", () => {
    expect(slugify("!!!")).toBe("");
  });

  it("caps length without a trailing hyphen", () => {
    const slug = slugify("word ".repeat(40));
    expect(slug.length).toBeLessThanOrEqual(80);
    expect(slug.endsWith("-")).toBe(false);
  });

  it("produces values that pass the slug pattern", () => {
    expect(SLUG_PATTERN.test(slugify("Power Only Dispatching"))).toBe(true);
    expect(SLUG_PATTERN.test("Bad Slug")).toBe(false);
    expect(SLUG_PATTERN.test("double--hyphen")).toBe(false);
  });
});
