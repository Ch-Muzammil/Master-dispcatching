/**
 * DEMO DATA — admin view of services until Supabase is connected.
 * Published rows mirror the public site (`data/services.ts`); the draft and
 * archived rows exist only to show those states in the admin.
 */
import { SERVICE_ICONS } from "@/modules/services/constants";
import type { AdminService, ServiceIconKey } from "@/modules/services/types";
import { services } from "./services";

const HOUR = 60 * 60 * 1000;
const FEATURED_SLUGS = new Set([
  "dry-van-dispatching",
  "refrigerated-dispatching",
  "flatbed-step-deck-dispatching",
]);

function iconKeyFor(icon: (typeof services)[number]["icon"]): ServiceIconKey {
  const match = Object.entries(SERVICE_ICONS).find(([, option]) => option.icon === icon);
  return (match?.[0] as ServiceIconKey | undefined) ?? "truck";
}

type DemoExtra = Omit<AdminService, "updatedAt"> & { updatedHoursAgo: number };

const EXTRA_ROWS: DemoExtra[] = [
  {
    id: "svc-hotshot",
    slug: "hotshot-dispatching",
    title: "Hotshot Dispatching",
    shortTitle: "Hotshot",
    excerpt: "Time-critical hotshot loads for gooseneck and dually setups, matched to your weight limits.",
    description: "Expedited freight planning for hotshot operators who need loads that fit their trailer length and CDL class.",
    iconKey: "gauge",
    bullets: [
      "Loads matched to trailer length and weight limits",
      "Expedited lanes with same-day pickup",
    ],
    status: "draft",
    featured: false,
    updatedHoursAgo: 5,
  },
  {
    id: "svc-load-board-training",
    slug: "load-board-training",
    title: "Load Board Training",
    shortTitle: "Training",
    excerpt: "One-on-one sessions teaching new owner-operators to read load boards and spot bad rates.",
    description: "Hands-on coaching for carriers who want to book some of their own freight with confidence.",
    iconKey: "headset",
    bullets: ["Live board walkthroughs", "Rate-per-mile benchmarks by lane"],
    status: "archived",
    featured: false,
    updatedHoursAgo: 900,
  },
];

export function buildDemoAdminServices(now = Date.now()): AdminService[] {
  const published: AdminService[] = services.map((service, index) => ({
    id: `svc-${service.slug}`,
    slug: service.slug,
    title: service.title,
    shortTitle: service.shortTitle,
    excerpt: service.excerpt,
    description: service.description,
    iconKey: iconKeyFor(service.icon),
    bullets: [...service.bullets],
    image: service.image,
    imageAlt: service.imageAlt,
    status: "published",
    featured: FEATURED_SLUGS.has(service.slug),
    updatedAt: new Date(now - (24 + index * 70) * HOUR).toISOString(),
  }));

  const extras = EXTRA_ROWS.map(({ updatedHoursAgo, ...row }) => ({
    ...row,
    updatedAt: new Date(now - updatedHoursAgo * HOUR).toISOString(),
  }));

  return [...published, ...extras];
}
