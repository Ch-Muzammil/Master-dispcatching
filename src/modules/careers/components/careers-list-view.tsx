"use client";

import { useState } from "react";
import { Briefcase, Search, SearchX } from "lucide-react";
import { StatusFilter } from "@/components/admin";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/Empty";
import { Input } from "@/components/ui/Input";
import { JOB_STATUS_META } from "../constants";
import { JOB_STATUSES, type AdminJob, type JobStatus } from "../types";
import { CareersTable } from "./careers-table";

type StatusFilterValue = JobStatus | "all";

/** Jobs are a short list, so filtering happens on the client — no extra requests. */
export function CareersListView({ jobs }: { jobs: AdminJob[] }) {
  const [status, setStatus] = useState<StatusFilterValue>("all");
  const [search, setSearch] = useState("");

  const needle = search.trim().toLowerCase();
  const searched = needle
    ? jobs.filter((job) =>
        [job.title, job.department, job.location].some((value) =>
          value.toLowerCase().includes(needle),
        ),
      )
    : jobs;
  const visible = status === "all" ? searched : searched.filter((job) => job.status === status);

  const options = [
    { value: "all" as const, label: "All", count: searched.length },
    ...JOB_STATUSES.map((value) => ({
      value,
      label: JOB_STATUS_META[value].label,
      count: searched.filter((job) => job.status === value).length,
    })),
  ];

  function clearFilters() {
    setStatus("all");
    setSearch("");
  }

  const emptyState =
    jobs.length === 0 ? (
      <EmptyState
        bordered={false}
        icon={<Briefcase />}
        title="No job listings yet"
        description="Add a role to show it on your careers page."
      />
    ) : (
      <EmptyState
        bordered={false}
        icon={<SearchX />}
        title="No jobs match"
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
              placeholder="Search roles, department, location…"
              aria-label="Search jobs"
              enterKeyHint="search"
              maxLength={100}
            />
          </div>
          <p className="text-sm text-muted-foreground tabular-nums" aria-live="polite">
            {visible.length} of {jobs.length} listings
          </p>
        </div>
        <CareersTable jobs={visible} emptyState={emptyState} />
      </div>
    </div>
  );
}
