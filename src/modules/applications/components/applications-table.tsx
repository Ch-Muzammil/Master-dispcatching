"use client";

import type { ReactNode } from "react";
import { formatRelativeTime } from "@/lib/format-relative-time";
import { StatusBadge } from "@/components/admin";
import { UserAvatar } from "@/components/ui/Avatar";
import { DataTable, type DataTableColumn } from "@/components/ui/Table";
import { APPLICATION_STATUS_META, EXPERIENCE_LEVEL_LABEL } from "../constants";
import type { JobApplication } from "../types";

type ApplicationsTableProps = {
  applications: JobApplication[];
  onOpen: (application: JobApplication) => void;
  emptyState: ReactNode;
};

export function ApplicationsTable({ applications, onOpen, emptyState }: ApplicationsTableProps) {
  const columns: DataTableColumn<JobApplication>[] = [
    {
      id: "candidate",
      header: "Candidate",
      width: 240,
      sticky: true,
      className: "bg-card",
      headerClassName: "bg-card",
      cell: (application) => (
        <div className="flex min-w-0 items-center gap-3">
          <UserAvatar name={application.name} />
          <div className="min-w-0">
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                onOpen(application);
              }}
              className="block max-w-full truncate rounded-sm text-left font-semibold text-foreground hover:underline focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
            >
              {application.name}
            </button>
            <p className="truncate text-xs text-muted-foreground">{application.email}</p>
          </div>
        </div>
      ),
    },
    {
      id: "job",
      header: "Role",
      width: 240,
      truncate: true,
      cell: (application) => application.jobTitle,
    },
    {
      id: "phone",
      header: "Phone",
      width: 150,
      cell: (application) => application.phone,
    },
    {
      id: "experience",
      header: "Experience",
      width: 130,
      cell: (application) => EXPERIENCE_LEVEL_LABEL[application.experience],
    },
    {
      id: "resume",
      header: "Résumé",
      width: 90,
      cell: (application) =>
        application.resumeName ? (
          <span className="text-sm">Yes</span>
        ) : (
          <span className="text-sm text-muted-foreground">—</span>
        ),
    },
    {
      id: "status",
      header: "Status",
      width: 120,
      cell: (application) => {
        const meta = APPLICATION_STATUS_META[application.status];
        return <StatusBadge label={meta.label} tone={meta.tone} />;
      },
    },
    {
      id: "receivedAt",
      header: "Received",
      width: 110,
      align: "right",
      cell: (application) => (
        <time dateTime={application.receivedAt} className="text-sm text-muted-foreground">
          {formatRelativeTime(application.receivedAt, { locale: "en-US", style: "short" })}
        </time>
      ),
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={applications}
      getRowId={(application) => application.id}
      onRowClick={onOpen}
      emptyMessage={emptyState}
    />
  );
}
