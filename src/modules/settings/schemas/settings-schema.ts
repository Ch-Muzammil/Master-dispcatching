import { z } from "zod";
import { SETTINGS_LIMITS as L } from "../constants";
import { SOCIAL_ICONS, type WebsiteSettings } from "../types";

const requiredText = (label: string, max: number) =>
  z
    .string()
    .trim()
    .min(1, `${label} is required.`)
    .max(max, `${label} can be up to ${max} characters.`);

const hrefField = (label: string) =>
  z
    .string()
    .trim()
    .min(1, `${label} is required.`)
    .max(L.navHref, `${label} can be up to ${L.navHref} characters.`)
    .regex(/^(\/|https?:\/\/)/, `${label} must start with / or http.`);

export const websiteSettingsSchema = z.object({
  name: requiredText("Company name", L.name),
  shortName: requiredText("Short name", L.shortName),
  legalName: requiredText("Legal name", L.legalName),
  wordmark: requiredText("Wordmark", L.wordmark),
  subline: requiredText("Logo subline", L.subline),
  tagline: requiredText("Tagline", L.tagline),
  description: requiredText("Description", L.description),
  founded: z
    .string()
    .trim()
    .regex(/^\d{4}$/, "Enter a 4-digit year.")
    .refine((year) => {
      const value = Number(year);
      return value >= 1900 && value <= new Date().getFullYear() + 1;
    }, "Founded year looks off."),
  serviceArea: requiredText("Service area", L.serviceArea),
  stats: z
    .array(
      z.object({
        value: requiredText("Stat", L.statValue),
        label: requiredText("Label", L.statLabel),
      }),
    )
    .min(L.minStats, `Add at least ${L.minStats} stats.`)
    .max(L.maxStats, `Up to ${L.maxStats} stats.`),
  socials: z
    .array(
      z.object({
        label: requiredText("Label", L.socialLabel),
        href: z
          .string()
          .trim()
          .min(1, "URL is required.")
          .url("Enter a valid URL.")
          .max(200, "URL is too long."),
        icon: z.enum(SOCIAL_ICONS),
      }),
    )
    .max(L.maxSocials, `Up to ${L.maxSocials} social links.`),
  phone: requiredText("Office phone", L.phone),
  dispatchLine: requiredText("Dispatch line", L.phone),
  email: requiredText("Contact email", L.email).pipe(z.email("Enter a valid email address.")),
  careersEmail: requiredText("Careers email", L.email).pipe(z.email("Enter a valid email address.")),
  address: requiredText("Address", L.address),
  hours: z
    .array(
      z.object({
        label: requiredText("Label", L.hoursLabel),
        value: requiredText("Hours", L.hoursValue),
      }),
    )
    .min(L.minHours, "Add at least one hours row.")
    .max(L.maxHours, `Up to ${L.maxHours} hours rows.`),
  header: z
    .array(
      z.object({
        label: requiredText("Label", L.navLabel),
        href: hrefField("Path"),
        visible: z.boolean(),
      }),
    )
    .min(L.minNav, `Keep at least ${L.minNav} header links.`)
    .max(L.maxNav, `Up to ${L.maxNav} header links.`),
  footer: z
    .array(
      z.object({
        label: requiredText("Label", L.navLabel),
        href: hrefField("Path"),
        visible: z.boolean(),
      }),
    )
    .min(1, "Keep at least one footer link.")
    .max(L.maxNav, `Up to ${L.maxNav} footer links.`),
  seo: z.array(
    z.object({
      page: z.string(),
      path: z.string(),
      title: requiredText("Title tag", L.seoTitle),
      description: requiredText("Meta description", L.seoDescription),
    }),
  ),
  maintenance: z.boolean(),
  showHours: z.boolean(),
  showTestimonials: z.boolean(),
  footerNote: requiredText("Footer note", L.footerNote),
});

export type WebsiteSettingsFormValues = z.infer<typeof websiteSettingsSchema>;

export function toSettingsFormValues(settings: WebsiteSettings): WebsiteSettingsFormValues {
  return {
    ...settings.company,
    founded: String(settings.company.founded),
    ...settings.contact,
    header: settings.navigation.header,
    footer: settings.navigation.footer,
    seo: settings.seo,
    ...settings.preferences,
  };
}
