import type { PostBlock } from "@/data/blog";

export function ArticleBody({ blocks }: { blocks: PostBlock[] }) {
  return (
    <div className="space-y-6 text-base leading-8 text-foreground/90">
      {blocks.map((block, index) => {
        if (block.kind === "h") {
          return <h2 key={index} className="pt-4 font-display text-2xl font-bold leading-tight text-foreground">{block.text}</h2>;
        }
        if (block.kind === "list") {
          return <ul key={index} className="list-disc space-y-2 pl-6">{block.items.map((item) => <li key={item}>{item}</li>)}</ul>;
        }
        if (block.kind === "quote") {
          return <blockquote key={index} className="border-l-4 border-accent bg-paper px-6 py-4 font-display text-xl font-semibold leading-relaxed text-primary">{block.text}</blockquote>;
        }
        return <p key={index}>{block.text}</p>;
      })}
    </div>
  );
}
