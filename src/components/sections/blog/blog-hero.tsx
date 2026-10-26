import { Eyebrow } from "../shared";

export function BlogHero() {
  return (
    <section className="border-b bg-paper">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:py-20">
        <Eyebrow>Freight insights</Eyebrow>
        <h1 className="mt-3 max-w-3xl font-display text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
          Dispatch guides, written at the desk
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          Rate strategy, compliance checklists, and growth advice from dispatchers who negotiate freight every day. No fluff, no recycled listicles.
        </p>
      </div>
    </section>
  );
}
