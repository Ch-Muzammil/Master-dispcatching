"use client";

import { useWatch, type Control } from "react-hook-form";
import { ArrowRight, Check } from "lucide-react";
import type { ServiceFormValues } from "../schemas/service-schema";
import { ServiceIconTile } from "./service-icon-tile";

/** Live preview of the card as it appears on the public services page. */
export function ServicePreview({ control }: { control: Control<ServiceFormValues> }) {
  const [title, excerpt, iconKey, bullets] = useWatch({
    control,
    name: ["title", "excerpt", "iconKey", "bullets"],
  });
  const points = bullets.map((bullet) => bullet.value.trim()).filter(Boolean).slice(0, 3);

  return (
    <div className="rounded-lg border bg-background p-4" aria-label="Website preview">
      <div className="flex items-start gap-4">
        <ServiceIconTile iconKey={iconKey} />
        <div className="min-w-0">
          <p className="font-display text-base leading-snug font-bold break-words text-foreground">
            {title.trim() || "Service title"}
          </p>
          <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
            {excerpt.trim() || "A one-sentence summary of what this service does for carriers."}
          </p>
        </div>
      </div>
      {points.length > 0 ? (
        <ul className="mt-4 space-y-1.5">
          {points.map((point, index) => (
            <li key={index} className="flex gap-2 text-xs text-muted-foreground">
              <Check className="mt-0.5 size-3.5 shrink-0 text-success" aria-hidden />
              <span className="min-w-0 break-words">{point}</span>
            </li>
          ))}
        </ul>
      ) : null}
      <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-primary">
        Details <ArrowRight className="size-4" aria-hidden />
      </span>
    </div>
  );
}
