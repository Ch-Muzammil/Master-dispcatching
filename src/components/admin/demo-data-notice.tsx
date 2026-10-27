"use client";

import { Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { badgeVariants } from "@/components/ui/Badge";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/Popover";

/**
 * Top-bar notice that the admin runs on sample data. Uses a popover (not a tooltip)
 * so it also works with a tap on touch screens. Remove once Supabase is connected.
 */
export function DemoDataNotice() {
  return (
    <Popover>
      <PopoverTrigger
        className={cn(
          badgeVariants({ variant: "warning" }),
          "h-8 cursor-pointer px-3 outline-none focus-visible:ring-2 focus-visible:ring-ring",
        )}
      >
        <Info aria-hidden />
        Demo data
      </PopoverTrigger>
      <PopoverContent align="end" className="w-72">
        <PopoverHeader>
          <PopoverTitle>You are viewing sample content</PopoverTitle>
          <PopoverDescription>
            Edits are not saved yet. Content will be stored once the database is
            connected in a later stage.
          </PopoverDescription>
        </PopoverHeader>
      </PopoverContent>
    </Popover>
  );
}
