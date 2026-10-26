import type { Metadata } from "next";
import {
  CtaSection,
  HomeHero,
  ProcessSection,
  ServicesSection,
  StatsSection,
  TestimonialsSection,
  WhySection,
} from "@/components/sections/home";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "Truck Dispatch Services for US Carriers",
  description: "Professional 24/7 truck dispatching for owner-operators and fleets.",
};

export default function HomePage() {
  return (
    <>
      <Reveal><HomeHero /></Reveal>
      <Reveal delay="short"><ServicesSection /></Reveal>
      <Reveal><ProcessSection /></Reveal>
      <Reveal delay="short"><WhySection /></Reveal>
      <Reveal><StatsSection /></Reveal>
      <Reveal delay="short"><TestimonialsSection /></Reveal>
      <Reveal><CtaSection /></Reveal>
    </>
  );
}
