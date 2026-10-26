import { Reveal } from "@/components/motion/reveal";
import { CtaSection } from "../home/cta-section";
import { ContactDetails } from "./contact-details";
import { ContactForm } from "./contact-form";
import { ContactHero } from "./contact-hero";

export function ContactPageContent() {
  return (
    <>
      <Reveal><ContactHero /></Reveal>
      <Reveal delay="short">
        <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-20">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
            <ContactDetails />
            <ContactForm />
          </div>
        </main>
      </Reveal>
      <Reveal><CtaSection title="Ready to put your trucks to work?" body="Tell us your equipment, preferred lanes, and goals. We&apos;ll give you a clear next step and an honest rate." /></Reveal>
    </>
  );
}
