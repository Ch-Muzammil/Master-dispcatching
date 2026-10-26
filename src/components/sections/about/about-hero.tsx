import Link from "next/link";
import { Eyebrow } from "../shared";

export function AboutHero() {
  return (
    <section className="border-b bg-paper">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:py-20">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm">
          <Link href="/" className="font-medium text-muted-foreground hover:text-foreground">
            Home
          </Link>
          <span aria-hidden className="text-muted-foreground/60">/</span>
          <span className="font-semibold text-foreground">About us</span>
        </nav>
        <div className="mt-6 max-w-3xl">
          <Eyebrow>About us</Eyebrow>
          <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
            The freight office behind 140 trucks
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Meridian Dispatch Group was built for a specific carrier: the
            owner-operator or small fleet that can&apos;t afford a full back
            office but deserves the same professionalism the big guys get.
          </p>
        </div>
      </div>
    </section>
  );
}
