import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Post } from "@/data/blog";
import { PostMeta } from "./post-meta";

export function FeaturedPost({ post }: { post: Post }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group mt-10 grid gap-8 overflow-hidden rounded-2xl border bg-card transition-all hover:-translate-y-0.5 hover:shadow-lg lg:grid-cols-2"
    >
      <Image
        src={post.cover}
        alt={post.coverAlt}
        width={1600}
        height={1008}
        className="aspect-[16/10] h-full w-full object-cover"
      />
      <div className="flex flex-col justify-center p-8 sm:p-10">
        <PostMeta category={post.category} readTime={post.readTime} />
        <h2 className="mt-4 font-display text-2xl font-bold tracking-tight group-hover:underline sm:text-3xl">
          {post.title}
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
          {post.excerpt}
        </p>
        <div className="mt-6 flex items-center gap-3">
          <span className="flex size-9 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
            {post.authorInitials}
          </span>
          <div className="text-sm">
            <p className="font-semibold">{post.author}</p>
            <p className="text-xs text-muted-foreground">
              {post.authorRole} · {post.date}
            </p>
          </div>
        </div>
        <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-primary">
          Read article
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
        </span>
      </div>
    </Link>
  );
}
