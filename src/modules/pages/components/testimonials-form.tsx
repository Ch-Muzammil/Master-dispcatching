"use client";

import { useFieldArray, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Trash2 } from "lucide-react";
import { useUnsavedChangesWarning } from "@/hooks/use-unsaved-changes-warning";
import { AdminFormSection, notifyDemoMode } from "@/components/admin";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { PAGE_LIMITS as L } from "../constants";
import {
  testimonialsSchema,
  toTestimonialsFormValues,
  type TestimonialsFormValues,
} from "../schemas/page-schemas";
import type { AdminCmsPage, TestimonialsContent } from "../types";
import { PageFormActions } from "./page-form-actions";
import { PageSeoFields } from "./page-seo-fields";

export function TestimonialsForm({
  page,
  content,
}: {
  page: AdminCmsPage;
  content: TestimonialsContent;
}) {
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isSubmitting },
  } = useForm<TestimonialsFormValues>({
    resolver: zodResolver(testimonialsSchema),
    defaultValues: toTestimonialsFormValues(page, content),
  });

  useUnsavedChangesWarning(isDirty);

  const items = useFieldArray({ control, name: "items" });
  const [seoTitle, seoDescription] = useWatch({
    control,
    name: ["seoTitle", "seoDescription"],
  });

  return (
    <form
      onSubmit={handleSubmit((values) => {
        notifyDemoMode("These testimonials");
        reset(values);
      })}
      noValidate
      className="flex flex-col gap-6"
    >
      <AdminFormSection
        title="Quotes"
        description="Shown on the home page. Keep each quote in the carrier’s voice."
        aside={
          items.fields.length < L.maxTestimonials ? (
            <Button
              type="button"
              variant="outline"
              size="sm"
              icon={<Plus />}
              onClick={() => items.append({ quote: "", name: "", role: "", initials: "" })}
            >
              Quote
            </Button>
          ) : null
        }
      >
        {typeof errors.items?.root?.message === "string" ? (
          <p className="text-sm text-destructive">{errors.items.root.message}</p>
        ) : null}
        <div className="space-y-4">
          {items.fields.map((field, index) => (
            <div key={field.id} className="space-y-3 rounded-lg border p-4">
              <div className="flex items-center justify-between gap-2">
                <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                  Quote {index + 1}
                </p>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  className="text-muted-foreground"
                  aria-label={`Remove quote ${index + 1}`}
                  disabled={items.fields.length <= L.minTestimonials}
                  onClick={() => items.remove(index)}
                >
                  <Trash2 />
                </Button>
              </div>
              <Textarea
                id={`testimonial-quote-${index}`}
                label="Quote"
                rows={4}
                maxLength={L.quote}
                error={errors.items?.[index]?.quote?.message}
                {...register(`items.${index}.quote`)}
              />
              <div className="grid gap-3 sm:grid-cols-3">
                <Input
                  id={`testimonial-name-${index}`}
                  label="Name"
                  maxLength={L.personName}
                  error={errors.items?.[index]?.name?.message}
                  {...register(`items.${index}.name`)}
                />
                <Input
                  id={`testimonial-role-${index}`}
                  label="Role"
                  maxLength={L.personRole}
                  error={errors.items?.[index]?.role?.message}
                  fieldClassName="sm:col-span-1"
                  {...register(`items.${index}.role`)}
                />
                <Input
                  id={`testimonial-initials-${index}`}
                  label="Initials"
                  maxLength={L.initials}
                  error={errors.items?.[index]?.initials?.message}
                  {...register(`items.${index}.initials`)}
                />
              </div>
            </div>
          ))}
        </div>
      </AdminFormSection>

      <PageSeoFields
        titleLength={seoTitle?.length ?? 0}
        descriptionLength={seoDescription?.length ?? 0}
        titleError={errors.seoTitle?.message}
        descriptionError={errors.seoDescription?.message}
        titleInput={register("seoTitle")}
        descriptionInput={register("seoDescription")}
      />

      <PageFormActions isDirty={isDirty} isSubmitting={isSubmitting} />
    </form>
  );
}
