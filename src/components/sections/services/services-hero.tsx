import Link from "next/link";
import { ArrowDown } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Eyebrow } from "../shared";

export function ServicesHero() {
  return (
    <section className="border-b bg-secondary/40">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
        <div className="max-w-3xl">
          <Link href="/" className="text-sm font-semibold text-muted-foreground hover:text-foreground">
            Home
          </Link>
          <span className="mx-2 text-muted-foreground/50">/</span>
          <span className="text-sm text-muted-foreground">Services</span>
          <Eyebrow className="mt-10">Our services</Eyebrow>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
            Dispatching that fits how you run
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Every carrier runs different freight in different lanes on different schedules. So we don&apos;t offer one dispatch service - we offer desks that specialize in yours.
          </p>
          <a
            href="#service-desks"
            className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline"
          >
            Find your desk <ArrowDown className="size-4" aria-hidden />
          </a>
        </div>
        <p className="mt-12 text-sm font-semibold text-muted-foreground">
          Dispatching carriers across {siteConfig.serviceArea}
        </p>
      </div>
    </section>
  );
}
