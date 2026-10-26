import Link from "next/link";
import { ArrowRight, FileText, ShieldCheck } from "lucide-react";
import { siteConfig } from "@/config/site";
import type { LegalPage } from "@/data/legal";

export function LegalPageContent({ page }: { page: LegalPage }) {
  const isPrivacy = page.kind === "Privacy policy";
  const Icon = isPrivacy ? ShieldCheck : FileText;

  return (
    <>
      <section className="border-b bg-paper">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:py-20">
          <div className="flex max-w-3xl items-start gap-4">
            <div className="mt-1 flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Icon className="size-6" aria-hidden />
            </div>
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">
                {page.kind}
              </p>
              <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
                {page.title}
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                {page.description}
              </p>
              <p className="mt-5 text-sm text-muted-foreground">
                Last updated {page.updated}
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[220px_minmax(0,680px)] lg:gap-20 lg:py-20">
        <aside className="h-fit lg:sticky lg:top-24">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">
            On this page
          </p>
          <nav aria-label={`${page.kind} sections`} className="mt-4 space-y-2">
            {page.sections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="block rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                {section.title}
              </a>
            ))}
          </nav>
        </aside>
        <article className="min-w-0">
          <div className="rounded-3xl border bg-card p-6 shadow-sm sm:p-10">
            <div className="space-y-10">
              {page.sections.map((section) => (
                <section key={section.id} id={section.id} className="scroll-mt-24">
                  <h2 className="font-display text-2xl font-bold tracking-tight">
                    {section.title}
                  </h2>
                  <div className="mt-4 space-y-4 text-[15px] leading-7 text-muted-foreground">
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                    {section.bullets ? (
                      <ul className="list-disc space-y-2 pl-5">
                        {section.bullets.map((bullet) => (
                          <li key={bullet}>{bullet}</li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                </section>
              ))}
            </div>
          </div>
          <div className="mt-8 rounded-2xl bg-primary px-6 py-7 text-primary-foreground sm:px-8">
            <h2 className="font-display text-xl font-bold">Need a direct answer?</h2>
            <p className="mt-2 text-sm leading-relaxed text-primary-foreground/80">
              Our team is happy to help with questions about your information or a potential dispatch relationship.
            </p>
            <Link
              href="/contact"
              className="mt-5 inline-flex items-center gap-2 text-sm font-bold underline-offset-4 hover:underline"
            >
              Contact Meridian
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
          <p className="mt-6 text-sm text-muted-foreground">
            {siteConfig.legalName} · {siteConfig.contact.address}
          </p>
        </article>
      </section>
    </>
  );
}
