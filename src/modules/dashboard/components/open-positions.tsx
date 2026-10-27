import { Briefcase } from "lucide-react";
import type { Job } from "@/data/careers";
import { EmptyState } from "@/components/ui/Empty";
import { DashboardPanel } from "./dashboard-panel";

export function OpenPositions({ jobs }: { jobs: Job[] }) {
  return (
    <DashboardPanel
      title="Open positions"
      description="Applicants per open role"
      action={{ href: "/admin/careers", label: "Manage" }}
    >
      {jobs.length === 0 ? (
        <EmptyState
          bordered={false}
          icon={<Briefcase />}
          title="No open positions"
          description="Published job listings will appear here."
        />
      ) : (
        <ul className="-my-1 divide-y">
          {jobs.map((job) => (
            <li key={job.slug} className="flex items-center justify-between gap-3 py-3">
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-foreground">{job.title}</p>
                <p className="mt-0.5 truncate text-xs text-muted-foreground">{job.location}</p>
              </div>
              <p className="shrink-0 text-right">
                <span className="block text-sm font-semibold text-foreground tabular-nums">
                  {job.applicants}
                </span>
                <span className="block text-xs text-muted-foreground">applicants</span>
              </p>
            </li>
          ))}
        </ul>
      )}
    </DashboardPanel>
  );
}
