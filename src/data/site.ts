import type { SiteConfig } from "@/types/site";

export const siteConfig: SiteConfig = {
  name: "Meridian Dispatch Group",
  shortName: "Meridian",
  legalName: "Meridian Dispatch Group LLC",
  tagline: "Truck dispatching built for carriers that mean business.",
  description:
    "Professional 24/7 truck dispatching for owner-operators and fleets.",
  founded: 2017,
  contact: {
    phone: "(469) 555-0142",
    dispatchLine: "(469) 555-0199",
    email: "dispatch@meridiandispatch.com",
    careersEmail: "careers@meridiandispatch.com",
    address: "4100 Alpha Rd, Suite 520, Dallas, TX 75244",
  },
  hours: [
    { label: "Dispatch desk", value: "24/7, every day" },
    { label: "Office & onboarding", value: "Mon-Fri, 8:00 AM - 6:00 PM CT" },
    { label: "Billing support", value: "Mon-Fri, 9:00 AM - 5:00 PM CT" },
  ],
  serviceArea: "48 contiguous states",
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com", icon: "linkedin" },
    { label: "Facebook", href: "https://www.facebook.com", icon: "facebook" },
    { label: "Instagram", href: "https://www.instagram.com", icon: "instagram" },
    { label: "X", href: "https://x.com", icon: "x" },
  ],
  navigation: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Careers", href: "/careers" },
    { label: "Blog", href: "/blog" },
    { label: "FAQs", href: "/faqs" },
    { label: "Contact", href: "/contact" },
  ],
  footerNavigation: [
    {
      heading: "Services",
      links: [
        { label: "Dry Van Dispatching", href: "/services/dry-van-dispatching" },
        { label: "Refrigerated Dispatching", href: "/services/refrigerated-dispatching" },
        { label: "Flatbed & Step Deck", href: "/services/flatbed-step-deck-dispatching" },
        { label: "Power Only Dispatching", href: "/services/power-only-dispatching" },
        { label: "Carrier Setup & Compliance", href: "/services/carrier-setup-compliance" },
        { label: "Billing & Paperwork", href: "/services/billing-paperwork-support" },
      ],
    },
    {
      heading: "Company",
      links: [
        { label: "About us", href: "/about" },
        { label: "Services", href: "/services" },
        { label: "Careers", href: "/careers" },
        { label: "Blog", href: "/blog" },
        { label: "FAQs", href: "/faqs" },
        { label: "Contact", href: "/contact" },
      ],
    },
    {
      heading: "Legal",
      links: [
        { label: "Privacy policy", href: "/privacy" },
        { label: "Terms & conditions", href: "/terms" },
        { label: "Admin portal", href: "/admin" },
      ],
    },
  ],
  stats: [
    { value: "140+", label: "Carriers dispatched" },
    { value: "$38M", label: "Freight booked annually" },
    { value: "48", label: "States covered" },
    { value: "24/7", label: "Dispatch desk" },
  ],
};
