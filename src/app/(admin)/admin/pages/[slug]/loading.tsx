import { Skeleton } from "@/components/ui/Skeleton";

export default function EditPageLoading() {
  return (
    <div className="flex flex-col gap-6" aria-busy="true" aria-label="Loading page editor">
      <div className="space-y-2">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-4 w-80 max-w-full" />
      </div>
      <Skeleton className="h-64 w-full rounded-xl" />
      <Skeleton className="h-48 w-full rounded-xl" />
    </div>
  );
}
