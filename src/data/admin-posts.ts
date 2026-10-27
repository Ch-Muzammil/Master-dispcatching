/**
 * DEMO DATA — admin view of blog posts until Supabase is connected.
 * Published rows mirror the public blog; the draft exists only in admin.
 */
import type { AdminPost, AdminPostBlock, BlogCategory } from "@/modules/blog/types";
import { posts, type PostBlock } from "./blog";

const HOUR = 60 * 60 * 1000;

function toAdminBlocks(blocks: PostBlock[]): AdminPostBlock[] {
  return blocks.map((block) =>
    block.kind === "list"
      ? { kind: "list", text: block.items.join("\n") }
      : { kind: block.kind, text: block.text },
  );
}

export function buildDemoAdminPosts(now = Date.now()): AdminPost[] {
  const published: AdminPost[] = posts.map((post, index) => ({
    id: `post-${post.slug}`,
    slug: post.slug,
    title: post.title,
    category: post.category as BlogCategory,
    excerpt: post.excerpt,
    author: post.author,
    authorRole: post.authorRole,
    authorInitials: post.authorInitials,
    cover: post.cover,
    coverAlt: post.coverAlt,
    body: toAdminBlocks(post.body),
    status: "published",
    publishedAt: new Date(now - (24 + index * 160) * HOUR).toISOString(),
    readTime: post.readTime,
  }));

  const draft: AdminPost = {
    id: "post-detention-claims",
    slug: "how-to-win-detention-claims",
    title: "How to Win Detention Claims Without Burning the Broker",
    category: "Dispatch guides",
    excerpt:
      "Detention money is sitting on the table at most small fleets. Here's the paper trail that actually gets it paid.",
    author: "Marcus Bell",
    authorRole: "Director of Dispatch Operations",
    authorInitials: "MB",
    cover: "",
    coverAlt: "",
    body: [
      {
        kind: "p",
        text: "Most detention claims fail because the clock started in someone's head, not in writing. This draft walks through the timestamps brokers actually honor.",
      },
    ],
    status: "draft",
    publishedAt: new Date(now - 4 * HOUR).toISOString(),
    readTime: "1 min read",
  };

  return [...published, draft];
}
