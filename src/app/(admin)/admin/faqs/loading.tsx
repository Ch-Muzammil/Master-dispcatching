import { Skeleton } from "@/components/ui/Skeleton";

export default function FaqsLoading() {
  return (
    <div className="flex flex-col gap-6" aria-busy="true" aria-label="Loading FAQs">
      <div className="space-y-2">
        <Skeleton className="h-8 w-24" />
        <Skeleton className="h-4 w-96 max-w-full" />
      </div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Skeleton className="h-9 w-full sm:max-w-xs" />
        <Skeleton className="h-9 w-32" />
      </div>
      {Array.from({ length: 3 }, (_, index) => (
        <div key={index} className="overflow-hidden rounded-xl border bg-card">
          <div className="border-b px-5 py-3">
            <Skeleton className="h-5 w-48" />
          </div>
          <div className="divide-y">
            {Array.from({ length: 3 }, (_, row) => (
              <div key={row} className="px-5 py-3">
                <Skeleton className="h-4 w-72 max-w-full" />
                <Skeleton className="mt-1.5 h-3 w-56 max-w-[80%]" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
