import { z } from "zod";
import { SLUG_PATTERN } from "@/lib/slugify";
import { POST_LIMITS as L } from "../constants";
import {
  BLOG_CATEGORIES,
  POST_BLOCK_KINDS,
  POST_STATUSES,
  type AdminPost,
  type AdminPostBlock,
} from "../types";

const requiredText = (label: string, max: number) =>
  z
    .string()
    .trim()
    .min(1, `${label} is required.`)
    .max(max, `${label} can be up to ${max} characters.`);

export function createPostFormSchema(takenSlugs: string[] = []) {
  return z
    .object({
      title: requiredText("Title", L.title),
      slug: z
        .string()
        .trim()
        .min(1, "URL slug is required.")
        .max(80, "URL slug can be up to 80 characters.")
        .regex(SLUG_PATTERN, "Use lowercase letters, numbers, and single hyphens only.")
        .refine((slug) => !takenSlugs.includes(slug), "Another article already uses this URL."),
      category: z.enum(BLOG_CATEGORIES),
      excerpt: requiredText("Summary", L.excerpt),
      author: z.string().min(1, "Choose an author."),
      authorRole: z.string(),
      authorInitials: z.string(),
      cover: z.string(),
      coverAlt: z.string().trim().max(L.coverAlt, `Alt text can be up to ${L.coverAlt} characters.`),
      body: z
        .array(
          z.object({
            kind: z.enum(POST_BLOCK_KINDS),
            text: requiredText("This block", L.block),
          }),
        )
        .min(L.minBlocks, "Add at least one block.")
        .max(L.maxBlocks, `Up to ${L.maxBlocks} blocks.`),
      status: z.enum(POST_STATUSES),
    })
    .refine((values) => values.status !== "published" || values.cover.length > 0, {
      path: ["cover"],
      message: "Published articles need a cover image.",
    })
    .refine((values) => !values.cover || values.coverAlt.length > 0, {
      path: ["coverAlt"],
      message: "Describe the image for screen readers and SEO.",
    });
}

export type PostFormValues = z.infer<ReturnType<typeof createPostFormSchema>>;

export function toPostFormValues(post?: AdminPost): PostFormValues {
  const body: AdminPostBlock[] = post?.body.length
    ? post.body
    : [{ kind: "p", text: "" }];

  return {
    title: post?.title ?? "",
    slug: post?.slug ?? "",
    category: post?.category ?? "Dispatch guides",
    excerpt: post?.excerpt ?? "",
    author: post?.author ?? "",
    authorRole: post?.authorRole ?? "",
    authorInitials: post?.authorInitials ?? "",
    cover: post?.cover ?? "",
    coverAlt: post?.coverAlt ?? "",
    body,
    status: post?.status ?? "draft",
  };
}
