import type { StatusTone } from "@/components/admin";
import type { QuoteRequest, QuoteRequestStatus } from "./types";

export const QUOTE_REQUEST_STATUS_META: Record<
  QuoteRequestStatus,
  { label: string; tone: StatusTone }
> = {
  new: { label: "New", tone: "info" },
  contacted: { label: "Contacted", tone: "warning" },
  qualified: { label: "Qualified", tone: "primary" },
  won: { label: "Won", tone: "success" },
  lost: { label: "Lost", tone: "neutral" },
};

/** Statuses where the lead still needs work from the team. */
export const OPEN_QUOTE_REQUEST_STATUSES: QuoteRequestStatus[] = [
  "new",
  "contacted",
  "qualified",
];

/** An open lead whose scheduled follow-up time has passed. */
export function isFollowUpOverdue(request: QuoteRequest, now = Date.now()): boolean {
  return Boolean(
    request.followUpAt &&
      OPEN_QUOTE_REQUEST_STATUSES.includes(request.status) &&
      Date.parse(request.followUpAt) <= now,
  );
}
