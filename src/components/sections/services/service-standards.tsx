import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { SectionHeading } from "../shared";

const standards = [
  "Dedicated dispatcher who knows your operation",
  "Rates negotiated before you accept a load",
  "Broker credit checks before booking",
  "Detention & accessorial claims pursued",
  "Same-day invoicing from PODs",
  "Month-to-month terms, no setup fees",
];

export function ServiceStandards() {
  return (
    <section className="bg-secondary/50">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:py-24">
        <SectionHeading
          eyebrow="Every desk, every carrier"
          title="Standard on every service"
          description="Pricing is a flat percentage of gross linehaul per load, quoted clearly on your first call."
        />
        <div className="grid gap-4 sm:grid-cols-2">
          {standards.map((standard) => (
            <div key={standard} className="flex items-start gap-3 rounded-lg bg-background p-4">
              <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-accent" aria-hidden />
              <span className="text-sm font-semibold text-foreground">{standard}</span>
            </div>
          ))}
          <Link href="/faqs" className="text-sm font-bold text-primary hover:underline">
            Read billing FAQs
          </Link>
        </div>
      </div>
    </section>
  );
}
