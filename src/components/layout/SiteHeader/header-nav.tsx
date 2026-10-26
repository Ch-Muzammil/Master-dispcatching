"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";
import { services } from "@/data/services";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/Popover";

export function HeaderNav({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  useEffect(() => {
    if (!servicesOpen) return;

    const closeOnScroll = () => setServicesOpen(false);
    window.addEventListener("scroll", closeOnScroll, { passive: true });
    return () => window.removeEventListener("scroll", closeOnScroll);
  }, [servicesOpen]);

  return (
    <nav aria-label="Primary navigation" className="flex flex-col gap-1 lg:flex-row lg:items-center lg:gap-7">
      {siteConfig.navigation.map((item) => {
        if (item.href === "/services") {
          return (
            <div key={item.href} className="contents">
              <div className="hidden lg:block">
                <Popover open={servicesOpen} onOpenChange={setServicesOpen}>
                  <PopoverTrigger
                    render={
                      <button
                        type="button"
                        className={cn(
                          "inline-flex items-center gap-1 rounded-md py-2 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                          pathname.startsWith("/services")
                            ? "text-foreground"
                            : "text-muted-foreground hover:text-foreground",
                        )}
                      />
                    }
                  >
                    Services <ChevronDown className="size-3.5" aria-hidden />
                  </PopoverTrigger>
                  <PopoverContent
                    align="start"
                    sideOffset={12}
                    className="w-[min(30rem,calc(100vw-2rem))] gap-0 rounded-xl border-border p-1.5"
                  >
                    <div className="grid items-start gap-1 sm:grid-cols-2">
                      {services.slice(0, 4).map((service) => {
                        const Icon = service.icon;
                        return (
                          <Link
                            key={service.slug}
                            href={`/services/${service.slug}`}
                            onClick={() => {
                              setServicesOpen(false);
                              onNavigate?.();
                            }}
                            className="group flex gap-2.5 rounded-lg p-2.5 transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                          >
                            <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-primary text-accent group-hover:bg-accent group-hover:text-accent-foreground">
                              <Icon className="size-4" aria-hidden />
                            </span>
                            <span className="min-w-0">
                              <span className="block text-[0.8rem] font-bold leading-tight text-foreground">
                                {service.title}
                              </span>
                              <span
                                className="mt-1 block max-h-[3.75rem] overflow-hidden text-[0.7rem] leading-5 text-muted-foreground"
                                style={{
                                  display: "-webkit-box",
                                  WebkitBoxOrient: "vertical",
                                  WebkitLineClamp: 3,
                                }}
                              >
                                {service.excerpt}
                              </span>
                            </span>
                          </Link>
                        );
                      })}
                    </div>
                    <Link
                      href="/services"
                      onClick={() => {
                        setServicesOpen(false);
                        onNavigate?.();
                      }}
                      className="mt-1 flex items-center justify-between rounded-lg border-t px-3 py-3 text-sm font-bold text-primary hover:bg-secondary"
                    >
                      Explore all services
                      <ChevronRight className="size-4" aria-hidden />
                    </Link>
                  </PopoverContent>
                </Popover>
              </div>

              <div className="lg:hidden">
                <button
                  type="button"
                  aria-expanded={mobileServicesOpen}
                  onClick={() => setMobileServicesOpen((open) => !open)}
                  className={cn(
                    "flex h-10 w-full items-center justify-between rounded-lg px-4 text-left text-[14px] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    pathname.startsWith("/services") || mobileServicesOpen
                      ? "bg-secondary text-foreground"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground",
                  )}
                >
                  <span>Services</span>
                  <ChevronDown
                    className={cn(
                      "size-4 transition-transform duration-200",
                      mobileServicesOpen && "rotate-180",
                    )}
                    aria-hidden
                  />
                </button>
                {mobileServicesOpen ? (
                  <div className="mt-1 space-y-1 border-l-2 border-accent/50 pl-3">
                    {services.slice(0, 4).map((service) => {
                      const Icon = service.icon;
                      return (
                        <Link
                          key={service.slug}
                          href={`/services/${service.slug}`}
                          onClick={onNavigate}
                          className="flex min-h-10 items-center gap-3 rounded-lg px-3 py-1.5 text-[14px] font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        >
                          <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-primary text-accent">
                            <Icon className="size-4" aria-hidden />
                          </span>
                          <span>{service.title}</span>
                        </Link>
                      );
                    })}
                    <Link
                      href="/services"
                      onClick={onNavigate}
                      className="flex min-h-10 items-center justify-between rounded-lg px-3 py-1.5 text-[14px] font-bold text-primary transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      Explore all services
                      <ChevronRight className="size-4" aria-hidden />
                    </Link>
                  </div>
                ) : null}
              </div>
            </div>
          );
        }
        const active =
          pathname === item.href ||
          (item.href !== "/" && pathname.startsWith(`${item.href}/`));

        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            aria-current={active ? "page" : undefined}
            className={cn(
              "flex h-10 items-center rounded-lg px-4 text-[14px] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring lg:relative lg:h-auto lg:rounded-md lg:px-0 lg:py-2 lg:text-sm",
              active
                ? "bg-secondary text-foreground lg:bg-transparent lg:after:absolute lg:after:inset-x-0 lg:after:-bottom-px lg:after:h-0.5 lg:after:bg-accent"
                : "text-muted-foreground hover:bg-secondary hover:text-foreground lg:hover:bg-transparent",
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
