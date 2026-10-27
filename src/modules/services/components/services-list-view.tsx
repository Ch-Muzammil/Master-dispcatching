"use client";

import { useState } from "react";
import { Layers, Search, SearchX } from "lucide-react";
import { StatusFilter } from "@/components/admin";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/Empty";
import { Input } from "@/components/ui/Input";
import { SERVICE_STATUS_META } from "../constants";
import { SERVICE_STATUSES, type AdminService, type ServiceStatus } from "../types";
import { ServicesTable } from "./services-table";

type StatusFilterValue = ServiceStatus | "all";

/**
 * Services are a short list (tens, not thousands), so filtering happens on the
 * client — instant, and no extra requests.
 */
export function ServicesListView({ services }: { services: AdminService[] }) {
  const [status, setStatus] = useState<StatusFilterValue>("all");
  const [search, setSearch] = useState("");

  const needle = search.trim().toLowerCase();
  const searched = needle
    ? services.filter((service) =>
        [service.title, service.shortTitle, service.slug].some((value) =>
          value.toLowerCase().includes(needle),
        ),
      )
    : services;
  const visible = status === "all" ? searched : searched.filter((s) => s.status === status);

  const options = [
    { value: "all" as const, label: "All", count: searched.length },
    ...SERVICE_STATUSES.map((value) => ({
      value,
      label: SERVICE_STATUS_META[value].label,
      count: searched.filter((service) => service.status === value).length,
    })),
  ];

  function clearFilters() {
    setStatus("all");
    setSearch("");
  }

  const emptyState =
    services.length === 0 ? (
      <EmptyState
        bordered={false}
        icon={<Layers />}
        title="No services yet"
        description="Add your first service to show it on the website."
      />
    ) : (
      <EmptyState
        bordered={false}
        icon={<SearchX />}
        title="No services match"
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
              placeholder="Search services…"
              aria-label="Search services"
              enterKeyHint="search"
              maxLength={100}
            />
          </div>
          <p className="text-sm text-muted-foreground tabular-nums" aria-live="polite">
            {visible.length} of {services.length} services
          </p>
        </div>
        <ServicesTable services={visible} emptyState={emptyState} />
      </div>
    </div>
  );
}
