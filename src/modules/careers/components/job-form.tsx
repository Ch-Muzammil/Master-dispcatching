"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Controller, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Ban } from "lucide-react";
import { cn } from "@/lib/utils";
import { slugify } from "@/lib/slugify";
import { formatDateTime } from "@/lib/format-date";
import { useUnsavedChangesWarning } from "@/hooks/use-unsaved-changes-warning";
import { AdminFormSection, CharacterCount, notifyDemoMode, StringListField } from "@/components/admin";
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
import { Textarea } from "@/components/ui/Textarea";
import { JOB_LIMITS as L } from "../constants";
import { createJobFormSchema, toJobFormValues, type JobFormValues } from "../schemas/job-schema";
import { JOB_DEPARTMENTS, JOB_TYPES, type AdminJob } from "../types";
import { JobStatusPicker } from "./job-status-picker";

const DEPARTMENT_ITEMS = Object.fromEntries(JOB_DEPARTMENTS.map((value) => [value, value]));
const TYPE_ITEMS = Object.fromEntries(JOB_TYPES.map((value) => [value, value]));

type JobFormProps = {
  job?: AdminJob;
  takenSlugs: string[];
};

export function JobForm({ job, takenSlugs }: JobFormProps) {
  const isNew = !job;
  const schema = useMemo(() => createJobFormSchema(takenSlugs), [takenSlugs]);
  const [slugEdited, setSlugEdited] = useState(!isNew);
  const [confirmClose, setConfirmClose] = useState(false);

  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors, isDirty, isSubmitting, isSubmitted },
  } = useForm<JobFormValues>({
    resolver: zodResolver(schema),
    defaultValues: toJobFormValues(job),
  });

  useUnsavedChangesWarning(isDirty);

  const [slug, overview] = useWatch({ control, name: ["slug", "overview"] });

  function onSubmit() {
    notifyDemoMode(isNew ? "This new listing" : "These changes");
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
          <AdminFormSection title="Role" description="How this listing is named and found.">
            <Input
              id="job-title"
              label="Title"
              placeholder="e.g. Dispatch Manager"
              maxLength={L.title}
              error={errors.title?.message}
              {...titleField}
            />
            <div className="space-y-1.5">
              <Input
                id="job-slug"
                label="URL slug"
                placeholder="dispatch-manager"
                maxLength={80}
                autoCapitalize="off"
                spellCheck={false}
                error={errors.slug?.message}
                {...slugField}
              />
              <p className="truncate text-xs text-muted-foreground">
                /careers/<span className="font-medium text-foreground">{slug || "…"}</span>
              </p>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <Controller
                name="department"
                control={control}
                render={({ field }) => (
                  <Field id="job-department" label="Department" error={errors.department?.message}>
                    <Select
                      items={DEPARTMENT_ITEMS}
                      value={field.value}
                      onValueChange={(value) => value && field.onChange(value)}
                    >
                      <SelectTrigger id="job-department" className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {JOB_DEPARTMENTS.map((department) => (
                          <SelectItem key={department} value={department}>
                            {department}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </Field>
                )}
              />
              <Controller
                name="type"
                control={control}
                render={({ field }) => (
                  <Field id="job-type" label="Type" error={errors.type?.message}>
                    <Select
                      items={TYPE_ITEMS}
                      value={field.value}
                      onValueChange={(value) => value && field.onChange(value)}
                    >
                      <SelectTrigger id="job-type" className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {JOB_TYPES.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </Field>
                )}
              />
              <Input
                id="job-location"
                label="Location"
                placeholder="Dallas, TX · Hybrid"
                maxLength={L.location}
                error={errors.location?.message}
                {...register("location")}
              />
              <Input
                id="job-salary"
                label="Pay"
                placeholder="$68,000 – $85,000 / year"
                maxLength={L.salary}
                error={errors.salary?.message}
                {...register("salary")}
              />
            </div>
          </AdminFormSection>

          <AdminFormSection title="Overview" description="The intro on the job page.">
            <div className="space-y-1.5">
              <Textarea
                id="job-overview"
                label="Overview"
                placeholder="What this desk owns, who it reports to, and what a good week looks like."
                rows={4}
                maxLength={L.overview}
                error={errors.overview?.message}
                {...register("overview")}
              />
              <CharacterCount length={overview.length} max={L.overview} />
            </div>
          </AdminFormSection>

          <AdminFormSection title="Responsibilities">
            <StringListField
              control={control}
              name="responsibilities"
              register={register}
              errors={errors}
              minItems={L.minList}
              maxItems={L.maxList}
              maxLength={L.listItem}
              itemLabel="Responsibility"
              addLabel="Add responsibility"
              placeholder="e.g. Own broker escalations on your desk"
            />
          </AdminFormSection>

          <AdminFormSection title="Qualifications">
            <StringListField
              control={control}
              name="qualifications"
              register={register}
              errors={errors}
              minItems={L.minList}
              maxItems={L.maxList}
              maxLength={L.listItem}
              itemLabel="Qualification"
              addLabel="Add qualification"
              placeholder="e.g. 3+ years of freight dispatch"
            />
          </AdminFormSection>

          <AdminFormSection title="Benefits">
            <StringListField
              control={control}
              name="benefits"
              register={register}
              errors={errors}
              minItems={L.minList}
              maxItems={L.maxList}
              maxLength={L.listItem}
              itemLabel="Benefit"
              addLabel="Add benefit"
              placeholder="e.g. Medical, dental, and vision coverage"
            />
          </AdminFormSection>
        </div>

        <aside className="flex min-w-0 flex-col gap-6 lg:sticky lg:top-22">
          <AdminFormSection title="Publishing">
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <JobStatusPicker value={field.value} onChange={field.onChange} />
              )}
            />
            {job ? (
              <dl className="grid gap-3 border-t pt-4 text-sm">
                <div className="flex justify-between gap-3">
                  <dt className="text-muted-foreground">Applicants</dt>
                  <dd className="font-medium tabular-nums">{job.applicants}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-muted-foreground">Page views</dt>
                  <dd className="font-medium tabular-nums">{job.views}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-muted-foreground">Posted</dt>
                  <dd>
                    <time dateTime={job.postedAt}>{formatDateTime(job.postedAt)}</time>
                  </dd>
                </div>
                {job.status === "open" ? (
                  <Button
                    variant="ghost"
                    size="sm"
                    icon={<Ban />}
                    onClick={() => setConfirmClose(true)}
                    className="-ml-2 justify-start text-destructive hover:bg-destructive/10 hover:text-destructive"
                  >
                    Close listing
                  </Button>
                ) : null}
              </dl>
            ) : (
              <p className="text-xs text-muted-foreground">
                New listings stay in draft until you open them. Posted date is set when you first open the role.
              </p>
            )}
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
        <Link href="/admin/careers" className={buttonVariants({ variant: "outline" })}>
          Cancel
        </Link>
        <Button type="submit" loading={isSubmitting} disabled={isSubmitting || (!isNew && !isDirty)}>
          {isNew ? "Create listing" : "Save changes"}
        </Button>
      </div>

      {job ? (
        <ConfirmDialog
          open={confirmClose}
          onOpenChange={setConfirmClose}
          title={`Close “${job.title}”?`}
          description="It will move to recently closed on the careers page. Existing applications stay in the inbox."
          confirmLabel="Close listing"
          destructive
          onConfirm={() => notifyDemoMode("Closing this listing")}
        />
      ) : null}
    </form>
  );
}
