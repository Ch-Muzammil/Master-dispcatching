"use client";

import { Controller, useFieldArray, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Save, Trash2 } from "lucide-react";
import { useUnsavedChangesWarning } from "@/hooks/use-unsaved-changes-warning";
import {
  AdminFormSection,
  AdminPageHeader,
  CharacterCount,
  notifyDemoMode,
  SettingToggle,
} from "@/components/admin";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { Textarea } from "@/components/ui/Textarea";
import { SETTINGS_LIMITS as L, SOCIAL_ICON_OPTIONS } from "../constants";
import {
  toSettingsFormValues,
  websiteSettingsSchema,
  type WebsiteSettingsFormValues,
} from "../schemas/settings-schema";
import type { MediaItem, WebsiteSettings } from "../types";
import { MediaLibrary } from "./media-library";
import { NavigationEditor } from "./navigation-editor";
import { SeoEditor } from "./seo-editor";

const SOCIAL_ITEMS = Object.fromEntries(SOCIAL_ICON_OPTIONS.map((item) => [item.value, item.label]));

const TABS = [
  { value: "company", label: "Company" },
  { value: "contact", label: "Contact" },
  { value: "navigation", label: "Navigation" },
  { value: "seo", label: "SEO" },
  { value: "media", label: "Media" },
  { value: "site", label: "Site" },
] as const;

export function SettingsForm({
  settings,
  media,
}: {
  settings: WebsiteSettings;
  media: MediaItem[];
}) {
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isSubmitting },
  } = useForm<WebsiteSettingsFormValues>({
    resolver: zodResolver(websiteSettingsSchema),
    defaultValues: toSettingsFormValues(settings),
  });

  useUnsavedChangesWarning(isDirty);

  const stats = useFieldArray({ control, name: "stats" });
  const socials = useFieldArray({ control, name: "socials" });
  const hours = useFieldArray({ control, name: "hours" });

  const [tagline, description, footerNote] = useWatch({
    control,
    name: ["tagline", "description", "footerNote"],
  });

  return (
    <form
      id="website-settings-form"
      onSubmit={handleSubmit((values) => {
        notifyDemoMode("Website settings");
        reset(values);
      })}
      noValidate
      className="flex flex-col gap-6"
    >
      <AdminPageHeader
        title="Website settings"
        description="Company profile, contact details, navigation, SEO, and the images used across the site."
        actions={
          <div className="flex flex-wrap items-center justify-end gap-3">
            {isDirty ? (
              <p className="text-sm text-muted-foreground" aria-live="polite">
                You have unsaved changes
              </p>
            ) : null}
            <Button type="submit" icon={<Save />} loading={isSubmitting} disabled={isSubmitting || !isDirty}>
              Save changes
            </Button>
          </div>
        }
      />

      <Tabs defaultValue="company">
        <div className="-mx-1 overflow-x-auto px-1">
          <TabsList variant="line" className="h-auto w-max min-w-full justify-start">
            {TABS.map((tab) => (
              <TabsTrigger key={tab.value} value={tab.value} className="flex-none px-3">
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        <TabsContent value="company" className="mt-6 flex flex-col gap-6">
          <AdminFormSection title="Company profile">
            <div className="grid gap-5 sm:grid-cols-2">
              <Input
                id="settings-name"
                label="Company name"
                maxLength={L.name}
                error={errors.name?.message}
                {...register("name")}
              />
              <Input
                id="settings-short-name"
                label="Short name"
                maxLength={L.shortName}
                error={errors.shortName?.message}
                {...register("shortName")}
              />
              <Input
                id="settings-legal"
                label="Legal name"
                maxLength={L.legalName}
                error={errors.legalName?.message}
                fieldClassName="sm:col-span-2"
                {...register("legalName")}
              />
              <Input
                id="settings-wordmark"
                label="Logo wordmark"
                maxLength={L.wordmark}
                error={errors.wordmark?.message}
                {...register("wordmark")}
              />
              <Input
                id="settings-subline"
                label="Logo subline"
                maxLength={L.subline}
                error={errors.subline?.message}
                {...register("subline")}
              />
              <Input
                id="settings-founded"
                label="Founded"
                inputMode="numeric"
                error={errors.founded?.message}
                {...register("founded")}
              />
              <Input
                id="settings-area"
                label="Service area"
                maxLength={L.serviceArea}
                error={errors.serviceArea?.message}
                {...register("serviceArea")}
              />
            </div>
            <div className="space-y-1.5">
              <Input
                id="settings-tagline"
                label="Tagline"
                maxLength={L.tagline}
                error={errors.tagline?.message}
                {...register("tagline")}
              />
              <CharacterCount length={tagline?.length ?? 0} max={L.tagline} />
            </div>
            <div className="space-y-1.5">
              <Textarea
                id="settings-description"
                label="Short description"
                rows={3}
                maxLength={L.description}
                error={errors.description?.message}
                {...register("description")}
              />
              <CharacterCount length={description?.length ?? 0} max={L.description} />
            </div>
          </AdminFormSection>

          <AdminFormSection
            title="Home page stats"
            aside={
              stats.fields.length < L.maxStats ? (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  icon={<Plus />}
                  onClick={() => stats.append({ value: "", label: "" })}
                >
                  Stat
                </Button>
              ) : null
            }
          >
            <div className="grid gap-3 sm:grid-cols-2">
              {stats.fields.map((field, index) => (
                <div key={field.id} className="flex gap-2">
                  <Input
                    id={`stat-value-${index}`}
                    label="Value"
                    maxLength={L.statValue}
                    error={errors.stats?.[index]?.value?.message}
                    fieldClassName="w-28"
                    {...register(`stats.${index}.value`)}
                  />
                  <Input
                    id={`stat-label-${index}`}
                    label="Label"
                    maxLength={L.statLabel}
                    error={errors.stats?.[index]?.label?.message}
                    fieldClassName="flex-1"
                    {...register(`stats.${index}.label`)}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    className="mt-7 text-muted-foreground"
                    aria-label={`Remove stat ${index + 1}`}
                    disabled={stats.fields.length <= L.minStats}
                    onClick={() => stats.remove(index)}
                  >
                    <Trash2 />
                  </Button>
                </div>
              ))}
            </div>
          </AdminFormSection>

          <AdminFormSection
            title="Social links"
            aside={
              socials.fields.length < L.maxSocials ? (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  icon={<Plus />}
                  onClick={() => socials.append({ label: "", href: "https://", icon: "linkedin" })}
                >
                  Link
                </Button>
              ) : null
            }
          >
            <div className="space-y-4">
              {socials.fields.map((field, index) => (
                <div key={field.id} className="grid gap-3 rounded-lg border p-4 sm:grid-cols-[8rem_1fr_1fr_auto]">
                  <Controller
                    name={`socials.${index}.icon`}
                    control={control}
                    render={({ field: iconField }) => (
                      <Field
                        id={`social-icon-${index}`}
                        label="Network"
                        error={errors.socials?.[index]?.icon?.message}
                      >
                        <Select
                          items={SOCIAL_ITEMS}
                          value={iconField.value}
                          onValueChange={(value) => value && iconField.onChange(value)}
                        >
                          <SelectTrigger id={`social-icon-${index}`} className="w-full">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {SOCIAL_ICON_OPTIONS.map((option) => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </Field>
                    )}
                  />
                  <Input
                    id={`social-label-${index}`}
                    label="Label"
                    maxLength={L.socialLabel}
                    error={errors.socials?.[index]?.label?.message}
                    {...register(`socials.${index}.label`)}
                  />
                  <Input
                    id={`social-href-${index}`}
                    label="URL"
                    error={errors.socials?.[index]?.href?.message}
                    {...register(`socials.${index}.href`)}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    className="self-end text-muted-foreground"
                    aria-label={`Remove social link ${index + 1}`}
                    onClick={() => socials.remove(index)}
                  >
                    <Trash2 />
                  </Button>
                </div>
              ))}
            </div>
          </AdminFormSection>
        </TabsContent>

        <TabsContent value="contact" className="mt-6 flex flex-col gap-6">
          <AdminFormSection title="Contact details">
            <div className="grid gap-5 sm:grid-cols-2">
              <Input
                id="settings-phone"
                label="Office phone"
                maxLength={L.phone}
                error={errors.phone?.message}
                {...register("phone")}
              />
              <Input
                id="settings-dispatch"
                label="24/7 dispatch line"
                maxLength={L.phone}
                error={errors.dispatchLine?.message}
                {...register("dispatchLine")}
              />
              <Input
                id="settings-email"
                label="Contact email"
                type="email"
                maxLength={L.email}
                error={errors.email?.message}
                {...register("email")}
              />
              <Input
                id="settings-careers-email"
                label="Careers email"
                type="email"
                maxLength={L.email}
                error={errors.careersEmail?.message}
                {...register("careersEmail")}
              />
              <Input
                id="settings-address"
                label="Headquarters address"
                maxLength={L.address}
                error={errors.address?.message}
                fieldClassName="sm:col-span-2"
                {...register("address")}
              />
            </div>
          </AdminFormSection>

          <AdminFormSection
            title="Desk hours"
            aside={
              hours.fields.length < L.maxHours ? (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  icon={<Plus />}
                  onClick={() => hours.append({ label: "", value: "" })}
                >
                  Hours
                </Button>
              ) : null
            }
          >
            <div className="space-y-3">
              {hours.fields.map((field, index) => (
                <div key={field.id} className="flex flex-col gap-3 sm:flex-row">
                  <Input
                    id={`hours-label-${index}`}
                    label="Label"
                    maxLength={L.hoursLabel}
                    error={errors.hours?.[index]?.label?.message}
                    fieldClassName="sm:w-56"
                    {...register(`hours.${index}.label`)}
                  />
                  <Input
                    id={`hours-value-${index}`}
                    label="Hours"
                    maxLength={L.hoursValue}
                    error={errors.hours?.[index]?.value?.message}
                    fieldClassName="flex-1"
                    {...register(`hours.${index}.value`)}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    className="self-end text-muted-foreground"
                    aria-label={`Remove hours row ${index + 1}`}
                    disabled={hours.fields.length <= L.minHours}
                    onClick={() => hours.remove(index)}
                  >
                    <Trash2 />
                  </Button>
                </div>
              ))}
            </div>
          </AdminFormSection>
        </TabsContent>

        <TabsContent value="navigation" className="mt-6">
          <NavigationEditor control={control} register={register} errors={errors} />
        </TabsContent>

        <TabsContent value="seo" className="mt-6">
          <SeoEditor control={control} register={register} errors={errors} />
        </TabsContent>

        <TabsContent value="media" className="mt-6">
          <MediaLibrary items={media} />
        </TabsContent>

        <TabsContent value="site" className="mt-6">
          <AdminFormSection title="Site preferences">
            <div className="divide-y">
              <Controller
                name="maintenance"
                control={control}
                render={({ field }) => (
                  <SettingToggle
                    id="pref-maintenance"
                    label="Maintenance mode"
                    hint="Shows a maintenance notice to visitors. Admins keep full access."
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="py-4 first:pt-0"
                  />
                )}
              />
              <Controller
                name="showHours"
                control={control}
                render={({ field }) => (
                  <SettingToggle
                    id="pref-hours"
                    label="Show desk hours on Contact"
                    hint="Displays dispatch, office, and billing hours under the contact form."
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="py-4"
                  />
                )}
              />
              <Controller
                name="showTestimonials"
                control={control}
                render={({ field }) => (
                  <SettingToggle
                    id="pref-testimonials"
                    label="Show carrier testimonials"
                    hint="Toggles the testimonial band on the homepage."
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="py-4 last:pb-0"
                  />
                )}
              />
            </div>
            <div className="space-y-1.5 border-t pt-5">
              <Textarea
                id="settings-footer-note"
                label="Footer note"
                rows={2}
                maxLength={L.footerNote}
                error={errors.footerNote?.message}
                {...register("footerNote")}
              />
              <CharacterCount length={footerNote?.length ?? 0} max={L.footerNote} />
            </div>
          </AdminFormSection>
        </TabsContent>
      </Tabs>
    </form>
  );
}
