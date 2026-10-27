"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { Star } from "lucide-react";
import { formatRelativeTime } from "@/lib/format-relative-time";
import { StatusBadge } from "@/components/admin";
import { DataTable, type DataTableColumn } from "@/components/ui/Table";
import { SERVICE_STATUS_META } from "../constants";
import type { AdminService } from "../types";
import { ServiceIconTile } from "./service-icon-tile";
import { ServiceRowActions } from "./service-row-actions";

type ServicesTableProps = {
  services: AdminService[];
  emptyState: ReactNode;
};

const columns: DataTableColumn<AdminService>[] = [
  {
    id: "service",
    header: "Service",
    width: 320,
    sticky: true,
    className: "bg-card",
    headerClassName: "bg-card",
    cell: (service) => (
      <div className="flex min-w-0 items-center gap-3">
        <ServiceIconTile iconKey={service.iconKey} size="sm" />
        <div className="min-w-0">
          <Link
            href={`/admin/services/${service.slug}`}
            className="block truncate rounded-sm font-semibold text-foreground hover:underline focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
          >
            {service.title}
          </Link>
          <p className="truncate text-xs text-muted-foreground">/services/{service.slug}</p>
        </div>
      </div>
    ),
  },
  {
    id: "excerpt",
    header: "Summary",
    width: 320,
    cell: (service) => (
      <p className="line-clamp-2 text-sm whitespace-normal text-muted-foreground">
        {service.excerpt}
      </p>
    ),
  },
  {
    id: "status",
    header: "Status",
    width: 130,
    cell: (service) => {
      const meta = SERVICE_STATUS_META[service.status];
      return <StatusBadge label={meta.label} tone={meta.tone} />;
    },
  },
  {
    id: "featured",
    header: "Home page",
    width: 130,
    cell: (service) =>
      service.featured ? (
        <span className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground">
          <Star className="size-4 fill-accent text-accent" aria-hidden />
          Featured
        </span>
      ) : (
        <span className="text-sm text-muted-foreground">—</span>
      ),
  },
  {
    id: "updatedAt",
    header: "Updated",
    width: 120,
    cell: (service) => (
      <time dateTime={service.updatedAt} className="text-sm text-muted-foreground">
        {formatRelativeTime(service.updatedAt, { locale: "en-US", style: "short" })}
      </time>
    ),
  },
  {
    id: "actions",
    header: <span className="sr-only">Actions</span>,
    width: 64,
    align: "right",
    cell: (service) => <ServiceRowActions service={service} />,
  },
];

export function ServicesTable({ services, emptyState }: ServicesTableProps) {
  return (
    <DataTable
      columns={columns}
      data={services}
      getRowId={(service) => service.id}
      emptyMessage={emptyState}
      minTableWidth={1084}
    />
  );
}
