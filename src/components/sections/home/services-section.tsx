import Link from "next/link";
import { ArrowRight, ArrowUpRight, Box, Layers, Plug, Snowflake } from "lucide-react";
import { buttonVariants } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { services } from "@/data/services";
import { SectionHeading } from "../shared";

const serviceIcons = {
  "dry-van-dispatching": Box,
  "refrigerated-dispatching": Snowflake,
  "flatbed-step-deck-dispatching": Layers,
  "power-only-dispatching": Plug,
} as const;

export function ServicesSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-20">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading
          eyebrow="What we do"
          title="Dispatch desks built around your equipment"
          description="Specialized teams for the freight you actually run - not one generalist dispatcher for everything."
        />
        <Link
          href="/services"
          className={cn(
            buttonVariants({ variant: "outline" }),
            "rounded-full font-semibold",
          )}
        >
          All services <ArrowUpRight className="size-4" />
        </Link>
      </div>
      <div className="mt-10 grid gap-x-12 md:grid-cols-2">
        {services.map((service, index) => {
          const Icon = serviceIcons[service.slug as keyof typeof serviceIcons] ?? Box;

          return (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className="group flex items-start gap-5 border-t py-5 transition-colors hover:bg-secondary/40 md:[&:nth-last-child(-n+2)]:border-b"
            >
              <span className="mt-1 flex size-11 shrink-0 items-center justify-center rounded-lg bg-primary text-accent transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                <Icon className="size-5" aria-hidden />
              </span>
              <span className="min-w-0">
                <span className="flex items-baseline gap-3">
                  <span className="text-xs font-bold text-muted-foreground/60">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="font-display text-lg font-bold tracking-tight text-foreground group-hover:underline">
                    {service.title}
                  </span>
                </span>
                <span className="mt-1.5 block text-sm leading-relaxed text-muted-foreground">
                  {service.excerpt}
                </span>
                <span className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-primary opacity-0 transition-opacity group-hover:opacity-100">
                  Learn more <ArrowRight className="size-3.5" aria-hidden />
                </span>
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
