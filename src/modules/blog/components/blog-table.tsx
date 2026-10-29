"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ImageOff } from "lucide-react";
import { formatRelativeTime } from "@/lib/format-relative-time";
import { StatusBadge } from "@/components/admin";
import { UserAvatar } from "@/components/ui/Avatar";
import { DataTable, type DataTableColumn } from "@/components/ui/Table";
import { POST_STATUS_META } from "../constants";
import type { AdminPost } from "../types";
import { PostRowActions } from "./post-row-actions";

type BlogTableProps = {
  posts: AdminPost[];
  emptyState: ReactNode;
};

const columns: DataTableColumn<AdminPost>[] = [
  {
    id: "article",
    header: "Article",
    width: 360,
    cell: (post) => (
      <div className="flex min-w-0 items-center gap-3">
        <div className="relative size-11 shrink-0 overflow-hidden rounded-lg border bg-muted">
          {post.cover ? (
            <Image src={post.cover} alt="" fill sizes="44px" className="object-cover" />
          ) : (
            <span className="flex size-full items-center justify-center text-muted-foreground">
              <ImageOff className="size-4" aria-hidden />
            </span>
          )}
        </div>
        <div className="min-w-0">
          <Link
            href={`/admin/blog/${post.slug}`}
            className="block truncate rounded-sm font-semibold text-foreground hover:underline focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
          >
            {post.title}
          </Link>
          <p className="truncate text-xs text-muted-foreground">{post.category}</p>
        </div>
      </div>
    ),
  },
  {
    id: "author",
    header: "Author",
    width: 180,
    cell: (post) => (
      <div className="flex min-w-0 items-center gap-2">
        <UserAvatar name={post.author} fallback={post.authorInitials} size="sm" />
        <span className="truncate text-sm">{post.author}</span>
      </div>
    ),
  },
  {
    id: "status",
    header: "Status",
    width: 120,
    cell: (post) => {
      const meta = POST_STATUS_META[post.status];
      return <StatusBadge label={meta.label} tone={meta.tone} />;
    },
  },
  {
    id: "publishedAt",
    header: "Published",
    width: 130,
    cell: (post) => (
      <div className="text-sm text-muted-foreground">
        <time dateTime={post.publishedAt}>
          {formatRelativeTime(post.publishedAt, { locale: "en-US", style: "short" })}
        </time>
        <p className="text-xs">{post.readTime}</p>
      </div>
    ),
  },
  {
    id: "actions",
    header: <span className="sr-only">Actions</span>,
    width: 64,
    align: "right",
    cell: (post) => <PostRowActions post={post} />,
  },
];

export function BlogTable({ posts, emptyState }: BlogTableProps) {
  return (
    <DataTable columns={columns} data={posts} getRowId={(post) => post.id} emptyMessage={emptyState} />
  );
}
