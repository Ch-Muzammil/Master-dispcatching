"use client";

import { useState } from "react";
import { Search, X } from "lucide-react";
import { equipmentOptions } from "@/data/contact";
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
import type { QuoteRequestFilters } from "../types";

const SEARCH_DEBOUNCE_MS = 350;

const EQUIPMENT_ITEMS: Record<string, string> = {
  all: "All equipment",
  ...Object.fromEntries(equipmentOptions.map((option) => [option, option])),
};

type QuoteRequestsToolbarProps = {
  filters: QuoteRequestFilters;
  isPending: boolean;
  onSearchChange: (q: string) => void;
  onEquipmentChange: (equipment: QuoteRequestFilters["equipment"]) => void;
  onClear: () => void;
};

export function QuoteRequestsToolbar({
  filters,
  isPending,
  onSearchChange,
  onEquipmentChange,
  onClear,
}: QuoteRequestsToolbarProps) {
  const [search, setSearch] = useState(filters.q);
  const [syncedQ, setSyncedQ] = useState(filters.q);
  const pushSearch = useDebouncedCallback(onSearchChange, SEARCH_DEBOUNCE_MS);

  // URL changed from outside the input (back button, "Clear filters" in the empty state).
  if (filters.q !== syncedQ) {
    setSyncedQ(filters.q);
    if (search.trim() !== filters.q) setSearch(filters.q);
  }
  const hasFilters = Boolean(filters.q) || filters.equipment !== "all" || filters.status !== "all";

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
          placeholder="Search name, company, email…"
          aria-label="Search quote requests"
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
        items={EQUIPMENT_ITEMS}
        value={filters.equipment}
        onValueChange={(value) => {
          if (value) onEquipmentChange(value as QuoteRequestFilters["equipment"]);
        }}
      >
        <SelectTrigger className="w-full sm:w-48" aria-label="Filter by equipment">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {Object.entries(EQUIPMENT_ITEMS).map(([value, label]) => (
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
