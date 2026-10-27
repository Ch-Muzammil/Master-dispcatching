"use client";

import { cn } from "@/lib/utils";
import { STATUS_TONE_FILL } from "@/components/admin";
import { POST_STATUS_META } from "../constants";
import { POST_STATUSES, type PostStatus } from "../types";

type PostStatusPickerProps = {
  value: PostStatus;
  onChange: (value: PostStatus) => void;
};

export function PostStatusPicker({ value, onChange }: PostStatusPickerProps) {
  return (
    <fieldset className="space-y-2">
      <legend className="mb-2 text-sm font-medium text-foreground">Visibility</legend>
      {POST_STATUSES.map((status) => {
        const meta = POST_STATUS_META[status];
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
              name="post-status"
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
