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
import type { AdminPost } from "../types";

export function PostRowActions({ post }: { post: AdminPost }) {
  const [confirmArchive, setConfirmArchive] = useState(false);
  const isPublished = post.status === "published";
  const isArchived = post.status === "archived";

  return (
    <div className="flex justify-end">
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button
              variant="ghost"
              size="icon-sm"
              aria-label={`Actions for ${post.title}`}
              className="text-muted-foreground data-popup-open:bg-muted"
            />
          }
        >
          <MoreHorizontal />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-52">
          <DropdownMenuItem render={<Link href={`/admin/blog/${post.slug}`} />}>
            <Pencil aria-hidden />
            Edit
          </DropdownMenuItem>
          {isPublished ? (
            <DropdownMenuItem
              render={<a href={`/blog/${post.slug}`} target="_blank" rel="noopener noreferrer" />}
            >
              <ExternalLink aria-hidden />
              View on website
            </DropdownMenuItem>
          ) : null}
          <DropdownMenuSeparator />
          {isArchived ? (
            <DropdownMenuItem onClick={() => notifyDemoMode("Restoring this article")}>
              <ArchiveRestore aria-hidden />
              Restore as draft
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem onClick={() => notifyDemoMode(isPublished ? "Unpublishing" : "Publishing")}>
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
        title={`Archive “${post.title}”?`}
        description="It will be removed from the blog. You can restore it from the Archived tab at any time."
        confirmLabel="Archive article"
        destructive
        onConfirm={() => notifyDemoMode("Archiving")}
      />
    </div>
  );
}
