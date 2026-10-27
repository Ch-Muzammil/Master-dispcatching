import type { Metadata } from "next";
import Link from "next/link";
import { Plus } from "lucide-react";
import { AdminPageHeader } from "@/components/admin";
import { buttonVariants } from "@/components/ui/Button";
import { CareersListView, listAdminJobs } from "@/modules/careers";

export const metadata: Metadata = { title: "Careers" };

export default async function CareersPage() {
  const jobs = await listAdminJobs();

  return (
    <>
      <AdminPageHeader
        title="Careers"
        description="Job listings on your careers page. Open a role to edit copy, pay, and whether it's accepting applications."
        actions={
          <Link href="/admin/careers/new" className={buttonVariants({ className: "gap-1.5" })}>
            <Plus aria-hidden />
            New listing
          </Link>
        }
      />
      <CareersListView jobs={jobs} />
    </>
  );
}
