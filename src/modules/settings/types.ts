export const SOCIAL_ICONS = ["linkedin", "facebook", "instagram", "x"] as const;
export type SocialIconKey = (typeof SOCIAL_ICONS)[number];

export type HoursRow = { label: string; value: string };
export type SocialRow = { label: string; href: string; icon: SocialIconKey };
export type NavRow = { label: string; href: string; visible: boolean };
export type SeoRow = { page: string; path: string; title: string; description: string };
export type StatRow = { value: string; label: string };

export type MediaItem = {
  id: string;
  name: string;
  url: string;
  alt: string;
  tags: string[];
  uploaded: string;
  size: string;
  dimensions: string;
};

export type WebsiteSettings = {
  company: {
    name: string;
    shortName: string;
    legalName: string;
    wordmark: string;
    subline: string;
    tagline: string;
    description: string;
    founded: number;
    serviceArea: string;
    stats: StatRow[];
    socials: SocialRow[];
  };
  contact: {
    phone: string;
    dispatchLine: string;
    email: string;
    careersEmail: string;
    address: string;
    hours: HoursRow[];
  };
  navigation: {
    header: NavRow[];
    footer: NavRow[];
  };
  seo: SeoRow[];
  preferences: {
    maintenance: boolean;
    showHours: boolean;
    showTestimonials: boolean;
    footerNote: string;
  };
};
