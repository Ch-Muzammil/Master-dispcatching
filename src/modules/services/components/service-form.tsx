"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Controller, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Archive, ImageOff } from "lucide-react";
import { cn } from "@/lib/utils";
import { slugify } from "@/lib/slugify";
import { formatDateTime } from "@/lib/format-date";
import { useUnsavedChangesWarning } from "@/hooks/use-unsaved-changes-warning";
import { AdminFormSection, CharacterCount, notifyDemoMode } from "@/components/admin";
import { ConfirmDialog } from "@/components/ui/AlertDialog";
import { Button, buttonVariants } from "@/components/ui/Button";
import { Field } from "@/components/ui/Field";
import { Input } from "@/components/ui/Input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { Switch } from "@/components/ui/Switch";
import { Textarea } from "@/components/ui/Textarea";
import { SERVICE_IMAGE_OPTIONS, SERVICE_LIMITS as L } from "../constants";
import {
  createServiceFormSchema,
  toServiceFormValues,
  type ServiceFormValues,
} from "../schemas/service-schema";
import type { AdminService } from "../types";
import { ServiceBulletsField } from "./service-bullets-field";
import { ServiceIconPicker } from "./service-icon-picker";
import { ServicePreview } from "./service-preview";
import { ServiceStatusPicker } from "./service-status-picker";

const NO_IMAGE = "none";

const IMAGE_ITEMS: Record<string, string> = {
  [NO_IMAGE]: "No image",
  ...Object.fromEntries(SERVICE_IMAGE_OPTIONS.map((option) => [option.value, option.label])),
};

type ServiceFormProps = {
  /** Omit to create a new service. */
  service?: AdminService;
  /** Slugs used by other services, for the uniqueness check. */
  takenSlugs: string[];
};

export function ServiceForm({ service, takenSlugs }: ServiceFormProps) {
  const isNew = !service;
  const schema = useMemo(() => createServiceFormSchema(takenSlugs), [takenSlugs]);
  // New services follow the title until the admin edits the slug by hand.
  const [slugEdited, setSlugEdited] = useState(!isNew);
  const [confirmArchive, setConfirmArchive] = useState(false);

  const {
    control,
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isDirty, isSubmitting, isSubmitted },
  } = useForm<ServiceFormValues>({
    resolver: zodResolver(schema),
    defaultValues: toServiceFormValues(service),
  });

  useUnsavedChangesWarning(isDirty);

  const [slug, excerpt, description, image] = useWatch({
    control,
    name: ["slug", "excerpt", "description", "image"],
  });

  function onSubmit(values: ServiceFormValues) {
    notifyDemoMode(isNew ? "This new service" : "These changes");
    reset(values);
  }

  const titleField = register("title", {
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
      if (slugEdited) return;
      setValue("slug", slugify(event.target.value), {
        shouldDirty: true,
        shouldValidate: isSubmitted,
      });
    },
  });

  const slugField = register("slug", {
    onChange: () => setSlugEdited(true),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-6">
      <div className="grid items-start gap-6 lg:grid-cols-3">
        <div className="flex min-w-0 flex-col gap-6 lg:col-span-2">
          <AdminFormSection title="Basics" description="How this service is named across the website.">
            <Input
              id="service-title"
              label="Title"
              placeholder="e.g. Dry Van Dispatching"
              maxLength={L.title}
              error={errors.title?.message}
              {...titleField}
            />
            <div className="grid items-start gap-5 sm:grid-cols-2">
              <Input
                id="service-short-title"
                label="Short title"
                placeholder="e.g. Dry Van"
                maxLength={L.shortTitle}
                error={errors.shortTitle?.message}
                hint="Used in menus and tight spaces."
                {...register("shortTitle")}
              />
              <Input
                id="service-slug"
                label="URL slug"
                placeholder="dry-van-dispatching"
                maxLength={80}
                autoCapitalize="off"
                spellCheck={false}
                error={errors.slug?.message}
                hint={
                  <>
                    /services/<span className="font-medium text-foreground">{slug || "…"}</span>
                  </>
                }
                {...slugField}
              />
            </div>
          </AdminFormSection>

          <AdminFormSection title="Content" description="Shown on the services page and the service's own page.">
            <div className="space-y-1.5">
              <Textarea
                id="service-excerpt"
                label="Summary"
                placeholder="One or two sentences carriers see on the services list."
                rows={2}
                maxLength={L.excerpt}
                error={errors.excerpt?.message}
                {...register("excerpt")}
              />
              <CharacterCount length={excerpt.length} max={L.excerpt} />
            </div>
            <div className="space-y-1.5">
              <Textarea
                id="service-description"
                label="Description"
                placeholder="The intro paragraph at the top of the service page."
                rows={4}
                maxLength={L.description}
                error={errors.description?.message}
                {...register("description")}
              />
              <CharacterCount length={description.length} max={L.description} />
            </div>
          </AdminFormSection>

          <AdminFormSection
            title="Key points"
            description="Short, concrete benefits. The first three appear on the services list."
          >
            <ServiceBulletsField control={control} register={register} errors={errors} />
          </AdminFormSection>

          <AdminFormSection title="Image" description="Optional photo for the service page header.">
            <div className="grid gap-5 sm:grid-cols-[minmax(0,1fr)_12rem]">
              <div className="space-y-5">
                <Controller
                  name="image"
                  control={control}
                  render={({ field }) => (
                    <Field id="service-image" label="Photo">
                      <Select
                        items={IMAGE_ITEMS}
                        value={field.value || NO_IMAGE}
                        onValueChange={(value) =>
                          field.onChange(!value || value === NO_IMAGE ? "" : value)
                        }
                      >
                        <SelectTrigger id="service-image" className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.entries(IMAGE_ITEMS).map(([value, label]) => (
                            <SelectItem key={value} value={value}>
                              {label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </Field>
                  )}
                />
                <Input
                  id="service-image-alt"
                  label="Alt text"
                  placeholder="Describe what the photo shows"
                  maxLength={L.imageAlt}
                  disabled={!image}
                  error={errors.imageAlt?.message}
                  {...register("imageAlt")}
                />
              </div>
              <div className="relative aspect-4/3 overflow-hidden rounded-lg border bg-muted">
                {image ? (
                  <Image src={image} alt="" fill sizes="12rem" className="object-cover" />
                ) : (
                  <div className="flex h-full flex-col items-center justify-center gap-1 text-xs text-muted-foreground">
                    <ImageOff className="size-5" aria-hidden />
                    No image
                  </div>
                )}
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              Uploading your own photos arrives with the media library.
            </p>
          </AdminFormSection>
        </div>

        <aside className="flex min-w-0 flex-col gap-6 lg:sticky lg:top-22">
          <AdminFormSection title="Publishing">
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <ServiceStatusPicker value={field.value} onChange={field.onChange} />
              )}
            />
            <Controller
              name="featured"
              control={control}
              render={({ field }) => (
                <label className="flex cursor-pointer items-start justify-between gap-4 rounded-lg border px-3 py-2.5">
                  <span className="min-w-0">
                    <span className="block text-sm font-semibold text-foreground">Feature on home page</span>
                    <span className="block text-xs text-muted-foreground">
                      Featured services appear first in the home page section.
                    </span>
                  </span>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="mt-1"
                  />
                </label>
              )}
            />
            {service ? (
              <div className="flex flex-wrap items-center justify-between gap-2 border-t pt-4 text-xs text-muted-foreground">
                <span>
                  Last updated{" "}
                  <time dateTime={service.updatedAt}>{formatDateTime(service.updatedAt)}</time>
                </span>
                {service.status !== "archived" ? (
                  <Button
                    variant="ghost"
                    size="sm"
                    icon={<Archive />}
                    onClick={() => setConfirmArchive(true)}
                    className="-mr-2 text-destructive hover:bg-destructive/10 hover:text-destructive"
                  >
                    Archive
                  </Button>
                ) : null}
              </div>
            ) : null}
          </AdminFormSection>

          <AdminFormSection title="Icon">
            <Controller
              name="iconKey"
              control={control}
              render={({ field }) => (
                <ServiceIconPicker value={field.value} onChange={field.onChange} />
              )}
            />
          </AdminFormSection>

          <AdminFormSection title="Preview" description="How the card reads on the website.">
            <ServicePreview control={control} />
          </AdminFormSection>
        </aside>
      </div>

      <div className="sticky bottom-0 z-10 -mx-4 -mb-6 flex flex-col-reverse gap-2 border-t bg-background/95 px-4 py-3 backdrop-blur supports-backdrop-filter:bg-background/80 sm:-mx-6 sm:flex-row sm:items-center sm:justify-end sm:px-6 lg:-mx-8 lg:-mb-8 lg:px-8">
        <p
          className={cn(
            "text-sm text-muted-foreground sm:mr-auto",
            !isDirty && "max-sm:hidden sm:invisible",
          )}
          aria-live="polite"
        >
          You have unsaved changes
        </p>
        <Link href="/admin/services" className={buttonVariants({ variant: "outline" })}>
          Cancel
        </Link>
        <Button type="submit" loading={isSubmitting} disabled={isSubmitting || (!isNew && !isDirty)}>
          {isNew ? "Create service" : "Save changes"}
        </Button>
      </div>

      {service ? (
        <ConfirmDialog
          open={confirmArchive}
          onOpenChange={setConfirmArchive}
          title={`Archive “${service.title}”?`}
          description="It will be removed from the website. You can restore it from the Archived tab at any time."
          confirmLabel="Archive service"
          destructive
          onConfirm={() => notifyDemoMode("Archiving")}
        />
      ) : null}
    </form>
  );
}
