import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type StatCardProps = {
  label: string;
  value: number | string;
  /** Short supporting line under the value. */
  caption?: string;
  icon: LucideIcon;
  /** Whole card links here when provided. */
  href?: string;
  /** Draws attention when the metric needs action (e.g. overdue follow-ups). */
  attention?: boolean;
};

/**
 * Headline metric for dashboards.
 *
 * HOW TO USE:
 *   <StatCard label="New quote requests" value={4} caption="3 in the last 24h" icon={Inbox} href="/admin/quote-requests" />
 */
export function StatCard({
  label,
  value,
  caption,
  icon: Icon,
  href,
  attention = false,
}: StatCardProps) {
  const body = (
    <>
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm font-medium text-muted-foreground">{label}</p>
        <span
          className={cn(
            "flex size-9 shrink-0 items-center justify-center rounded-lg",
            attention ? "bg-warning-soft text-warning-soft-foreground" : "bg-secondary text-primary",
          )}
        >
          <Icon className="size-[1.125rem]" aria-hidden />
        </span>
      </div>
      <p className="mt-2 font-display text-3xl font-bold tracking-tight text-foreground tabular-nums">
        {value}
      </p>
      {caption ? (
        <p
          className={cn(
            "mt-1 text-xs",
            attention ? "font-medium text-warning-soft-foreground" : "text-muted-foreground",
          )}
        >
          {caption}
        </p>
      ) : null}
    </>
  );

  const className =
    "block rounded-xl border bg-card p-5 shadow-xs transition-[border-color,box-shadow]";

  if (!href) return <div className={className}>{body}</div>;

  return (
    <Link
      href={href}
      className={cn(
        className,
        "hover:border-primary/25 hover:shadow-sm focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
      )}
    >
      {body}
    </Link>
  );
}
