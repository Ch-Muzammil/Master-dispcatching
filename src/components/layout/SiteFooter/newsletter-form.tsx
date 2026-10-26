"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export function NewsletterForm() {
  const [email, setEmail] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setEmail("");
    toast.success("You're on the list", {
      description: "Monthly freight insights, no spam.",
    });
  }

  return (
    <form className="mt-6" onSubmit={handleSubmit}>
      <label htmlFor="footer-newsletter" className="text-xs font-semibold text-primary-foreground/60">
        Monthly freight insights
      </label>
      <div className="mt-2 flex gap-2">
        <Input id="footer-newsletter" type="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@carrier.com" className="border-primary-foreground/15 bg-primary-foreground/10 text-primary-foreground placeholder:text-primary-foreground/40 focus-visible:ring-accent" />
        <Button type="submit" className="shrink-0 bg-accent font-semibold text-accent-foreground hover:bg-accent/90">Join</Button>
      </div>
    </form>
  );
}
