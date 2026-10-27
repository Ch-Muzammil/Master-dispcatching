import { describe, expect, it } from "vitest";
import { createJobFormSchema, toJobFormValues } from "@/modules/careers/schemas/job-schema";

const valid = {
  ...toJobFormValues(),
  title: "Weekend Board Operator",
  slug: "weekend-board-operator",
  location: "Remote (US)",
  salary: "$22 – $26 / hour",
  overview: "Cover Saturday and Sunday load boards for the weekday desk.",
  responsibilities: [{ value: "Work DAT from 8 AM to 4 PM CT" }],
  qualifications: [{ value: "1+ year on a dispatch desk" }],
  benefits: [{ value: "Weekend differential" }],
};

describe("job form schema", () => {
  it("accepts a complete listing", () => {
    expect(createJobFormSchema().safeParse(valid).success).toBe(true);
  });

  it("rejects a slug another job already uses", () => {
    const result = createJobFormSchema(["weekend-board-operator"]).safeParse(valid);
    expect(result.success).toBe(false);
    expect(result.error?.issues[0]?.path).toEqual(["slug"]);
  });

  it("requires at least one item in each list", () => {
    expect(
      createJobFormSchema().safeParse({ ...valid, responsibilities: [] }).success,
    ).toBe(false);
    expect(
      createJobFormSchema().safeParse({ ...valid, qualifications: [{ value: "  " }] }).success,
    ).toBe(false);
  });

  it("defaults new listings to draft", () => {
    expect(toJobFormValues().status).toBe("draft");
  });
});
