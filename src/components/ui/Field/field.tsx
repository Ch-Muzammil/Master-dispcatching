"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/Label";

export type FieldProps = {
  /** Associates the label with the control (`htmlFor` / control `id`) */
  id?: string;
  /** When set, renders a label above the control */
  label?: React.ReactNode;
  /** When set, renders an error message under the control */
  error?: React.ReactNode;
  /** Helper or live preview under the control (keeps 2-col rows the same height) */
  hint?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
};

function hasFieldText(value: React.ReactNode) {
  return value != null && value !== false && value !== "";
}

/**
 * Optional label + error + hint chrome around a form control.
 * Pass nothing for label/error/hint → children render unchanged (no extra wrapper).
 */
function Field({ id, label, error, hint, className, children }: FieldProps) {
  const hasLabel = hasFieldText(label);
  const hasError = hasFieldText(error);
  const hasHint = hasFieldText(hint);

  if (!hasLabel && !hasError && !hasHint) {
    return <>{children}</>;
  }

  const errorId = id ? `${id}-error` : undefined;
  const hintId = id ? `${id}-hint` : undefined;

  return (
    <div data-slot="field" className={cn("grid w-full min-w-0 gap-2", className)}>
      {hasLabel ? <Label htmlFor={id}>{label}</Label> : null}
      {children}
      {hasError ? (
        <p
          id={errorId}
          data-slot="field-error"
          role="alert"
          className="text-sm text-destructive"
        >
          {error}
        </p>
      ) : null}
      {hasHint ? (
        <p
          id={hintId}
          data-slot="field-hint"
          className="min-h-4 truncate text-xs text-muted-foreground"
        >
          {hint}
        </p>
      ) : null}
    </div>
  );
}

export { Field };
