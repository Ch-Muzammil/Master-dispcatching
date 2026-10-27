"use client";

import { useState } from "react";
import { Newspaper, Search, SearchX } from "lucide-react";
import { StatusFilter } from "@/components/admin";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/Empty";
import { Input } from "@/components/ui/Input";
import { POST_STATUS_META } from "../constants";
import { POST_STATUSES, type AdminPost, type PostStatus } from "../types";
import { BlogTable } from "./blog-table";

type StatusFilterValue = PostStatus | "all";

/** Posts are a short list, so filtering happens on the client — no extra requests. */
export function BlogListView({ posts }: { posts: AdminPost[] }) {
  const [status, setStatus] = useState<StatusFilterValue>("all");
  const [search, setSearch] = useState("");

  const needle = search.trim().toLowerCase();
  const searched = needle
    ? posts.filter((post) =>
        [post.title, post.category, post.author, post.excerpt].some((value) =>
          value.toLowerCase().includes(needle),
        ),
      )
    : posts;
  const visible = status === "all" ? searched : searched.filter((post) => post.status === status);

  const options = [
    { value: "all" as const, label: "All", count: searched.length },
    ...POST_STATUSES.map((value) => ({
      value,
      label: POST_STATUS_META[value].label,
      count: searched.filter((post) => post.status === value).length,
    })),
  ];

  function clearFilters() {
    setStatus("all");
    setSearch("");
  }

  const emptyState =
    posts.length === 0 ? (
      <EmptyState
        bordered={false}
        icon={<Newspaper />}
        title="No articles yet"
        description="Write the first article to show it on your blog."
      />
    ) : (
      <EmptyState
        bordered={false}
        icon={<SearchX />}
        title="No articles match"
        description="Try another search or status."
        action={
          <Button variant="outline" onClick={clearFilters}>
            Clear filters
          </Button>
        }
      />
    );

  return (
    <div className="flex flex-col gap-4">
      <StatusFilter options={options} value={status} onChange={setStatus} />

      <div className="overflow-hidden rounded-xl border bg-card shadow-xs">
        <div className="flex flex-col gap-3 border-b p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="w-full sm:max-w-xs">
            <Input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              icon={<Search />}
              placeholder="Search title, author, category…"
              aria-label="Search articles"
              enterKeyHint="search"
              maxLength={100}
            />
          </div>
          <p className="text-sm text-muted-foreground tabular-nums" aria-live="polite">
            {visible.length} of {posts.length} articles
          </p>
        </div>
        <BlogTable posts={visible} emptyState={emptyState} />
      </div>
    </div>
  );
}
