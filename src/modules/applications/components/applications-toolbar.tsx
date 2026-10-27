"use client";

import { useState } from "react";
import { Search, X } from "lucide-react";
import { useDebouncedCallback } from "@/hooks/use-debounced-callback";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { Spinner } from "@/components/ui/Spinner";
import type { ApplicationFilters, ApplicationJobOption } from "../types";

const SEARCH_DEBOUNCE_MS = 350;

type ApplicationsToolbarProps = {
  filters: ApplicationFilters;
  jobs: ApplicationJobOption[];
  isPending: boolean;
  onSearchChange: (q: string) => void;
  onJobChange: (job: string) => void;
  onClear: () => void;
};

export function ApplicationsToolbar({
  filters,
  jobs,
  isPending,
  onSearchChange,
  onJobChange,
  onClear,
}: ApplicationsToolbarProps) {
  const [search, setSearch] = useState(filters.q);
  const [syncedQ, setSyncedQ] = useState(filters.q);
  const pushSearch = useDebouncedCallback(onSearchChange, SEARCH_DEBOUNCE_MS);

  if (filters.q !== syncedQ) {
    setSyncedQ(filters.q);
    if (search.trim() !== filters.q) setSearch(filters.q);
  }

  const jobItems: Record<string, string> = {
    all: "All roles",
    ...Object.fromEntries(jobs.map((job) => [job.slug, job.title])),
  };
  const hasFilters = Boolean(filters.q) || filters.job !== "all" || filters.status !== "all";

  function clearAll() {
    pushSearch.cancel();
    setSearch("");
    onClear();
  }

  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
      <div className="relative w-full sm:max-w-xs">
        <Input
          enterKeyHint="search"
          value={search}
          onChange={(event) => {
            setSearch(event.target.value);
            pushSearch(event.target.value.trim());
          }}
          icon={<Search />}
          placeholder="Search name, email, role…"
          aria-label="Search applications"
          maxLength={100}
          className="pr-9"
        />
        {isPending ? (
          <Spinner
            size="sm"
            className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground"
            label="Updating results"
          />
        ) : null}
      </div>

      <Select
        items={jobItems}
        value={jobItems[filters.job] ? filters.job : "all"}
        onValueChange={(value) => {
          if (value) onJobChange(value);
        }}
      >
        <SelectTrigger className="w-full sm:w-64" aria-label="Filter by role">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {Object.entries(jobItems).map(([value, label]) => (
            <SelectItem key={value} value={value}>
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {hasFilters ? (
        <Button variant="ghost" icon={<X />} onClick={clearAll} className="self-start sm:self-auto">
          Clear filters
        </Button>
      ) : null}
    </div>
  );
}
