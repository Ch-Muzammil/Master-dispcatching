import Image from "next/image";
import { siteImages } from "@/data/images";
import { SectionHeading } from "../shared";

export function StorySection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div>
          <SectionHeading eyebrow="Our story" title="Started by dispatchers, not salespeople" />
          <div className="mt-6 space-y-4 text-base leading-relaxed text-muted-foreground">
            <p>
              In 2017, our founder was dispatching a handful of owner-operators
              out of a shared Dallas office - the kind of desk where you learn
              every driver&apos;s voice and every broker&apos;s habits. The
              business grew the honest way: one clean settlement at a time, one
              carrier referral at a time.
            </p>
            <p>
              Nine years later the operation is bigger, but the shape hasn&apos;t
              changed. Every carrier gets a named dispatcher. Every load gets
              negotiated before acceptance. Every night shift ends with written
              handoff notes. We&apos;ve stayed deliberately small per desk,
              because dispatching quality dies at scale.
            </p>
            <p>
              Today Meridian runs specialized desks for dry van, reefer,
              flatbed, and power only operations, backed by compliance and
              billing teams - serving carriers across the lower 48 states.
            </p>
          </div>
        </div>
        <div className="relative">
          <div
            className="absolute -right-3 -top-3 hidden h-full w-full rounded-2xl bg-accent lg:block"
            aria-hidden
          />
          <Image
            src={siteImages.aboutOperations}
            alt="Dispatch operations floor at Meridian's Dallas office"
            width={1600}
            height={1104}
            loading="lazy"
            className="relative aspect-[16/11] w-full rounded-2xl object-cover shadow-lg"
          />
        </div>
      </div>
    </section>
  );
}
