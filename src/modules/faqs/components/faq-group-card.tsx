"use client";

import { ArrowDown, ArrowUp, Pencil, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import type { AdminFaqGroup, AdminFaqItem } from "../types";

type FaqGroupCardProps = {
  group: AdminFaqGroup;
  onAdd: () => void;
  onEdit: (item: AdminFaqItem) => void;
  onDelete: (item: AdminFaqItem) => void;
  onMove: (itemId: string, direction: -1 | 1) => void;
  onDeleteGroup: () => void;
};

export function FaqGroupCard({
  group,
  onAdd,
  onEdit,
  onDelete,
  onMove,
  onDeleteGroup,
}: FaqGroupCardProps) {
  return (
    <section className="overflow-hidden rounded-xl border bg-card shadow-xs" aria-labelledby={group.id}>
      <header className="flex flex-col gap-3 border-b px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-5">
        <div className="min-w-0">
          <h2 id={group.id} className="font-display text-base font-bold text-foreground">
            {group.category}
          </h2>
          <p className="text-xs text-muted-foreground tabular-nums">
            {group.items.length} {group.items.length === 1 ? "question" : "questions"}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-1">
          <Button variant="outline" size="sm" icon={<Plus />} onClick={onAdd}>
            Add question
          </Button>
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label={`Delete ${group.category} group`}
            onClick={onDeleteGroup}
            className="text-muted-foreground hover:text-destructive"
          >
            <Trash2 />
          </Button>
        </div>
      </header>

      {group.items.length === 0 ? (
        <p className="px-5 py-8 text-center text-sm text-muted-foreground">
          No questions in this group yet.
        </p>
      ) : (
        <ol className="divide-y">
          {group.items.map((item, index) => (
            <li key={item.id} className="group/row flex items-start gap-2 px-3 py-3 sm:px-4">
              <span className="mt-1.5 w-6 shrink-0 text-center text-xs font-semibold text-muted-foreground tabular-nums">
                {index + 1}
              </span>
              <button
                type="button"
                onClick={() => onEdit(item)}
                className="min-w-0 flex-1 rounded-sm text-left focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
              >
                <p className="font-medium text-foreground">{item.question}</p>
                <p className="mt-0.5 line-clamp-1 text-xs text-muted-foreground">{item.answer}</p>
              </button>
              <div className="flex shrink-0 items-center sm:opacity-0 sm:group-hover/row:opacity-100 sm:focus-within:opacity-100">
                <Button
                  variant="ghost"
                  size="icon-sm"
                  aria-label={`Move “${item.question}” up`}
                  disabled={index === 0}
                  onClick={() => onMove(item.id, -1)}
                >
                  <ArrowUp />
                </Button>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  aria-label={`Move “${item.question}” down`}
                  disabled={index === group.items.length - 1}
                  onClick={() => onMove(item.id, 1)}
                >
                  <ArrowDown />
                </Button>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  aria-label={`Edit “${item.question}”`}
                  onClick={() => onEdit(item)}
                >
                  <Pencil />
                </Button>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  aria-label={`Delete “${item.question}”`}
                  onClick={() => onDelete(item)}
                  className="text-muted-foreground hover:text-destructive"
                >
                  <Trash2 />
                </Button>
              </div>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}
