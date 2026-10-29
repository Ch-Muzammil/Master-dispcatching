import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/Button";

type PageFormActionsProps = {
  isDirty: boolean;
  isSubmitting: boolean;
};

export function PageFormActions({ isDirty, isSubmitting }: PageFormActionsProps) {
  return (
    <div className="sticky bottom-0 z-10 -mx-4 -mb-6 flex flex-col-reverse gap-2 border-t bg-background/95 px-4 py-3 backdrop-blur supports-backdrop-filter:bg-background/80 sm:-mx-6 sm:flex-row sm:items-center sm:justify-end sm:px-6 lg:-mx-8 lg:-mb-8 lg:px-8">
      <p
        className={cn(
          "text-sm text-muted-foreground sm:mr-auto",
          !isDirty && "max-sm:hidden sm:invisible",
        )}
        aria-live="polite"
      >
        You have unsaved changes
      </p>
      <Link href="/admin/pages" className={buttonVariants({ variant: "outline" })}>
        Cancel
      </Link>
      <Button type="submit" loading={isSubmitting} disabled={isSubmitting || !isDirty}>
        Save changes
      </Button>
    </div>
  );
}
