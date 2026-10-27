"use client";

import { cn } from "@/lib/utils";

export type StatusFilterOption<T extends string> = {
  value: T;
  label: string;
  count: number;
};

type StatusFilterProps<T extends string> = {
  options: StatusFilterOption<T>[];
  value: T;
  onChange: (value: T) => void;
  /** Accessible group name, e.g. "Filter by status" */
  label?: string;
};

/**
 * Segmented filter with live counts for admin lists. Scrolls horizontally on small screens.
 *
 * HOW TO USE:
 *   <StatusFilter
 *     options={[{ value: "all", label: "All", count: 12 }, { value: "draft", label: "Draft", count: 2 }]}
 *     value={status}
 *     onChange={setStatus}
 *   />
 */
export function StatusFilter<T extends string>({
  options,
  value,
  onChange,
  label = "Filter by status",
}: StatusFilterProps<T>) {
  return (
    <div className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
      <div
        role="group"
        aria-label={label}
        className="inline-flex min-w-max items-center gap-1 rounded-xl bg-muted p-1"
      >
        {options.map((option) => {
          const active = option.value === value;
          return (
            <button
              key={option.value}
              type="button"
              aria-pressed={active}
              onClick={() => onChange(option.value)}
              className={cn(
                "inline-flex h-8 items-center gap-1.5 rounded-lg px-3 text-sm font-medium whitespace-nowrap transition-colors",
                "focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none",
                active
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {option.label}
              <span
                className={cn(
                  "min-w-5 rounded-full px-1.5 text-center text-xs tabular-nums",
                  active ? "bg-primary text-primary-foreground" : "bg-background/70",
                )}
              >
                {option.count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
