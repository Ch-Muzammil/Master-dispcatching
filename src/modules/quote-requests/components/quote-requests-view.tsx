"use client";

import { useState } from "react";
import { Inbox, SearchX } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSearchParamsState } from "@/hooks/use-search-params-state";
import { StatusFilter } from "@/components/admin";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/Empty";
import { DataPagination } from "@/components/ui/Pagination";
import { QUOTE_REQUEST_STATUS_META } from "../constants";
import {
  QUOTE_REQUEST_STATUSES,
  type QuoteRequest,
  type QuoteRequestFilters,
  type QuoteRequestListResult,
} from "../types";
import { QuoteRequestDetailSheet } from "./quote-request-detail-sheet";
import { QuoteRequestsTable } from "./quote-requests-table";
import { QuoteRequestsToolbar } from "./quote-requests-toolbar";

type QuoteRequestsViewProps = {
  result: QuoteRequestListResult;
  filters: QuoteRequestFilters;
  teamMembers: string[];
};

/**
 * Lead inbox: filters live in the URL (server does the filtering), the open
 * lead lives in local state so the detail sheet opens instantly with no refetch.
 */
export function QuoteRequestsView({ result, filters, teamMembers }: QuoteRequestsViewProps) {
  const { setSearchParams, isPending } = useSearchParamsState();
  const [selected, setSelected] = useState<QuoteRequest | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);

  const hasFilters = Boolean(filters.q) || filters.equipment !== "all" || filters.status !== "all";
  const firstShown = result.total === 0 ? 0 : (result.page - 1) * result.pageSize + 1;
  const lastShown = Math.min(result.page * result.pageSize, result.total);

  function openLead(request: QuoteRequest) {
    setSelected(request);
    setSheetOpen(true);
  }

  function clearFilters() {
    setSearchParams({ q: null, status: null, equipment: null, page: null });
  }

  const emptyState = hasFilters ? (
    <EmptyState
      bordered={false}
      icon={<SearchX />}
      title="No leads match these filters"
      description="Try a different search or clear the filters to see every lead."
      action={
        <Button variant="outline" onClick={clearFilters}>
          Clear filters
        </Button>
      }
    />
  ) : (
    <EmptyState
      bordered={false}
      icon={<Inbox />}
      title="No quote requests yet"
      description="When someone submits the quote form on your website, the lead shows up here."
    />
  );

  return (
    <>
      <div className="flex flex-col gap-4">
        <StatusFilter
          options={[
            { value: "all", label: "All", count: result.statusCounts.all },
            ...QUOTE_REQUEST_STATUSES.map((status) => ({
              value: status,
              label: QUOTE_REQUEST_STATUS_META[status].label,
              count: result.statusCounts[status],
            })),
          ]}
          value={filters.status}
          onChange={(status: QuoteRequestFilters["status"]) =>
            setSearchParams({ status: status === "all" ? null : status, page: null })
          }
        />

        <div className="overflow-hidden rounded-xl border bg-card shadow-xs">
          <div className="flex flex-col gap-3 border-b p-4 lg:flex-row lg:items-center lg:justify-between">
            <QuoteRequestsToolbar
              filters={filters}
              isPending={isPending}
              onSearchChange={(q) => setSearchParams({ q, page: null })}
              onEquipmentChange={(equipment) =>
                setSearchParams({ equipment: equipment === "all" ? null : equipment, page: null })
              }
              onClear={clearFilters}
            />
            <p className="text-sm text-muted-foreground tabular-nums" aria-live="polite">
              {result.total === 0
                ? "No leads"
                : `Showing ${firstShown}–${lastShown} of ${result.total}`}
            </p>
          </div>

          <div
            aria-busy={isPending}
            className={cn("transition-opacity", isPending && "pointer-events-none opacity-60")}
          >
            <QuoteRequestsTable
              requests={result.items}
              onOpen={openLead}
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

      <QuoteRequestDetailSheet
        request={selected}
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        teamMembers={teamMembers}
      />
    </>
  );
}
