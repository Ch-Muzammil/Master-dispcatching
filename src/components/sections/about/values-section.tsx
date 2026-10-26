import { SectionHeading } from "../shared";
import { aboutValues } from "@/data/about";

export function ValuesSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
      <SectionHeading align="center" eyebrow="What we stand for" title="Four values, applied daily" />
      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        {aboutValues.map(({ icon: Icon, title, body }) => (
          <div key={title} className="flex gap-5 rounded-xl border bg-card p-6">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary">
              <Icon className="size-5" aria-hidden />
            </span>
            <div>
              <h2 className="font-display text-lg font-bold tracking-tight">{title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
