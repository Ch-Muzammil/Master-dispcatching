"use client";

import { useState } from "react";
import Image from "next/image";
import { Check, Copy, ImageOff, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { notifyDemoMode } from "@/components/admin";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ConfirmDialog } from "@/components/ui/AlertDialog";
import { EmptyState } from "@/components/ui/Empty";
import type { MediaItem } from "../types";

export function MediaLibrary({ items }: { items: MediaItem[] }) {
  const [filter, setFilter] = useState("All");
  const [copied, setCopied] = useState<string | null>(null);
  const [pendingDelete, setPendingDelete] = useState<MediaItem | null>(null);

  const tags = ["All", ...Array.from(new Set(items.flatMap((item) => item.tags)))];
  const visible = filter === "All" ? items : items.filter((item) => item.tags.includes(filter));

  async function copyUrl(item: MediaItem) {
    try {
      await navigator.clipboard.writeText(item.url);
      setCopied(item.id);
      toast.success(`Copied URL for “${item.name}”.`);
      window.setTimeout(() => setCopied(null), 2000);
    } catch {
      toast.error("Couldn’t access the clipboard in this browser.");
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <Button
            key={tag}
            type="button"
            size="sm"
            variant={filter === tag ? "default" : "outline"}
            className="rounded-full"
            onClick={() => setFilter(tag)}
          >
            {tag}
          </Button>
        ))}
      </div>

      {visible.length === 0 ? (
        <EmptyState
          icon={<ImageOff />}
          title={`No images tagged “${filter}”`}
          description="Upload images from this library once the database is connected."
        />
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {visible.map((item) => (
            <article key={item.id} className="overflow-hidden rounded-xl border bg-card shadow-xs">
              <div className="relative aspect-video bg-muted">
                <Image
                  src={item.url}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>
              <div className="space-y-3 p-4">
                <div>
                  <p className="truncate text-sm font-semibold">{item.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {item.dimensions} · {item.size} · {item.uploaded}
                  </p>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {item.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    icon={copied === item.id ? <Check /> : <Copy />}
                    onClick={() => copyUrl(item)}
                  >
                    {copied === item.id ? "Copied" : "Copy URL"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="text-destructive hover:text-destructive"
                    aria-label={`Delete ${item.name}`}
                    icon={<Trash2 />}
                    onClick={() => setPendingDelete(item)}
                  />
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      <p className="text-xs text-muted-foreground">
        Showing {visible.length} of {items.length} images. Uploads stay local until storage is
        connected.
      </p>

      <ConfirmDialog
        open={pendingDelete !== null}
        onOpenChange={(open) => !open && setPendingDelete(null)}
        title={pendingDelete ? `Remove “${pendingDelete.name}”?` : "Remove image?"}
        description="Remove this file from every page that uses it first. In demo mode nothing is deleted."
        confirmLabel="Remove"
        destructive
        onConfirm={() => {
          if (pendingDelete) notifyDemoMode(`Removing ${pendingDelete.name}`);
          setPendingDelete(null);
        }}
      />
    </div>
  );
}
