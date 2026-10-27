"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { formatRelativeTime } from "@/lib/format-relative-time";
import { StatusBadge } from "@/components/admin";
import { DataTable, type DataTableColumn } from "@/components/ui/Table";
import { JOB_STATUS_META } from "../constants";
import type { AdminJob } from "../types";
import { CareerRowActions } from "./career-row-actions";

type CareersTableProps = {
  jobs: AdminJob[];
  emptyState: ReactNode;
};

const columns: DataTableColumn<AdminJob>[] = [
  {
    id: "role",
    header: "Role",
    width: 240,
    sticky: true,
    className: "bg-card",
    headerClassName: "bg-card",
    cell: (job) => (
      <div className="min-w-0">
        <Link
          href={`/admin/careers/${job.slug}`}
          className="block truncate rounded-sm font-semibold text-foreground hover:underline focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
        >
          {job.title}
        </Link>
        <p className="truncate text-xs text-muted-foreground">{job.department}</p>
      </div>
    ),
  },
  {
    id: "type",
    header: "Type",
    width: 110,
    cell: (job) => job.type,
  },
  {
    id: "location",
    header: "Location",
    width: 150,
    truncate: true,
    cell: (job) => job.location,
  },
  {
    id: "salary",
    header: "Pay",
    width: 170,
    truncate: true,
    cell: (job) => job.salary,
  },
  {
    id: "applicants",
    header: "Applicants",
    width: 100,
    align: "right",
    cell: (job) => <span className="tabular-nums">{job.applicants}</span>,
  },
  {
    id: "views",
    header: "Views",
    width: 80,
    align: "right",
    cell: (job) => <span className="tabular-nums text-muted-foreground">{job.views}</span>,
  },
  {
    id: "status",
    header: "Status",
    width: 110,
    cell: (job) => {
      const meta = JOB_STATUS_META[job.status];
      return <StatusBadge label={meta.label} tone={meta.tone} />;
    },
  },
  {
    id: "postedAt",
    header: "Posted",
    width: 110,
    cell: (job) => (
      <time dateTime={job.postedAt} className="text-sm text-muted-foreground">
        {formatRelativeTime(job.postedAt, { locale: "en-US", style: "short" })}
      </time>
    ),
  },
  {
    id: "actions",
    header: <span className="sr-only">Actions</span>,
    width: 64,
    align: "right",
    cell: (job) => <CareerRowActions job={job} />,
  },
];

export function CareersTable({ jobs, emptyState }: CareersTableProps) {
  return (
    <DataTable
      columns={columns}
      data={jobs}
      getRowId={(job) => job.id}
      emptyMessage={emptyState}
    />
  );
}
