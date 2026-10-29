/**
 * DEMO DATA — CMS pages until Supabase is connected.
 * Copy is pulled from the public site so the admin matches what visitors see.
 */
import { aboutMilestones, aboutTeam, aboutValues } from "./about";
import { privacyPolicy, termsAndConditions } from "./legal";
import { testimonials } from "./testimonials";
import type {
  AboutPageContent,
  AdminCmsPage,
  HomePageContent,
  LandingPageContent,
  LegalPageContent,
  TestimonialsContent,
} from "@/modules/pages/types";

const HOUR = 60 * 60 * 1000;

const homeContent: HomePageContent = {
  headline: "Your trucks, professionally dispatched.",
  highlight: "Around the clock.",
  body: "Meridian runs the freight office for owner-operators and small fleets - sourcing loads, negotiating rates, and handling the paperwork that eats your evenings. You drive. We dispatch.",
  ctaTitle: "Your freight office, without the overhead.",
  ctaBody:
    "Ready to put a dedicated dispatch desk behind your truck? Tell us about your equipment and lanes. We'll respond with a clear plan and an honest rate - usually within one business hour.",
};

const aboutContent: AboutPageContent = {
  headline: "The freight office behind 140 trucks",
  body: "Meridian Dispatch Group was built for a specific carrier: the owner-operator or small fleet that can't afford a full back office but deserves the same professionalism the big guys get.",
  storyTitle: "Started by dispatchers, not salespeople",
  storyParagraphs: [
    "In 2017, our founder was dispatching a handful of owner-operators out of a shared Dallas office - the kind of desk where you learn every driver's voice and every broker's habits. The business grew the honest way: one clean settlement at a time, one carrier referral at a time.",
    "Nine years later the operation is bigger, but the shape hasn't changed. Every carrier gets a named dispatcher. Every load gets negotiated before acceptance. Every night shift ends with written handoff notes. We've stayed deliberately small per desk, because dispatching quality dies at scale.",
    "Today Meridian runs specialized desks for dry van, reefer, flatbed, and power only operations, backed by compliance and billing teams - serving carriers across the lower 48 states.",
  ],
  values: aboutValues.map(({ title, body }) => ({ title, body })),
  team: aboutTeam.map((person) => ({ ...person })),
  milestones: aboutMilestones.map((item) => ({ ...item })),
};

const servicesLanding: LandingPageContent = {
  headline: "Dispatching that fits how you run",
  body: "Every carrier runs different freight in different lanes on different schedules. So we don't offer one dispatch service - we offer desks that specialize in yours.",
  ctaTitle: "Not sure which desk fits your trucks?",
  ctaBody:
    "One call is enough. Tell us your equipment and lanes and we'll tell you honestly which service - or whether dispatching with us makes sense at all.",
};

const careersLanding: LandingPageContent = {
  headline: "Work the freight, learn the craft",
  body: "We're dispatchers, coordinators, and compliance specialists who treat trucking like a trade worth mastering. Small teams, real desks, and mentorship from people who've lived the load boards.",
  ctaTitle: "Don't see your role listed?",
  ctaBody:
    "We hire hungry people ahead of openings when the fit is right. Send a note about how you'd strengthen the desk and we'll keep it on file.",
};

const contactLanding: LandingPageContent = {
  headline: "Talk to a dispatcher about your trucks",
  body: "Call the dispatch line for anything urgent — it's staffed 24/7 and a person picks up. For quotes, onboarding, and partnership questions, the form below is fastest.",
  ctaTitle: "Ready to put your trucks to work?",
  ctaBody:
    "Tell us your equipment, preferred lanes, and goals. We'll give you a clear next step and an honest rate.",
};

const testimonialsContent: TestimonialsContent = {
  items: testimonials.map((item) => ({ ...item })),
};

function toLegalContent(
  page: typeof privacyPolicy | typeof termsAndConditions,
): LegalPageContent {
  return {
    kindLabel: page.kind,
    title: page.title,
    description: page.description,
    updated: page.updated,
    sections: page.sections.map((section) => ({
      title: section.title,
      body: [section.paragraphs.join("\n\n"), section.bullets?.map((b) => `• ${b}`).join("\n")]
        .filter(Boolean)
        .join("\n\n"),
    })),
  };
}

type Seed = Omit<AdminCmsPage, "updatedAt"> & { hoursAgo: number };

const SEED: Seed[] = [
  {
    id: "page-home",
    slug: "home",
    title: "Home",
    path: "/",
    status: "published",
    kind: "home",
    hoursAgo: 18,
    sectionCount: 7,
    seo: {
      title: "Truck Dispatch Services for US Carriers",
      description: "Professional 24/7 truck dispatching for owner-operators and fleets.",
    },
    content: homeContent,
  },
  {
    id: "page-about",
    slug: "about",
    title: "About us",
    path: "/about",
    status: "published",
    kind: "about",
    hoursAgo: 96,
    sectionCount: 6,
    seo: {
      title: "About Us",
      description:
        "Founded in 2017 in Dallas, Meridian Dispatch Group runs 24/7 dispatch desks for owner-operators and small fleets across 48 states.",
    },
    content: aboutContent,
  },
  {
    id: "page-services",
    slug: "services",
    title: "Services overview",
    path: "/services",
    status: "published",
    kind: "landing",
    hoursAgo: 160,
    sectionCount: 4,
    seo: {
      title: "Dispatch Services",
      description:
        "Specialized dispatch desks for dry van, reefer, flatbed, power only, carrier setup, and billing support.",
    },
    content: servicesLanding,
  },
  {
    id: "page-careers",
    slug: "careers",
    title: "Careers",
    path: "/careers",
    status: "published",
    kind: "landing",
    hoursAgo: 220,
    sectionCount: 3,
    seo: {
      title: "Careers",
      description:
        "Join a dispatch team that treats freight like a craft. Open roles in dispatch operations, carrier success, and compliance.",
    },
    content: careersLanding,
  },
  {
    id: "page-contact",
    slug: "contact",
    title: "Contact",
    path: "/contact",
    status: "published",
    kind: "landing",
    hoursAgo: 260,
    sectionCount: 3,
    seo: {
      title: "Contact",
      description:
        "Talk to a Meridian dispatcher about your trucks, equipment, lanes, and dispatching needs.",
    },
    content: contactLanding,
  },
  {
    id: "page-testimonials",
    slug: "testimonials",
    title: "Testimonials",
    path: "/#testimonials",
    status: "published",
    kind: "testimonials",
    hoursAgo: 72,
    sectionCount: testimonials.length,
    seo: {
      title: "Carrier testimonials",
      description: "What owner-operators and small fleets say about working with the dispatch desk.",
    },
    content: testimonialsContent,
  },
  {
    id: "page-blog",
    slug: "blog",
    title: "Blog",
    path: "/blog",
    status: "published",
    kind: "linked",
    hoursAgo: 40,
    sectionCount: 4,
    seo: {
      title: "Freight Insights & Dispatch Guides",
      description:
        "Practical articles on rates, compliance, and growing a trucking business — written by working dispatchers.",
    },
    managedIn: { label: "Blog", href: "/admin/blog" },
    content: null,
  },
  {
    id: "page-faqs",
    slug: "faqs",
    title: "FAQs",
    path: "/faqs",
    status: "published",
    kind: "linked",
    hoursAgo: 30,
    sectionCount: 4,
    seo: {
      title: "FAQs",
      description: "Answers to common questions about dispatching, rates, onboarding, and coverage.",
    },
    managedIn: { label: "FAQs", href: "/admin/faqs" },
    content: null,
  },
  {
    id: "page-privacy",
    slug: "privacy",
    title: "Privacy policy",
    path: "/privacy",
    status: "published",
    kind: "legal",
    hoursAgo: 48,
    sectionCount: privacyPolicy.sections.length,
    seo: {
      title: "Privacy policy",
      description: privacyPolicy.description,
    },
    content: toLegalContent(privacyPolicy),
  },
  {
    id: "page-terms",
    slug: "terms",
    title: "Terms & conditions",
    path: "/terms",
    status: "published",
    kind: "legal",
    hoursAgo: 48,
    sectionCount: termsAndConditions.sections.length,
    seo: {
      title: "Terms & conditions",
      description: termsAndConditions.description,
    },
    content: toLegalContent(termsAndConditions),
  },
];

export function buildDemoAdminPages(now = Date.now()): AdminCmsPage[] {
  return SEED.map(({ hoursAgo, ...page }) => ({
    ...page,
    updatedAt: new Date(now - hoursAgo * HOUR).toISOString(),
  }));
}
