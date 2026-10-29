import { Inbox } from "lucide-react";
import { formatRelativeTime } from "@/lib/format-relative-time";
import { StatusBadge } from "@/components/admin";
import { UserAvatar } from "@/components/ui/Avatar";
import { EmptyState } from "@/components/ui/Empty";
import {
  isFollowUpOverdue,
  QUOTE_REQUEST_STATUS_META,
  type QuoteRequest,
} from "@/modules/quote-requests";
import { DashboardPanel } from "./dashboard-panel";

export function RecentQuoteRequests({ requests }: { requests: QuoteRequest[] }) {
  return (
    <DashboardPanel
      title="Recent quote requests"
      description="The latest leads from your website"
      action={{ href: "/admin/quote-requests", label: "View all" }}
      className="h-full lg:col-span-2"
    >
      {requests.length === 0 ? (
        <EmptyState
          bordered={false}
          icon={<Inbox />}
          title="No quote requests yet"
          description="New inquiries from your contact form will appear here."
        />
      ) : (
        <ul className="-my-1 divide-y">
          {requests.map((request) => {
            const status = QUOTE_REQUEST_STATUS_META[request.status];
            const overdue = isFollowUpOverdue(request);
            return (
              <li key={request.id} className="flex items-center gap-3 py-3">
                <UserAvatar name={request.name} />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-foreground">
                    {request.name}
                    <span className="font-normal text-muted-foreground"> · {request.company}</span>
                  </p>
                  <p className="mt-0.5 truncate text-xs text-muted-foreground">
                    {request.equipment} · {request.fleetSize}
                    {overdue ? (
                      <span className="font-medium text-warning-soft-foreground"> · Follow-up overdue</span>
                    ) : null}
                  </p>
                </div>
                <div className="flex shrink-0 flex-col items-end gap-1">
                  <StatusBadge label={status.label} tone={status.tone} />
                  <time dateTime={request.receivedAt} className="text-xs text-muted-foreground">
                    {formatRelativeTime(request.receivedAt, { locale: "en-US", style: "short" })}
                  </time>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </DashboardPanel>
  );
}
