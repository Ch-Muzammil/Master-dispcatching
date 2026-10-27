import { Badge } from "@/components/ui/Badge";

export type StatusTone =
  | "neutral"
  | "info"
  | "primary"
  | "success"
  | "warning"
  | "danger";

const TONE_TO_VARIANT = {
  neutral: "neutral",
  info: "info",
  primary: "secondary",
  success: "success",
  warning: "warning",
  danger: "destructive",
} as const satisfies Record<StatusTone, string>;

/** Solid fill per tone — for bars, dots, and legends next to a text label. */
export const STATUS_TONE_FILL: Record<StatusTone, string> = {
  neutral: "bg-muted-foreground/40",
  info: "bg-info",
  primary: "bg-primary",
  success: "bg-success",
  warning: "bg-warning",
  danger: "bg-destructive",
};

type StatusBadgeProps = {
  label: string;
  tone: StatusTone;
  className?: string;
};

/**
 * Status pill used in tables and detail panels. Always shows a text label,
 * so meaning never depends on color alone.
 *
 * Each feature maps its own statuses to a tone, e.g.
 *   const SERVICE_STATUS_TONE = { draft: "neutral", published: "success", archived: "warning" }
 *   <StatusBadge label="Published" tone={SERVICE_STATUS_TONE.published} />
 */
export function StatusBadge({ label, tone, className }: StatusBadgeProps) {
  return (
    <Badge variant={TONE_TO_VARIANT[tone]} className={className}>
      <span className="size-1.5 rounded-full bg-current" aria-hidden />
      {label}
    </Badge>
  );
}
