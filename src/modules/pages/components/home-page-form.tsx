"use client";

import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUnsavedChangesWarning } from "@/hooks/use-unsaved-changes-warning";
import { AdminFormSection, CharacterCount, notifyDemoMode } from "@/components/admin";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { PAGE_LIMITS as L } from "../constants";
import { homePageSchema, toHomeFormValues, type HomePageFormValues } from "../schemas/page-schemas";
import type { AdminCmsPage, HomePageContent } from "../types";
import { PageFormActions } from "./page-form-actions";
import { PageSeoFields } from "./page-seo-fields";

export function HomePageForm({
  page,
  content,
}: {
  page: AdminCmsPage;
  content: HomePageContent;
}) {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isDirty, isSubmitting },
  } = useForm<HomePageFormValues>({
    resolver: zodResolver(homePageSchema),
    defaultValues: toHomeFormValues(page, content),
  });

  useUnsavedChangesWarning(isDirty);

  const [headline, highlight, body, ctaTitle, ctaBody, seoTitle, seoDescription] = useWatch({
    control,
    name: ["headline", "highlight", "body", "ctaTitle", "ctaBody", "seoTitle", "seoDescription"],
  });

  return (
    <form
      onSubmit={handleSubmit((values) => {
        notifyDemoMode("These home page changes");
        reset(values);
      })}
      noValidate
      className="flex flex-col gap-6"
    >
      <AdminFormSection
        title="Hero"
        description="The first thing visitors see. The highlight is the accented last line."
      >
        <div className="space-y-1.5">
          <Input
            id="home-headline"
            label="Headline"
            maxLength={L.headline}
            error={errors.headline?.message}
            {...register("headline")}
          />
          <CharacterCount length={headline?.length ?? 0} max={L.headline} />
        </div>
        <div className="space-y-1.5">
          <Input
            id="home-highlight"
            label="Highlight line"
            maxLength={L.highlight}
            error={errors.highlight?.message}
            {...register("highlight")}
          />
          <CharacterCount length={highlight?.length ?? 0} max={L.highlight} />
        </div>
        <div className="space-y-1.5">
          <Textarea
            id="home-body"
            label="Intro"
            rows={4}
            maxLength={L.body}
            error={errors.body?.message}
            {...register("body")}
          />
          <CharacterCount length={body?.length ?? 0} max={L.body} />
        </div>
      </AdminFormSection>

      <AdminFormSection title="Bottom call to action" description="The band at the end of the home page.">
        <div className="space-y-1.5">
          <Input
            id="home-cta-title"
            label="CTA title"
            maxLength={L.ctaTitle}
            error={errors.ctaTitle?.message}
            {...register("ctaTitle")}
          />
          <CharacterCount length={ctaTitle?.length ?? 0} max={L.ctaTitle} />
        </div>
        <div className="space-y-1.5">
          <Textarea
            id="home-cta-body"
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
