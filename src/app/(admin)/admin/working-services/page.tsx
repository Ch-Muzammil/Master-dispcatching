import type { Metadata } from "next";
import { AdminPageHeader } from "@/components/admin";
import { WORKING_SNIPPETS, WorkingServicesLibrary } from "@/modules/working-services";

export const metadata: Metadata = { title: "Working services" };

export default function WorkingServicesPage() {
  return (
    <>
      <AdminPageHeader
        title="Working services"
        description="Reusable component code, one tab each. Copy a block and paste it into the project. More components can be added as their own tabs."
      />
      <WorkingServicesLibrary snippets={WORKING_SNIPPETS} />
    </>
  );
}
