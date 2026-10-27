import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AdminPageHeader, StatusBadge } from "@/components/admin";
import { listAdminPosts, POST_STATUS_META, PostForm } from "@/modules/blog";

type EditPostPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: EditPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const posts = await listAdminPosts();
  const post = posts.find((item) => item.slug === slug);
  return { title: post ? `Edit ${post.title}` : "Article not found" };
}

export default async function EditPostPage({ params }: EditPostPageProps) {
  const { slug } = await params;
  const posts = await listAdminPosts();
  const post = posts.find((item) => item.slug === slug);

  if (!post) notFound();

  const status = POST_STATUS_META[post.status];

  return (
    <>
      <AdminPageHeader
        title={post.title}
        description="Changes go live on the blog when you save a published article."
        back={{ href: "/admin/blog", label: "Blog" }}
        actions={<StatusBadge label={status.label} tone={status.tone} />}
      />
      <PostForm
        post={post}
        takenSlugs={posts.filter((item) => item.id !== post.id).map((item) => item.slug)}
      />
    </>
  );
}
