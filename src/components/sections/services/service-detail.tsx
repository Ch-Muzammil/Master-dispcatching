import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  CircleDollarSign,
  Phone,
} from "lucide-react";
import { buttonVariants } from "@/components/ui/Button";
import { siteConfig } from "@/config/site";
import { services, type Service } from "@/data/services";
import { cn } from "@/lib/utils";
import { CtaSection } from "../home/cta-section";
import { Eyebrow, SectionHeading } from "../shared";
import { Reveal } from "@/components/motion/reveal";

const defaultIdealFor = [
  "Owner-operators running one to three trucks",
  "Small carriers tired of chasing brokers after hours",
  "Fleets that want consistent lanes instead of spot-market roulette",
];

export function ServiceDetail({ service }: { service: Service }) {
  const Icon = service.icon;
  const otherServices = services
    .filter((item) => item.slug !== service.slug)
    .slice(0, 3);

  return (
    <>
      <Reveal>
      <section className="border-b bg-secondary/40">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:py-16">
          <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="font-semibold hover:text-foreground">Home</Link>
            <span aria-hidden>/</span>
            <Link href="/services" className="font-semibold hover:text-foreground">Services</Link>
            <span aria-hidden>/</span>
            <span>{service.title}</span>
          </div>
          <div className="mt-8 grid items-center gap-10 lg:grid-cols-2">
            <div>
              <Eyebrow>Dispatch service</Eyebrow>
              <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                {service.title}
              </h1>
              <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
                {service.excerpt}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className={cn(buttonVariants({ size: "lg" }), "rounded-full px-7 font-bold")}
                >
                  Talk to a dispatcher
                </Link>
                <a
                  href={`tel:${siteConfig.contact.dispatchLine.replace(/\D/g, "")}`}
                  className={cn(buttonVariants({ variant: "outline", size: "lg" }), "rounded-full px-7 font-bold")}
                >
                  <Phone className="size-4" aria-hidden />
                  {siteConfig.contact.dispatchLine}
                </a>
              </div>
            </div>
            {service.image ? (
              <Image
                src={service.image}
                alt={service.imageAlt ?? service.title}
                width={1600}
                height={1008}
                className="aspect-[16/10] w-full rounded-2xl object-cover shadow-lg"
              />
            ) : (
              <div className="relative flex aspect-[16/10] w-full items-center justify-center overflow-hidden rounded-2xl bg-primary shadow-lg">
                <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: "repeating-linear-gradient(45deg, #fff 0 2px, transparent 2px 18px)" }} aria-hidden />
                <div className="relative flex flex-col items-center gap-4 text-center">
                  <span className="flex size-20 items-center justify-center rounded-2xl bg-accent text-accent-foreground">
                    <Icon className="size-10" aria-hidden />
                  </span>
                  <p className="max-w-xs px-6 text-sm font-medium text-white/70">
                    A dedicated desk for {service.title.toLowerCase()} operations, staffed around the clock.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
      </Reveal>

      <Reveal delay="short">
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.15fr_1fr]">
          <div>
            <SectionHeading eyebrow="Overview" title="What this desk does for you" />
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              {service.description} Our dispatchers work the load boards, broker relationships, and paperwork daily to keep your truck moving at rates that protect your margin.
            </p>
            <div className="mt-10">
              <SectionHeading eyebrow="How it works" title="Four steps, start to settlement" />
              <ol className="mt-8 space-y-6">
                {[
                  ["Onboard your operation", "We learn your equipment, preferred lanes, home-time schedule, and operating preferences."],
                  ["Source and negotiate", "Your dispatcher hunts qualified loads and negotiates rate and terms before anything reaches you."],
                  ["Dispatch and support", "You get one clean dispatch sheet while our desk handles check calls, packets, and road issues."],
                  ["Close the loop", "PODs, invoices, and broker follow-ups are handled so the settlement stays moving."],
                ].map(([title, body], index) => (
                  <li key={title} className="flex gap-5">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-full border-2 border-accent bg-background font-display text-sm font-extrabold">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="font-display text-base font-bold">{title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
          <div className="space-y-6">
            <div className="rounded-xl border bg-card p-6">
              <h2 className="flex items-center gap-2 font-display text-lg font-bold">
                <CheckCircle2 className="size-5 text-primary" aria-hidden /> What&apos;s included
              </h2>
              <ul className="mt-4 space-y-3">
                {service.bullets.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-foreground/90">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border bg-card p-6">
              <h2 className="flex items-center gap-2 font-display text-lg font-bold">
                <CircleDollarSign className="size-5 text-primary" aria-hidden /> Built for
              </h2>
              <ul className="mt-4 space-y-3">
                {defaultIdealFor.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-foreground/90">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl bg-accent p-6 text-accent-foreground">
              <p className="font-display text-lg font-bold leading-snug">
                Flat percentage of gross linehaul. No setup fees. Month-to-month.
              </p>
              <p className="mt-2 text-sm text-accent-foreground/75">
                You&apos;ll get the exact number on your first call, in writing, before you commit to anything.
              </p>
            </div>
          </div>
        </div>
      </section>
      </Reveal>

      <Reveal>
      <section className="border-t bg-secondary/40">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:py-16">
          <div className="flex items-center justify-between gap-4">
            <h2 className="font-display text-2xl font-bold tracking-tight">Other dispatch desks</h2>
            <Link href="/services" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline">
              <ArrowLeft className="size-4" aria-hidden /> All services
            </Link>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {otherServices.map((item) => {
              const OtherIcon = item.icon;
              return (
                <Link key={item.slug} href={`/services/${item.slug}`} className="group rounded-xl border bg-card p-5 transition-all hover:-translate-y-0.5 hover:shadow-md">
                  <span className="flex size-10 items-center justify-center rounded-lg bg-secondary text-primary group-hover:bg-accent group-hover:text-accent-foreground">
                    <OtherIcon className="size-5" aria-hidden />
                  </span>
                  <h3 className="mt-3 font-display text-base font-bold group-hover:underline">{item.title}</h3>
                  <p className="mt-1.5 line-clamp-2 text-sm text-muted-foreground">{item.excerpt}</p>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                    View <ArrowRight className="size-3.5" aria-hidden />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
      </Reveal>
      <Reveal delay="short"><CtaSection /></Reveal>
    </>
  );
}
