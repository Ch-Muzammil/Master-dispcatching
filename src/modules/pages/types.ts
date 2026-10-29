export const PAGE_STATUSES = ["published", "draft"] as const;
export type PageStatus = (typeof PAGE_STATUSES)[number];

export const PAGE_KINDS = [
  "home",
  "about",
  "landing",
  "testimonials",
  "legal",
  "linked",
] as const;
export type PageKind = (typeof PAGE_KINDS)[number];

export type SeoFields = {
  title: string;
  description: string;
};

export type HomePageContent = {
  headline: string;
  highlight: string;
  body: string;
  ctaTitle: string;
  ctaBody: string;
};

export type AboutValueItem = { title: string; body: string };
export type AboutTeamMember = { name: string; role: string; bio: string; initials: string };
export type AboutMilestone = { year: string; text: string };

export type AboutPageContent = {
  headline: string;
  body: string;
  storyTitle: string;
  storyParagraphs: string[];
  values: AboutValueItem[];
  team: AboutTeamMember[];
  milestones: AboutMilestone[];
};

export type LandingPageContent = {
  headline: string;
  body: string;
  ctaTitle: string;
  ctaBody: string;
};

export type TestimonialItem = {
  quote: string;
  name: string;
  role: string;
  initials: string;
};

export type TestimonialsContent = {
  items: TestimonialItem[];
};

export type LegalSectionItem = {
  title: string;
  body: string;
};

export type LegalPageContent = {
  kindLabel: string;
  title: string;
  description: string;
  updated: string;
  sections: LegalSectionItem[];
};

export type LinkedPageMeta = {
  label: string;
  href: string;
};

export type PageContent =
  | HomePageContent
  | AboutPageContent
  | LandingPageContent
  | TestimonialsContent
  | LegalPageContent
  | null;

export type AdminCmsPage = {
  id: string;
  slug: string;
  title: string;
  path: string;
  status: PageStatus;
  kind: PageKind;
  updatedAt: string;
  sectionCount: number;
  seo: SeoFields;
  /** When set, this page is edited in another admin section. */
  managedIn?: LinkedPageMeta;
  content: PageContent;
};
