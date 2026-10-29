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
import { Textarea } from "@/components/ui/Textarea";
import {
  BLOG_AUTHORS,
  BLOG_COVER_OPTIONS,
  estimateReadTime,
  POST_LIMITS as L,
} from "../constants";
import { createPostFormSchema, toPostFormValues, type PostFormValues } from "../schemas/post-schema";
import { BLOG_CATEGORIES, type AdminPost } from "../types";
import { PostBodyEditor } from "./post-body-editor";
import { PostPreview } from "./post-preview";
import { PostStatusPicker } from "./post-status-picker";

const NO_IMAGE = "none";

const CATEGORY_ITEMS = Object.fromEntries(BLOG_CATEGORIES.map((value) => [value, value]));
const AUTHOR_ITEMS = Object.fromEntries(BLOG_AUTHORS.map((author) => [author.name, author.name]));
const IMAGE_ITEMS: Record<string, string> = {
  [NO_IMAGE]: "No image",
  ...Object.fromEntries(BLOG_COVER_OPTIONS.map((option) => [option.value, option.label])),
};

type PostFormProps = {
  post?: AdminPost;
  takenSlugs: string[];
};

export function PostForm({ post, takenSlugs }: PostFormProps) {
  const isNew = !post;
  const schema = useMemo(() => createPostFormSchema(takenSlugs), [takenSlugs]);
  const [slugEdited, setSlugEdited] = useState(!isNew);
  const [confirmArchive, setConfirmArchive] = useState(false);

  const {
    control,
    register,
    handleSubmit,
    getValues,
    reset,
    setValue,
    formState: { errors, isDirty, isSubmitting, isSubmitted },
  } = useForm<PostFormValues>({
    resolver: zodResolver(schema),
    defaultValues: toPostFormValues(post),
  });

  useUnsavedChangesWarning(isDirty);

  const [slug, excerpt, cover, body] = useWatch({
    control,
    name: ["slug", "excerpt", "cover", "body"],
  });

  function onSubmit(values: PostFormValues) {
    notifyDemoMode(isNew ? "This new article" : "These changes");
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
          <AdminFormSection title="Article" description="How this post is named and found.">
            <Input
              id="post-title"
              label="Title"
              placeholder="e.g. How to Evaluate a Truck Dispatch Service"
              maxLength={L.title}
              error={errors.title?.message}
              {...titleField}
            />
            <div className="grid items-start gap-5 sm:grid-cols-2">
              <Input
                id="post-slug"
                label="URL slug"
                placeholder="evaluate-dispatch-service"
                maxLength={80}
                autoCapitalize="off"
                spellCheck={false}
                error={errors.slug?.message}
                hint={
                  <>
                    /blog/<span className="font-medium text-foreground">{slug || "…"}</span>
                  </>
                }
                {...slugField}
              />
              <Controller
                name="category"
                control={control}
                render={({ field }) => (
                  <Field
                    id="post-category"
                    label="Category"
                    error={errors.category?.message}
                    hint="Groups the article on the blog list."
                  >
                    <Select
                      items={CATEGORY_ITEMS}
                      value={field.value}
                      onValueChange={(value) => value && field.onChange(value)}
                    >
                      <SelectTrigger id="post-category" className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {BLOG_CATEGORIES.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </Field>
                )}
              />
            </div>
            <div className="space-y-1.5">
              <Textarea
                id="post-excerpt"
                label="Summary"
                placeholder="Two sentences carriers see on the blog list and in search results."
                rows={3}
                maxLength={L.excerpt}
                error={errors.excerpt?.message}
                {...register("excerpt")}
              />
              <CharacterCount length={excerpt?.length ?? 0} max={L.excerpt} />
            </div>
          </AdminFormSection>

          <AdminFormSection
            title="Body"
            description="Build the article in blocks. Bullets are one point per line."
            aside={
              <span className="text-xs text-muted-foreground tabular-nums">
                {estimateReadTime(body ?? [])}
              </span>
            }
          >
            <PostBodyEditor
              control={control}
              register={register}
              getValues={getValues}
              errors={errors}
            />
          </AdminFormSection>

          <AdminFormSection title="Cover" description="Optional photo for the article header and the blog list.">
            <div className="grid gap-5 sm:grid-cols-[minmax(0,1fr)_12rem]">
              <div className="space-y-5">
                <Controller
                  name="cover"
                  control={control}
                  render={({ field }) => (
                    <Field id="post-cover" label="Photo" error={errors.cover?.message}>
                      <Select
                        items={IMAGE_ITEMS}
                        value={field.value || NO_IMAGE}
                        onValueChange={(value) =>
                          field.onChange(!value || value === NO_IMAGE ? "" : value)
                        }
                      >
                        <SelectTrigger id="post-cover" className="w-full">
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
                  id="post-cover-alt"
                  label="Alt text"
                  placeholder="Describe what the photo shows"
                  maxLength={L.coverAlt}
                  disabled={!cover}
                  error={errors.coverAlt?.message}
                  {...register("coverAlt")}
                />
              </div>
              <div className="relative aspect-4/3 overflow-hidden rounded-lg border bg-muted">
                {cover ? (
                  <Image src={cover} alt="" fill sizes="12rem" className="object-cover" />
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
                <PostStatusPicker value={field.value} onChange={field.onChange} />
              )}
            />
            <Controller
              name="author"
              control={control}
              render={({ field }) => (
                <Field id="post-author" label="Author" error={errors.author?.message}>
                  <Select
                    items={AUTHOR_ITEMS}
                    value={field.value || null}
                    onValueChange={(value) => {
                      const person = BLOG_AUTHORS.find((author) => author.name === value);
                      if (!person) return;
                      field.onChange(person.name);
                      setValue("authorRole", person.role, { shouldDirty: true });
                      setValue("authorInitials", person.initials);
                    }}
                  >
                    <SelectTrigger id="post-author" className="w-full">
                      <SelectValue placeholder="Choose an author" />
                    </SelectTrigger>
                    <SelectContent>
                      {BLOG_AUTHORS.map((author) => (
                        <SelectItem key={author.name} value={author.name}>
                          {author.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
              )}
            />
            {post ? (
              <div className="flex flex-wrap items-center justify-between gap-2 border-t pt-4 text-xs text-muted-foreground">
                <span>
                  {post.status === "published" ? "Published" : "Last edited"}{" "}
                  <time dateTime={post.publishedAt}>{formatDateTime(post.publishedAt)}</time>
                </span>
                {post.status !== "archived" ? (
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

          <AdminFormSection title="Preview" description="How the card reads on the blog.">
            <PostPreview control={control} />
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
        <Link href="/admin/blog" className={buttonVariants({ variant: "outline" })}>
          Cancel
        </Link>
        <Button type="submit" loading={isSubmitting} disabled={isSubmitting || (!isNew && !isDirty)}>
          {isNew ? "Create article" : "Save changes"}
        </Button>
      </div>

      {post ? (
        <ConfirmDialog
          open={confirmArchive}
          onOpenChange={setConfirmArchive}
          title={`Archive “${post.title}”?`}
          description="It will be removed from the blog. You can restore it from the Archived tab at any time."
          confirmLabel="Archive article"
          destructive
          onConfirm={() => notifyDemoMode("Archiving")}
        />
      ) : null}
    </form>
  );
}
