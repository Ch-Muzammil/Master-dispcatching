export const POST_STATUSES = ["published", "draft", "archived"] as const;
export type PostStatus = (typeof POST_STATUSES)[number];

export const BLOG_CATEGORIES = [
  "Dispatch guides",
  "Market insights",
  "Compliance",
  "Company news",
] as const;
export type BlogCategory = (typeof BLOG_CATEGORIES)[number];

export const POST_BLOCK_KINDS = ["p", "h", "list", "quote"] as const;
export type PostBlockKind = (typeof POST_BLOCK_KINDS)[number];

/** Form-friendly block: lists store one item per line in `text`. */
export type AdminPostBlock = {
  kind: PostBlockKind;
  text: string;
};

export type BlogAuthor = {
  name: string;
  role: string;
  initials: string;
};

/**
 * An article as the admin manages it. Serializable so it can cross the
 * server → client boundary and map to a DB row later.
 */
export type AdminPost = {
  id: string;
  slug: string;
  title: string;
  category: BlogCategory;
  excerpt: string;
  author: string;
  authorRole: string;
  authorInitials: string;
  cover: string;
  coverAlt: string;
  body: AdminPostBlock[];
  status: PostStatus;
  /** ISO date string */
  publishedAt: string;
  readTime: string;
};
