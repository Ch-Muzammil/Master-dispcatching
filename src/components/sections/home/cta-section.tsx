import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";
import { siteImages } from "@/data/images";

type CtaSectionProps = {
  title?: string;
  body?: string;
};

export function CtaSection({
  title = "Your freight office, without the overhead.",
  body = "Ready to put a dedicated dispatch desk behind your truck? Tell us about your equipment and lanes. We'll respond with a clear plan and an honest rate - usually within one business hour.",
}: CtaSectionProps) {
  return (
    <section className="relative isolate overflow-hidden">
      <Image
        src={siteImages.ctaYard}
        alt="Freight distribution yard at dusk"
        fill
        loading="lazy"
        className="-z-20 object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-primary/85" />
      <div className="relative z-0 mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:py-18">
        <div className="max-w-2xl">
          <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/70">{body}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className={cn(
                buttonVariants({ size: "lg" }),
                "rounded-full bg-accent font-bold text-accent-foreground hover:bg-accent/90",
              )}
            >
              Get a quote <ArrowRight className="size-4" />
            </Link>
            <a
              href={`tel:${siteConfig.contact.dispatchLine.replace(/\D/g, "")}`}
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "rounded-full border-white/30 bg-transparent font-bold text-white hover:bg-white/10 hover:text-white",
              )}
            >
              Call {siteConfig.contact.dispatchLine}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
