"use client";

import type { ReactNode } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CharacterCount, notifyDemoMode } from "@/components/admin";
import { Button } from "@/components/ui/Button";
import { Field } from "@/components/ui/Field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { APPLICATION_STATUS_META } from "../constants";
import {
  NOTE_MAX_LENGTH,
  applicationUpdateSchema,
  type ApplicationUpdateValues,
} from "../schemas/application-update-schema";
import { APPLICATION_STATUSES, type JobApplication } from "../types";

const STATUS_ITEMS = Object.fromEntries(
  APPLICATION_STATUSES.map((status) => [status, APPLICATION_STATUS_META[status].label]),
);

type ApplicationUpdateFormProps = {
  application: JobApplication;
  onCancel: () => void;
  children?: ReactNode;
};

export function ApplicationUpdateForm({
  application,
  onCancel,
  children,
}: ApplicationUpdateFormProps) {
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isSubmitting },
  } = useForm<ApplicationUpdateValues>({
    resolver: zodResolver(applicationUpdateSchema),
    defaultValues: { status: application.status, note: "" },
  });

  const noteLength = useWatch({ control, name: "note" })?.length ?? 0;

  function onSubmit(values: ApplicationUpdateValues) {
    notifyDemoMode("This update");
    reset({ ...values, note: "" });
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="flex min-h-0 flex-1 flex-col"
      aria-label={`Update ${application.name}`}
    >
      <div className="flex-1 space-y-6 overflow-y-auto px-5 py-5 sm:px-6">
        {children}

        <section aria-labelledby="application-update-heading" className="space-y-4">
          <h3 id="application-update-heading" className="text-sm font-semibold text-foreground">
            Update application
          </h3>

          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <Field id="application-status" label="Status" error={errors.status?.message}>
                <Select
                  items={STATUS_ITEMS}
                  value={field.value}
                  onValueChange={(value) => value && field.onChange(value)}
                >
                  <SelectTrigger id="application-status" className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {APPLICATION_STATUSES.map((status) => (
                      <SelectItem key={status} value={status}>
                        {APPLICATION_STATUS_META[status].label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
            )}
          />

          <div className="space-y-1.5">
            <Textarea
              id="application-note"
              label="Add a note"
              placeholder="Interview notes, next steps, offer details…"
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
