import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Eyebrow({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span className={cn(
      "inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-muted-foreground",
      className,
    )}>
      <span className="h-px w-6 bg-accent" aria-hidden />
      {children}
    </span>
  );
}
