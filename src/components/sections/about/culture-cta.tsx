import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export function CultureCta() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-20">
      <div className="flex flex-col items-start justify-between gap-6 rounded-2xl border bg-card p-8 sm:flex-row sm:items-center lg:p-10">
        <div>
          <h2 className="font-display text-2xl font-bold tracking-tight">Like the sound of the desk?</h2>
          <p className="mt-2 max-w-xl text-muted-foreground">
            We hire dispatchers, load planners, and compliance specialists -
            several of our leads started in seats just like them.
          </p>
        </div>
        <Link href="/careers" className={cn(buttonVariants({ size: "lg" }), "shrink-0 rounded-full px-7 font-bold")}>
          See open roles <ArrowRight className="size-4" />
        </Link>
      </div>
    </section>
  );
}
