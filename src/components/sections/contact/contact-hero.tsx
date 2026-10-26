import { Eyebrow } from "../shared";

export function ContactHero() {
  return (
    <section className="border-b bg-paper">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:py-18">
        <div className="max-w-3xl">
          <Eyebrow>Contact</Eyebrow>
          <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
            Talk to a dispatcher about your trucks
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Call the dispatch line for anything urgent — it&apos;s staffed 24/7 and a person picks up.
            For quotes, onboarding, and partnership questions, the form below is fastest.
          </p>
        </div>
      </div>
    </section>
  );
}
