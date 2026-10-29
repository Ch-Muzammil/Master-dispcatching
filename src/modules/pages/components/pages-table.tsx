"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { formatRelativeTime } from "@/lib/format-relative-time";
import { StatusBadge } from "@/components/admin";
import { DataTable, type DataTableColumn } from "@/components/ui/Table";
import { PAGE_STATUS_META } from "../constants";
import type { AdminCmsPage } from "../types";
import { PageRowActions } from "./page-row-actions";

type PagesTableProps = {
  pages: AdminCmsPage[];
  emptyState: ReactNode;
};

function editHref(page: AdminCmsPage) {
  return page.managedIn?.href ?? `/admin/pages/${page.slug}`;
}

const columns: DataTableColumn<AdminCmsPage>[] = [
  {
    id: "page",
    header: "Page",
    width: 240,
    cell: (page) => (
      <div className="min-w-0">
        <Link
          href={editHref(page)}
          className="block truncate rounded-sm font-semibold text-foreground hover:underline focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
        >
          {page.title}
        </Link>
        <p className="truncate font-mono text-xs text-muted-foreground">{page.path}</p>
      </div>
    ),
  },
  {
    id: "status",
    header: "Status",
    width: 120,
    cell: (page) => {
      const meta = PAGE_STATUS_META[page.status];
      return <StatusBadge label={meta.label} tone={meta.tone} />;
    },
  },
  {
    id: "sections",
    header: "Sections",
    width: 110,
    align: "right",
    cell: (page) => <span className="tabular-nums">{page.sectionCount}</span>,
  },
  {
    id: "managed",
    header: "Edited in",
    width: 140,
    cell: (page) =>
      page.managedIn ? (
        <span className="text-sm text-muted-foreground">{page.managedIn.label}</span>
      ) : (
        <span className="text-sm">Pages</span>
      ),
  },
  {
    id: "updatedAt",
    header: "Updated",
    width: 130,
    cell: (page) => (
      <time dateTime={page.updatedAt} className="text-sm text-muted-foreground">
        {formatRelativeTime(page.updatedAt, { locale: "en-US", style: "short" })}
      </time>
    ),
  },
  {
    id: "actions",
    header: <span className="sr-only">Actions</span>,
    width: 64,
    align: "right",
    cell: (page) => <PageRowActions page={page} />,
  },
];

export function PagesTable({ pages, emptyState }: PagesTableProps) {
  return (
    <DataTable
      columns={columns}
      data={pages}
      getRowId={(page) => page.id}
      emptyMessage={emptyState}
    />
  );
}
