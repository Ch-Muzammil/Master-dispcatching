import { AppShell } from "@/components/layout/AppShell";
import { countNewJobApplications } from "@/modules/applications";
import { countNewQuoteRequests } from "@/modules/quote-requests";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [newQuoteRequests, newApplications] = await Promise.all([
    countNewQuoteRequests(),
    countNewJobApplications(),
  ]);

  return (
    <AppShell
      role="admin"
      navBadges={{
        "/admin/quote-requests": newQuoteRequests,
        "/admin/applications": newApplications,
      }}
    >
      {children}
    </AppShell>
  );
}
