/**
 * DEMO DATA — website settings until Supabase is connected.
 * Seeded from the public site config and page metadata.
 */
import { siteConfig } from "./site";
import { siteImages } from "./images";
import type { MediaItem, WebsiteSettings } from "@/modules/settings/types";

export function buildDemoWebsiteSettings(): WebsiteSettings {
  return {
    company: {
      name: siteConfig.name,
      shortName: siteConfig.shortName,
      legalName: siteConfig.legalName,
      wordmark: siteConfig.logo.wordmark,
      subline: siteConfig.logo.subline,
      tagline: siteConfig.tagline,
      description: siteConfig.description,
      founded: siteConfig.founded,
      serviceArea: siteConfig.serviceArea,
      stats: siteConfig.stats.map((stat) => ({ ...stat })),
      socials: siteConfig.socials.map((item) => ({ ...item })),
    },
    contact: {
      phone: siteConfig.contact.phone,
      dispatchLine: siteConfig.contact.dispatchLine,
      email: siteConfig.contact.email,
      careersEmail: siteConfig.contact.careersEmail,
      address: siteConfig.contact.address,
      hours: siteConfig.hours.map((row) => ({ ...row })),
    },
    navigation: {
      header: siteConfig.navigation.map((item) => ({
        label: item.label,
        href: item.href,
        visible: true,
      })),
      footer: siteConfig.footerNavigation
        .find((group) => group.heading === "Legal")
        ?.links.map((item) => ({
          label: item.label,
          href: item.href,
          visible: true,
        })) ?? [],
    },
    seo: [
      {
        page: "Home",
        path: "/",
        title: "Truck Dispatch Services for US Carriers",
        description: "Professional 24/7 truck dispatching for owner-operators and fleets.",
      },
      {
        page: "About",
        path: "/about",
        title: "About Us",
        description:
          "Founded in 2017 in Dallas, Meridian Dispatch Group runs 24/7 dispatch desks for owner-operators and small fleets across 48 states.",
      },
      {
        page: "Services",
        path: "/services",
        title: "Dispatch Services",
        description:
          "Specialized dispatch desks for dry van, reefer, flatbed, power only, carrier setup, and billing support.",
      },
      {
        page: "Careers",
        path: "/careers",
        title: "Careers",
        description:
          "Join a dispatch team that treats freight like a craft. Open roles in dispatch operations, carrier success, and compliance.",
      },
      {
        page: "Blog",
        path: "/blog",
        title: "Freight Insights & Dispatch Guides",
        description:
          "Practical articles on rates, compliance, and growing a trucking business — written by working dispatchers.",
      },
      {
        page: "Contact",
        path: "/contact",
        title: "Contact",
        description:
          "Talk to a dispatcher about your trucks. 24/7 dispatch line, Dallas HQ, and a quick inquiry form.",
      },
    ],
    preferences: {
      maintenance: false,
      showHours: true,
      showTestimonials: true,
      footerNote: "Rates quoted per load, in writing. Month-to-month terms.",
    },
  };
}

const MEDIA_SEED: Omit<MediaItem, "id">[] = [
  {
    name: "hero-fleet.jpg",
    url: siteImages.heroFleet,
    alt: "Night highway with a line of trucks",
    tags: ["Homepage", "Hero"],
    uploaded: "Oct 12, 2026",
    size: "412 KB",
    dimensions: "1920 × 1080",
  },
  {
    name: "about-ops.jpg",
    url: siteImages.aboutOperations,
    alt: "Dispatch operations floor",
    tags: ["About", "Blog"],
    uploaded: "Oct 12, 2026",
    size: "388 KB",
    dimensions: "1600 × 1100",
  },
  {
    name: "careers-driver.jpg",
    url: siteImages.careersDriver,
    alt: "Dispatcher on a call with a driver",
    tags: ["Careers"],
    uploaded: "Oct 12, 2026",
    size: "371 KB",
    dimensions: "1600 × 1100",
  },
  {
    name: "cta-yard.jpg",
    url: siteImages.ctaYard,
    alt: "Freight yard at dusk",
    tags: ["CTA band", "Blog"],
    uploaded: "Oct 12, 2026",
    size: "436 KB",
    dimensions: "1920 × 900",
  },
  {
    name: "svc-dryvan.jpg",
    url: siteImages.serviceDryVan,
    alt: "Dry van trailer on an interstate",
    tags: ["Services"],
    uploaded: "Oct 13, 2026",
    size: "356 KB",
    dimensions: "1600 × 1000",
  },
  {
    name: "svc-reefer.jpg",
    url: siteImages.serviceReefer,
    alt: "Refrigerated trailer at a dock",
    tags: ["Services", "Blog"],
    uploaded: "Oct 13, 2026",
    size: "362 KB",
    dimensions: "1600 × 1000",
  },
];

export function buildDemoMediaLibrary(): MediaItem[] {
  return MEDIA_SEED.map((item, index) => ({
    ...item,
    id: `media-${String(index + 1).padStart(3, "0")}`,
  }));
}
