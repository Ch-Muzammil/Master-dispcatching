"use client";

import { useState } from "react";
import { Check, Code2, Copy, Search } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/Button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/Empty";
import { Input } from "@/components/ui/Input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { copyToClipboard } from "@/lib/copy-to-clipboard";
import type { WorkingCodeBlock, WorkingSnippet } from "../snippets";

type WorkingServicesLibraryProps = {
  snippets: WorkingSnippet[];
};

function snippetMatches(snippet: WorkingSnippet, query: string) {
  if (!query) return true;
  const haystack = [
    snippet.title,
    snippet.description ?? "",
    ...snippet.blocks.flatMap((block) => [block.label ?? "", block.code]),
  ]
    .join(" ")
    .toLowerCase();
  return haystack.includes(query);
}

export function WorkingServicesLibrary({ snippets }: WorkingServicesLibraryProps) {
  const [query, setQuery] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeId, setActiveId] = useState(snippets[0]?.id ?? "");

  const normalizedQuery = query.trim().toLowerCase();
  const visible = snippets.filter((snippet) => snippetMatches(snippet, normalizedQuery));
  const selectedId = visible.some((snippet) => snippet.id === activeId)
    ? activeId
    : (visible[0]?.id ?? "");

  async function copyBlock(block: WorkingCodeBlock, title: string) {
    const copied = await copyToClipboard(block.code);
    if (!copied) {
      toast.error("Couldn't copy — select the code and copy it manually.");
      return;
    }

    setCopiedId(block.id);
    toast.success(`Copied ${block.label ?? title}`);
    window.setTimeout(() => {
      setCopiedId((current) => (current === block.id ? null : current));
    }, 2000);
  }

  if (snippets.length === 0) {
    return (
      <EmptyState
        icon={<Code2 />}
        title="No components yet"
        description="Add a component to the working services list and it shows up here as its own tab."
      />
    );
  }

  return (
    <div className="flex min-w-0 flex-col gap-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">
          {snippets.length} {snippets.length === 1 ? "component" : "components"}
        </p>
        <div className="w-full sm:max-w-xs">
          <Input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search components"
            aria-label="Search components"
            icon={<Search />}
          />
        </div>
      </div>

      {visible.length === 0 ? (
        <EmptyState
          icon={<Search />}
          title="No matching components"
          description="Try a different name, or clear the search to see every tab."
        />
      ) : (
        <Tabs
          value={selectedId}
          onValueChange={(value) => {
            if (typeof value === "string") setActiveId(value);
          }}
        >
          <div className="-mx-1 overflow-x-auto px-1">
            <TabsList variant="line" className="h-auto w-max min-w-full justify-start">
              {visible.map((snippet) => (
                <TabsTrigger key={snippet.id} value={snippet.id} className="flex-none px-3">
                  {snippet.title}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {visible.map((snippet) => (
            <TabsContent key={snippet.id} value={snippet.id} className="mt-4 flex flex-col gap-4">
              {snippet.description ? (
                <p className="text-sm text-muted-foreground">{snippet.description}</p>
              ) : null}
              {snippet.blocks.map((block) => {
                const copied = copiedId === block.id;
                const heading = block.label ?? snippet.title;
                return (
                  <Card key={block.id} size="sm" className="min-w-0">
                    <CardHeader className="border-b">
                      <CardTitle>{heading}</CardTitle>
                      {block.label ? <CardDescription>{snippet.title}</CardDescription> : null}
                      <CardAction>
                        <Button
                          type="button"
                          size="sm"
                          variant="outline"
                          icon={copied ? <Check /> : <Copy />}
                          onClick={() => copyBlock(block, snippet.title)}
                          aria-label={copied ? `Copied ${heading}` : `Copy ${heading}`}
                        >
                          {copied ? "Copied" : "Copy"}
                        </Button>
                      </CardAction>
                    </CardHeader>
                    <CardContent>
                      <pre className="max-h-96 overflow-auto rounded-lg bg-muted p-4 text-xs leading-relaxed text-foreground">
                        <code className="font-mono whitespace-pre">{block.code}</code>
                      </pre>
                    </CardContent>
                  </Card>
                );
              })}
            </TabsContent>
          ))}
        </Tabs>
      )}
    </div>
  );
}
