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
  aboutPageSchema,
  toAboutFormValues,
  type AboutPageFormValues,
} from "../schemas/page-schemas";
import type { AdminCmsPage, AboutPageContent } from "../types";
import { PageFormActions } from "./page-form-actions";
import { PageSeoFields } from "./page-seo-fields";

export function AboutPageForm({
  page,
  content,
}: {
  page: AdminCmsPage;
  content: AboutPageContent;
}) {
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isSubmitting },
  } = useForm<AboutPageFormValues>({
    resolver: zodResolver(aboutPageSchema),
    defaultValues: toAboutFormValues(page, content),
  });

  useUnsavedChangesWarning(isDirty);

  const story = useFieldArray({ control, name: "storyParagraphs" });
  const values = useFieldArray({ control, name: "values" });
  const team = useFieldArray({ control, name: "team" });
  const milestones = useFieldArray({ control, name: "milestones" });

  const [headline, body, storyTitle, seoTitle, seoDescription] = useWatch({
    control,
    name: ["headline", "body", "storyTitle", "seoTitle", "seoDescription"],
  });

  return (
    <form
      onSubmit={handleSubmit((values) => {
        notifyDemoMode("These About page changes");
        reset(values);
      })}
      noValidate
      className="flex flex-col gap-6"
    >
      <AdminFormSection title="Hero">
        <div className="space-y-1.5">
          <Input
            id="about-headline"
            label="Headline"
            maxLength={L.headline}
            error={errors.headline?.message}
            {...register("headline")}
          />
          <CharacterCount length={headline?.length ?? 0} max={L.headline} />
        </div>
        <div className="space-y-1.5">
          <Textarea
            id="about-body"
            label="Intro"
            rows={4}
            maxLength={L.body}
            error={errors.body?.message}
            {...register("body")}
          />
          <CharacterCount length={body?.length ?? 0} max={L.body} />
        </div>
      </AdminFormSection>

      <AdminFormSection
        title="Our story"
        description="Shown next to the operations photo."
        aside={
          story.fields.length < L.maxStory ? (
            <Button
              type="button"
              variant="outline"
              size="sm"
              icon={<Plus />}
              onClick={() => story.append({ value: "" })}
            >
              Paragraph
            </Button>
          ) : null
        }
      >
        <div className="space-y-1.5">
          <Input
            id="about-story-title"
            label="Section title"
            maxLength={L.storyTitle}
            error={errors.storyTitle?.message}
            {...register("storyTitle")}
          />
          <CharacterCount length={storyTitle?.length ?? 0} max={L.storyTitle} />
        </div>
        {typeof errors.storyParagraphs?.root?.message === "string" ? (
          <p className="text-sm text-destructive">{errors.storyParagraphs.root.message}</p>
        ) : null}
        <div className="space-y-4">
          {story.fields.map((field, index) => (
            <div key={field.id} className="flex gap-2">
              <Textarea
                id={`about-story-${index}`}
                label={`Paragraph ${index + 1}`}
                rows={3}
                maxLength={L.storyParagraph}
                error={errors.storyParagraphs?.[index]?.value?.message}
                fieldClassName="flex-1"
                {...register(`storyParagraphs.${index}.value`)}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                className="mt-7 text-muted-foreground"
                aria-label={`Remove paragraph ${index + 1}`}
                disabled={story.fields.length <= L.minStory}
                onClick={() => story.remove(index)}
              >
                <Trash2 />
              </Button>
            </div>
          ))}
        </div>
      </AdminFormSection>

      <AdminFormSection
        title="Values"
        aside={
          values.fields.length < L.maxValues ? (
            <Button
              type="button"
              variant="outline"
              size="sm"
              icon={<Plus />}
              onClick={() => values.append({ title: "", body: "" })}
            >
              Value
            </Button>
          ) : null
        }
      >
        <div className="grid gap-4 md:grid-cols-2">
          {values.fields.map((field, index) => (
            <div key={field.id} className="space-y-3 rounded-lg border p-4">
              <div className="flex items-start justify-between gap-2">
                <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                  Value {index + 1}
                </p>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  className="text-muted-foreground"
                  aria-label={`Remove value ${index + 1}`}
                  disabled={values.fields.length <= L.minValues}
                  onClick={() => values.remove(index)}
                >
                  <Trash2 />
                </Button>
              </div>
              <Input
                id={`about-value-title-${index}`}
                label="Title"
                maxLength={L.valueTitle}
                error={errors.values?.[index]?.title?.message}
                {...register(`values.${index}.title`)}
              />
              <Textarea
                id={`about-value-body-${index}`}
                label="Description"
                rows={3}
                maxLength={L.valueBody}
                error={errors.values?.[index]?.body?.message}
                {...register(`values.${index}.body`)}
              />
            </div>
          ))}
        </div>
      </AdminFormSection>

      <AdminFormSection
        title="Team"
        aside={
          team.fields.length < L.maxTeam ? (
            <Button
              type="button"
              variant="outline"
              size="sm"
              icon={<Plus />}
              onClick={() => team.append({ name: "", role: "", bio: "", initials: "" })}
            >
              Person
            </Button>
          ) : null
        }
      >
        <div className="space-y-4">
          {team.fields.map((field, index) => (
            <div key={field.id} className="grid gap-3 rounded-lg border p-4 sm:grid-cols-2">
              <div className="flex items-center justify-between sm:col-span-2">
                <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                  Person {index + 1}
                </p>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  className="text-muted-foreground"
                  aria-label={`Remove person ${index + 1}`}
                  disabled={team.fields.length <= L.minTeam}
                  onClick={() => team.remove(index)}
                >
                  <Trash2 />
                </Button>
              </div>
              <Input
                id={`about-team-name-${index}`}
                label="Name"
                maxLength={L.teamName}
                error={errors.team?.[index]?.name?.message}
                {...register(`team.${index}.name`)}
              />
              <Input
                id={`about-team-role-${index}`}
                label="Role"
                maxLength={L.teamRole}
                error={errors.team?.[index]?.role?.message}
                {...register(`team.${index}.role`)}
              />
              <Input
                id={`about-team-initials-${index}`}
                label="Initials"
                maxLength={L.initials}
                error={errors.team?.[index]?.initials?.message}
                {...register(`team.${index}.initials`)}
              />
              <Textarea
                id={`about-team-bio-${index}`}
                label="Bio"
                rows={2}
                maxLength={L.teamBio}
                error={errors.team?.[index]?.bio?.message}
                className="sm:col-span-2"
                fieldClassName="sm:col-span-2"
                {...register(`team.${index}.bio`)}
              />
            </div>
          ))}
        </div>
      </AdminFormSection>

      <AdminFormSection
        title="Milestones"
        aside={
          milestones.fields.length < L.maxMilestones ? (
            <Button
              type="button"
              variant="outline"
              size="sm"
              icon={<Plus />}
              onClick={() => milestones.append({ year: "", text: "" })}
            >
              Milestone
            </Button>
          ) : null
        }
      >
        <div className="space-y-3">
          {milestones.fields.map((field, index) => (
            <div key={field.id} className="flex flex-col gap-3 rounded-lg border p-4 sm:flex-row">
              <Input
                id={`about-year-${index}`}
                label="Year"
                maxLength={L.year}
                error={errors.milestones?.[index]?.year?.message}
                fieldClassName="sm:w-28"
                {...register(`milestones.${index}.year`)}
              />
              <Input
                id={`about-milestone-${index}`}
                label="What happened"
                maxLength={L.milestone}
                error={errors.milestones?.[index]?.text?.message}
                fieldClassName="flex-1"
                {...register(`milestones.${index}.text`)}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                className="self-end text-muted-foreground sm:mb-1"
                aria-label={`Remove milestone ${index + 1}`}
                disabled={milestones.fields.length <= L.minMilestones}
                onClick={() => milestones.remove(index)}
              >
                <Trash2 />
              </Button>
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
