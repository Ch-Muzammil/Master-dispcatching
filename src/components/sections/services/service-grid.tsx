import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { services } from "@/data/services";

export function ServiceGrid() {
  return (
    <section id="service-desks" className="mx-auto max-w-7xl scroll-mt-24 px-4 py-16 sm:px-6 lg:py-24">
      <div className="grid gap-x-12 md:grid-cols-2">
        {services.map((service, index) => {
          const Icon = service.icon;
          return (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className="group border-t py-8 transition-colors hover:bg-secondary/40 md:px-4 md:[&:nth-child(odd)]:-ml-4 md:[&:nth-child(even)]:-mr-4 md:[&:nth-last-child(-n+2)]:border-b"
            >
              <div className="flex items-start gap-5">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-primary text-accent transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                  <Icon className="size-5" aria-hidden />
                </span>
                <div>
                  <div className="flex items-baseline gap-3">
                    <span className="text-xs font-bold text-muted-foreground/60">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h2 className="font-display text-xl font-bold tracking-tight text-foreground">
                      {service.title}
                    </h2>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {service.excerpt}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-primary">
                    Details <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
