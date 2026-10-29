import { Skeleton } from "@/components/ui/Skeleton";

export default function PagesLoading() {
  return (
    <div className="flex flex-col gap-6" aria-busy="true" aria-label="Loading pages">
      <div className="space-y-2">
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-4 w-96 max-w-full" />
      </div>
      <Skeleton className="h-10 w-full max-w-md rounded-xl" />
      <div className="overflow-hidden rounded-xl border bg-card">
        <div className="border-b p-4">
          <Skeleton className="h-9 w-full sm:max-w-xs" />
        </div>
        <div className="divide-y">
          {Array.from({ length: 8 }, (_, index) => (
            <div key={index} className="flex items-center gap-3 px-4 py-3">
              <div className="flex-1 space-y-1.5">
                <Skeleton className="h-4 w-40 max-w-full" />
                <Skeleton className="h-3 w-24" />
              </div>
              <Skeleton className="h-6 w-20 rounded-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
