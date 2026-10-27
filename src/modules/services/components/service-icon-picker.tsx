"use client";

import { cn } from "@/lib/utils";
import { SERVICE_ICON_KEYS, SERVICE_ICONS } from "../constants";
import type { ServiceIconKey } from "../types";

type ServiceIconPickerProps = {
  value: ServiceIconKey;
  onChange: (value: ServiceIconKey) => void;
};

/** Native radio group styled as an icon grid — arrow keys work out of the box. */
export function ServiceIconPicker({ value, onChange }: ServiceIconPickerProps) {
  return (
    <fieldset>
      <legend className="sr-only">Service icon</legend>
      <div className="grid grid-cols-6 gap-2">
        {SERVICE_ICON_KEYS.map((key) => {
          const { icon: Icon, label } = SERVICE_ICONS[key];
          const selected = key === value;
          return (
            <label
              key={key}
              title={label}
              className={cn(
                "flex aspect-square cursor-pointer items-center justify-center rounded-lg border transition-colors",
                "has-focus-visible:ring-3 has-focus-visible:ring-ring/50",
                selected
                  ? "border-primary bg-primary text-accent"
                  : "bg-background text-muted-foreground hover:border-primary/40 hover:text-foreground",
              )}
            >
              <input
                type="radio"
                name="service-icon"
                value={key}
                checked={selected}
                onChange={() => onChange(key)}
                className="sr-only"
              />
              <Icon className="size-5" aria-hidden />
              <span className="sr-only">{label}</span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
