import { CtaSection } from "../home/cta-section";
import { ServiceGrid, ServicesHero, ServiceStandards } from ".";
import { Reveal } from "@/components/motion/reveal";

export function ServicesPageContent() {
  return (
    <>
      <Reveal><ServicesHero /></Reveal>
      <Reveal delay="short"><ServiceGrid /></Reveal>
      <Reveal><ServiceStandards /></Reveal>
      <Reveal delay="short"><CtaSection
        title="Not sure which desk fits your trucks?"
        body="One call is enough. Tell us your equipment and lanes and we&apos;ll tell you honestly which service - or whether dispatching with us makes sense at all."
      />
      </Reveal>
    </>
  );
}
