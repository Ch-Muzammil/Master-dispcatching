import { Truck } from "lucide-react";

export function PageLoader({ label = "Loading" }: { label?: string }) {
  return (
    <main
      className="flex flex-1 flex-col items-center justify-center bg-paper px-6 py-24"
      aria-busy="true"
      aria-live="polite"
    >
      <div className="flex flex-col items-center gap-5">
        <div className="relative flex size-14 items-center justify-center rounded-2xl bg-primary shadow-sm">
          <Truck className="size-7 text-accent" aria-hidden strokeWidth={2.2} />
          <span
            className="absolute inset-0 rounded-2xl border border-accent/40 motion-safe:animate-pulse"
            aria-hidden
          />
        </div>
        <span
          className="size-5 animate-spin rounded-full border-2 border-primary/15 border-t-primary motion-reduce:animate-none"
          aria-hidden
        />
        <p className="text-sm font-medium text-muted-foreground">{label} Meridian Dispatch Group…</p>
      </div>
    </main>
  );
}
