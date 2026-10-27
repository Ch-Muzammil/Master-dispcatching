import type { Metadata } from "next";
import { AdminPageHeader } from "@/components/admin";
import { demoTeamMembers } from "@/data/quote-requests";
import {
  parseQuoteRequestFilters,
  queryQuoteRequests,
  QuoteRequestsView,
} from "@/modules/quote-requests";

export const metadata: Metadata = { title: "Quote requests" };

type QuoteRequestsPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function QuoteRequestsPage({ searchParams }: QuoteRequestsPageProps) {
  const filters = parseQuoteRequestFilters(await searchParams);
  const result = await queryQuoteRequests(filters);

  return (
    <>
      <AdminPageHeader
        title="Quote requests"
        description="Leads from your website's quote form. Open a lead to call, email, assign an owner, or schedule a follow-up."
      />
      <QuoteRequestsView result={result} filters={filters} teamMembers={demoTeamMembers} />
    </>
  );
}
