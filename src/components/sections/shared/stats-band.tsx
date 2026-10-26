import { siteConfig } from "@/config/site";

export function StatsBand() {
  return (
    <section className="bg-accent">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-y-8 px-4 py-10 sm:px-6 md:grid-cols-4 md:py-12">
        {siteConfig.stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <p className="font-display text-4xl font-extrabold tracking-tight text-accent-foreground md:text-5xl">
              {stat.value}
            </p>
            <p className="mt-1.5 text-sm font-semibold text-accent-foreground/70">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
