"use client";

import type { ReactNode } from "react";
import { formatRelativeTime } from "@/lib/format-relative-time";
import { StatusBadge } from "@/components/admin";
import { UserAvatar } from "@/components/ui/Avatar";
import { DataTable, type DataTableColumn } from "@/components/ui/Table";
import { isFollowUpOverdue, QUOTE_REQUEST_STATUS_META } from "../constants";
import type { QuoteRequest } from "../types";

type QuoteRequestsTableProps = {
  requests: QuoteRequest[];
  onOpen: (request: QuoteRequest) => void;
  emptyState: ReactNode;
};

export function QuoteRequestsTable({ requests, onOpen, emptyState }: QuoteRequestsTableProps) {
  const columns: DataTableColumn<QuoteRequest>[] = [
    {
      id: "lead",
      header: "Lead",
      width: 240,
      sticky: true,
      className: "bg-card",
      headerClassName: "bg-card",
      cell: (request) => (
        <div className="flex min-w-0 items-center gap-3">
          <UserAvatar name={request.name} />
          <div className="min-w-0">
            {/* Real button so keyboard users can open the lead (row click is mouse-only). */}
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                onOpen(request);
              }}
              className="block max-w-full truncate rounded-sm text-left font-semibold text-foreground hover:underline focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
            >
              {request.name}
            </button>
            <p className="truncate text-xs text-muted-foreground">{request.company}</p>
          </div>
        </div>
      ),
    },
    {
      id: "contact",
      header: "Contact",
      width: 240,
      cell: (request) => (
        <div className="min-w-0 text-sm">
          <p className="truncate">{request.email}</p>
          <p className="truncate text-xs text-muted-foreground">{request.phone}</p>
        </div>
      ),
    },
    {
      id: "equipment",
      header: "Equipment",
      width: 150,
      cell: (request) => (
        <div className="min-w-0 text-sm">
          <p className="truncate">{request.equipment}</p>
          <p className="truncate text-xs text-muted-foreground">{request.fleetSize}</p>
        </div>
      ),
    },
    {
      id: "status",
      header: "Status",
      width: 120,
      cell: (request) => {
        const meta = QUOTE_REQUEST_STATUS_META[request.status];
        return <StatusBadge label={meta.label} tone={meta.tone} />;
      },
    },
    {
      id: "assignedTo",
      header: "Owner",
      width: 150,
      truncate: true,
      cell: (request) =>
        request.assignedTo ?? <span className="text-muted-foreground">Unassigned</span>,
    },
    {
      id: "receivedAt",
      header: "Received",
      width: 110,
      align: "right",
      cell: (request) => (
        <div className="text-right">
          <time dateTime={request.receivedAt} className="text-sm text-muted-foreground">
            {formatRelativeTime(request.receivedAt, { locale: "en-US", style: "short" })}
          </time>
          {isFollowUpOverdue(request) ? (
            <p className="text-xs font-medium text-warning-soft-foreground">Follow-up due</p>
          ) : null}
        </div>
      ),
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={requests}
      getRowId={(request) => request.id}
      onRowClick={onOpen}
      emptyMessage={emptyState}
      minTableWidth={1010}
    />
  );
}
