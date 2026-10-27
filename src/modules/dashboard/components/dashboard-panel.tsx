import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type DashboardPanelProps = {
  title: string;
  description?: string;
  action?: { href: string; label: string };
  className?: string;
  children: React.ReactNode;
};

/** White card with a title row and optional "view all" link — shared by dashboard sections. */
export function DashboardPanel({
  title,
  description,
  action,
  className,
  children,
}: DashboardPanelProps) {
  const headingId = `panel-${title.toLowerCase().replace(/\s+/g, "-")}`;

  return (
    <section
      aria-labelledby={headingId}
      className={cn("flex flex-col rounded-xl border bg-card shadow-xs", className)}
    >
      <header className="flex items-start justify-between gap-4 border-b px-5 py-4">
        <div className="min-w-0">
          <h2 id={headingId} className="font-display text-base font-semibold text-foreground">
            {title}
          </h2>
          {description ? (
            <p className="mt-0.5 text-sm text-muted-foreground">{description}</p>
          ) : null}
        </div>
        {action ? (
          <Link
            href={action.href}
            className="group inline-flex shrink-0 items-center gap-1 rounded-sm text-sm font-semibold text-primary hover:underline focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          >
            {action.label}
            <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
          </Link>
        ) : null}
      </header>
      <div className="flex-1 px-5 py-4">{children}</div>
    </section>
  );
}
