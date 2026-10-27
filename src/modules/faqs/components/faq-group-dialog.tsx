"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Dialog";
import { Input } from "@/components/ui/Input";
import { FAQ_LIMITS as L } from "../constants";
import { faqGroupSchema, type FaqGroupFormValues } from "../schemas/faq-schema";

type FaqGroupDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreate: (category: string) => void;
};

export function FaqGroupDialog({ open, onOpenChange, onCreate }: FaqGroupDialogProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FaqGroupFormValues>({
    resolver: zodResolver(faqGroupSchema),
    defaultValues: { category: "" },
  });

  useEffect(() => {
    if (open) reset({ category: "" });
  }, [open, reset]);

  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      title="New group"
      description="Groups are the headings on the public FAQs page."
      size="sm"
      footer={
        <>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            type="submit"
            form="faq-new-group"
            loading={isSubmitting}
            disabled={isSubmitting}
          >
            Create group
          </Button>
        </>
      }
    >
      <form
        id="faq-new-group"
        onSubmit={handleSubmit((values) => onCreate(values.category))}
        noValidate
      >
        <Input
          id="faq-group-name"
          label="Group name"
          placeholder="e.g. Insurance & claims"
          maxLength={L.category}
          error={errors.category?.message}
          {...register("category")}
        />
      </form>
    </Modal>
  );
}
