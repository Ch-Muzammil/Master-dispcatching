import type { Metadata } from "next";
import { AdminPageHeader } from "@/components/admin";
import { listAdminPosts, PostForm } from "@/modules/blog";

export const metadata: Metadata = { title: "New article" };

export default async function NewPostPage() {
  const posts = await listAdminPosts();

  return (
    <>
      <AdminPageHeader
        title="New article"
        description="Saved as a draft until you publish it on the blog."
        back={{ href: "/admin/blog", label: "Blog" }}
      />
      <PostForm takenSlugs={posts.map((post) => post.slug)} />
    </>
  );
}
