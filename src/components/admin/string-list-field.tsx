"use client";

import {
  useFieldArray,
  type ArrayPath,
  type Control,
  type FieldErrors,
  type FieldValues,
  type Path,
  type UseFormRegister,
} from "react-hook-form";
import { ArrowDown, ArrowUp, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

type StringListFieldProps<T extends FieldValues> = {
  control: Control<T>;
  /** Field array of `{ value: string }`. */
  name: ArrayPath<T>;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  minItems?: number;
  maxItems?: number;
  maxLength?: number;
  itemLabel: string;
  addLabel: string;
  placeholder?: string;
};

function listErrors(errors: FieldErrors, name: string) {
  const node = name.split(".").reduce<unknown>((current, key) => {
    if (current && typeof current === "object" && key in current) {
      return (current as Record<string, unknown>)[key];
    }
    return undefined;
  }, errors);

  const record = node as
    | {
        message?: string;
        root?: { message?: string };
        [index: number]: { value?: { message?: string } } | undefined;
      }
    | undefined;

  return {
    list: record?.root?.message ?? record?.message,
    itemMessage: (index: number) => record?.[index]?.value?.message,
  };
}

/**
 * Reorderable list of short text items (job responsibilities, FAQ answers, etc.).
 *
 * HOW TO USE:
 *   <StringListField control={control} name="responsibilities" register={register} errors={errors} itemLabel="Responsibility" addLabel="Add responsibility" />
 */
export function StringListField<T extends FieldValues>({
  control,
  name,
  register,
  errors,
  minItems = 1,
  maxItems = 10,
  maxLength = 160,
  itemLabel,
  addLabel,
  placeholder,
}: StringListFieldProps<T>) {
  const { fields, append, remove, move } = useFieldArray({ control, name });
  const canAdd = fields.length < maxItems;
  const canRemove = fields.length > minItems;
  const { list, itemMessage } = listErrors(errors, name);

  return (
    <div className="space-y-3">
      <ol className="space-y-2">
        {fields.map((field, index) => {
          const error = itemMessage(index);
          return (
            <li key={field.id} className="flex items-start gap-2">
              <span className="mt-2 flex size-5 shrink-0 items-center justify-center rounded-full bg-secondary text-[0.7rem] font-bold text-primary">
                {index + 1}
              </span>
              <div className="min-w-0 flex-1">
                <Input
                  aria-label={`${itemLabel} ${index + 1}`}
                  placeholder={placeholder}
                  maxLength={maxLength}
                  error={error}
                  {...register(`${name}.${index}.value` as Path<T>)}
                />
              </div>
              <div className="flex shrink-0 items-center">
                <Button
                  variant="ghost"
                  size="icon-sm"
                  aria-label={`Move ${itemLabel.toLowerCase()} ${index + 1} up`}
                  disabled={index === 0}
                  onClick={() => move(index, index - 1)}
                >
                  <ArrowUp />
                </Button>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  aria-label={`Move ${itemLabel.toLowerCase()} ${index + 1} down`}
                  disabled={index === fields.length - 1}
                  onClick={() => move(index, index + 1)}
                >
                  <ArrowDown />
                </Button>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  aria-label={`Remove ${itemLabel.toLowerCase()} ${index + 1}`}
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

      {list ? (
        <p role="alert" className="text-sm text-destructive">
          {list}
        </p>
      ) : null}

      <div className="flex flex-wrap items-center justify-between gap-2">
        <Button
          variant="outline"
          size="sm"
          icon={<Plus />}
          disabled={!canAdd}
          onClick={() => append({ value: "" } as never, { shouldFocus: true })}
        >
          {addLabel}
        </Button>
        <p className="text-xs text-muted-foreground">
          {fields.length} of {maxItems}
        </p>
      </div>
    </div>
  );
}
