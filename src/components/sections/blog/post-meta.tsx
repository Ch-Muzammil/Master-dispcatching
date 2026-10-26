import { Clock3 } from "lucide-react";

type PostMetaProps = {
  category: string;
  readTime: string;
};

export function PostMeta({ category, readTime }: PostMetaProps) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
        {category}
      </span>
      <span className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
        <Clock3 className="size-3.5" aria-hidden />
        {readTime}
      </span>
    </div>
  );
}
