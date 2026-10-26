import type { LucideIcon } from "lucide-react";
import {
  Box,
  ClipboardCheck,
  FileCheck2,
  Layers,
  ReceiptText,
  Snowflake,
} from "lucide-react";
import { siteImages } from "./images";

export type Service = {
  slug: string;
  title: string;
  shortTitle: string;
  excerpt: string;
  description: string;
  icon: LucideIcon;
  bullets: string[];
  image?: string;
  imageAlt?: string;
};

export const services: Service[] = [
  {
    slug: "dry-van-dispatching",
    title: "Dry Van Dispatching",
    shortTitle: "Dry Van",
    excerpt: "Full-service dispatching for dry van carriers - freight sourced, rates negotiated, and paperwork handled while you drive.",
    description: "A consistent freight pipeline for dry van carriers who want to spend less time searching boards and more time moving profitable loads.",
    icon: Box,
    image: siteImages.serviceDryVan,
    imageAlt: "Dry van semi-truck on an interstate highway",
    bullets: [
      "Daily load sourcing matched to your lanes",
      "Rate negotiation with brokers and shippers before you commit",
      "Complete broker setup packets and rate confirmations",
    ],
  },
  {
    slug: "refrigerated-dispatching",
    title: "Refrigerated Dispatching",
    shortTitle: "Refrigerated",
    excerpt: "Temperature-controlled freight dispatching with the clock discipline reefer loads demand - claims-aware, appointment-ready.",
    description: "Reefer dispatching built around appointment windows, temperature requirements, and the documentation that protects your operation.",
    icon: Snowflake,
    image: siteImages.serviceReefer,
    imageAlt: "Refrigerated trailer at a distribution warehouse",
    bullets: [
      "Load planning around pickup windows and delivery appointments",
      "Pre-cool reminders and temperature documentation guidance",
      "Claims-aware handling of pulp, temperature, and accessorial issues",
    ],
  },
  {
    slug: "flatbed-step-deck-dispatching",
    title: "Flatbed & Step Deck Dispatching",
    shortTitle: "Flatbed & Step Deck",
    excerpt: "Specialized dispatching for flatbed, step deck, and overdimensional freight - securement plans and permits handled.",
    description: "Specialized flatbed and step deck support for freight that needs careful planning, accurate permits, and realistic route coordination.",
    icon: Layers,
    bullets: [
      "Freight sourcing across construction, manufacturing, and equipment lanes",
      "Overdimensional and overweight permit coordination by state",
      "Routing that accounts for restrictions, escorts, and securement",
    ],
  },
  {
    slug: "power-only-dispatching",
    title: "Power Only Dispatching",
    shortTitle: "Power Only",
    excerpt: "Drop-and-hook power only freight that keeps your tractor earning without a trailer payment.",
    description: "Power-only opportunities matched to your tractor, preferred lanes, and the trailer pools you can actually access.",
    icon: ClipboardCheck,
    bullets: [
      "Access to established trailer pools and power-only networks",
      "Drop-and-hook lane plans with realistic dwell expectations",
      "Trailer swap coordination and pool compliance paperwork",
    ],
  },
  {
    slug: "carrier-setup-compliance",
    title: "Carrier Setup & Compliance",
    shortTitle: "Carrier Setup",
    excerpt: "Broker packets, authority paperwork, and FMCSA compliance handled by people who file them every day.",
    description: "The administrative support that gets your carrier ready to book with confidence and keeps your core documents organized.",
    icon: FileCheck2,
    bullets: [
      "Complete broker packet assembly and submission tracking",
      "Authority and insurance certificate management",
      "Renewal reminders and document organization",
    ],
  },
  {
    slug: "billing-paperwork-support",
    title: "Billing & Paperwork Support",
    shortTitle: "Billing & Paperwork",
    excerpt: "Invoicing, collections, and document management that turns finished loads into settled cash faster.",
    description: "A clean paperwork process from signed POD to invoice, with follow-up that helps keep your revenue moving.",
    icon: ReceiptText,
    bullets: [
      "Same-day invoicing from PODs and rate confirmations",
      "Broker credit checks before you commit to a load",
      "Collection follow-ups on past-due invoices",
    ],
  },
];
