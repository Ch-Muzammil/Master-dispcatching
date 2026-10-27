"use client";

import { useMemo, useState } from "react";
import { CircleHelp, Plus, Search, SearchX } from "lucide-react";
import { slugify } from "@/lib/slugify";
import { notifyDemoMode } from "@/components/admin";
import { ConfirmDialog } from "@/components/ui/AlertDialog";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/Empty";
import { Input } from "@/components/ui/Input";
import type { FaqItemFormValues } from "../schemas/faq-schema";
import type { AdminFaqGroup, AdminFaqItem } from "../types";
import { FaqEditSheet } from "./faq-edit-sheet";
import { FaqGroupCard } from "./faq-group-card";
import { FaqGroupDialog } from "./faq-group-dialog";

type Editing = { groupId: string; item: AdminFaqItem | null };

type PendingDelete =
  | { kind: "item"; groupId: string; item: AdminFaqItem }
  | { kind: "group"; group: AdminFaqGroup };

/**
 * Grouped FAQ editor. Changes live in this session so reorder / delete feel
 * real; a demo toast makes it clear they are not written to a database.
 */
export function FaqsManager({ groups: initial }: { groups: AdminFaqGroup[] }) {
  const [groups, setGroups] = useState(initial);
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState<Editing | null>(null);
  const [newGroupOpen, setNewGroupOpen] = useState(false);
  const [pendingDelete, setPendingDelete] = useState<PendingDelete | null>(null);

  const needle = search.trim().toLowerCase();
  const visible = useMemo(() => {
    if (!needle) return groups;
    return groups
      .map((group) => ({
        ...group,
        items: group.items.filter(
          (item) =>
            item.question.toLowerCase().includes(needle) ||
            item.answer.toLowerCase().includes(needle),
        ),
      }))
      .filter((group) => group.items.length > 0);
  }, [groups, needle]);

  const total = groups.reduce((sum, group) => sum + group.items.length, 0);

  function saveItem(values: FaqItemFormValues) {
    const existing = editing?.item;
    const sourceGroupId = editing?.groupId;
    const nextItem: AdminFaqItem = {
      id: existing?.id ?? `faq-${Date.now()}`,
      question: values.question,
      answer: values.answer,
    };

    setGroups((current) => {
      if (!existing) {
        return current.map((group) =>
          group.id === values.groupId ? { ...group, items: [...group.items, nextItem] } : group,
        );
      }
      if (sourceGroupId === values.groupId) {
        return current.map((group) =>
          group.id === values.groupId
            ? {
                ...group,
                items: group.items.map((item) => (item.id === existing.id ? nextItem : item)),
              }
            : group,
        );
      }
      return current.map((group) => {
        if (group.id === sourceGroupId) {
          return { ...group, items: group.items.filter((item) => item.id !== existing.id) };
        }
        if (group.id === values.groupId) {
          return { ...group, items: [...group.items, nextItem] };
        }
        return group;
      });
    });
    setEditing(null);
    notifyDemoMode(existing ? "This question" : "This new question");
  }

  function moveItem(groupId: string, itemId: string, direction: -1 | 1) {
    setGroups((current) =>
      current.map((group) => {
        if (group.id !== groupId) return group;
        const index = group.items.findIndex((item) => item.id === itemId);
        const next = index + direction;
        if (index < 0 || next < 0 || next >= group.items.length) return group;
        const items = [...group.items];
        const [moved] = items.splice(index, 1);
        items.splice(next, 0, moved!);
        return { ...group, items };
      }),
    );
  }

  function confirmDelete() {
    if (!pendingDelete) return;
    if (pendingDelete.kind === "item") {
      const { groupId, item } = pendingDelete;
      setGroups((current) =>
        current.map((group) =>
          group.id === groupId
            ? { ...group, items: group.items.filter((entry) => entry.id !== item.id) }
            : group,
        ),
      );
      notifyDemoMode("Deleting this question");
    } else {
      const groupId = pendingDelete.group.id;
      setGroups((current) => current.filter((group) => group.id !== groupId));
      notifyDemoMode("Deleting this group");
    }
    setPendingDelete(null);
  }

  function createGroup(category: string) {
    const id = `faqg-${slugify(category) || "group"}-${Date.now()}`;
    setGroups((current) => [...current, { id, category, items: [] }]);
    setNewGroupOpen(false);
    notifyDemoMode("This new group");
  }

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="w-full sm:max-w-xs">
            <Input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              icon={<Search />}
              placeholder="Search questions…"
              aria-label="Search FAQs"
              enterKeyHint="search"
              maxLength={100}
            />
          </div>
          <div className="flex items-center justify-between gap-3 sm:justify-end">
            <p className="text-sm text-muted-foreground tabular-nums">
              {total} questions · {groups.length} groups
            </p>
            <Button icon={<Plus />} onClick={() => setNewGroupOpen(true)}>
              New group
            </Button>
          </div>
        </div>

        {groups.length === 0 ? (
          <EmptyState
            icon={<CircleHelp />}
            title="No FAQs yet"
            description="Add a group, then the questions carriers ask before they call."
            action={
              <Button icon={<Plus />} onClick={() => setNewGroupOpen(true)}>
                New group
              </Button>
            }
          />
        ) : visible.length === 0 ? (
          <EmptyState
            icon={<SearchX />}
            title="No questions match"
            description="Try a different search."
            action={
              <Button variant="outline" onClick={() => setSearch("")}>
                Clear search
              </Button>
            }
          />
        ) : (
          <div className="flex flex-col gap-4">
            {visible.map((group) => (
              <FaqGroupCard
                key={group.id}
                group={group}
                onAdd={() => setEditing({ groupId: group.id, item: null })}
                onEdit={(item) => setEditing({ groupId: group.id, item })}
                onDelete={(item) => setPendingDelete({ kind: "item", groupId: group.id, item })}
                onMove={(itemId, direction) => moveItem(group.id, itemId, direction)}
                onDeleteGroup={() =>
                  setPendingDelete({
                    kind: "group",
                    group: groups.find((entry) => entry.id === group.id) ?? group,
                  })
                }
              />
            ))}
          </div>
        )}
      </div>

      {editing ? (
        <FaqEditSheet
          open
          onOpenChange={(open) => {
            if (!open) setEditing(null);
          }}
          groups={groups}
          groupId={editing.groupId}
          item={editing.item}
          onSave={saveItem}
        />
      ) : null}

      <FaqGroupDialog open={newGroupOpen} onOpenChange={setNewGroupOpen} onCreate={createGroup} />

      <ConfirmDialog
        open={pendingDelete != null}
        onOpenChange={(open) => {
          if (!open) setPendingDelete(null);
        }}
        title={
          pendingDelete?.kind === "group"
            ? `Delete “${pendingDelete.group.category}”?`
            : `Delete this question?`
        }
        description={
          pendingDelete?.kind === "group"
            ? `All ${pendingDelete.group.items.length} questions in this group will be removed from the FAQs page.`
            : pendingDelete?.item.question
        }
        confirmLabel={pendingDelete?.kind === "group" ? "Delete group" : "Delete question"}
        destructive
        onConfirm={confirmDelete}
      />
    </>
  );
}
