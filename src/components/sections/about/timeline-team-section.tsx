import { Avatar, AvatarFallback } from "@/components/ui/Avatar";
import { aboutMilestones, aboutTeam } from "@/data/about";
import { SectionHeading } from "../shared";

export function TimelineTeamSection() {
  return (
    <section className="border-y bg-paper">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <SectionHeading eyebrow="Milestones" title="Nine years on the boards" />
            <ol className="mt-8 space-y-6 border-l-2 border-accent/60 pl-6">
              {aboutMilestones.map((milestone) => (
                <li key={milestone.year} className="relative">
                  <span className="absolute -left-[1.9rem] top-1 size-3 rounded-full border-2 border-accent bg-background" aria-hidden />
                  <p className="font-display text-lg font-extrabold text-primary">{milestone.year}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{milestone.text}</p>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <SectionHeading eyebrow="Leadership" title="The people on the desks" />
            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              {aboutTeam.map((person) => (
                <div key={person.name} className="rounded-xl border bg-card p-5">
                  <Avatar className="size-12">
                    <AvatarFallback className="bg-primary font-display text-sm font-bold text-accent">
                      {person.initials}
                    </AvatarFallback>
                  </Avatar>
                  <h2 className="mt-3 font-display text-base font-bold">{person.name}</h2>
                  <p className="text-xs font-semibold uppercase tracking-wide text-primary">{person.role}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{person.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
