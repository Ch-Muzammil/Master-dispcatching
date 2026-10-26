import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticlePageContent } from "@/components/sections/blog";
import { getPost, posts, relatedPosts } from "@/data/blog";

type ArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Article Not Found" };
  return { title: post.title, description: post.excerpt };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  return <ArticlePageContent post={post} related={relatedPosts(post.slug)} />;
}
