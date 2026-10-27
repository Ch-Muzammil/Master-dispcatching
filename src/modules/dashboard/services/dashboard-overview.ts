import { jobs, type Job } from "@/data/careers";
import { posts } from "@/data/blog";
import { faqGroups } from "@/data/faqs";
import { services } from "@/data/services";
import {
  isFollowUpOverdue,
  listQuoteRequests,
  QUOTE_REQUEST_STATUSES,
  type QuoteRequest,
  type QuoteRequestStatus,
} from "@/modules/quote-requests";

const DAY = 24 * 60 * 60 * 1000;
const RECENT_LIMIT = 5;
const OPEN_JOBS_LIMIT = 4;

export type PipelineStage = { status: QuoteRequestStatus; count: number };

export type DashboardOverview = {
  leads: {
    newCount: number;
    receivedLast7Days: number;
    followUpsDue: number;
    total: number;
    recent: QuoteRequest[];
    pipeline: PipelineStage[];
  };
  careers: {
    openCount: number;
    applicants: number;
    openJobs: Job[];
  };
  content: {
    services: number;
    posts: number;
    faqs: number;
  };
};

/**
 * Everything the dashboard shows, computed in one pass on the server.
 * Sources are demo data today; each source swaps to Supabase independently later.
 */
export async function getDashboardOverview(): Promise<DashboardOverview> {
  const now = Date.now();
  const requests = await listQuoteRequests();
  const openJobs = jobs.filter((job) => job.status === "Open");

  return {
    leads: {
      newCount: requests.filter((r) => r.status === "new").length,
      receivedLast7Days: requests.filter((r) => now - Date.parse(r.receivedAt) <= 7 * DAY)
        .length,
      followUpsDue: requests.filter((r) => isFollowUpOverdue(r, now)).length,
      total: requests.length,
      recent: requests.slice(0, RECENT_LIMIT),
      pipeline: QUOTE_REQUEST_STATUSES.map((status) => ({
        status,
        count: requests.filter((r) => r.status === status).length,
      })),
    },
    careers: {
      openCount: openJobs.length,
      applicants: openJobs.reduce((sum, job) => sum + job.applicants, 0),
      openJobs: openJobs.slice(0, OPEN_JOBS_LIMIT),
    },
    content: {
      services: services.length,
      posts: posts.length,
      faqs: faqGroups.reduce((sum, group) => sum + group.items.length, 0),
    },
  };
}
