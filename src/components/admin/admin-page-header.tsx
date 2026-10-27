import Link from "next/link";
import { ArrowLeft } from "lucide-react";

type AdminPageHeaderProps = {
  title: string;
  description?: string;
  /** Primary page actions, e.g. a "New service" button. Wraps on small screens. */
  actions?: React.ReactNode;
  /** Shows a "back" link above the title — use on create / edit pages. */
  back?: { href: string; label: string };
};

/**
 * Title block at the top of every admin page.
 *
 * HOW TO USE:
 *   <AdminPageHeader title="Services" description="…" actions={<Button>New</Button>} />
 *   <AdminPageHeader title="Edit service" back={{ href: "/admin/services", label: "Services" }} />
 */
export function AdminPageHeader({
  title,
  description,
  actions,
  back,
}: AdminPageHeaderProps) {
  return (
    <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="min-w-0">
        {back ? (
          <Link
            href={back.href}
            className="mb-2 inline-flex items-center gap-1.5 rounded-sm text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          >
            <ArrowLeft className="size-4" aria-hidden />
            {back.label}
          </Link>
        ) : null}
        <h1 className="font-display text-2xl font-bold tracking-tight text-foreground sm:text-[1.75rem]">
          {title}
        </h1>
        {description ? (
          <p className="mt-1 max-w-2xl text-sm text-muted-foreground">{description}</p>
        ) : null}
      </div>
      {actions ? (
        <div className="flex shrink-0 flex-wrap items-center gap-2">{actions}</div>
      ) : null}
    </header>
  );
}
