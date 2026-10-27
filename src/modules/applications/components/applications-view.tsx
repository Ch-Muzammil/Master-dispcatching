"use client";

import { useState } from "react";
import { SearchX, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSearchParamsState } from "@/hooks/use-search-params-state";
import { StatusFilter } from "@/components/admin";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/Empty";
import { DataPagination } from "@/components/ui/Pagination";
import { APPLICATION_STATUS_META } from "../constants";
import {
  APPLICATION_STATUSES,
  type ApplicationFilters,
  type ApplicationJobOption,
  type ApplicationListResult,
  type JobApplication,
} from "../types";
import { ApplicationDetailSheet } from "./application-detail-sheet";
import { ApplicationsTable } from "./applications-table";
import { ApplicationsToolbar } from "./applications-toolbar";

type ApplicationsViewProps = {
  result: ApplicationListResult;
  filters: ApplicationFilters;
  jobs: ApplicationJobOption[];
};

export function ApplicationsView({ result, filters, jobs }: ApplicationsViewProps) {
  const { setSearchParams, isPending } = useSearchParamsState();
  const [selected, setSelected] = useState<JobApplication | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);

  const hasFilters = Boolean(filters.q) || filters.job !== "all" || filters.status !== "all";
  const firstShown = result.total === 0 ? 0 : (result.page - 1) * result.pageSize + 1;
  const lastShown = Math.min(result.page * result.pageSize, result.total);

  function openApplication(application: JobApplication) {
    setSelected(application);
    setSheetOpen(true);
  }

  function clearFilters() {
    setSearchParams({ q: null, status: null, job: null, page: null });
  }

  const emptyState = hasFilters ? (
    <EmptyState
      bordered={false}
      icon={<SearchX />}
      title="No applications match these filters"
      description="Try a different search or clear the filters."
      action={
        <Button variant="outline" onClick={clearFilters}>
          Clear filters
        </Button>
      }
    />
  ) : (
    <EmptyState
      bordered={false}
      icon={<Users />}
      title="No applications yet"
      description="When someone applies from a job page, they show up here."
    />
  );

  return (
    <>
      <div className="flex flex-col gap-4">
        <StatusFilter
          options={[
            { value: "all", label: "All", count: result.statusCounts.all },
            ...APPLICATION_STATUSES.map((status) => ({
              value: status,
              label: APPLICATION_STATUS_META[status].label,
              count: result.statusCounts[status],
            })),
          ]}
          value={filters.status}
          onChange={(status: ApplicationFilters["status"]) =>
            setSearchParams({ status: status === "all" ? null : status, page: null })
          }
        />

        <div className="overflow-hidden rounded-xl border bg-card shadow-xs">
          <div className="flex flex-col gap-3 border-b p-4 lg:flex-row lg:items-center lg:justify-between">
            <ApplicationsToolbar
              filters={filters}
              jobs={jobs}
              isPending={isPending}
              onSearchChange={(q) => setSearchParams({ q, page: null })}
              onJobChange={(job) => setSearchParams({ job: job === "all" ? null : job, page: null })}
              onClear={clearFilters}
            />
            <p className="text-sm text-muted-foreground tabular-nums" aria-live="polite">
              {result.total === 0
                ? "No applications"
                : `Showing ${firstShown}–${lastShown} of ${result.total}`}
            </p>
          </div>

          <div
            aria-busy={isPending}
            className={cn("transition-opacity", isPending && "pointer-events-none opacity-60")}
          >
            <ApplicationsTable
              applications={result.items}
              onOpen={openApplication}
              emptyState={emptyState}
            />
          </div>

          {result.pageCount > 1 ? (
            <div className="border-t px-4 py-3">
              <DataPagination
                page={result.page}
                pageCount={result.pageCount}
                onPageChange={(page) => setSearchParams({ page: page === 1 ? null : page })}
                disabled={isPending}
              />
            </div>
          ) : null}
        </div>
      </div>

      <ApplicationDetailSheet
        application={selected}
        open={sheetOpen}
        onOpenChange={setSheetOpen}
      />
    </>
  );
}
