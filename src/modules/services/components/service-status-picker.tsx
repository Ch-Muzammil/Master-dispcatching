"use client";

import { cn } from "@/lib/utils";
import { STATUS_TONE_FILL } from "@/components/admin";
import { SERVICE_STATUS_META } from "../constants";
import { SERVICE_STATUSES, type ServiceStatus } from "../types";

type ServiceStatusPickerProps = {
  value: ServiceStatus;
  onChange: (value: ServiceStatus) => void;
};

/** Radio cards with a one-line explanation of what each status means. */
export function ServiceStatusPicker({ value, onChange }: ServiceStatusPickerProps) {
  return (
    <fieldset className="space-y-2">
      <legend className="mb-2 text-sm font-medium text-foreground">Visibility</legend>
      {SERVICE_STATUSES.map((status) => {
        const meta = SERVICE_STATUS_META[status];
        const selected = status === value;
        return (
          <label
            key={status}
            className={cn(
              "flex cursor-pointer items-start gap-3 rounded-lg border px-3 py-2.5 transition-colors",
              "has-focus-visible:ring-3 has-focus-visible:ring-ring/50",
              selected ? "border-primary bg-secondary/60" : "hover:bg-muted/60",
            )}
          >
            <input
              type="radio"
              name="service-status"
              value={status}
              checked={selected}
              onChange={() => onChange(status)}
              className="mt-1 size-4 accent-primary"
            />
            <span className="min-w-0">
              <span className="flex items-center gap-2 text-sm font-semibold text-foreground">
                <span className={cn("size-2 rounded-full", STATUS_TONE_FILL[meta.tone])} aria-hidden />
                {meta.label}
              </span>
              <span className="block text-xs text-muted-foreground">{meta.description}</span>
            </span>
          </label>
        );
      })}
    </fieldset>
  );
}
