import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Logo } from "../brand/brand-logos";
import { NewsletterForm } from "./newsletter-form";
import { SocialIcon } from "../SocialIcon";

function phoneHref(phone: string): string {
  return `tel:${phone.replace(/\D/g, "")}`;
}

export function SiteFooter() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <Logo inverse />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-primary-foreground/60">
              Professional truck dispatching for US owner-operators and fleets.
              We run the freight office so you can run the road.
            </p>
            <div className="mt-6 flex gap-2">
              {siteConfig.socials.map((social) => {
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={social.label}
                    className="flex size-9 items-center justify-center rounded-md bg-primary-foreground/10 text-primary-foreground/80 transition-colors hover:bg-accent hover:text-accent-foreground"
                  >
                    <SocialIcon icon={social.icon} className="size-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {siteConfig.footerNavigation.slice(0, 2).map((group) => (
            <nav key={group.heading} aria-label={group.heading}>
              <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
                {group.heading}
              </h2>
              <ul className="mt-4 space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-primary-foreground/70 transition-colors hover:text-primary-foreground">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div>
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
              Head office
            </h2>
            <ul className="mt-4 space-y-3 text-sm text-primary-foreground/70">
              <li className="flex gap-2.5">
                <MapPin className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
                {siteConfig.contact.address}
              </li>
              <li className="flex gap-2.5">
                <Phone className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
                <a href={phoneHref(siteConfig.contact.dispatchLine)} className="font-semibold text-primary-foreground hover:underline">
                  {siteConfig.contact.dispatchLine}
                </a>
                <span className="block text-xs text-primary-foreground/50">24/7 dispatch desk</span>
              </li>
              <li className="flex gap-2.5">
                <Mail className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
                <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-primary-foreground">
                  {siteConfig.contact.email}
                </a>
              </li>
            </ul>
            <NewsletterForm />
          </div>
        </div>
      </div>

      <div className="border-t border-primary-foreground/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-6 text-xs text-primary-foreground/50 sm:flex-row sm:px-6">
          <p>© {new Date().getFullYear()} {siteConfig.legalName}. All rights reserved.</p>
          <nav aria-label="Legal navigation" className="flex gap-5">
            {(siteConfig.footerNavigation[2]?.links ?? []).map((link) => (
              <Link key={link.href} href={link.href} className="transition-colors hover:text-primary-foreground">
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
