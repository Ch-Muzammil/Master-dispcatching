import { STATUS_TONE_FILL } from "@/components/admin";
import { QUOTE_REQUEST_STATUS_META } from "@/modules/quote-requests";
import type { PipelineStage } from "../services/dashboard-overview";
import { DashboardPanel } from "./dashboard-panel";

type LeadPipelineProps = {
  stages: PipelineStage[];
  total: number;
};

/** Stacked bar + legend. Every segment is also listed with its label and count. */
export function LeadPipeline({ stages, total }: LeadPipelineProps) {
  return (
    <DashboardPanel
      title="Lead pipeline"
      description={`${total} quote requests by status`}
      className="flex-1"
    >
      <div
        className="flex h-2.5 overflow-hidden rounded-full bg-muted"
        role="img"
        aria-label={stages
          .map((stage) => `${QUOTE_REQUEST_STATUS_META[stage.status].label}: ${stage.count}`)
          .join(", ")}
      >
        {stages
          .filter((stage) => stage.count > 0)
          .map((stage) => (
            <span
              key={stage.status}
              className={`${STATUS_TONE_FILL[QUOTE_REQUEST_STATUS_META[stage.status].tone]} border-r-2 border-card last:border-r-0`}
              style={{ width: `${(stage.count / total) * 100}%` }}
            />
          ))}
      </div>

      <ul className="mt-4 space-y-2.5">
        {stages.map((stage) => {
          const meta = QUOTE_REQUEST_STATUS_META[stage.status];
          const percent = total ? Math.round((stage.count / total) * 100) : 0;
          return (
            <li key={stage.status} className="flex items-center gap-2.5 text-sm">
              <span className={`size-2.5 shrink-0 rounded-full ${STATUS_TONE_FILL[meta.tone]}`} aria-hidden />
              <span className="flex-1 text-foreground">{meta.label}</span>
              <span className="font-semibold text-foreground tabular-nums">{stage.count}</span>
              <span className="w-10 text-right text-xs text-muted-foreground tabular-nums">{percent}%</span>
            </li>
          );
        })}
      </ul>
    </DashboardPanel>
  );
}
