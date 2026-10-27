"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { Copy, FileText, Mail, Phone } from "lucide-react";
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
import { APPLICATION_STATUS_META, EXPERIENCE_LEVEL_LABEL } from "../constants";
import type { JobApplication } from "../types";
import { ApplicationUpdateForm } from "./application-update-form";

type ApplicationDetailSheetProps = {
  application: JobApplication | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function ApplicationDetailSheet({
  application,
  open,
  onOpenChange,
}: ApplicationDetailSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full gap-0 sm:max-w-lg">
        {application ? (
          <>
            <ApplicationHeader application={application} />
            <ApplicationUpdateForm
              key={application.id}
              application={application}
              onCancel={() => onOpenChange(false)}
            >
              <ApplicationDetails application={application} />
            </ApplicationUpdateForm>
          </>
        ) : null}
      </SheetContent>
    </Sheet>
  );
}

function ApplicationHeader({ application }: { application: JobApplication }) {
  const status = APPLICATION_STATUS_META[application.status];

  return (
    <SheetHeader className="gap-4 border-b px-5 py-5 pr-12 sm:px-6">
      <div className="flex items-center gap-3">
        <UserAvatar name={application.name} size="lg" />
        <div className="min-w-0">
          <SheetTitle className="truncate font-display text-lg font-bold">
            {application.name}
          </SheetTitle>
          <SheetDescription className="truncate">{application.jobTitle}</SheetDescription>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
        <StatusBadge label={status.label} tone={status.tone} />
        <span>
          Applied <time dateTime={application.receivedAt}>{formatDateTime(application.receivedAt)}</time>
        </span>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <a
          href={`tel:${application.phone.replace(/[^\d+]/g, "")}`}
          className={cn(buttonVariants({ variant: "outline" }), "gap-1.5")}
        >
          <Phone aria-hidden />
          Call
        </a>
        <a
          href={`mailto:${application.email}?subject=${encodeURIComponent(`Your application — ${application.jobTitle}`)}`}
          className={cn(buttonVariants({ variant: "default" }), "gap-1.5")}
        >
          <Mail aria-hidden />
          Email
        </a>
      </div>
    </SheetHeader>
  );
}

function ApplicationDetails({ application }: { application: JobApplication }) {
  async function copyEmail() {
    const copied = await copyToClipboard(application.email);
    if (copied) toast.success("Email copied");
    else toast.error("Couldn't copy — select the email and copy it manually.");
  }

  return (
    <>
      <section aria-labelledby="application-details-heading" className="space-y-3">
        <h3 id="application-details-heading" className="text-sm font-semibold text-foreground">
          Details
        </h3>
        <dl className="grid gap-x-4 gap-y-3 rounded-lg border p-4 text-sm sm:grid-cols-2">
          <DetailItem label="Email" className="sm:col-span-2">
            <span className="flex min-w-0 items-center gap-1">
              <span className="truncate">{application.email}</span>
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
          <DetailItem label="Phone">{application.phone}</DetailItem>
          <DetailItem label="Experience">{EXPERIENCE_LEVEL_LABEL[application.experience]}</DetailItem>
          <DetailItem label="Role" className="sm:col-span-2">
            <Link
              href={`/admin/careers/${application.jobSlug}`}
              className="rounded-sm font-medium hover:underline focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
            >
              {application.jobTitle}
            </Link>
          </DetailItem>
          <DetailItem label="Résumé" className="sm:col-span-2">
            {application.resumeName ? (
              <span className="inline-flex items-center gap-1.5">
                <FileText className="size-4 text-muted-foreground" aria-hidden />
                {application.resumeName}
              </span>
            ) : (
              "Not attached"
            )}
          </DetailItem>
        </dl>
      </section>

      <section aria-labelledby="application-note-heading" className="space-y-3">
        <h3 id="application-note-heading" className="text-sm font-semibold text-foreground">
          Why this role
        </h3>
        <p className="rounded-lg bg-muted px-4 py-3 text-sm leading-relaxed whitespace-pre-line text-foreground">
          {application.note}
        </p>
      </section>

      <section aria-labelledby="application-notes-heading" className="space-y-3">
        <h3 id="application-notes-heading" className="text-sm font-semibold text-foreground">
          Notes
          <span className="ml-1.5 font-normal text-muted-foreground">({application.notes.length})</span>
        </h3>
        {application.notes.length === 0 ? (
          <p className="text-sm text-muted-foreground">No notes yet. Add the first one below.</p>
        ) : (
          <ol className="space-y-3">
            {application.notes.map((note) => (
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
