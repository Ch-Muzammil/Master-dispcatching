"use client";

import { useFieldArray, type Control, type FieldErrors, type UseFormRegister } from "react-hook-form";
import { ArrowDown, ArrowUp, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { SERVICE_LIMITS } from "../constants";
import type { ServiceFormValues } from "../schemas/service-schema";

type ServiceBulletsFieldProps = {
  control: Control<ServiceFormValues>;
  register: UseFormRegister<ServiceFormValues>;
  errors: FieldErrors<ServiceFormValues>;
};

/** Editable, reorderable list of the service's key points. */
export function ServiceBulletsField({ control, register, errors }: ServiceBulletsFieldProps) {
  const { fields, append, remove, move } = useFieldArray({ control, name: "bullets" });
  const canAdd = fields.length < SERVICE_LIMITS.maxBullets;
  const canRemove = fields.length > SERVICE_LIMITS.minBullets;
  const listError = errors.bullets?.root?.message ?? errors.bullets?.message;

  return (
    <div className="space-y-3">
      <ol className="space-y-2">
        {fields.map((field, index) => {
          const error = errors.bullets?.[index]?.value?.message;
          return (
            <li key={field.id} className="flex items-start gap-2">
              <span className="mt-2 flex size-5 shrink-0 items-center justify-center rounded-full bg-secondary text-[0.7rem] font-bold text-primary">
                {index + 1}
              </span>
              <div className="min-w-0 flex-1">
                <Input
                  aria-label={`Key point ${index + 1}`}
                  placeholder="e.g. Rate negotiation before you commit"
                  maxLength={SERVICE_LIMITS.bullet}
                  error={error}
                  {...register(`bullets.${index}.value`)}
                />
              </div>
              <div className="flex shrink-0 items-center">
                <Button
                  variant="ghost"
                  size="icon-sm"
                  aria-label={`Move point ${index + 1} up`}
                  disabled={index === 0}
                  onClick={() => move(index, index - 1)}
                >
                  <ArrowUp />
                </Button>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  aria-label={`Move point ${index + 1} down`}
                  disabled={index === fields.length - 1}
                  onClick={() => move(index, index + 1)}
                >
                  <ArrowDown />
                </Button>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  aria-label={`Remove point ${index + 1}`}
                  disabled={!canRemove}
                  onClick={() => remove(index)}
                  className="text-muted-foreground hover:text-destructive"
                >
                  <Trash2 />
                </Button>
              </div>
            </li>
          );
        })}
      </ol>

      {listError ? (
        <p role="alert" className="text-sm text-destructive">
          {listError}
        </p>
      ) : null}

      <div className="flex flex-wrap items-center justify-between gap-2">
        <Button
          variant="outline"
          size="sm"
          icon={<Plus />}
          disabled={!canAdd}
          onClick={() => append({ value: "" }, { shouldFocus: true })}
        >
          Add point
        </Button>
        <p className="text-xs text-muted-foreground">
          {fields.length} of {SERVICE_LIMITS.maxBullets} points
        </p>
      </div>
    </div>
  );
}
