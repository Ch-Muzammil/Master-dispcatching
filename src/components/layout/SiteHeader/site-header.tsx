"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, Phone } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/Button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/Sheet";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";
import { Logo } from "../brand/brand-logos";
import { HeaderNav } from "./header-nav";

function phoneHref(phone: string): string {
  return `tel:${phone.replace(/\D/g, "")}`;
}

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50">
      <div className="hidden bg-primary text-primary-foreground/85 md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-2 text-xs font-medium">
          <a
            href={phoneHref(siteConfig.contact.dispatchLine)}
            className="inline-flex min-w-0 items-center gap-1.5 hover:text-primary-foreground"
          >
            <Phone className="size-3.5 shrink-0 text-accent" aria-hidden />
            <span className="truncate">
              <span className="text-primary-foreground/65">Dispatch desk 24/7:</span>{" "}
              {siteConfig.contact.dispatchLine}
            </span>
          </a>
          <div className="flex shrink-0 items-center gap-4">
            <span className="hidden text-primary-foreground/60 lg:inline">
              Serving all {siteConfig.serviceArea}
            </span>
            <Link
              href="/careers"
              className="font-semibold text-accent hover:underline"
            >
              We&apos;re hiring
            </Link>
          </div>
        </div>
      </div>

      <div
        className={cn(
          "border-b border-border bg-background/95 backdrop-blur transition-shadow supports-backdrop-filter:bg-background/80",
          scrolled && "shadow-[0_8px_24px_-16px_rgb(0_0_0/0.25)]",
        )}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
          <Logo />
          <div className="hidden lg:block"><HeaderNav /></div>
          <div className="flex items-center gap-2">
            <Link
              href="/contact"
              className={cn(buttonVariants({ size: "sm" }), "hidden rounded-full font-semibold sm:inline-flex")}
            >
              Get a quote
            </Link>
            <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
              <SheetTrigger
                render={
                  <Button
                    variant="outline"
                    size="icon"
                    className="lg:hidden"
                    aria-label="Open menu"
                  />
                }
              >
                <Menu className="size-5" aria-hidden />
              </SheetTrigger>
              <SheetContent side="right" className="w-80 overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>
                    <Logo />
                  </SheetTitle>
                </SheetHeader>
                <div className="px-4 pb-8">
                  <HeaderNav onNavigate={() => setMenuOpen(false)} />
                  <Link
                    href="/contact"
                    onClick={() => setMenuOpen(false)}
                    className={cn(buttonVariants({ size: "lg" }), "mt-5 w-full rounded-full font-semibold")}
                  >
                    Get a quote
                  </Link>
                  <a
                    href={phoneHref(siteConfig.contact.dispatchLine)}
                    className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-md border border-input px-4 py-2.5 text-sm font-semibold"
                  >
                    <Phone className="size-4 text-accent" aria-hidden />
                    {siteConfig.contact.dispatchLine}
                  </a>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
