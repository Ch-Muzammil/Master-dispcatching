import { CtaSection } from "../home/cta-section";
import { Reveal } from "@/components/motion/reveal";
import { siteConfig } from "@/config/site";
import { faqGroups } from "@/data/faqs";
import { FaqAccordion } from "./faq-accordion";
import { FaqsHero } from "./faqs-hero";

export function FaqsPageContent() {
  return (
    <>
      <Reveal>
        <FaqsHero />
      </Reveal>
      <Reveal delay="short">
        <main className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:py-20">
          <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">
                Meridian answers
              </p>
              <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground">
                Built for the questions that matter on the road.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                Still deciding? Tell us about your equipment and lanes. We will give you a clear answer, even if we are not the right fit.
              </p>
              <a
                href={`tel:${siteConfig.contact.dispatchLine.replace(/\D/g, "")}`}
                className="mt-6 inline-flex text-sm font-bold text-primary hover:underline"
              >
                Call the dispatch desk
              </a>
            </div>
            <div className="space-y-12">
              {faqGroups.map((group) => (
                <section key={group.category} aria-labelledby={group.category.replace(/\s+/g, "-").toLowerCase()}>
                  <h2
                    id={group.category.replace(/\s+/g, "-").toLowerCase()}
                    className="mb-4 font-display text-xl font-bold tracking-tight text-foreground"
                  >
                    {group.category}
                  </h2>
                  <FaqAccordion items={group.items} />
                </section>
              ))}
            </div>
          </div>
        </main>
      </Reveal>
      <Reveal>
        <CtaSection
          title="Still have a question?"
          body="Tell us about your trucks and lanes. We will give you a clear answer and an honest next step."
        />
      </Reveal>
    </>
  );
}
