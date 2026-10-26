export type SocialLink = {
  label: string;
  href: string;
  icon: "facebook" | "instagram" | "linkedin" | "x";
};

export type SiteNavigationItem = {
  label: string;
  href: string;
};

export type FooterNavigationGroup = {
  heading: string;
  links: SiteNavigationItem[];
};

export type SiteConfig = {
  name: string;
  shortName: string;
  legalName: string;
  tagline: string;
  description: string;
  founded: number;
  contact: {
    phone: string;
    dispatchLine: string;
    email: string;
    careersEmail: string;
    address: string;
  };
  hours: Array<{ label: string; value: string }>;
  serviceArea: string;
  socials: SocialLink[];
  navigation: SiteNavigationItem[];
  footerNavigation: FooterNavigationGroup[];
  stats: Array<{ value: string; label: string }>;
};
