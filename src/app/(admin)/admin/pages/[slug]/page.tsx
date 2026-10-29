import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { AdminPageHeader, StatusBadge } from "@/components/admin";
import { getAdminPage, PAGE_STATUS_META, PageEditor } from "@/modules/pages";

type EditPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: EditPageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = await getAdminPage(slug);
  return { title: page ? `Edit ${page.title}` : "Page not found" };
}

export default async function EditCmsPage({ params }: EditPageProps) {
  const { slug } = await params;
  const page = await getAdminPage(slug);

  if (!page) notFound();
  if (page.managedIn) redirect(page.managedIn.href);

  const status = PAGE_STATUS_META[page.status];

  return (
    <>
      <AdminPageHeader
        title={page.title}
        description={`Editing ${page.path}. Preview this copy — saves stay in demo mode until the database is connected.`}
        back={{ href: "/admin/pages", label: "Pages" }}
        actions={<StatusBadge label={status.label} tone={status.tone} />}
      />
      <PageEditor page={page} />
    </>
  );
}
