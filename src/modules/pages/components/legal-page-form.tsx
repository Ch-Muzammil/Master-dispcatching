"use client";

import { useFieldArray, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Trash2 } from "lucide-react";
import { useUnsavedChangesWarning } from "@/hooks/use-unsaved-changes-warning";
import { AdminFormSection, CharacterCount, notifyDemoMode } from "@/components/admin";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { PAGE_LIMITS as L } from "../constants";
import {
  legalPageSchema,
  toLegalFormValues,
  type LegalPageFormValues,
} from "../schemas/page-schemas";
import type { AdminCmsPage, LegalPageContent } from "../types";
import { PageFormActions } from "./page-form-actions";
import { PageSeoFields } from "./page-seo-fields";

export function LegalPageForm({
  page,
  content,
}: {
  page: AdminCmsPage;
  content: LegalPageContent;
}) {
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isSubmitting },
  } = useForm<LegalPageFormValues>({
    resolver: zodResolver(legalPageSchema),
    defaultValues: toLegalFormValues(page, content),
  });

  useUnsavedChangesWarning(isDirty);

  const sections = useFieldArray({ control, name: "sections" });
  const [title, description, seoTitle, seoDescription] = useWatch({
    control,
    name: ["title", "description", "seoTitle", "seoDescription"],
  });

  return (
    <form
      onSubmit={handleSubmit((values) => {
        notifyDemoMode(`These ${page.title} changes`);
        reset(values);
      })}
      noValidate
      className="flex flex-col gap-6"
    >
      <AdminFormSection title="Intro" description={`${content.kindLabel} shown at ${page.path}.`}>
        <div className="space-y-1.5">
          <Input
            id="legal-title"
            label="Headline"
            maxLength={L.legalTitle}
            error={errors.title?.message}
            {...register("title")}
          />
          <CharacterCount length={title?.length ?? 0} max={L.legalTitle} />
        </div>
        <div className="space-y-1.5">
          <Textarea
            id="legal-description"
            label="Intro"
            rows={3}
            maxLength={L.legalDescription}
            error={errors.description?.message}
            {...register("description")}
          />
          <CharacterCount length={description?.length ?? 0} max={L.legalDescription} />
        </div>
        <Input
          id="legal-updated"
          label="Last updated"
          maxLength={L.legalUpdated}
          error={errors.updated?.message}
          {...register("updated")}
        />
      </AdminFormSection>

      <AdminFormSection
        title="Sections"
        aside={
          sections.fields.length < L.maxLegalSections ? (
            <Button
              type="button"
              variant="outline"
              size="sm"
              icon={<Plus />}
              onClick={() => sections.append({ title: "", body: "" })}
            >
              Section
            </Button>
          ) : null
        }
      >
        <div className="space-y-4">
          {sections.fields.map((field, index) => (
            <div key={field.id} className="space-y-3 rounded-lg border p-4">
              <div className="flex items-center justify-between gap-2">
                <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                  Section {index + 1}
                </p>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  className="text-muted-foreground"
                  aria-label={`Remove section ${index + 1}`}
                  disabled={sections.fields.length <= L.minLegalSections}
                  onClick={() => sections.remove(index)}
                >
                  <Trash2 />
                </Button>
              </div>
              <Input
                id={`legal-section-title-${index}`}
                label="Heading"
                maxLength={L.sectionTitle}
                error={errors.sections?.[index]?.title?.message}
                {...register(`sections.${index}.title`)}
              />
              <Textarea
                id={`legal-section-body-${index}`}
                label="Body"
                rows={5}
                maxLength={L.sectionBody}
                error={errors.sections?.[index]?.body?.message}
                {...register(`sections.${index}.body`)}
              />
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
