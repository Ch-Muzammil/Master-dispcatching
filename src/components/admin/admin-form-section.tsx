import { useId, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type AdminFormSectionProps = {
  title: string;
  description?: string;
  /** Right side of the section header, e.g. a counter or small action. */
  aside?: ReactNode;
  className?: string;
  children: ReactNode;
};

/**
 * White card that groups related fields in admin editors.
 *
 * HOW TO USE:
 *   <AdminFormSection title="Basics" description="Shown on the services page.">
 *     <Input label="Title" … />
 *   </AdminFormSection>
 */
export function AdminFormSection({
  title,
  description,
  aside,
  className,
  children,
}: AdminFormSectionProps) {
  const headingId = useId();

  return (
    <section
      aria-labelledby={headingId}
      className={cn("rounded-xl border bg-card shadow-xs", className)}
    >
      <header className="flex items-start justify-between gap-3 border-b px-5 py-4">
        <div className="min-w-0">
          <h2 id={headingId} className="font-display text-base font-bold text-foreground">
            {title}
          </h2>
          {description ? (
            <p className="mt-0.5 text-sm text-muted-foreground">{description}</p>
          ) : null}
        </div>
        {aside ? <div className="shrink-0">{aside}</div> : null}
      </header>
      <div className="space-y-5 px-5 py-5">{children}</div>
    </section>
  );
}
