import { CtaSection } from "./home/cta-section";
import { StatsBand } from "./shared";
import { AboutHero, CultureCta, StorySection, TimelineTeamSection, ValuesSection } from "./about";
import { Reveal } from "@/components/motion/reveal";

export function AboutPageContent() {
  return (
    <>
      <Reveal><AboutHero /></Reveal>
      <Reveal delay="short"><StorySection /></Reveal>
      <Reveal><StatsBand /></Reveal>
      <Reveal delay="short"><ValuesSection /></Reveal>
      <Reveal><TimelineTeamSection /></Reveal>
      <Reveal delay="short"><CultureCta /></Reveal>
      <Reveal><CtaSection
        title="Put our desks to work on your trucks"
        body="Tell us about your equipment and lanes - we'll respond with a clear plan and an honest rate, usually within one business hour."
      />
      </Reveal>
    </>
  );
}
