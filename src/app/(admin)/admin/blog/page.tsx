import type { Metadata } from "next";
import Link from "next/link";
import { Plus } from "lucide-react";
import { AdminPageHeader } from "@/components/admin";
import { buttonVariants } from "@/components/ui/Button";
import { BlogListView, listAdminPosts } from "@/modules/blog";

export const metadata: Metadata = { title: "Blog" };

export default async function BlogPage() {
  const posts = await listAdminPosts();

  return (
    <>
      <AdminPageHeader
        title="Blog"
        description="Articles on your website. Edit copy, pick a cover, and control what's published."
        actions={
          <Link href="/admin/blog/new" className={buttonVariants({ className: "gap-1.5" })}>
            <Plus aria-hidden />
            New article
          </Link>
        }
      />
      <BlogListView posts={posts} />
    </>
  );
}
