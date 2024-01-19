import { Skeleton } from "./skeleton";

export default function ProfileLoadingSkeleton() {
  return (
    <div className="flex flex-col gap-8">
      <Skeleton className="h-80 w-full rounded-lg bg-slate-300" />
      <div className="flex flex-col gap-3">
        <Skeleton className="h-7 w-32 flex-shrink rounded-md" />
        <Skeleton className="h-16 w-full flex-shrink rounded-md" />
        <Skeleton className="h-32 w-full rounded-md" />
      </div>
    </div>
  );
}
