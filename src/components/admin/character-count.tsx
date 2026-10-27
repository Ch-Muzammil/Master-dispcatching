import { cn } from "@/lib/utils";

type CharacterCountProps = {
  length: number;
  max: number;
  className?: string;
};

/** "38/200" under a text field; turns amber near the limit. */
export function CharacterCount({ length, max, className }: CharacterCountProps) {
  const nearLimit = length >= max * 0.9;
  return (
    <p
      className={cn(
        "text-right text-xs tabular-nums",
        nearLimit ? "font-medium text-warning-soft-foreground" : "text-muted-foreground",
        className,
      )}
    >
      {length}/{max}
    </p>
  );
}
