"use client";

import {
  useFieldArray,
  type Control,
  type FieldErrors,
  type UseFormGetValues,
  type UseFormRegister,
} from "react-hook-form";
import { ArrowDown, ArrowUp, Plus, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { POST_BLOCK_KIND_META, POST_LIMITS } from "../constants";
import type { PostFormValues } from "../schemas/post-schema";
import { POST_BLOCK_KINDS, type PostBlockKind } from "../types";

const KIND_ITEMS = Object.fromEntries(
  POST_BLOCK_KINDS.map((kind) => [kind, POST_BLOCK_KIND_META[kind].label]),
);

const KIND_ACCENT: Record<PostBlockKind, string> = {
  p: "border-l-border",
  h: "border-l-primary",
  list: "border-l-info",
  quote: "border-l-accent",
};

type PostBodyEditorProps = {
  control: Control<PostFormValues>;
  register: UseFormRegister<PostFormValues>;
  getValues: UseFormGetValues<PostFormValues>;
  errors: FieldErrors<PostFormValues>;
};

/** Reorderable article blocks — paragraph, heading, bullets, or quote. */
export function PostBodyEditor({ control, register, getValues, errors }: PostBodyEditorProps) {
  const { fields, append, remove, move, update } = useFieldArray({ control, name: "body" });
  const canAdd = fields.length < POST_LIMITS.maxBlocks;
  const canRemove = fields.length > POST_LIMITS.minBlocks;
  const listError = errors.body?.root?.message ?? errors.body?.message;

  return (
    <div className="space-y-3">
      <ol className="space-y-3">
        {fields.map((field, index) => {
          const kind = field.kind as PostBlockKind;
          const error = errors.body?.[index]?.text?.message;
          return (
            <li
              key={field.id}
              className={cn(
                "rounded-lg border border-l-4 bg-background p-3 sm:p-4",
                KIND_ACCENT[kind],
              )}
            >
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <Select
                  items={KIND_ITEMS}
                  value={kind}
                  onValueChange={(value) => {
                    if (!value) return;
                    const current = getValues(`body.${index}`);
                    update(index, { ...current, kind: value as PostBlockKind });
                  }}
                >
                  <SelectTrigger
                    size="sm"
                    className="w-36"
                    aria-label={`Block ${index + 1} type`}
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {POST_BLOCK_KINDS.map((option) => (
                      <SelectItem key={option} value={option}>
                        {POST_BLOCK_KIND_META[option].label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <span className="mr-auto text-xs text-muted-foreground tabular-nums">
                  {index + 1} of {fields.length}
                </span>
                <div className="flex">
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    aria-label={`Move block ${index + 1} up`}
                    disabled={index === 0}
                    onClick={() => move(index, index - 1)}
                  >
                    <ArrowUp />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    aria-label={`Move block ${index + 1} down`}
                    disabled={index === fields.length - 1}
                    onClick={() => move(index, index + 1)}
                  >
                    <ArrowDown />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    aria-label={`Remove block ${index + 1}`}
                    disabled={!canRemove}
                    onClick={() => remove(index)}
                    className="text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 />
                  </Button>
                </div>
              </div>
              <Textarea
                aria-label={`${POST_BLOCK_KIND_META[kind].label} ${index + 1}`}
                placeholder={POST_BLOCK_KIND_META[kind].placeholder}
                rows={kind === "h" ? 2 : 4}
                maxLength={POST_LIMITS.block}
                error={error}
                {...register(`body.${index}.text`)}
              />
            </li>
          );
        })}
      </ol>

      {listError ? (
        <p role="alert" className="text-sm text-destructive">
          {listError}
        </p>
      ) : null}

      <div className="flex flex-wrap items-center gap-2">
        {POST_BLOCK_KINDS.map((kind) => (
          <Button
            key={kind}
            variant="outline"
            size="sm"
            icon={<Plus />}
            disabled={!canAdd}
            onClick={() => append({ kind, text: "" }, { shouldFocus: true })}
          >
            {POST_BLOCK_KIND_META[kind].label}
          </Button>
        ))}
        <p className="ml-auto text-xs text-muted-foreground">
          {fields.length} of {POST_LIMITS.maxBlocks} blocks
        </p>
      </div>
    </div>
  );
}
