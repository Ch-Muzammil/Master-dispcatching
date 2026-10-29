import { z } from "zod";
import { PAGE_LIMITS as L } from "../constants";
import type {
  AboutPageContent,
  AdminCmsPage,
  HomePageContent,
  LandingPageContent,
  LegalPageContent,
  TestimonialsContent,
} from "../types";

const requiredText = (label: string, max: number) =>
  z
    .string()
    .trim()
    .min(1, `${label} is required.`)
    .max(max, `${label} can be up to ${max} characters.`);

const seoFields = z.object({
  seoTitle: requiredText("SEO title", L.seoTitle),
  seoDescription: requiredText("SEO description", L.seoDescription),
});

export const homePageSchema = seoFields.extend({
  headline: requiredText("Headline", L.headline),
  highlight: requiredText("Highlight", L.highlight),
  body: requiredText("Intro", L.body),
  ctaTitle: requiredText("CTA title", L.ctaTitle),
  ctaBody: requiredText("CTA body", L.ctaBody),
});

export type HomePageFormValues = z.infer<typeof homePageSchema>;

export const aboutPageSchema = seoFields.extend({
  headline: requiredText("Headline", L.headline),
  body: requiredText("Intro", L.body),
  storyTitle: requiredText("Story title", L.storyTitle),
  storyParagraphs: z
    .array(z.object({ value: requiredText("Paragraph", L.storyParagraph) }))
    .min(L.minStory, "Add at least one paragraph.")
    .max(L.maxStory, `Up to ${L.maxStory} paragraphs.`),
  values: z
    .array(
      z.object({
        title: requiredText("Value title", L.valueTitle),
        body: requiredText("Value description", L.valueBody),
      }),
    )
    .min(L.minValues, `Add at least ${L.minValues} values.`)
    .max(L.maxValues, `Up to ${L.maxValues} values.`),
  team: z
    .array(
      z.object({
        name: requiredText("Name", L.teamName),
        role: requiredText("Role", L.teamRole),
        bio: requiredText("Bio", L.teamBio),
        initials: requiredText("Initials", L.initials),
      }),
    )
    .min(L.minTeam, `Add at least ${L.minTeam} people.`)
    .max(L.maxTeam, `Up to ${L.maxTeam} people.`),
  milestones: z
    .array(
      z.object({
        year: requiredText("Year", L.year),
        text: requiredText("Milestone", L.milestone),
      }),
    )
    .min(L.minMilestones, `Add at least ${L.minMilestones} milestones.`)
    .max(L.maxMilestones, `Up to ${L.maxMilestones} milestones.`),
});

export type AboutPageFormValues = z.infer<typeof aboutPageSchema>;

export const landingPageSchema = seoFields.extend({
  headline: requiredText("Headline", L.headline),
  body: requiredText("Intro", L.body),
  ctaTitle: requiredText("CTA title", L.ctaTitle),
  ctaBody: requiredText("CTA body", L.ctaBody),
});

export type LandingPageFormValues = z.infer<typeof landingPageSchema>;

export const testimonialsSchema = seoFields.extend({
  items: z
    .array(
      z.object({
        quote: requiredText("Quote", L.quote),
        name: requiredText("Name", L.personName),
        role: requiredText("Role", L.personRole),
        initials: requiredText("Initials", L.initials),
      }),
    )
    .min(L.minTestimonials, `Add at least ${L.minTestimonials} testimonials.`)
    .max(L.maxTestimonials, `Up to ${L.maxTestimonials} testimonials.`),
});

export type TestimonialsFormValues = z.infer<typeof testimonialsSchema>;

export const legalPageSchema = seoFields.extend({
  title: requiredText("Headline", L.legalTitle),
  description: requiredText("Intro", L.legalDescription),
  updated: requiredText("Updated date", L.legalUpdated),
  sections: z
    .array(
      z.object({
        title: requiredText("Section title", L.sectionTitle),
        body: requiredText("Section body", L.sectionBody),
      }),
    )
    .min(L.minLegalSections, `Add at least ${L.minLegalSections} sections.`)
    .max(L.maxLegalSections, `Up to ${L.maxLegalSections} sections.`),
});

export type LegalPageFormValues = z.infer<typeof legalPageSchema>;

function seoDefaults(page: AdminCmsPage) {
  return { seoTitle: page.seo.title, seoDescription: page.seo.description };
}

export function toHomeFormValues(page: AdminCmsPage, content: HomePageContent): HomePageFormValues {
  return { ...content, ...seoDefaults(page) };
}

export function toAboutFormValues(page: AdminCmsPage, content: AboutPageContent): AboutPageFormValues {
  return {
    headline: content.headline,
    body: content.body,
    storyTitle: content.storyTitle,
    storyParagraphs: content.storyParagraphs.map((value) => ({ value })),
    values: content.values,
    team: content.team,
    milestones: content.milestones,
    ...seoDefaults(page),
  };
}

export function toLandingFormValues(
  page: AdminCmsPage,
  content: LandingPageContent,
): LandingPageFormValues {
  return { ...content, ...seoDefaults(page) };
}

export function toTestimonialsFormValues(
  page: AdminCmsPage,
  content: TestimonialsContent,
): TestimonialsFormValues {
  return { items: content.items, ...seoDefaults(page) };
}

export function toLegalFormValues(page: AdminCmsPage, content: LegalPageContent): LegalPageFormValues {
  return {
    title: content.title,
    description: content.description,
    updated: content.updated,
    sections: content.sections,
    ...seoDefaults(page),
  };
}
