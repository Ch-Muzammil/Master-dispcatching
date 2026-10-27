import { Construction } from "lucide-react";
import { EmptyState } from "@/components/ui/Empty";
import { AdminPageHeader } from "./admin-page-header";

type SectionPlaceholderProps = {
  title: string;
  description: string;
};

/**
 * Temporary page body for admin sections that are planned but not built yet,
 * so navigation never leads to a 404. Replace per section as it is implemented.
 */
export function SectionPlaceholder({ title, description }: SectionPlaceholderProps) {
  return (
    <>
      <AdminPageHeader title={title} description={description} />
      <EmptyState
        icon={<Construction />}
        title="This section is being built"
        description="It is part of the admin roadmap and will be added in an upcoming step."
        className="bg-card py-16"
      />
    </>
  );
}
