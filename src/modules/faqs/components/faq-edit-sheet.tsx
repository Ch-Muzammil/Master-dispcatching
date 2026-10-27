"use client";

import { useEffect } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CharacterCount } from "@/components/admin";
import { Button } from "@/components/ui/Button";
import { Field } from "@/components/ui/Field";
import { Input } from "@/components/ui/Input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/Sheet";
import { Textarea } from "@/components/ui/Textarea";
import { FAQ_LIMITS as L } from "../constants";
import {
  faqItemSchema,
  toFaqItemFormValues,
  type FaqItemFormValues,
} from "../schemas/faq-schema";
import type { AdminFaqGroup, AdminFaqItem } from "../types";

type FaqEditSheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  groups: AdminFaqGroup[];
  groupId: string;
  item: AdminFaqItem | null;
  onSave: (values: FaqItemFormValues) => void;
};

export function FaqEditSheet({
  open,
  onOpenChange,
  groups,
  groupId,
  item,
  onSave,
}: FaqEditSheetProps) {
  const isNew = !item;
  const groupItems = Object.fromEntries(groups.map((group) => [group.id, group.category]));

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isSubmitting },
  } = useForm<FaqItemFormValues>({
    resolver: zodResolver(faqItemSchema),
    defaultValues: toFaqItemFormValues(groupId, item ?? undefined),
  });

  useEffect(() => {
    if (open) reset(toFaqItemFormValues(groupId, item ?? undefined));
  }, [open, groupId, item, reset]);

  const [question, answer] = useWatch({ control, name: ["question", "answer"] });

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full gap-0 sm:max-w-lg">
        <SheetHeader className="border-b px-5 py-5 pr-12 sm:px-6">
          <SheetTitle className="font-display text-lg font-bold">
            {isNew ? "New question" : "Edit question"}
          </SheetTitle>
          <SheetDescription>
            {isNew
              ? "Added to this group on the FAQs page."
              : "Shown in the accordion on the FAQs page."}
          </SheetDescription>
        </SheetHeader>

        <form
          onSubmit={handleSubmit((values) => onSave(values))}
          noValidate
          className="flex min-h-0 flex-1 flex-col"
        >
          <div className="flex-1 space-y-5 overflow-y-auto px-5 py-5 sm:px-6">
            <Controller
              name="groupId"
              control={control}
              render={({ field }) => (
                <Field id="faq-group" label="Group">
                  <Select
                    items={groupItems}
                    value={field.value}
                    onValueChange={(value) => value && field.onChange(value)}
                  >
                    <SelectTrigger id="faq-group" className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {groups.map((group) => (
                        <SelectItem key={group.id} value={group.id}>
                          {group.category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
              )}
            />

            <div className="space-y-1.5">
              <Input
                id="faq-question"
                label="Question"
                placeholder="What exactly does a dispatch service do?"
                maxLength={L.question}
                error={errors.question?.message}
                {...register("question")}
              />
              <CharacterCount length={question?.length ?? 0} max={L.question} />
            </div>

            <div className="space-y-1.5">
              <Textarea
                id="faq-answer"
                label="Answer"
                placeholder="A clear, honest answer in a few sentences."
                rows={8}
                maxLength={L.answer}
                error={errors.answer?.message}
                {...register("answer")}
              />
              <CharacterCount length={answer?.length ?? 0} max={L.answer} />
            </div>
          </div>

          <div className="flex flex-col-reverse gap-2 border-t bg-popover px-5 py-4 sm:flex-row sm:justify-end sm:px-6">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button
              type="submit"
              loading={isSubmitting}
              disabled={isSubmitting || (!isNew && !isDirty)}
            >
              {isNew ? "Add question" : "Save changes"}
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
}
