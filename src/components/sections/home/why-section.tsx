import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { buttonVariants } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { siteImages } from "@/data/images";
import { SectionHeading } from "../shared";

const points = [
  "Dedicated dispatcher who knows your trucks by name",
  "Rates negotiated before you accept - never after",
  "Detention, layover, and TONU claims pursued for you",
  "Same-day invoicing and broker credit checks",
  "Month-to-month terms; no setup fees, no lock-in",
];

export function WhySection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-20">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div className="relative order-2 lg:order-1">
          <div
            className="absolute -left-3 -top-3 hidden h-full w-full rounded-2xl bg-primary lg:block"
            aria-hidden
          />
          <Image
            src={siteImages.aboutOperations}
            alt="Dispatchers working load boards in the operations office"
            width={1600}
            height={1104}
            loading="lazy"
            className="relative aspect-[16/11] w-full rounded-2xl object-cover shadow-lg"
          />
        </div>
        <div className="order-1 lg:order-2">
          <SectionHeading
            eyebrow="Why Meridian"
            title="A dispatch team that answers at 2 AM"
            description="Night loads don't negotiate themselves. Our desks run around the clock, in shifts, with handoff notes - so a breakdown in Tulsa at midnight gets a person, not a voicemail."
          />
          <ul className="mt-7 space-y-3.5">
            {points.map((point) => (
              <li key={point} className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden />
                <span className="text-[0.95rem] font-medium text-foreground">{point}</span>
              </li>
            ))}
          </ul>
          <Link
            href="/about"
            className={cn(
              buttonVariants({ size: "lg" }),
              "mt-8 rounded-full px-6 font-bold",
            )}
          >
            Meet the team <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
