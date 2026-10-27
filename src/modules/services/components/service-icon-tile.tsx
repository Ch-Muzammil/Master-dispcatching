import { cn } from "@/lib/utils";
import { SERVICE_ICONS } from "../constants";
import type { ServiceIconKey } from "../types";

type ServiceIconTileProps = {
  iconKey: ServiceIconKey;
  size?: "sm" | "md";
  className?: string;
};

/** The navy + amber icon tile used for services on the public site. */
export function ServiceIconTile({ iconKey, size = "md", className }: ServiceIconTileProps) {
  const Icon = SERVICE_ICONS[iconKey].icon;
  return (
    <span
      className={cn(
        "flex shrink-0 items-center justify-center rounded-lg bg-primary text-accent",
        size === "sm" ? "size-9 [&_svg]:size-4" : "size-11 [&_svg]:size-5",
        className,
      )}
      aria-hidden
    >
      <Icon />
    </span>
  );
}
