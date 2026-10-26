import Image from "next/image";
import Link from "next/link";
import type { Post } from "@/data/blog";
import { PostMeta } from "./post-meta";

export function PostCard({ post }: { post: Post }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border bg-card transition-all hover:-translate-y-0.5 hover:shadow-lg"
    >
      <Image
        src={post.cover}
        alt={post.coverAlt}
        width={1600}
        height={1008}
        className="aspect-[16/9] w-full object-cover"
      />
      <div className="flex flex-1 flex-col p-6">
        <PostMeta category={post.category} readTime={post.readTime} />
        <h2 className="mt-3 font-display text-lg font-bold leading-snug group-hover:underline">
          {post.title}
        </h2>
        <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{post.excerpt}</p>
        <p className="mt-auto pt-4 text-xs font-medium text-muted-foreground">
          {post.author} · {post.date}
        </p>
      </div>
    </Link>
  );
}
