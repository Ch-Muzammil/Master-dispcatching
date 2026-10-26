import type { Metadata } from "next";
import { ContactPageContent } from "@/components/sections/contact";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Talk to a Meridian dispatcher about your trucks, equipment, lanes, and dispatching needs.",
};

export default function ContactPage() {
  return <ContactPageContent />;
}
