import { Reveal } from "@/components/motion/reveal";
import { CtaSection } from "../home/cta-section";
import { CareersHero } from "./careers-hero";
import { CareersList } from "./careers-list";

export function CareersPageContent() {
  return <><Reveal><CareersHero /></Reveal><Reveal delay="short"><CareersList /></Reveal><Reveal><CtaSection title="Don&apos;t see your role listed?" body="We hire hungry people ahead of openings when the fit is right. Send a note about how you&apos;d strengthen the desk and we&apos;ll keep it on file." /></Reveal></>;
}
