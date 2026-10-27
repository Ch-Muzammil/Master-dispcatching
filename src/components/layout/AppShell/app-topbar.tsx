"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { findActiveNavItem, ROLE_NAV } from "@/config/nav";
import { getHomeRouteForRole, type UserRole } from "@/config/roles";
import { buttonVariants } from "@/components/ui/Button";
import { SidebarTrigger } from "@/components/ui/Sidebar";
import { DemoDataNotice } from "@/components/admin";

export function AppTopbar({ role }: { role: UserRole }) {
  const pathname = usePathname();
  const section = findActiveNavItem(ROLE_NAV[role], pathname)?.label;

  return (
    <header className="sticky top-0 z-20 flex h-16 shrink-0 items-center gap-3 border-b bg-background/95 px-4 backdrop-blur supports-backdrop-filter:bg-background/80 sm:px-6 lg:px-8">
      <SidebarTrigger className="-ml-1.5 text-muted-foreground hover:text-foreground" aria-label="Toggle navigation" />

      <nav aria-label="Breadcrumb" className="min-w-0">
        <ol className="flex items-center gap-1.5 text-sm">
          <li className="hidden sm:block">
            <Link
              href={getHomeRouteForRole(role)}
              className="rounded-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
            >
              Admin
            </Link>
          </li>
          {section ? (
            <>
              <li className="hidden sm:block" aria-hidden>
                <ChevronRight className="size-3.5 text-muted-foreground/60" />
              </li>
              <li className="truncate font-semibold text-foreground" aria-current="page">
                {section}
              </li>
            </>
          ) : null}
        </ol>
      </nav>

      <div className="ml-auto flex shrink-0 items-center gap-2">
        <DemoDataNotice />
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="View website (opens in a new tab)"
          className={cn(buttonVariants({ variant: "outline", size: "sm" }), "gap-1.5")}
        >
          <ExternalLink aria-hidden />
          <span className="hidden sm:inline">View website</span>
        </a>
      </div>
    </header>
  );
}
