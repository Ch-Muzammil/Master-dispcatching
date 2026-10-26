import { Reveal } from "@/components/motion/reveal";
import { CtaSection } from "../home/cta-section";
import { BlogHero } from "./blog-hero";
import { BlogList } from "./blog-list";
import { BlogNewsletter } from "./blog-newsletter";

export function BlogPageContent() {
  return (
    <>
      <Reveal><BlogHero /></Reveal>
      <Reveal delay="short"><BlogList /></Reveal>
      <Reveal><BlogNewsletter /></Reveal>
      <Reveal><CtaSection /></Reveal>
    </>
  );
}
