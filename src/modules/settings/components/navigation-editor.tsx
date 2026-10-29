"use client";

import {
  Controller,
  useFieldArray,
  type Control,
  type FieldErrors,
  type UseFormRegister,
} from "react-hook-form";
import { ArrowDown, ArrowUp, ExternalLink } from "lucide-react";
import { AdminFormSection } from "@/components/admin";
import { Button, buttonVariants } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Switch } from "@/components/ui/Switch";
import type { WebsiteSettingsFormValues } from "../schemas/settings-schema";

type NavKey = "header" | "footer";

type NavigationEditorProps = {
  control: Control<WebsiteSettingsFormValues>;
  register: UseFormRegister<WebsiteSettingsFormValues>;
  errors: FieldErrors<WebsiteSettingsFormValues>;
};

function NavList({
  name,
  title,
  description,
  control,
  register,
  errors,
}: NavigationEditorProps & { name: NavKey; title: string; description: string }) {
  const { fields, move } = useFieldArray({ control, name });
  const listErrors = errors[name];

  return (
    <AdminFormSection title={title} description={description}>
      <div className="space-y-3">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="flex flex-col gap-3 rounded-lg border bg-background p-3 sm:flex-row sm:items-start"
          >
            <div className="flex shrink-0 flex-row sm:flex-col">
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                aria-label={`Move ${field.label} up`}
                disabled={index === 0}
                onClick={() => move(index, index - 1)}
              >
                <ArrowUp />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                aria-label={`Move ${field.label} down`}
                disabled={index === fields.length - 1}
                onClick={() => move(index, index + 1)}
              >
                <ArrowDown />
              </Button>
            </div>
            <div className="grid min-w-0 flex-1 gap-3 sm:grid-cols-[1fr_1fr_auto] sm:items-end">
              <Input
                id={`${name}-label-${index}`}
                label="Label"
                error={listErrors?.[index]?.label?.message}
                {...register(`${name}.${index}.label`)}
              />
              <Input
                id={`${name}-href-${index}`}
                label="Path"
                error={listErrors?.[index]?.href?.message}
                {...register(`${name}.${index}.href`)}
              />
              <div className="flex items-center justify-end gap-2 sm:pb-1">
                <a
                  href={field.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Preview ${field.label}`}
                  className={buttonVariants({ variant: "ghost", size: "icon-sm" })}
                >
                  <ExternalLink className="size-4" />
                </a>
                <Controller
                  name={`${name}.${index}.visible`}
                  control={control}
                  render={({ field: toggle }) => (
                    <Switch
                      id={`${name}-visible-${index}`}
                      checked={toggle.value}
                      onCheckedChange={toggle.onChange}
                      aria-label={`Show ${field.label} in ${title.toLowerCase()}`}
                    />
                  )}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </AdminFormSection>
  );
}

export function NavigationEditor(props: NavigationEditorProps) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <NavList
        name="header"
        title="Header menu"
        description="Primary links in the site header, in display order."
        {...props}
      />
      <NavList
        name="footer"
        title="Footer legal"
        description="Utility links in the footer’s legal column. Service links follow published services."
        {...props}
      />
    </div>
  );
}
