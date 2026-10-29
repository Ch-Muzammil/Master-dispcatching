"use client";

import { useState } from "react";
import { FileText, Search, SearchX } from "lucide-react";
import { StatusFilter } from "@/components/admin";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/Empty";
import { Input } from "@/components/ui/Input";
import { PAGE_STATUS_META } from "../constants";
import { PAGE_STATUSES, type AdminCmsPage, type PageStatus } from "../types";
import { PagesTable } from "./pages-table";

type StatusFilterValue = PageStatus | "all";

export function PagesListView({ pages }: { pages: AdminCmsPage[] }) {
  const [status, setStatus] = useState<StatusFilterValue>("all");
  const [search, setSearch] = useState("");

  const needle = search.trim().toLowerCase();
  const searched = needle
    ? pages.filter((page) =>
        [page.title, page.path, page.seo.title].some((value) =>
          value.toLowerCase().includes(needle),
        ),
      )
    : pages;
  const visible = status === "all" ? searched : searched.filter((page) => page.status === status);

  const options = [
    { value: "all" as const, label: "All", count: searched.length },
    ...PAGE_STATUSES.map((value) => ({
      value,
      label: PAGE_STATUS_META[value].label,
      count: searched.filter((page) => page.status === value).length,
    })),
  ];

  function clearFilters() {
    setStatus("all");
    setSearch("");
  }

  const emptyState =
    pages.length === 0 ? (
      <EmptyState
        bordered={false}
        icon={<FileText />}
        title="No pages yet"
        description="Public pages will show up here once the site is connected."
      />
    ) : (
      <EmptyState
        bordered={false}
        icon={<SearchX />}
        title="No pages match"
        description="Try another search or status."
        action={
          <Button variant="outline" onClick={clearFilters}>
            Clear filters
          </Button>
        }
      />
    );

  return (
    <div className="flex flex-col gap-4">
      <StatusFilter options={options} value={status} onChange={setStatus} />

      <div className="overflow-hidden rounded-xl border bg-card shadow-xs">
        <div className="flex flex-col gap-3 border-b p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="w-full sm:max-w-xs">
            <Input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              icon={<Search />}
              placeholder="Search pages…"
              aria-label="Search pages"
              enterKeyHint="search"
              maxLength={100}
            />
          </div>
          <p className="text-sm text-muted-foreground tabular-nums" aria-live="polite">
            {visible.length} of {pages.length} pages
          </p>
        </div>
        <PagesTable pages={visible} emptyState={emptyState} />
      </div>
      <p className="text-xs text-muted-foreground">
        {pages.length} pages · public copy is still the seeded marketing site until the
        database is connected. Blog and FAQs are edited in their own sections.
      </p>
    </div>
  );
}
