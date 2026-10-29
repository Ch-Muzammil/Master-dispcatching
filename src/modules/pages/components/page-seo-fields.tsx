import type { ComponentProps } from "react";
import { AdminFormSection, CharacterCount } from "@/components/admin";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { PAGE_LIMITS as L } from "../constants";

type PageSeoFieldsProps = {
  titleLength: number;
  descriptionLength: number;
  titleError?: string;
  descriptionError?: string;
  titleInput: ComponentProps<typeof Input>;
  descriptionInput: ComponentProps<typeof Textarea>;
};

export function PageSeoFields({
  titleLength,
  descriptionLength,
  titleError,
  descriptionError,
  titleInput,
  descriptionInput,
}: PageSeoFieldsProps) {
  return (
    <AdminFormSection
      title="Search listing"
      description="Title and description shown in search results and link previews."
    >
      <div className="space-y-1.5">
        <Input
          id="page-seo-title"
          label="SEO title"
          placeholder="Title shown in search results"
          maxLength={L.seoTitle}
          error={titleError}
          {...titleInput}
        />
        <CharacterCount length={titleLength} max={L.seoTitle} />
      </div>
      <div className="space-y-1.5">
        <Textarea
          id="page-seo-description"
          label="Meta description"
          placeholder="One or two sentences for search and link previews"
          rows={3}
          maxLength={L.seoDescription}
          error={descriptionError}
          {...descriptionInput}
        />
        <CharacterCount length={descriptionLength} max={L.seoDescription} />
      </div>
    </AdminFormSection>
  );
}
