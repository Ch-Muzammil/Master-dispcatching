"use client";

import { FormEvent, useState } from "react";
import { CheckCircle2, Send } from "lucide-react";
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
import { siteConfig } from "@/config/site";
import { equipmentOptions, fleetSizeOptions } from "@/data/contact";

type FormValues = {
  name: string;
  email: string;
  phone: string;
  equipment: string;
  fleetSize: string;
  message: string;
};

const initialValues: FormValues = {
  name: "",
  email: "",
  phone: "",
  equipment: "",
  fleetSize: "",
  message: "",
};

export function ContactForm() {
  const [values, setValues] = useState(initialValues);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function update(field: keyof FormValues, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
    if (error) setError("");
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!values.name.trim() || !values.email.trim() || !values.message.trim()) {
      setError("Please complete your name, email, and message before sending.");
      return;
    }

    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border bg-card p-8 shadow-sm sm:p-10">
        <CheckCircle2 className="size-10 text-primary" aria-hidden />
        <h2 className="mt-5 font-display text-2xl font-bold tracking-tight text-foreground">
          Thanks — this is a demo form.
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Your message was not sent. When the database is connected, inquiries will reach dispatch.
        </p>
        <a
          href={`tel:${siteConfig.contact.dispatchLine.replace(/\D/g, "")}`}
          className="mt-6 inline-flex text-sm font-bold text-primary hover:underline"
        >
          Need an immediate answer? Call the dispatch line.
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 rounded-2xl border bg-card p-6 sm:p-8">
      {error ? <p className="mb-6 rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive" role="alert">{error}</p> : null}

      <div className="grid gap-6 sm:grid-cols-2">
        <Input
          label="Name *"
          id="contact-name"
          placeholder="Your name"
          value={values.name}
          onChange={(event) => update("name", event.target.value)}
          autoComplete="name"
          className="focus-visible:border-primary focus-visible:ring-primary/20"
        />
        <Input
          label="Email *"
          id="contact-email"
          type="email"
          placeholder="you@example.com"
          value={values.email}
          onChange={(event) => update("email", event.target.value)}
          autoComplete="email"
          className="focus-visible:border-primary focus-visible:ring-primary/20"
        />
        <Input
          label="Phone"
          id="contact-phone"
          type="tel"
          placeholder="(214) 555-0100"
          value={values.phone}
          onChange={(event) => update("phone", event.target.value)}
          autoComplete="tel"
          className="focus-visible:border-primary focus-visible:ring-primary/20"
        />
        <Field id="contact-equipment" label="Equipment type">
          <Select
            value={values.equipment || null}
            onValueChange={(value) => update("equipment", value ?? "")}
          >
            <SelectTrigger id="contact-equipment" className="w-full focus-visible:border-primary focus-visible:ring-primary/20">
              <SelectValue placeholder="Select equipment" />
            </SelectTrigger>
            <SelectContent>
              {equipmentOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
        <Field id="contact-fleet-size" label="Trucks in operation" className="sm:col-span-2">
          <Select
            value={values.fleetSize || null}
            onValueChange={(value) => update("fleetSize", value ?? "")}
          >
            <SelectTrigger id="contact-fleet-size" className="w-full focus-visible:border-primary focus-visible:ring-primary/20">
              <SelectValue placeholder="Select fleet size" />
            </SelectTrigger>
            <SelectContent>
              {fleetSizeOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
        <Textarea
          label="How can we help? *"
          id="contact-message"
          rows={5}
          placeholder="Tell us about your equipment, lanes, and what you need from a dispatch desk…"
          value={values.message}
          onChange={(event) => update("message", event.target.value)}
          fieldClassName="sm:col-span-2"
          className="[field-sizing:fixed] px-3 py-2 focus-visible:border-primary focus-visible:ring-primary/20"
        />
      </div>

      <div>
        <Button type="submit" size="lg" className="rounded-full px-8 font-bold">
          <Send className="size-4" aria-hidden />
          Send inquiry
        </Button>
      </div>
    </form>
  );
}
