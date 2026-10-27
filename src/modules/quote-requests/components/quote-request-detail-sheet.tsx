"use client";

import type { ReactNode } from "react";
import { AlarmClock, Copy, Mail, Phone } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { copyToClipboard } from "@/lib/copy-to-clipboard";
import { formatDateTime } from "@/lib/format-date";
import { formatRelativeTime } from "@/lib/format-relative-time";
import { StatusBadge } from "@/components/admin";
import { UserAvatar } from "@/components/ui/Avatar";
import { Button, buttonVariants } from "@/components/ui/Button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/Sheet";
import { isFollowUpOverdue, QUOTE_REQUEST_STATUS_META } from "../constants";
import type { QuoteRequest } from "../types";
import { QuoteRequestUpdateForm } from "./quote-request-update-form";

type QuoteRequestDetailSheetProps = {
  /** Kept after closing so the exit animation still has content. */
  request: QuoteRequest | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  teamMembers: string[];
};

export function QuoteRequestDetailSheet({
  request,
  open,
  onOpenChange,
  teamMembers,
}: QuoteRequestDetailSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full gap-0 sm:max-w-lg">
        {request ? (
          <>
            <LeadHeader request={request} />
            <QuoteRequestUpdateForm
              key={request.id}
              request={request}
              teamMembers={teamMembers}
              onCancel={() => onOpenChange(false)}
            >
              <LeadDetails request={request} />
            </QuoteRequestUpdateForm>
          </>
        ) : null}
      </SheetContent>
    </Sheet>
  );
}

function LeadHeader({ request }: { request: QuoteRequest }) {
  const status = QUOTE_REQUEST_STATUS_META[request.status];

  return (
    <SheetHeader className="gap-4 border-b px-5 py-5 pr-12 sm:px-6">
      <div className="flex items-center gap-3">
        <UserAvatar name={request.name} size="lg" />
        <div className="min-w-0">
          <SheetTitle className="truncate font-display text-lg font-bold">{request.name}</SheetTitle>
          <SheetDescription className="truncate">{request.company}</SheetDescription>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
        <StatusBadge label={status.label} tone={status.tone} />
        <span>
          Received <time dateTime={request.receivedAt}>{formatDateTime(request.receivedAt)}</time>
        </span>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <a
          href={`tel:${request.phone.replace(/[^\d+]/g, "")}`}
          className={cn(buttonVariants({ variant: "outline" }), "gap-1.5")}
        >
          <Phone aria-hidden />
          Call
        </a>
        <a
          href={`mailto:${request.email}?subject=${encodeURIComponent(`Your dispatch quote — ${request.company}`)}`}
          className={cn(buttonVariants({ variant: "default" }), "gap-1.5")}
        >
          <Mail aria-hidden />
          Email
        </a>
      </div>
    </SheetHeader>
  );
}

function LeadDetails({ request }: { request: QuoteRequest }) {
  const overdue = isFollowUpOverdue(request);

  async function copyEmail() {
    const copied = await copyToClipboard(request.email);
    if (copied) toast.success("Email copied");
    else toast.error("Couldn't copy — select the email and copy it manually.");
  }

  return (
    <>
      {overdue && request.followUpAt ? (
        <div
          role="status"
          className="flex items-start gap-3 rounded-lg bg-warning-soft px-4 py-3 text-sm text-warning-soft-foreground"
        >
          <AlarmClock className="mt-0.5 size-4 shrink-0" aria-hidden />
          <p>
            <span className="font-semibold">Follow-up overdue.</span> It was due{" "}
            {formatRelativeTime(request.followUpAt, { locale: "en-US" })}.
          </p>
        </div>
      ) : null}

      <section aria-labelledby="lead-details-heading" className="space-y-3">
        <h3 id="lead-details-heading" className="text-sm font-semibold text-foreground">
          Details
        </h3>
        <dl className="grid gap-x-4 gap-y-3 rounded-lg border p-4 text-sm sm:grid-cols-2">
          <DetailItem label="Email" className="sm:col-span-2">
            <span className="flex min-w-0 items-center gap-1">
              <span className="truncate">{request.email}</span>
              <Button
                variant="ghost"
                size="icon-xs"
                onClick={copyEmail}
                aria-label="Copy email"
                className="shrink-0 text-muted-foreground"
              >
                <Copy />
              </Button>
            </span>
          </DetailItem>
          <DetailItem label="Phone">{request.phone}</DetailItem>
          <DetailItem label="Equipment">{request.equipment}</DetailItem>
          <DetailItem label="Fleet size">{request.fleetSize}</DetailItem>
          <DetailItem label="Owner">{request.assignedTo ?? "Unassigned"}</DetailItem>
          <DetailItem label="Next follow-up">
            {request.followUpAt ? formatDateTime(request.followUpAt) : "Not scheduled"}
          </DetailItem>
        </dl>
      </section>

      <section aria-labelledby="lead-message-heading" className="space-y-3">
        <h3 id="lead-message-heading" className="text-sm font-semibold text-foreground">
          Message
        </h3>
        <p className="rounded-lg bg-muted px-4 py-3 text-sm leading-relaxed whitespace-pre-line text-foreground">
          {request.message}
        </p>
      </section>

      <section aria-labelledby="lead-notes-heading" className="space-y-3">
        <h3 id="lead-notes-heading" className="text-sm font-semibold text-foreground">
          Notes
          <span className="ml-1.5 font-normal text-muted-foreground">({request.notes.length})</span>
        </h3>
        {request.notes.length === 0 ? (
          <p className="text-sm text-muted-foreground">No notes yet. Add the first one below.</p>
        ) : (
          <ol className="space-y-3">
            {request.notes.map((note) => (
              <li key={note.id} className="flex gap-3">
                <UserAvatar name={note.author} size="sm" />
                <div className="min-w-0 flex-1 rounded-lg border px-3 py-2">
                  <p className="text-xs text-muted-foreground">
                    <span className="font-medium text-foreground">{note.author}</span> ·{" "}
                    <time dateTime={note.createdAt}>
                      {formatRelativeTime(note.createdAt, { locale: "en-US", style: "short" })}
                    </time>
                  </p>
                  <p className="mt-1 text-sm whitespace-pre-line">{note.body}</p>
                </div>
              </li>
            ))}
          </ol>
        )}
      </section>
    </>
  );
}

function DetailItem({
  label,
  className,
  children,
}: {
  label: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("min-w-0", className)}>
      <dt className="text-xs text-muted-foreground">{label}</dt>
      <dd className="mt-0.5 font-medium text-foreground">{children}</dd>
    </div>
  );
}
