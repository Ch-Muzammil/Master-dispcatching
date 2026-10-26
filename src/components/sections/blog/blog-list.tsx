"use client";

import { useState } from "react";
import { postCategories, posts } from "@/data/blog";
import { FeaturedPost } from "./featured-post";
import { PostCard } from "./post-card";

export function BlogList() {
  const [category, setCategory] = useState<(typeof postCategories)[number]>(postCategories[0]);
  const filtered = category === postCategories[0] ? posts : posts.filter((post) => post.category === category);
  const [featured, ...rest] = filtered;

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-20">
      <div className="flex flex-wrap gap-2">
        {postCategories.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setCategory(item)}
            className={
              item === category
                ? "rounded-full bg-primary px-4 py-1.5 text-sm font-semibold text-primary-foreground"
                : "rounded-full border border-input bg-background px-4 py-1.5 text-sm font-semibold text-muted-foreground transition-colors hover:bg-secondary"
            }
          >
            {item}
          </button>
        ))}
      </div>
      {featured ? <FeaturedPost post={featured} /> : null}
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {rest.map((post) => <PostCard key={post.slug} post={post} />)}
      </div>
      {!filtered.length ? (
        <p className="mt-10 rounded-xl border bg-card p-8 text-center text-sm text-muted-foreground">
          No articles in this category yet — new guides go up twice a month.
        </p>
      ) : null}
    </section>
  );
}
