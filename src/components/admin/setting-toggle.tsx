"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Switch } from "@/components/ui/Switch";

type SettingToggleProps = {
  id: string;
  label: string;
  hint?: string;
  icon?: ReactNode;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  className?: string;
};

/**
 * Label + hint on the left, switch pinned to the right edge.
 *
 * HOW TO USE:
 *   <SettingToggle
 *     id="maintenance"
 *     label="Maintenance mode"
 *     hint="Visitors see a notice; admins keep access."
 *     checked={value}
 *     onCheckedChange={onChange}
 *   />
 */
export function SettingToggle({
  id,
  label,
  hint,
  icon,
  checked,
  onCheckedChange,
  className,
}: SettingToggleProps) {
  return (
    <div className={cn("flex w-full items-start justify-between gap-4", className)}>
      <div className="flex min-w-0 flex-1 items-start gap-2.5">
        {icon ? <span className="mt-0.5 shrink-0 text-primary">{icon}</span> : null}
        <div className="min-w-0">
          <label htmlFor={id} className="cursor-pointer text-sm font-semibold text-foreground">
            {label}
          </label>
          {hint ? <p className="mt-0.5 text-xs text-muted-foreground">{hint}</p> : null}
        </div>
      </div>
      <Switch
        id={id}
        checked={checked}
        onCheckedChange={onCheckedChange}
        aria-label={label}
        className="mt-0.5 shrink-0"
      />
    </div>
  );
}
