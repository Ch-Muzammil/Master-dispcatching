import type { LucideIcon } from "lucide-react";
import {
  Box,
  ClipboardCheck,
  FileCheck2,
  Gauge,
  Headset,
  Layers,
  ReceiptText,
  Route,
  ShieldCheck,
  Snowflake,
  Truck,
  Wrench,
} from "lucide-react";
import type { StatusTone } from "@/components/admin";
import { siteImages } from "@/data/images";
import type { ServiceIconKey, ServiceStatus } from "./types";

export const SERVICE_ICON_KEYS = [
  "box",
  "snowflake",
  "layers",
  "clipboard-check",
  "file-check",
  "receipt",
  "truck",
  "route",
  "gauge",
  "shield-check",
  "headset",
  "wrench",
] as const;

/** Icons an admin can pick for a service. Keys are what gets stored. */
export const SERVICE_ICONS: Record<ServiceIconKey, { icon: LucideIcon; label: string }> = {
  box: { icon: Box, label: "Box" },
  snowflake: { icon: Snowflake, label: "Snowflake" },
  layers: { icon: Layers, label: "Layers" },
  "clipboard-check": { icon: ClipboardCheck, label: "Clipboard" },
  "file-check": { icon: FileCheck2, label: "Document" },
  receipt: { icon: ReceiptText, label: "Receipt" },
  truck: { icon: Truck, label: "Truck" },
  route: { icon: Route, label: "Route" },
  gauge: { icon: Gauge, label: "Gauge" },
  "shield-check": { icon: ShieldCheck, label: "Shield" },
  headset: { icon: Headset, label: "Headset" },
  wrench: { icon: Wrench, label: "Wrench" },
};

export const SERVICE_STATUS_META: Record<
  ServiceStatus,
  { label: string; tone: StatusTone; description: string }
> = {
  published: {
    label: "Published",
    tone: "success",
    description: "Visible on the website.",
  },
  draft: {
    label: "Draft",
    tone: "warning",
    description: "Only visible here until you publish it.",
  },
  archived: {
    label: "Archived",
    tone: "neutral",
    description: "Hidden from the website, kept for later.",
  },
};

/** Images available until the media library ships. */
export const SERVICE_IMAGE_OPTIONS: { value: string; label: string }[] = [
  { value: siteImages.serviceDryVan, label: "Dry van on the highway" },
  { value: siteImages.serviceReefer, label: "Reefer at a warehouse" },
  { value: siteImages.heroFleet, label: "Fleet lineup" },
  { value: siteImages.ctaYard, label: "Truck yard" },
  { value: siteImages.aboutOperations, label: "Dispatch operations" },
];

export const SERVICE_LIMITS = {
  title: 80,
  shortTitle: 32,
  excerpt: 200,
  description: 600,
  bullet: 120,
  minBullets: 1,
  maxBullets: 6,
  imageAlt: 140,
} as const;
