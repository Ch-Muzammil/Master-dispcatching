"use client";

import { useState } from "react";
import Link from "next/link";
import { ExternalLink, EyeOff, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
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
import type { AdminCmsPage } from "../types";

export function PageRowActions({ page }: { page: AdminCmsPage }) {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const editHref = page.managedIn?.href ?? `/admin/pages/${page.slug}`;
  const publicHref = page.path;

  return (
    <div className="flex justify-end">
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button
              variant="ghost"
              size="icon-sm"
              aria-label={`Actions for ${page.title}`}
              className="text-muted-foreground data-popup-open:bg-muted"
            />
          }
        >
          <MoreHorizontal />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-52">
          <DropdownMenuItem render={<Link href={editHref} />}>
            <Pencil aria-hidden />
            Edit
          </DropdownMenuItem>
          {page.status === "published" ? (
            <DropdownMenuItem
              render={<a href={publicHref} target="_blank" rel="noopener noreferrer" />}
            >
              <ExternalLink aria-hidden />
              View on website
            </DropdownMenuItem>
          ) : null}
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => notifyDemoMode("Unpublishing this page")}>
            <EyeOff aria-hidden />
            Unpublish
          </DropdownMenuItem>
          <DropdownMenuItem variant="destructive" onClick={() => setConfirmDelete(true)}>
            <Trash2 aria-hidden />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <ConfirmDialog
        open={confirmDelete}
        onOpenChange={setConfirmDelete}
        title={`Delete “${page.title}”?`}
        description="Published site pages can’t be deleted in this demo. Unpublish first, or edit the copy instead."
        confirmLabel="Got it"
        onConfirm={() => notifyDemoMode("Deleting this page")}
      />
    </div>
  );
}
