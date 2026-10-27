"use client";

import { useWatch, type Control } from "react-hook-form";
import { UserAvatar } from "@/components/ui/Avatar";
import { estimateReadTime } from "../constants";
import type { PostFormValues } from "../schemas/post-schema";

export function PostPreview({ control }: { control: Control<PostFormValues> }) {
  const [title, excerpt, category, author, authorInitials, body] = useWatch({
    control,
    name: ["title", "excerpt", "category", "author", "authorInitials", "body"],
  });

  return (
    <div className="rounded-lg border bg-background p-4" aria-label="Website preview">
      <p className="text-[0.68rem] font-bold tracking-[0.16em] text-primary uppercase">{category}</p>
      <p className="mt-2 font-display text-base leading-snug font-bold break-words text-foreground">
        {title.trim() || "Article title"}
      </p>
      <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
        {excerpt.trim() || "A two-sentence summary carriers see on the blog list."}
      </p>
      <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
        <UserAvatar name={author || "Author"} fallback={authorInitials} size="sm" />
        <span className="truncate font-medium text-foreground">{author || "Author"}</span>
        <span aria-hidden>·</span>
        <span>{estimateReadTime(body ?? [])}</span>
      </div>
    </div>
  );
}
