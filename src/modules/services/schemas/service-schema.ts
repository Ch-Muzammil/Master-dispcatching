import { z } from "zod";
import { SLUG_PATTERN } from "@/lib/slugify";
import { SERVICE_ICON_KEYS, SERVICE_LIMITS as L } from "../constants";
import { SERVICE_STATUSES, type AdminService } from "../types";

const requiredText = (label: string, max: number) =>
  z
    .string()
    .trim()
    .min(1, `${label} is required.`)
    .max(max, `${label} can be up to ${max} characters.`);

/** @param takenSlugs slugs used by *other* services — keeps URLs unique. */
export function createServiceFormSchema(takenSlugs: string[] = []) {
  return z
  .object({
    title: requiredText("Title", L.title),
    shortTitle: requiredText("Short title", L.shortTitle),
    slug: z
      .string()
      .trim()
      .min(1, "URL slug is required.")
      .max(80, "URL slug can be up to 80 characters.")
      .regex(SLUG_PATTERN, "Use lowercase letters, numbers, and single hyphens only.")
      .refine((slug) => !takenSlugs.includes(slug), "Another service already uses this URL."),
    excerpt: requiredText("Summary", L.excerpt),
    description: requiredText("Description", L.description),
    iconKey: z.enum(SERVICE_ICON_KEYS),
    bullets: z
      .array(z.object({ value: requiredText("Point", L.bullet) }))
      .min(L.minBullets, "Add at least one key point.")
      .max(L.maxBullets, `Up to ${L.maxBullets} key points.`),
    image: z.string(),
    imageAlt: z.string().trim().max(L.imageAlt, `Alt text can be up to ${L.imageAlt} characters.`),
    status: z.enum(SERVICE_STATUSES),
    featured: z.boolean(),
  })
  .refine((values) => !values.image || values.imageAlt.length > 0, {
    path: ["imageAlt"],
    message: "Describe the image for screen readers and SEO.",
  });
}

export type ServiceFormValues = z.infer<ReturnType<typeof createServiceFormSchema>>;

/** Field array items need an object shape; keep the conversion in one place. */
export function toServiceFormValues(service?: AdminService): ServiceFormValues {
  return {
    title: service?.title ?? "",
    shortTitle: service?.shortTitle ?? "",
    slug: service?.slug ?? "",
    excerpt: service?.excerpt ?? "",
    description: service?.description ?? "",
    iconKey: service?.iconKey ?? "truck",
    bullets: (service?.bullets.length ? service.bullets : [""]).map((value) => ({ value })),
    image: service?.image ?? "",
    imageAlt: service?.imageAlt ?? "",
    status: service?.status ?? "draft",
    featured: service?.featured ?? false,
  };
}
