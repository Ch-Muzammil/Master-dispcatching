"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Archive,
  ArchiveRestore,
  ExternalLink,
  EyeOff,
  MoreHorizontal,
  Pencil,
  Send,
  Star,
  StarOff,
} from "lucide-react";
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
import type { AdminService } from "../types";

export function ServiceRowActions({ service }: { service: AdminService }) {
  const [confirmArchive, setConfirmArchive] = useState(false);
  const isPublished = service.status === "published";
  const isArchived = service.status === "archived";

  return (
    <div className="flex justify-end">
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button
              variant="ghost"
              size="icon-sm"
              aria-label={`Actions for ${service.title}`}
              className="text-muted-foreground data-popup-open:bg-muted"
            />
          }
        >
          <MoreHorizontal />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-52">
          <DropdownMenuItem render={<Link href={`/admin/services/${service.slug}`} />}>
            <Pencil aria-hidden />
            Edit
          </DropdownMenuItem>
          {isPublished ? (
            <DropdownMenuItem
              render={
                <a href={`/services/${service.slug}`} target="_blank" rel="noopener noreferrer" />
              }
            >
              <ExternalLink aria-hidden />
              View on website
            </DropdownMenuItem>
          ) : null}
          <DropdownMenuSeparator />
          {!isArchived ? (
            <DropdownMenuItem
              onClick={() =>
                notifyDemoMode(service.featured ? "Removing from featured" : "Featuring this service")
              }
            >
              {service.featured ? <StarOff aria-hidden /> : <Star aria-hidden />}
              {service.featured ? "Remove from featured" : "Feature on home page"}
            </DropdownMenuItem>
          ) : null}
          {isArchived ? (
            <DropdownMenuItem onClick={() => notifyDemoMode("Restoring this service")}>
              <ArchiveRestore aria-hidden />
              Restore as draft
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem
              onClick={() => notifyDemoMode(isPublished ? "Unpublishing" : "Publishing")}
            >
              {isPublished ? <EyeOff aria-hidden /> : <Send aria-hidden />}
              {isPublished ? "Unpublish" : "Publish"}
            </DropdownMenuItem>
          )}
          {!isArchived ? (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem variant="destructive" onClick={() => setConfirmArchive(true)}>
                <Archive aria-hidden />
                Archive
              </DropdownMenuItem>
            </>
          ) : null}
        </DropdownMenuContent>
      </DropdownMenu>

      <ConfirmDialog
        open={confirmArchive}
        onOpenChange={setConfirmArchive}
        title={`Archive “${service.title}”?`}
        description="It will be removed from the website. You can restore it from the Archived tab at any time."
        confirmLabel="Archive service"
        destructive
        onConfirm={() => notifyDemoMode("Archiving")}
      />
    </div>
  );
}
