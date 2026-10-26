import { Clock3 } from "lucide-react";
import type { Post } from "@/data/blog";

export function ArticleMeta({ post }: { post: Post }) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3 text-sm text-muted-foreground">
      <span className="rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
        {post.category}
      </span>
      <span className="inline-flex items-center gap-1.5">
        <Clock3 className="size-4" aria-hidden />
        {post.readTime}
      </span>
      <span>{post.date}</span>
    </div>
  );
}
