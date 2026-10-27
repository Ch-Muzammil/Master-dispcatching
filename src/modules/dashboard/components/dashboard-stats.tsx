import { Briefcase, CalendarClock, FileText, Inbox } from "lucide-react";
import { StatCard } from "@/components/admin";
import type { DashboardOverview } from "../services/dashboard-overview";

const plural = (count: number, word: string) => `${count} ${word}${count === 1 ? "" : "s"}`;

export function DashboardStats({ overview }: { overview: DashboardOverview }) {
  const { leads, careers, content } = overview;

  return (
    <section aria-label="Key metrics" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <StatCard
        label="New quote requests"
        value={leads.newCount}
        caption={`${plural(leads.receivedLast7Days, "request")} in the last 7 days`}
        icon={Inbox}
        href="/admin/quote-requests"
      />
      <StatCard
        label="Follow-ups due"
        value={leads.followUpsDue}
        caption={leads.followUpsDue > 0 ? "Overdue — contact these leads today" : "You're all caught up"}
        icon={CalendarClock}
        href="/admin/quote-requests"
        attention={leads.followUpsDue > 0}
      />
      <StatCard
        label="Open positions"
        value={careers.openCount}
        caption={`${plural(careers.applicants, "applicant")} across open roles`}
        icon={Briefcase}
        href="/admin/careers"
      />
      <StatCard
        label="Published content"
        value={content.services + content.posts}
        caption={`${plural(content.services, "service")} · ${plural(content.posts, "article")} · ${content.faqs} FAQs`}
        icon={FileText}
        href="/admin/services"
      />
    </section>
  );
}
