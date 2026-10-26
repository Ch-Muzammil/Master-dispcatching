import Image from "next/image";
import Link from "next/link";
import {
  CheckCircle2,
  Clock,
  MapPin,
  Percent,
  ShieldCheck,
} from "lucide-react";
import { buttonVariants } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";
import { siteImages } from "@/data/images";
import { Eyebrow } from "../shared";

const trustItems = [
  { icon: ShieldCheck, label: "Month-to-month terms" },
  { icon: Percent, label: "No setup fees" },
  { icon: Clock, label: "24/7 dispatch desk" },
  { icon: MapPin, label: "Carriers in 48 states" },
];

export function HomeHero() {
  return (
    <section className="relative overflow-hidden bg-paper">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-14 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:py-20">
        <div>
          <Eyebrow>Truck dispatching · Est. {siteConfig.founded}</Eyebrow>
          <h1 className="mt-4 font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Your trucks, professionally dispatched.{" "}
            <span className="relative whitespace-nowrap text-primary">
              Around the clock.
              <span
                className="absolute -bottom-1 left-0 h-1.5 w-full bg-accent/70"
                aria-hidden
              />
            </span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Meridian runs the freight office for owner-operators and small
            fleets - sourcing loads, negotiating rates, and handling the
            paperwork that eats your evenings. You drive. We dispatch.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className={cn(
                buttonVariants({ size: "lg" }),
                "rounded-full px-7 font-bold",
              )}
            >
              Get a quote
            </Link>
            <Link
              href="/services"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "rounded-full px-7 font-bold",
              )}
            >
              Explore services
            </Link>
          </div>
          <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3">
            {trustItems.map(({ icon: Icon, label }) => (
              <span
                key={label}
                className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground"
              >
                <Icon className="size-4 text-primary" aria-hidden />
                {label}
              </span>
            ))}
          </div>
        </div>
        <div className="relative">
          <div
            className="absolute -right-3 -top-3 hidden h-full w-full rounded-2xl bg-accent lg:block"
            aria-hidden
          />
          <Image
            src={siteImages.heroFleet}
            alt="Fleet of semi-trucks on an American interstate at sunrise"
            width={1920}
            height={1088}
            priority
            className="relative aspect-[16/10] w-full rounded-2xl object-cover shadow-xl"
          />
          <div className="relative -mt-10 ml-4 w-fit rounded-xl border bg-card p-4 shadow-lg lg:absolute lg:bottom-6 lg:left-6 lg:mt-0">
            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              This week at Meridian
            </p>
            <p className="mt-1 font-display text-2xl font-extrabold text-foreground">
              $912K{" "}
              <span className="text-sm font-semibold text-muted-foreground">
                freight booked
              </span>
            </p>
            <p className="mt-1 flex items-center gap-1.5 text-xs font-semibold text-primary">
              <CheckCircle2 className="size-3.5 text-accent" aria-hidden />
              214 loads dispatched · 48 states
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
