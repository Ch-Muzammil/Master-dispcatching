import type { Metadata } from "next";
import { AdminPageHeader } from "@/components/admin";
import { FaqsManager, listAdminFaqs } from "@/modules/faqs";

export const metadata: Metadata = { title: "FAQs" };

export default async function FaqsPage() {
  const groups = await listAdminFaqs();

  return (
    <>
      <AdminPageHeader
        title="FAQs"
        description="The questions on your FAQs page, grouped the way visitors read them. Reorder within a group, or move a question to another group from the editor."
      />
      <FaqsManager groups={groups} />
    </>
  );
}
