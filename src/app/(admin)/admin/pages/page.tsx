import type { Metadata } from "next";
import { AdminPageHeader } from "@/components/admin";
import { listAdminPages, PagesListView } from "@/modules/pages";

export const metadata: Metadata = { title: "Pages" };

export default async function PagesPage() {
  const pages = await listAdminPages();

  return (
    <>
      <AdminPageHeader
        title="Pages"
        description="The public pages that make up the website. Edit copy here; services, jobs, blog, and FAQs have their own sections."
      />
      <PagesListView pages={pages} />
    </>
  );
}
