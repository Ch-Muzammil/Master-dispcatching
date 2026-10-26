import { Avatar, AvatarFallback } from "@/components/ui/Avatar";
import { testimonials } from "@/data/testimonials";
import { SectionHeading } from "../shared";

export function TestimonialsSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-20">
      <SectionHeading
        align="center"
        eyebrow="From the road"
        title="Carriers who stopped chasing brokers"
      />
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {testimonials.map((testimonial) => (
          <figure
            key={testimonial.name}
            className="flex flex-col rounded-xl border bg-card p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/20 hover:shadow-md"
          >
            <span className="font-display text-4xl font-extrabold leading-none text-accent" aria-hidden>
              &quot;
            </span>
            <blockquote className="mt-2 flex-1 text-sm leading-relaxed text-foreground/90">
              {testimonial.quote}
            </blockquote>
            <figcaption className="mt-6 flex items-center gap-3 border-t pt-4">
              <Avatar className="size-9">
                <AvatarFallback className="bg-secondary text-xs font-bold text-primary">
                  {testimonial.initials}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-display text-sm font-bold text-foreground">
                  {testimonial.name}
                </p>
                <p className="text-xs text-muted-foreground">{testimonial.role}</p>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
