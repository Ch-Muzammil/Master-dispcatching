import { Truck } from "lucide-react";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";
import Link from "next/link";

export function Logo({
  inverse = false,
  className,
}: {
  inverse?: boolean;
  className?: string;
}) {
  return (
    <Link href="/" className={cn("group inline-flex items-center gap-2.5", className)}>
      <span className={cn("flex size-9 items-center justify-center rounded-lg transition-transform group-hover:-translate-y-0.5", inverse ? "bg-accent" : "bg-primary")}>
        <Truck className={cn("size-5", inverse ? "text-accent-foreground" : "text-accent")} aria-hidden strokeWidth={2.2} />
      </span>
      <span className="leading-none">
        <span className={cn("block text-[1.05rem] font-bold tracking-tight", inverse ? "text-white" : "text-foreground")}>
          MERIDIAN
        </span>
        <span className={cn("mt-0.5 block text-[0.6rem] font-semibold uppercase tracking-[0.28em]", inverse ? "text-white/60" : "text-muted-foreground")}>
          Dispatch Group
        </span>
      </span>
    </Link>
  );
}

export function logoName() {
  return siteConfig.name;
}
