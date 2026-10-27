import type { SERVICE_ICON_KEYS } from "./constants";

export const SERVICE_STATUSES = ["published", "draft", "archived"] as const;

export type ServiceStatus = (typeof SERVICE_STATUSES)[number];

export type ServiceIconKey = (typeof SERVICE_ICON_KEYS)[number];

/**
 * A service as the admin manages it. Serializable (icon is a key, not a
 * component) so it can cross the server → client boundary and map to a DB row.
 */
export type AdminService = {
  id: string;
  slug: string;
  title: string;
  shortTitle: string;
  excerpt: string;
  description: string;
  iconKey: ServiceIconKey;
  bullets: string[];
  image?: string;
  imageAlt?: string;
  status: ServiceStatus;
  /** Featured services are highlighted on the home page. */
  featured: boolean;
  /** ISO date string */
  updatedAt: string;
};
