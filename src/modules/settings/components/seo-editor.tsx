"use client";

import type { Control, FieldErrors, UseFormRegister } from "react-hook-form";
import { useWatch } from "react-hook-form";
import { Globe, Search } from "lucide-react";
import { AdminFormSection, CharacterCount } from "@/components/admin";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { SETTINGS_LIMITS as L } from "../constants";
import type { WebsiteSettingsFormValues } from "../schemas/settings-schema";

type SeoEditorProps = {
  control: Control<WebsiteSettingsFormValues>;
  register: UseFormRegister<WebsiteSettingsFormValues>;
  errors: FieldErrors<WebsiteSettingsFormValues>;
};

export function SeoEditor({ control, register, errors }: SeoEditorProps) {
  const seo = useWatch({ control, name: "seo" }) ?? [];

  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-4 rounded-xl border bg-card p-5 shadow-xs sm:grid-cols-2">
        <div className="flex items-start gap-3">
          <Search className="mt-0.5 size-4 text-primary" aria-hidden />
          <div>
            <p className="text-sm font-semibold">Search results</p>
            <p className="text-xs text-muted-foreground">
              Titles up to {L.seoTitle} characters; descriptions up to {L.seoDescription} to
              avoid truncation.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Globe className="mt-0.5 size-4 text-primary" aria-hidden />
          <div>
            <p className="text-sm font-semibold">Social previews</p>
            <p className="text-xs text-muted-foreground">
              Every page should carry matching Open Graph metadata once the site is connected.
            </p>
          </div>
        </div>
      </div>

      {seo.map((entry, index) => (
        <AdminFormSection
          key={entry.page}
          title={entry.page}
          description={entry.path}
        >
          <div className="space-y-1.5">
            <Input
              id={`seo-title-${index}`}
              label="Title tag"
              maxLength={L.seoTitle}
              error={errors.seo?.[index]?.title?.message}
              {...register(`seo.${index}.title`)}
            />
            <CharacterCount length={entry.title?.length ?? 0} max={L.seoTitle} />
          </div>
          <div className="space-y-1.5">
            <Textarea
              id={`seo-description-${index}`}
              label="Meta description"
              rows={3}
              maxLength={L.seoDescription}
              error={errors.seo?.[index]?.description?.message}
              {...register(`seo.${index}.description`)}
            />
            <CharacterCount length={entry.description?.length ?? 0} max={L.seoDescription} />
          </div>
        </AdminFormSection>
      ))}
    </div>
  );
}
