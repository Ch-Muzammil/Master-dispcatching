import { Skeleton } from "@/components/ui/Skeleton";

export default function WorkingServicesLoading() {
  return (
    <div className="flex flex-col gap-6" aria-busy="true" aria-label="Loading working services">
      <div className="space-y-2">
        <Skeleton className="h-8 w-56" />
        <Skeleton className="h-4 w-full max-w-xl" />
      </div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Skeleton className="h-4 w-28" />
        <Skeleton className="h-9 w-full sm:max-w-xs" />
      </div>
      {Array.from({ length: 3 }, (_, index) => (
        <div key={index} className="overflow-hidden rounded-xl border bg-card">
          <div className="flex items-center justify-between gap-3 border-b px-4 py-4">
            <Skeleton className="h-5 w-40" />
            <Skeleton className="h-8 w-20" />
          </div>
          <div className="p-4">
            <Skeleton className="h-40 w-full" />
          </div>
        </div>
      ))}
    </div>
  );
}
