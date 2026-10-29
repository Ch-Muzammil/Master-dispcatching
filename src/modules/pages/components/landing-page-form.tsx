"use client";

import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUnsavedChangesWarning } from "@/hooks/use-unsaved-changes-warning";
import { AdminFormSection, CharacterCount, notifyDemoMode } from "@/components/admin";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { PAGE_LIMITS as L } from "../constants";
import {
  landingPageSchema,
  toLandingFormValues,
  type LandingPageFormValues,
} from "../schemas/page-schemas";
import type { AdminCmsPage, LandingPageContent } from "../types";
import { PageFormActions } from "./page-form-actions";
import { PageSeoFields } from "./page-seo-fields";

export function LandingPageForm({
  page,
  content,
}: {
  page: AdminCmsPage;
  content: LandingPageContent;
}) {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isDirty, isSubmitting },
  } = useForm<LandingPageFormValues>({
    resolver: zodResolver(landingPageSchema),
    defaultValues: toLandingFormValues(page, content),
  });

  useUnsavedChangesWarning(isDirty);

  const [headline, body, ctaTitle, ctaBody, seoTitle, seoDescription] = useWatch({
    control,
    name: ["headline", "body", "ctaTitle", "ctaBody", "seoTitle", "seoDescription"],
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
      <AdminFormSection title="Hero" description={`Headline and intro on ${page.path}.`}>
        <div className="space-y-1.5">
          <Input
            id="landing-headline"
            label="Headline"
            maxLength={L.headline}
            error={errors.headline?.message}
            {...register("headline")}
          />
          <CharacterCount length={headline?.length ?? 0} max={L.headline} />
        </div>
        <div className="space-y-1.5">
          <Textarea
            id="landing-body"
            label="Intro"
            rows={4}
            maxLength={L.body}
            error={errors.body?.message}
            {...register("body")}
          />
          <CharacterCount length={body?.length ?? 0} max={L.body} />
        </div>
      </AdminFormSection>

      <AdminFormSection title="Bottom call to action">
        <div className="space-y-1.5">
          <Input
            id="landing-cta-title"
            label="CTA title"
            maxLength={L.ctaTitle}
            error={errors.ctaTitle?.message}
            {...register("ctaTitle")}
          />
          <CharacterCount length={ctaTitle?.length ?? 0} max={L.ctaTitle} />
        </div>
        <div className="space-y-1.5">
          <Textarea
            id="landing-cta-body"
            label="CTA body"
            rows={3}
            maxLength={L.ctaBody}
            error={errors.ctaBody?.message}
            {...register("ctaBody")}
          />
          <CharacterCount length={ctaBody?.length ?? 0} max={L.ctaBody} />
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
