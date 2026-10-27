import type { StatusTone } from "@/components/admin";
import { aboutTeam } from "@/data/about";
import { siteImages } from "@/data/images";
import type { AdminPostBlock, BlogAuthor, PostBlockKind, PostStatus } from "./types";

export const POST_STATUS_META: Record<
  PostStatus,
  { label: string; tone: StatusTone; description: string }
> = {
  published: {
    label: "Published",
    tone: "success",
    description: "Visible on the blog.",
  },
  draft: {
    label: "Draft",
    tone: "warning",
    description: "Only visible here until you publish it.",
  },
  archived: {
    label: "Archived",
    tone: "neutral",
    description: "Hidden from the blog, kept for later.",
  },
};

export const POST_BLOCK_KIND_META: Record<PostBlockKind, { label: string; placeholder: string }> = {
  p: { label: "Paragraph", placeholder: "Write the next paragraph…" },
  h: { label: "Heading", placeholder: "Section heading" },
  list: { label: "Bullets", placeholder: "One point per line" },
  quote: { label: "Quote", placeholder: "A pull quote that earns the space" },
};

export const BLOG_AUTHORS: BlogAuthor[] = [
  ...aboutTeam.map(({ name, role, initials }) => ({ name, role, initials })),
  { name: "Elena Torres", role: "Carrier Setup Lead", initials: "ET" },
];

export const BLOG_COVER_OPTIONS: { value: string; label: string }[] = [
  { value: siteImages.aboutOperations, label: "Dispatch operations" },
  { value: siteImages.heroFleet, label: "Fleet lineup" },
  { value: siteImages.serviceReefer, label: "Reefer at a warehouse" },
  { value: siteImages.careersDriver, label: "Driver at the truck" },
  { value: siteImages.ctaYard, label: "Truck yard" },
  { value: siteImages.serviceDryVan, label: "Dry van on the highway" },
];

export const POST_LIMITS = {
  title: 120,
  excerpt: 280,
  coverAlt: 140,
  block: 2000,
  minBlocks: 1,
  maxBlocks: 30,
} as const;

/** ~200 words per minute, always at least one minute. */
export function estimateReadTime(blocks: AdminPostBlock[]): string {
  const words = blocks.reduce(
    (total, block) => total + block.text.split(/\s+/).filter(Boolean).length,
    0,
  );
  return `${Math.max(1, Math.round(words / 200))} min read`;
}
