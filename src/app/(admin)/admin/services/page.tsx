import type { Metadata } from "next";
import Link from "next/link";
import { Plus } from "lucide-react";
import { AdminPageHeader } from "@/components/admin";
import { buttonVariants } from "@/components/ui/Button";
import { listAdminServices, ServicesListView } from "@/modules/services";

export const metadata: Metadata = { title: "Services" };

export default async function ServicesPage() {
  const services = await listAdminServices();

  return (
    <>
      <AdminPageHeader
        title="Services"
        description="The dispatch services on your website. Edit copy, choose what's featured, and control what's published."
        actions={
          <Link href="/admin/services/new" className={buttonVariants({ className: "gap-1.5" })}>
            <Plus aria-hidden />
            New service
          </Link>
        }
      />
      <ServicesListView services={services} />
    </>
  );
}
