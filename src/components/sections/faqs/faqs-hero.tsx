import Link from "next/link";
import { Eyebrow } from "../shared";

export function FaqsHero() {
  return (
    <section className="border-b bg-paper">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:py-18">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm">
          <Link href="/" className="font-medium text-muted-foreground hover:text-foreground">
            Home
          </Link>
          <span aria-hidden className="text-muted-foreground/60">/</span>
          <span className="font-semibold text-foreground">FAQs</span>
        </nav>
        <div className="mt-8 max-w-3xl">
          <Eyebrow>Carrier questions</Eyebrow>
          <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
            Clear answers before you commit
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Dispatching is a working relationship. Here is what to expect from our desks, our process, and our month-to-month terms.
          </p>
        </div>
      </div>
    </section>
  );
}
