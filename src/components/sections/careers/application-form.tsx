"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, FileUp, Send } from "lucide-react";
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
import { Textarea } from "@/components/ui/Textarea";
import type { Job } from "@/data/careers";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/Button";

type Errors = Partial<
  Record<"name" | "email" | "phone" | "experience" | "note" | "resume", string>
>;

type ApplicationFormProps = {
  job: Job;
};

export function ApplicationForm({ job }: ApplicationFormProps) {
  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
    experience: "",
    note: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [resumeName, setResumeName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  function update(field: keyof typeof values, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next: Errors = {};

    if (!values.name.trim()) next.name = "Please enter your full name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
      next.email = "Enter a valid email address.";
    }
    if (values.phone.replace(/\D/g, "").length < 7) {
      next.phone = "Enter a valid phone number.";
    }
    if (!values.experience) next.experience = "Select your experience level.";
    if (values.note.trim().length < 30) {
      next.note = "Tell us a bit more — at least a couple of sentences.";
    }

    const resume = event.currentTarget.elements.namedItem("resume");
    if (resume instanceof HTMLInputElement && resume.files?.[0]) {
      const file = resume.files[0];
      const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];
      const hasAllowedExtension = /\.(pdf|doc|docx)$/i.test(file.name);

      if ((!allowedTypes.includes(file.type) && !hasAllowedExtension) || file.size > 5 * 1024 * 1024) {
        next.resume = file.size > 5 * 1024 * 1024
          ? "Your résumé must be smaller than 5 MB."
          : "Upload a PDF, DOC, or DOCX file.";
      }
    }

    setErrors(next);
    if (Object.keys(next).length > 0) return;
    setIsSubmitting(true);
    router.push(`/success?from=application&job=${encodeURIComponent(job.slug)}`);
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <Input
          label="Full name *"
          id="application-name"
          placeholder="Jordan Reyes"
          value={values.name}
          onChange={(event) => update("name", event.target.value)}
          autoComplete="name"
          error={errors.name}
        />
        <Input
          label="Email *"
          id="application-email"
          type="email"
          placeholder="you@example.com"
          value={values.email}
          onChange={(event) => update("email", event.target.value)}
          autoComplete="email"
          error={errors.email}
        />
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        <Input
          label="Phone *"
          id="application-phone"
          type="tel"
          placeholder="(214) 555-0100"
          value={values.phone}
          onChange={(event) => update("phone", event.target.value)}
          autoComplete="tel"
          error={errors.phone}
        />
        <Field id="application-experience" label="Experience level *" error={errors.experience}>
          <Select
            value={values.experience || null}
            onValueChange={(value) => update("experience", value ?? "")}
          >
            <SelectTrigger id="application-experience" className="w-full">
              <SelectValue placeholder="Select experience" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="entry">Entry level</SelectItem>
              <SelectItem value="1-3">1–3 years</SelectItem>
              <SelectItem value="4-6">4–6 years</SelectItem>
              <SelectItem value="7+">7+ years</SelectItem>
            </SelectContent>
          </Select>
        </Field>
      </div>
      <Textarea
        label="Why this role? *"
        id="application-note"
        rows={5}
        placeholder="A couple of honest sentences about your freight background and what draws you to this desk…"
        value={values.note}
        onChange={(event) => update("note", event.target.value)}
        error={errors.note}
      />
      <div className="space-y-2">
        <label htmlFor="application-resume" className="text-sm font-medium">
          Résumé / CV (PDF or DOC)
        </label>
        <label
          htmlFor="application-resume"
          className="flex cursor-pointer items-center gap-3 rounded-xl border border-dashed bg-card px-5 py-6 text-sm transition-colors hover:border-accent"
        >
          <FileUp className="size-5 text-primary" aria-hidden />
          {resumeName ? (
            <span className="font-semibold">{resumeName}</span>
          ) : (
            <span className="text-muted-foreground">
              Click to upload — optional, but it helps
            </span>
          )}
        </label>
        <input
          id="application-resume"
          name="resume"
          type="file"
          accept=".pdf,.doc,.docx"
          className="sr-only"
          onChange={(event) => {
            setResumeName(event.target.files?.[0]?.name ?? "");
            setErrors((current) => ({ ...current, resume: undefined }));
          }}
        />
        {errors.resume ? (
          <p className="text-sm text-destructive" role="alert">
            {errors.resume}
          </p>
        ) : null}
      </div>
      <div className="flex flex-wrap items-center gap-4">
        <Button
          type="submit"
          size="lg"
          loading={isSubmitting}
          loadingText="Submitting application..."
          className="rounded-full px-8 font-bold"
        >
          <Send className="size-4" aria-hidden />
          Submit application
        </Button>
        <Link href={`/careers/${job.slug}`} className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "font-semibold")}>
          <ArrowLeft className="size-4" aria-hidden />
          Back to role
        </Link>
      </div>
      <p className="text-xs text-muted-foreground">
        By submitting, you agree to our{" "}
        <Link href="/privacy" className="font-semibold text-primary underline-offset-4 hover:underline">
          privacy policy
        </Link>
        . Applications go only to the hiring team.
      </p>
    </form>
  );
}
