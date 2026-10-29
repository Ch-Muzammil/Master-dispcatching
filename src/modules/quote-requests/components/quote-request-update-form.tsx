"use client";

import type { ReactNode } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CharacterCount, notifyDemoMode } from "@/components/admin";
import { Button } from "@/components/ui/Button";
import { DatePicker } from "@/components/ui/DatePicker";
import { Field } from "@/components/ui/Field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { QUOTE_REQUEST_STATUS_META } from "../constants";
import {
  NOTE_MAX_LENGTH,
  quoteRequestUpdateSchema,
  type QuoteRequestUpdateValues,
} from "../schemas/quote-request-update-schema";
import { QUOTE_REQUEST_STATUSES, type QuoteRequest } from "../types";

const UNASSIGNED = "unassigned";

const STATUS_ITEMS = Object.fromEntries(
  QUOTE_REQUEST_STATUSES.map((status) => [status, QUOTE_REQUEST_STATUS_META[status].label]),
);

function startOfToday() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
}

type QuoteRequestUpdateFormProps = {
  request: QuoteRequest;
  teamMembers: string[];
  onCancel: () => void;
  /** Read-only lead details, rendered above the editable fields in the same scroll area. */
  children?: ReactNode;
};

/**
 * Edits a lead's status, owner, follow-up and adds a note. The footer stays
 * pinned to the bottom of the sheet so Save is always reachable.
 */
export function QuoteRequestUpdateForm({
  request,
  teamMembers,
  onCancel,
  children,
}: QuoteRequestUpdateFormProps) {
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isSubmitting },
  } = useForm<QuoteRequestUpdateValues>({
    resolver: zodResolver(quoteRequestUpdateSchema),
    defaultValues: {
      status: request.status,
      assignedTo: request.assignedTo,
      followUpAt: request.followUpAt ? new Date(request.followUpAt) : undefined,
      note: "",
    },
  });

  const assigneeItems: Record<string, string> = {
    [UNASSIGNED]: "Unassigned",
    ...Object.fromEntries(teamMembers.map((name) => [name, name])),
  };
  const noteLength = useWatch({ control, name: "note" })?.length ?? 0;

  function onSubmit(values: QuoteRequestUpdateValues) {
    notifyDemoMode("This update");
    reset({ ...values, note: "" });
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="flex min-h-0 flex-1 flex-col"
      aria-label={`Update ${request.name}`}
    >
      <div className="flex-1 space-y-6 overflow-y-auto px-5 py-5 sm:px-6">
        {children}

        <section aria-labelledby="lead-update-heading" className="space-y-4">
          <h3 id="lead-update-heading" className="text-sm font-semibold text-foreground">
            Update lead
          </h3>

          <div className="grid gap-4 sm:grid-cols-2">
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <Field id="lead-status" label="Status" error={errors.status?.message}>
                  <Select
                    items={STATUS_ITEMS}
                    value={field.value}
                    onValueChange={(value) => value && field.onChange(value)}
                  >
                    <SelectTrigger id="lead-status" className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {QUOTE_REQUEST_STATUSES.map((status) => (
                        <SelectItem key={status} value={status}>
                          {QUOTE_REQUEST_STATUS_META[status].label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
              )}
            />

            <Controller
              name="assignedTo"
              control={control}
              render={({ field }) => (
                <Field id="lead-owner" label="Owner">
                  <Select
                    items={assigneeItems}
                    value={field.value ?? UNASSIGNED}
                    onValueChange={(value) =>
                      field.onChange(!value || value === UNASSIGNED ? undefined : value)
                    }
                  >
                    <SelectTrigger id="lead-owner" className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(assigneeItems).map(([value, label]) => (
                        <SelectItem key={value} value={value}>
                          {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
              )}
            />
          </div>

          <Controller
            name="followUpAt"
            control={control}
            render={({ field }) => (
              <DatePicker
                id="lead-follow-up"
                label="Next follow-up"
                value={field.value}
                onChange={field.onChange}
                fromDate={startOfToday()}
                placeholder="No follow-up scheduled"
                fullWidth
              />
            )}
          />

          <div className="space-y-1.5">
            <Textarea
              id="lead-note"
              label="Add a note"
              placeholder="Call summary, next steps, pricing discussed…"
              rows={3}
              maxLength={NOTE_MAX_LENGTH}
              error={errors.note?.message}
              {...register("note")}
            />
            <CharacterCount length={noteLength} max={NOTE_MAX_LENGTH} />
          </div>
        </section>
      </div>

      <div className="flex flex-col-reverse gap-2 border-t bg-popover px-5 py-4 sm:flex-row sm:justify-end sm:px-6">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" loading={isSubmitting} disabled={!isDirty || isSubmitting}>
          Save changes
        </Button>
      </div>
    </form>
  );
}
