"use client";

import { useState } from "react";
import Link from "next/link";
import { Ban, ExternalLink, MoreHorizontal, Pencil, Send } from "lucide-react";
import { notifyDemoMode } from "@/components/admin";
import { ConfirmDialog } from "@/components/ui/AlertDialog";
import { Button } from "@/components/ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import type { AdminJob } from "../types";

export function CareerRowActions({ job }: { job: AdminJob }) {
  const [confirmClose, setConfirmClose] = useState(false);
  const isOpen = job.status === "open";
  const isDraft = job.status === "draft";

  return (
    <div className="flex justify-end">
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button
              variant="ghost"
              size="icon-sm"
              aria-label={`Actions for ${job.title}`}
              className="text-muted-foreground data-popup-open:bg-muted"
            />
          }
        >
          <MoreHorizontal />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-52">
          <DropdownMenuItem render={<Link href={`/admin/careers/${job.slug}`} />}>
            <Pencil aria-hidden />
            Edit
          </DropdownMenuItem>
          {!isDraft ? (
            <DropdownMenuItem
              render={<a href={`/careers/${job.slug}`} target="_blank" rel="noopener noreferrer" />}
            >
              <ExternalLink aria-hidden />
              View on website
            </DropdownMenuItem>
          ) : null}
          <DropdownMenuSeparator />
          {isOpen ? (
            <DropdownMenuItem variant="destructive" onClick={() => setConfirmClose(true)}>
              <Ban aria-hidden />
              Close listing
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem onClick={() => notifyDemoMode("Opening this listing")}>
              <Send aria-hidden />
              {isDraft ? "Open listing" : "Reopen listing"}
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      <ConfirmDialog
        open={confirmClose}
        onOpenChange={setConfirmClose}
        title={`Close “${job.title}”?`}
        description="It will move to recently closed on the careers page. Existing applications stay in the inbox."
        confirmLabel="Close listing"
        destructive
        onConfirm={() => notifyDemoMode("Closing this listing")}
      />
    </div>
  );
}
