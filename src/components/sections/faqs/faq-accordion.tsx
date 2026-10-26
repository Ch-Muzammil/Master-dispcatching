"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { Faq } from "@/data/faqs";
import { cn } from "@/lib/utils";

export function FaqAccordion({ items }: { items: Faq[] }) {
  const [openQuestion, setOpenQuestion] = useState<string | null>(null);

  return (
    <div className="divide-y divide-border border-y border-border">
      {items.map((item) => {
        const isOpen = openQuestion === item.question;
        const panelId = `faq-${item.question.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

        return (
          <div key={item.question}>
            <h3>
              <button
                type="button"
                aria-controls={panelId}
                aria-expanded={isOpen}
                onClick={() =>
                  setOpenQuestion((current) =>
                    current === item.question ? null : item.question,
                  )
                }
                className="flex w-full items-center justify-between gap-6 py-5 text-left text-base font-bold text-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:py-6"
              >
                <span>{item.question}</span>
                <ChevronDown
                  className={cn(
                    "size-5 shrink-0 text-primary transition-transform duration-200",
                    isOpen && "rotate-180",
                  )}
                  aria-hidden
                />
              </button>
            </h3>
            <div
              id={panelId}
              hidden={!isOpen}
              className="pb-5 pr-10 text-sm leading-relaxed text-muted-foreground sm:pb-6"
            >
              {item.answer}
            </div>
          </div>
        );
      })}
    </div>
  );
}
