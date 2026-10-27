import { describe, expect, it } from "vitest";
import {
  createServiceFormSchema,
  toServiceFormValues,
} from "@/modules/services/schemas/service-schema";

const valid = {
  ...toServiceFormValues(),
  title: "Hotshot Dispatching",
  shortTitle: "Hotshot",
  slug: "hotshot-dispatching",
  excerpt: "Expedited loads for hotshot setups.",
  description: "Planning for gooseneck and dually operators.",
  bullets: [{ value: "Same-day pickups" }],
};

describe("service form schema", () => {
  it("accepts a complete service", () => {
    expect(createServiceFormSchema().safeParse(valid).success).toBe(true);
  });

  it("rejects a slug another service already uses", () => {
    const result = createServiceFormSchema(["hotshot-dispatching"]).safeParse(valid);
    expect(result.success).toBe(false);
    expect(result.error?.issues[0]?.path).toEqual(["slug"]);
  });

  it("requires alt text when an image is chosen", () => {
    const result = createServiceFormSchema().safeParse({ ...valid, image: "/images/x.jpg" });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0]?.path).toEqual(["imageAlt"]);
  });

  it("requires at least one non-empty key point", () => {
    expect(createServiceFormSchema().safeParse({ ...valid, bullets: [] }).success).toBe(false);
    expect(
      createServiceFormSchema().safeParse({ ...valid, bullets: [{ value: "  " }] }).success,
    ).toBe(false);
  });

  it("defaults new services to draft", () => {
    expect(toServiceFormValues().status).toBe("draft");
  });
});
