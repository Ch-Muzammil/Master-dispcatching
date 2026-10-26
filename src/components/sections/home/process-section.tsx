import { SectionHeading } from "../shared";

const steps = [
  { number: "01", title: "Tell us about your trucks", body: "Equipment, lanes, home-time needs, and your rate floor. One 20-minute call and your dispatcher knows your operation." },
  { number: "02", title: "We source and negotiate", body: "Your dispatcher works the boards and broker relationships daily, negotiating every rate before you commit." },
  { number: "03", title: "You drive, we handle the rest", body: "One clean dispatch sheet per load. Check calls, broker packets, detention claims - all off your plate." },
  { number: "04", title: "Get paid, see the numbers", body: "Invoices go out same-day from PODs. Weekly summaries show exactly what you grossed and where." },
];

export function ProcessSection() {
  return (
    <section className="border-y bg-paper">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-18">
        <SectionHeading
          align="center"
          eyebrow="How it works"
          title="From first call to first dispatched load in days"
        />
        <div className="relative mt-10 grid gap-8 md:grid-cols-4">
          <div
            className="absolute left-0 right-0 top-6 hidden border-t border-dashed border-accent/60 md:block"
            aria-hidden
          />
          {steps.map((step) => (
            <div key={step.number} className="group relative">
              <span className="relative z-10 flex size-12 items-center justify-center rounded-full border-2 border-accent bg-background font-display text-sm font-extrabold text-foreground">
                {step.number}
              </span>
              <h3 className="mt-4 font-display text-base font-bold text-foreground transition-colors group-hover:text-primary">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {step.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
